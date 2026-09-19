/**
 * Error Recovery Utilities
 * Comprehensive error handling and recovery strategies for the AnyRenting app
 * Implements retry mechanisms, fallback content, and offline mode support
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Error types
 */
export enum ErrorType {
  NETWORK = 'network',
  NAVIGATION = 'navigation',
  CONTENT = 'content',
  AUTHENTICATION = 'authentication',
  VALIDATION = 'validation',
  UNKNOWN = 'unknown',
}

/**
 * Error severity
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Error information
 */
export interface ErrorInfo {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  code?: string;
  timestamp: number;
  stack?: string;
  context?: Record<string, any>;
  retryable: boolean;
}

/**
 * Recovery strategy
 */
export interface RecoveryStrategy {
  type: 'retry' | 'fallback' | 'ignore' | 'escalate';
  maxRetries?: number;
  retryDelay?: number;
  fallbackContent?: any;
  escalateTo?: string;
}

/**
 * Error recovery configuration
 */
export interface ErrorRecoveryConfig {
  enableAutoRetry: boolean;
  maxRetries: number;
  retryDelay: number;
  enableOfflineMode: boolean;
  offlineCacheDuration: number;
  enableFallbackContent: boolean;
}

/**
 * Default error recovery configuration
 */
export const defaultErrorRecoveryConfig: ErrorRecoveryConfig = {
  enableAutoRetry: true,
  maxRetries: 3,
  retryDelay: 1000,
  enableOfflineMode: true,
  offlineCacheDuration: 3600000, // 1 hour
  enableFallbackContent: true,
};

/**
 * Error recovery class
 */
export class ErrorRecovery {
  private config: ErrorRecoveryConfig;
  private errorHistory: ErrorInfo[];
  private maxHistorySize: number;
  private retryCount: Map<string, number>;

  constructor(config: Partial<ErrorRecoveryConfig> = {}) {
    this.config = { ...defaultErrorRecoveryConfig, ...config };
    this.errorHistory = [];
    this.maxHistorySize = 100;
    this.retryCount = new Map();
  }

  /**
   * Handle error with recovery strategy
   */
  async handleError(error: Error, context?: Record<string, any>): Promise<ErrorInfo> {
    const errorInfo = this.classifyError(error, context);
    this.addToHistory(errorInfo);

    const strategy = this.determineRecoveryStrategy(errorInfo);

    switch (strategy.type) {
      case 'retry':
        return await this.handleRetry(errorInfo, strategy);
      case 'fallback':
        return await this.handleFallback(errorInfo, strategy);
      case 'ignore':
        return errorInfo;
      case 'escalate':
        return await this.handleEscalation(errorInfo, strategy);
      default:
        return errorInfo;
    }
  }

  /**
   * Classify error
   */
  private classifyError(error: Error, context?: Record<string, any>): ErrorInfo {
    let type = ErrorType.UNKNOWN;
    let severity = ErrorSeverity.MEDIUM;
    let retryable = true;

    // Classify based on error message or context
    if (error.message.includes('network') || error.message.includes('fetch')) {
      type = ErrorType.NETWORK;
      severity = ErrorSeverity.HIGH;
      retryable = true;
    } else if (error.message.includes('navigation') || context?.isNavigationError) {
      type = ErrorType.NAVIGATION;
      severity = ErrorSeverity.MEDIUM;
      retryable = false;
    } else if (error.message.includes('content') || context?.isContentError) {
      type = ErrorType.CONTENT;
      severity = ErrorSeverity.LOW;
      retryable = true;
    } else if (error.message.includes('auth') || error.message.includes('unauthorized')) {
      type = ErrorType.AUTHENTICATION;
      severity = ErrorSeverity.CRITICAL;
      retryable = false;
    } else if (error.message.includes('validation') || error.message.includes('invalid')) {
      type = ErrorType.VALIDATION;
      severity = ErrorSeverity.LOW;
      retryable = false;
    }

    return {
      type,
      severity,
      message: error.message,
      timestamp: Date.now(),
      stack: error.stack,
      context,
      retryable,
    };
  }

