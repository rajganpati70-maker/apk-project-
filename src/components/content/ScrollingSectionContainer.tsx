/**
 * ScrollingSectionContainer Component
 * Advanced scrolling container with virtualization, pull-to-refresh, and skeleton loading
 * Optimized for performance with large content sets
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ContentSection, ContentBlock } from '../../types';

/**
 * ScrollingSectionContainer Props
 */
interface ScrollingSectionContainerProps {
  section: ContentSection;
  renderBlock: (block: ContentBlock) => React.ReactNode;
  onRefresh?: () => Promise<void>;
  onEndReached?: () => void;
  onScroll?: (offset: number) => void;
  initialScrollIndex?: number;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  testID?: string;
}

/**
 * ScrollingSectionContainer Component
 * 
 * @param {ScrollingSectionContainerProps} props - Component props
 * @returns {JSX.Element} Rendered scrolling section container
 */
export const ScrollingSectionContainer: React.FC<ScrollingSectionContainerProps> = ({
  section,
  renderBlock,
  onRefresh,
  onEndReached,
  onScroll,
  initialScrollIndex = 0,
  loading = false,
  error,
  emptyMessage = 'No content available',
  testID,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [_scrollPosition, setScrollPosition] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  // Animation values
  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(50);

  /**
   * Handle refresh
   */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      if (onRefresh) {
        await onRefresh();
      }
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  /**
   * Handle scroll event
   */
  const handleScroll = useCallback((event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(offsetY);
    
    if (onScroll) {
      onScroll(offsetY);
    }
  }, [onScroll]);

  /**
   * Handle end reached
   */
  const _handleEndReached = useCallback(() => {
    if (onEndReached && !loading) {
      onEndReached();
    }
  }, [onEndReached, loading]);

  // Animate in on mount
  useEffect(() => {
    fadeAnim.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    
    slideAnim.value = withSpring(0, {
      damping: 20,
      stiffness: 300,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: slideAnim.value }],
  }));

  /**
   * Render item
   */
  const renderItem = useCallback(({ item, index: _index }: { item: ContentBlock; index: number }) => {
    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            opacity: withTiming(1, {
              duration: 300,
            }),
          },
        ]}
      >
        {renderBlock(item)}
      </Animated.View>
    );
  }, [renderBlock]);

  /**
   * Render list empty component
   */
  const renderEmptyComponent = () => {
    if (loading) {
      return <SkeletonLoader />;
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  };

  /**
   * Render list header
   */
  const renderListHeader = () => {
    if (!section.title && !section.description) {
      return null;
    }

    return (
      <View style={styles.headerContainer}>
        {section.title && (
          <Text style={styles.headerTitle}>{section.title}</Text>
        )}
        {section.description && (
          <Text style={styles.headerDescription}>{section.description}</Text>
        )}
      </View>
    );
  };

  /**
   * Render list footer
   */
  const renderListFooter = () => {
    if (loading) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="small" color="#3B82F6" />
        </View>
      );
    }
    return null;
  };

  /**
   * Key extractor
   */
  const keyExtractor = (item: ContentBlock) => item.id;

  return (
    <Animated.View style={[styles.container, animatedStyle]} testID={testID}>
      {renderListHeader()}
      
      <FlatList
        ref={flatListRef}
        data={section.blocks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#3B82F6"
              colors={['#3B82F6']}
              progressViewOffset={20}
            />
          ) : undefined
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onEndReached={onEndReached ? _handleEndReached : undefined}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={Platform.OS === 'android'}
        updateCellsBatchingPeriod={50}
        contentContainerStyle={[
          styles.contentContainer,
          section.blocks.length === 0 && styles.emptyContentContainer,
        ]}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(data, index) => ({
          length: 200, // Estimated item height
          offset: 200 * index,
          index,
        })}
      />
    </Animated.View>
  );
};

/**
 * Skeleton Loader Component
 * Shows loading state while content is being fetched
 */
const SkeletonLoader: React.FC = () => {
  return (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((index) => (
        <View key={index} style={styles.skeletonItem}>
          <View style={styles.skeletonAvatar} />
          <View style={styles.skeletonContent}>
            <View style={styles.skeletonLine} />
            <View style={styles.skeletonLineShort} />
          </View>
        </View>
      ))}
    </View>
  );
};

/**
 * Default styles for ScrollingSectionContainer
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  emptyContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 12,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  footerContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
  skeletonContainer: {
    paddingVertical: 8,
  },
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  skeletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  skeletonContent: {
    flex: 1,
  },
  skeletonLine: {
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
    width: '80%',
  },
  skeletonLineShort: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    width: '60%',
  },
});

export default ScrollingSectionContainer;