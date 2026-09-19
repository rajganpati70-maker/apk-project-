/**
 * Performance Optimizer
 * Advanced performance optimization utilities for the AnyRenting app
 * Implements lazy loading, virtualization, and memory management
 */

import { Platform } from 'react-native';

/**
 * Performance configuration
 */
export interface PerformanceConfig {
  enableVirtualization: boolean;
  enableLazyLoading: boolean;
  enableMemoryOptimization: boolean;
  maxCacheSize: number;
  cacheTimeout: number;
  frameRateTarget: number;
  memoryLimit: number;
}

/**
 * Default performance configuration
 */
export const defaultPerformanceConfig: PerformanceConfig = {
  enableVirtualization: true,
  enableLazyLoading: true,
  enableMemoryOptimization: true,
  maxCacheSize: 50, // Maximum number of items to cache
  cacheTimeout: 300000, // 5 minutes cache timeout
  frameRateTarget: 60, // Target 60fps
  memoryLimit: 200, // 200MB memory limit
};

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
  frameRate: number;
  memoryUsage: number;
  renderTime: number;
  navigationTime: number;
  cacheHitRate: number;
  virtualizationEfficiency: number;
}

/**
 * Performance optimizer class
 */
export class PerformanceOptimizer {
  private config: PerformanceConfig;
  private cache: Map<string, { data: any; timestamp: number }>;
  private metrics: PerformanceMetrics;
  private frameCount: number;
  private lastFrameTime: number;
  private performanceCallbacks: Array<(metrics: PerformanceMetrics) => void>;

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...defaultPerformanceConfig, ...config };
    this.cache = new Map();
    this.metrics = {
      frameRate: 60,
      memoryUsage: 0,
      renderTime: 0,
      navigationTime: 0,
      cacheHitRate: 0,
      virtualizationEfficiency: 0,
    };
    this.frameCount = 0;
    this.lastFrameTime = Date.now();
    this.performanceCallbacks = [];
  }

  /**
   * Cache data with automatic cleanup
   */
  cacheData(key: string, data: any): void {
    if (!this.config.enableLazyLoading) return;

    // Check cache size limit
    if (this.cache.size >= this.config.maxCacheSize) {
      this.cleanupCache();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Get cached data
   */
  getCachedData(key: string): any | null {
    if (!this.config.enableLazyLoading) return null;

    const cached = this.cache.get(key);
    if (!cached) return null;

    // Check if cache is expired
    if (Date.now() - cached.timestamp > this.config.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Clean up expired cache entries
   */
  private cleanupCache(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((value, key) => {
      if (now - value.timestamp > this.config.cacheTimeout) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));

    // If still over limit, remove oldest entries
    if (this.cache.size >= this.config.maxCacheSize) {
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      const entriesToRemove = entries.slice(0, Math.floor(this.config.maxCacheSize * 0.2));
      entriesToRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  /**
   * Clear all cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Measure render performance
   */
  measureRenderPerformance(componentName: string, renderFunction: () => void): number {
    const startTime = performance.now();
    renderFunction();
    const endTime = performance.now();
    
    const renderTime = endTime - startTime;
    this.metrics.renderTime = renderTime;
    
    console.log(`[Performance] ${componentName} render time: ${renderTime.toFixed(2)}ms`);
    
    return renderTime;
  }

  /**
   * Measure navigation performance
   */
  measureNavigationPerformance(navigationFunction: () => void): number {
    const startTime = performance.now();
    navigationFunction();
    const endTime = performance.now();
    
    const navigationTime = endTime - startTime;
    this.metrics.navigationTime = navigationTime;
    
    console.log(`[Performance] Navigation time: ${navigationTime.toFixed(2)}ms`);
    
    return navigationTime;
  }

  /**
   * Track frame rate
   */
  trackFrameRate(): void {
    this.frameCount++;
    const currentTime = Date.now();
    
    if (currentTime - this.lastFrameTime >= 1000) {
      this.metrics.frameRate = this.frameCount;
      this.frameCount = 0;
      this.lastFrameTime = currentTime;
      
      console.log(`[Performance] Frame rate: ${this.metrics.frameRate}fps`);
      
      // Notify callbacks if frame rate drops below target
      if (this.metrics.frameRate < this.config.frameRateTarget * 0.9) {
        this.notifyPerformanceCallbacks();
      }
    }
  }

  /**
   * Get current memory usage (estimated)
   */
  getMemoryUsage(): number {
    // This is a simplified estimate
    // In production, you'd use native modules for accurate memory measurement
    const cacheSize = this.cache.size * 1024; // Estimate 1KB per cached item
    this.metrics.memoryUsage = cacheSize;
    return cacheSize;
  }

  /**
   * Calculate cache hit rate
   */
  calculateCacheHitRate(hits: number, total: number): number {
    if (total === 0) return 0;
    this.metrics.cacheHitRate = (hits / total) * 100;
    return this.metrics.cacheHitRate;
  }

  /**
   * Calculate virtualization efficiency
   */
  calculateVirtualizationEfficiency(renderedItems: number, totalItems: number): number {
    if (totalItems === 0) return 0;
    this.metrics.virtualizationEfficiency = ((totalItems - renderedItems) / totalItems) * 100;
    return this.metrics.virtualizationEfficiency;
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Register performance callback
   */
  onPerformanceDegradation(callback: (metrics: PerformanceMetrics) => void): void {
    this.performanceCallbacks.push(callback);
  }

  /**
   * Notify performance callbacks
   */
  private notifyPerformanceCallbacks(): void {
    this.performanceCallbacks.forEach(callback => callback(this.getMetrics()));
  }

  /**
   * Optimize component rendering
   */
  shouldComponentUpdate(currentProps: any, nextProps: any): boolean {
    // Shallow comparison for performance
    const keys = Object.keys(nextProps);
    
    for (const key of keys) {
      if (currentProps[key] !== nextProps[key]) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Debounce function for performance
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  /**
   * Throttle function for performance
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean = false;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Request animation frame with fallback
   */
  requestAnimationFrame(callback: () => void): number {
    if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame(callback);
    }
    return setTimeout(callback, 16) as unknown as number;
  }

  /**
   * Cancel animation frame with fallback
   */
  cancelAnimationFrame(requestId: number): void {
    if (typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(requestId);
    } else {
      clearTimeout(requestId);
    }
  }

  /**
   * Check if performance optimizations should be enabled
   */
  shouldEnableOptimizations(): boolean {
    // Enable optimizations on lower-end devices or when memory is constrained
    return this.config.enableMemoryOptimization;
  }

  /**
   * Get platform-specific optimizations
   */
  getPlatformOptimizations(): {
    enableVirtualization: boolean;
    enableLazyLoading: boolean;
    batchSize: number;
  } {
    return {
      enableVirtualization: this.config.enableVirtualization && Platform.OS === 'android',
      enableLazyLoading: this.config.enableLazyLoading,
      batchSize: Platform.OS === 'ios' ? 20 : 10,
    };
  }
}

/**
 * Global performance optimizer instance
 */
export const performanceOptimizer = new PerformanceOptimizer();

/**
 * Performance monitoring hook equivalent
 */
export const usePerformanceMonitoring = () => {
  const startMeasure = (operation: string) => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`[Performance] ${operation} took ${duration.toFixed(2)}ms`);
      return duration;
    };
  };

  const measureComponent = (componentName: string) => {
    return startMeasure(`Component: ${componentName}`);
  };

  const measureNavigation = (route: string) => {
    return startMeasure(`Navigation: ${route}`);
  };

  return {
    startMeasure,
    measureComponent,
    measureNavigation,
    getMetrics: () => performanceOptimizer.getMetrics(),
  };
};