  /**
   * Determine recovery strategy
   */
  private determineRecoveryStrategy(errorInfo: ErrorInfo): RecoveryStrategy {
    if (!errorInfo.retryable) {
      return { type: 'fallback' };
    }

    if (errorInfo.severity === ErrorSeverity.CRITICAL) {
      return { type: 'escalate', escalateTo: 'support' };
    }

    if (this.config.enableAutoRetry && this.getRetryCount(errorInfo.message) < this.config.maxRetries) {
      return {
        type: 'retry',
        maxRetries: this.config.maxRetries,
        retryDelay: this.config.retryDelay,
      };
    }

    if (this.config.enableFallbackContent) {
      return { type: 'fallback' };
    }

    return { type: 'ignore' };
  }

  /**
   * Handle retry
   */
  private async handleRetry(errorInfo: ErrorInfo, strategy: RecoveryStrategy): Promise<ErrorInfo> {
    const retryKey = errorInfo.message;
    const currentRetries = this.getRetryCount(retryKey);

    if (currentRetries >= (strategy.maxRetries || this.config.maxRetries)) {
      console.log(`[ErrorRecovery] Max retries reached for: ${errorInfo.message}`);
      this.resetRetryCount(retryKey);
      return errorInfo;
    }

    const delay = strategy.retryDelay || this.config.retryDelay;
    console.log(`[ErrorRecovery] Retrying in ${delay}ms (attempt ${currentRetries + 1})`);

    await this.delay(delay);
    this.incrementRetryCount(retryKey);

    // In production, this would trigger the actual retry
    // For now, we'll just return the error info
    return errorInfo;
  }

  /**
   * Handle fallback
   */
  private async handleFallback(errorInfo: ErrorInfo, _strategy: RecoveryStrategy): Promise<ErrorInfo> {
    console.log(`[ErrorRecovery] Using fallback for: ${errorInfo.message}`);

    // Check if offline mode is available
    if (this.config.enableOfflineMode && errorInfo.type === ErrorType.NETWORK) {
      const cachedContent = await this.getCachedContent(errorInfo.context?.cacheKey);
      if (cachedContent) {
        console.log('[ErrorRecovery] Using cached content');
        return { ...errorInfo, context: { ...errorInfo.context, fallbackContent: cachedContent } };
      }
    }

    return errorInfo;
  }

  /**
   * Handle escalation
   */
  private async handleEscalation(errorInfo: ErrorInfo, strategy: RecoveryStrategy): Promise<ErrorInfo> {
    console.log(`[ErrorRecovery] Escalating to ${strategy.escalateTo}: ${errorInfo.message}`);

    // In production, this would send to support team or logging service
    await this.logCriticalError(errorInfo);

    return errorInfo;
  }

  /**
   * Get retry count
   */
  private getRetryCount(key: string): number {
    return this.retryCount.get(key) || 0;
  }

  /**
   * Increment retry count
   */
  private incrementRetryCount(key: string): void {
    const current = this.getRetryCount(key);
    this.retryCount.set(key, current + 1);
  }

  /**
   * Reset retry count
   */
  private resetRetryCount(key: string): void {
    this.retryCount.delete(key);
  }

