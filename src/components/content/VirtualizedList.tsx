/**
 * Virtualized List Component
 * High-performance virtualized list for rendering large datasets
 * Implements windowing and lazy loading for optimal performance
 */

import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  ViewToken,
} from 'react-native';
import { performanceOptimizer } from '../../utils/performanceOptimizer';

/**
 * VirtualizedList Props
 */
interface VirtualizedListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  itemHeight?: number;
  estimatedItemSize?: number;
  windowSize?: number;
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  updateCellsBatchingPeriod?: number;
  removeClippedSubviews?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  enablePerformanceMonitoring?: boolean;
  testID?: string;
}

/**
 * VirtualizedList Component
 */
export function VirtualizedList<T>({
  data,
  renderItem,
  keyExtractor,
  itemHeight,
  estimatedItemSize = 100,
  windowSize = 21,
  initialNumToRender = 10,
  maxToRenderPerBatch = 5,
  updateCellsBatchingPeriod = 50,
  removeClippedSubviews = true,
  onEndReached,
  onEndReachedThreshold = 0.5,
  enablePerformanceMonitoring = true,
  testID,
}: VirtualizedListProps<T>) {
  const flatListRef = useRef<FlatList<T>>(null);
  const [_renderCount, setRenderCount] = useState(0);

  /**
   * Memoized item renderer with performance monitoring
   */
  const renderItemWithMonitoring = useCallback(
    (info: ListRenderItemInfo<T>) => {
      if (enablePerformanceMonitoring) {
        const endMeasure = performanceOptimizer.startMeasure(`Render item ${info.index}`);
        const result = renderItem(info.item, info.index);
        endMeasure();
        return result;
      }
      return renderItem(info.item, info.index);
    },
    [renderItem, enablePerformanceMonitoring]
  );



  /**
   * Get item layout for optimization
   */
  const getItemLayout = useCallback(
    (_data: any, index: number) => ({
      length: itemHeight || estimatedItemSize,
      offset: (itemHeight || estimatedItemSize) * index,
      index,
    }),
    [itemHeight, estimatedItemSize]
  );



  /**
   * Track render performance
   */
  useEffect(() => {
    if (enablePerformanceMonitoring) {
      setRenderCount(prev => prev + 1);
      
      // Calculate virtualization efficiency
      if (data.length > 0) {
        const efficiency = performanceOptimizer.calculateVirtualizationEfficiency(
          Math.min(10, data.length), // Estimated visible items
          data.length
        );
        console.log(`[VirtualizedList] Virtualization efficiency: ${efficiency.toFixed(1)}%`);
      }
    }
  }, [data.length, enablePerformanceMonitoring]);

  /**
   * Get platform-specific optimizations
   */
  const platformOptimizations = useMemo(() => {
    return performanceOptimizer.getPlatformOptimizations();
  }, []);

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItemWithMonitoring}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      updateCellsBatchingPeriod={updateCellsBatchingPeriod}
      windowSize={windowSize}
      removeClippedSubviews={removeClippedSubviews && platformOptimizations.enableVirtualization}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      testID={testID}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      // Performance optimizations
      scrollEventThrottle={16}
      decelerationRate="normal"
      disableVirtualization={false}
    />
  );
}

/**
 * Default styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

/**
 * Lazy loading component for content blocks
 */
interface LazyContentBlockProps {
  children: React.ReactNode;
  threshold?: number;
  onVisible?: () => void;
}

export const LazyContentBlock: React.FC<LazyContentBlockProps> = ({
  children,
  threshold = 0.1,
  onVisible,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  if (!isVisible) {
    // Simulate intersection observer with timeout
    setTimeout(() => {
      if (!hasLoaded) {
        setHasLoaded(true);
        setIsVisible(true);
        
        if (onVisible) {
          onVisible();
        }
      }
    }, threshold * 1000);

    return (
      <View style={lazyStyles.placeholder}>
        <View style={lazyStyles.skeleton} />
      </View>
    );
  }

  return <>{children}</>;
};

const lazyStyles = StyleSheet.create({
  placeholder: {
    height: 200,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    margin: 8,
  },
  skeleton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
});

/**
 * Intersection observer hook equivalent
 */
export const useIntersectionObserver = (threshold: number = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const visibleItem = info.viewableItems.find(item => item.isViewable);
      setIsIntersecting(!!visibleItem);
    },
    []
  );

  const viewabilityConfig = useMemo(
    () => ({
      minimumViewTime: 250,
      viewAreaCoveragePercentThreshold: threshold * 100,
      itemVisiblePercentThreshold: threshold * 100,
    }),
    [threshold]
  );

  return {
    isIntersecting,
    handleViewableItemsChanged,
    viewabilityConfig,
  };
};

export default VirtualizedList;