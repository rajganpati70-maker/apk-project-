/**
 * Memory Optimizer
 * Advanced memory management utilities for the AnyRenting app
 * Implements garbage collection, memory monitoring, and cleanup strategies
 */

import { Platform } from 'react-native';

/**
 * Memory usage information
 */
export interface MemoryInfo {
  used: number;
  total: number;
  percentage: number;
  timestamp: number;
}

/**
 * Memory threshold configuration
 */
export interface MemoryThreshold {
  warning: number; // Warning threshold (percentage)
  critical: number; // Critical threshold (percentage)
  limit: number; // Hard limit (MB)
}

/**
 * Default memory thresholds
 */
export const defaultMemoryThreshold: MemoryThreshold = {
  warning: 70, // 70% usage warning
  critical: 85, // 85% usage critical
  limit: 200, // 200MB hard limit
};

/**
 * Memory optimizer class
 */
export class MemoryOptimizer {
  private threshold: MemoryThreshold;
  private memoryHistory: MemoryInfo[];
  private maxHistorySize: number;
  private cleanupCallbacks: Array<(level: 'warning' | 'critical') => void>;
  private currentMemoryUsage: number;

  constructor(threshold: Partial<MemoryThreshold> = {}) {
    this.threshold = { ...defaultMemoryThreshold, ...threshold };
    this.memoryHistory = [];
    this.maxHistorySize = 100;
    this.cleanupCallbacks = [];
    this.currentMemoryUsage = 0;
  }

  /**
   * Get current memory usage
   */
  async getMemoryUsage(): Promise<MemoryInfo> {
    // This is a simplified implementation
    // In production, you'd use native modules for accurate memory measurement
    const used = this.estimateMemoryUsage();
    const total = this.threshold.limit;
    const percentage = (used / total) * 100;

    const memoryInfo: MemoryInfo = {
      used,
      total,
      percentage,
      timestamp: Date.now(),
    };

    this.addToHistory(memoryInfo);
    this.currentMemoryUsage = used;

    // Check thresholds
    this.checkThresholds(memoryInfo);

    return memoryInfo;
  }

  /**
   * Estimate memory usage (simplified)
   */
  private estimateMemoryUsage(): number {
    // In production, this would use native memory measurement
    // For now, we'll use a rough estimate based on typical app usage
    const baseUsage = 50; // Base app usage in MB
    const cacheUsage = this.estimateCacheUsage();
    const componentUsage = this.estimateComponentUsage();
    
    return baseUsage + cacheUsage + componentUsage;
  }

  /**
   * Estimate cache usage
   */
  private estimateCacheUsage(): number {
    // Estimate based on typical cache sizes
    return 20; // Estimate 20MB for cache
  }

  /**
   * Estimate component usage
   */
  private estimateComponentUsage(): number {
    // Estimate based on active components
    return 30; // Estimate 30MB for components
  }

  /**
   * Add memory info to history
   */
  private addToHistory(memoryInfo: MemoryInfo): void {
    this.memoryHistory.push(memoryInfo);
    
    // Keep history size manageable
    if (this.memoryHistory.length > this.maxHistorySize) {
      this.memoryHistory.shift();
    }
  }

  /**
   * Check memory thresholds
   */
  private checkThresholds(memoryInfo: MemoryInfo): void {
    if (memoryInfo.percentage >= this.threshold.critical) {
      console.warn(`[Memory] CRITICAL: Memory usage at ${memoryInfo.percentage.toFixed(1)}%`);
      this.triggerCleanup('critical');
    } else if (memoryInfo.percentage >= this.threshold.warning) {
      console.warn(`[Memory] WARNING: Memory usage at ${memoryInfo.percentage.toFixed(1)}%`);
      this.triggerCleanup('warning');
    }
  }

  /**
   * Trigger cleanup callbacks
   */
  private triggerCleanup(level: 'warning' | 'critical'): void {
    this.cleanupCallbacks.forEach(callback => callback(level));
  }