  /**
   * Add to error history
   */
  private addToHistory(errorInfo: ErrorInfo): void {
    this.errorHistory.push(errorInfo);

    // Keep history size manageable
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory.shift();
    }
  }

  /**
   * Get error history
   */
  getErrorHistory(): ErrorInfo[] {
    return [...this.errorHistory];
  }

  /**
   * Get error statistics
   */
  getErrorStatistics(): {
    total: number;
    byType: Record<ErrorType, number>;
    bySeverity: Record<ErrorSeverity, number>;
    retryable: number;
  } {
    const stats = {
      total: this.errorHistory.length,
      byType: {} as Record<ErrorType, number>,
      bySeverity: {} as Record<ErrorSeverity, number>,
      retryable: 0,
    };

    this.errorHistory.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
      if (error.retryable) stats.retryable++;
    });

    return stats;
  }

  /**
   * Cache content for offline use
   */
  async cacheContent(key: string, content: any): Promise<void> {
    if (!this.config.enableOfflineMode) return;

    try {
      const cacheData = {
        content,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(`@anyrenting_cache_${key}`, JSON.stringify(cacheData));
    } catch (error) {
      console.error('[ErrorRecovery] Failed to cache content:', error);
    }
  }

  /**
   * Get cached content
   */
  async getCachedContent(key: string): Promise<any | null> {
    if (!this.config.enableOfflineMode) return null;

    try {
      const cached = await AsyncStorage.getItem(`@anyrenting_cache_${key}`);
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      const age = Date.now() - cacheData.timestamp;

      // Check if cache is still valid
      if (age > this.config.offlineCacheDuration) {
        await AsyncStorage.removeItem(`@anyrenting_cache_${key}`);
        return null;
      }

      return cacheData.content;
    } catch (error) {
      console.error('[ErrorRecovery] Failed to get cached content:', error);
      return null;
    }
  }

  /**
   * Clear cached content
   */
  async clearCachedContent(key?: string): Promise<void> {
    try {
      if (key) {
        await AsyncStorage.removeItem(`@anyrenting_cache_${key}`);
      } else {
        // Clear all cached content
        const keys = await AsyncStorage.getAllKeys();
        const cacheKeys = keys.filter(k => k.startsWith('@anyrenting_cache_'));
        await AsyncStorage.multiRemove(cacheKeys);
      }
    } catch {
      console.error('[ErrorRecovery] Failed to clear cached content');
    }
  }

  /**
   * Log critical error
   */
  private async logCriticalError(errorInfo: ErrorInfo): Promise<void> {
    try {
      const logData = {
        ...errorInfo,
        appVersion: '1.0.0',
        platform: Platform.OS,
      };

      const logKey = `@anyrenting_critical_error_${Date.now()}`;
      await AsyncStorage.setItem(logKey, JSON.stringify(logData));

      console.error('[ErrorRecovery] Critical error logged:', logData);
    } catch {
      console.error('[ErrorRecovery] Failed to log critical error');
    }
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Clear error history
   */
  clearHistory(): void {
    this.errorHistory = [];
    this.retryCount.clear();
  }

  /**
   * Check if offline mode is active
   */
  async isOfflineMode(): Promise<boolean> {
    try {
      const offlineMode = await AsyncStorage.getItem('@anyrenting_offline_mode');
      return offlineMode === 'true';
    } catch {
      return false;
    }
  }

  /**
   * Set offline mode
   */
  async setOfflineMode(offline: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem('@anyrenting_offline_mode', offline ? 'true' : 'false');
    } catch {
      console.error('[ErrorRecovery] Failed to set offline mode');
    }
  }
}

/**
 * Global error recovery instance
 */
export const errorRecovery = new ErrorRecovery();

/**
 * Error recovery hook equivalent
 */
export const useErrorRecovery = () => {
  const handleError = async (error: Error, context?: Record<string, any>) => {
    return await errorRecovery.handleError(error, context);
  };

  const cacheContent = async (key: string, content: any) => {
    await errorRecovery.cacheContent(key, content);
  };

  const getCachedContent = async (key: string) => {
    return await errorRecovery.getCachedContent(key);
  };

  const clearCachedContent = async (key?: string) => {
    await errorRecovery.clearCachedContent(key);
  };

  const getErrorStatistics = () => {
    return errorRecovery.getErrorStatistics();
  };

  const setOfflineMode = async (offline: boolean) => {
    await errorRecovery.setOfflineMode(offline);
  };

  const isOfflineMode = async () => {
    return await errorRecovery.isOfflineMode();
  };

  return {
    handleError,
    cacheContent,
    getCachedContent,
    clearCachedContent,
    getErrorStatistics,
    setOfflineMode,
    isOfflineMode,
  };
};