  /**
   * Register cleanup callback
   */
  onMemoryThreshold(callback: (level: 'warning' | 'critical') => void): void {
    this.cleanupCallbacks.push(callback);
  }

  /**
   * Get memory history
   */
  getMemoryHistory(): MemoryInfo[] {
    return [...this.memoryHistory];
  }

  /**
   * Get average memory usage
   */
  getAverageMemoryUsage(): number {
    if (this.memoryHistory.length === 0) return 0;
    
    const total = this.memoryHistory.reduce((sum, info) => sum + info.used, 0);
    return total / this.memoryHistory.length;
  }

  /**
   * Get memory trend
   */
  getMemoryTrend(): 'increasing' | 'decreasing' | 'stable' {
    if (this.memoryHistory.length < 2) return 'stable';
    
    const recent = this.memoryHistory.slice(-10);
    const first = recent[0].used;
    const last = recent[recent.length - 1].used;
    
    const change = ((last - first) / first) * 100;
    
    if (change > 5) return 'increasing';
    if (change < -5) return 'decreasing';
    return 'stable';
  }

  /**
   * Force garbage collection (if available)
   */
  forceGarbageCollection(): void {
    // In production, this would call native garbage collection
    // For now, we'll trigger cleanup callbacks
    console.log('[Memory] Forcing garbage collection');
    this.triggerCleanup('warning');
  }

  /**
   * Clear memory history
   */
  clearHistory(): void {
    this.memoryHistory = [];
  }

  /**
   * Get memory optimization suggestions
   */
  getOptimizationSuggestions(): string[] {
    const suggestions: string[] = [];
    const currentUsage = this.currentMemoryUsage;
    const percentage = (currentUsage / this.threshold.limit) * 100;

    if (percentage > this.threshold.warning) {
      suggestions.push('Clear unused caches');
      suggestions.push('Unload inactive components');
      suggestions.push('Reduce image cache size');
      suggestions.push('Optimize data structures');
    }

    if (percentage > this.threshold.critical) {
      suggestions.push('URGENT: Immediate cleanup required');
      suggestions.push('Close background processes');
      suggestions.push('Reduce concurrent operations');
      suggestions.push('Implement aggressive memory management');
    }

    if (suggestions.length === 0) {
      suggestions.push('Memory usage is optimal');
    }

    return suggestions;
  }

  /**
   * Get platform-specific memory optimizations
   */
  getPlatformOptimizations(): {
    enableAggressiveCleanup: boolean;
    cacheSizeLimit: number;
    componentUnloadDelay: number;
  } {
    return {
      enableAggressiveCleanup: Platform.OS === 'android',
      cacheSizeLimit: Platform.OS === 'ios' ? 50 : 30, // MB
      componentUnloadDelay: Platform.OS === 'ios' ? 30000 : 60000, // ms
    };
  }

  /**
   * Monitor memory at intervals
   */
  startMonitoring(interval: number = 60000): NodeJS.Timeout {
    return setInterval(() => {
      this.getMemoryUsage();
    }, interval);
  }

  /**
   * Stop memory monitoring
   */
  stopMonitoring(intervalId: NodeJS.Timeout): void {
    clearInterval(intervalId);
  }
}

/**
 * Global memory optimizer instance
 */
export const memoryOptimizer = new MemoryOptimizer();

/**
 * Memory monitoring hook equivalent
 */
export const useMemoryMonitoring = () => {
  const getCurrentMemoryUsage = async () => {
    return await memoryOptimizer.getMemoryUsage();
  };

  const getMemoryHistory = () => {
    return memoryOptimizer.getMemoryHistory();
  };

  const getMemoryTrend = () => {
    return memoryOptimizer.getMemoryTrend();
  };

  const getOptimizationSuggestions = () => {
    return memoryOptimizer.getOptimizationSuggestions();
  };

  const forceCleanup = () => {
    memoryOptimizer.forceGarbageCollection();
  };

  return {
    getCurrentMemoryUsage,
    getMemoryHistory,
    getMemoryTrend,
    getOptimizationSuggestions,
    forceCleanup,
  };
};