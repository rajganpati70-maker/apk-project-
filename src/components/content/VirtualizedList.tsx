/**
 * Virtualized List Component
 * Optimized list rendering for large datasets using windowing
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface VirtualizedListProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  itemHeight?: number;
  windowSize?: number;
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  updateCellsBatchingPeriod?: number;
  testID?: string;
}

function VirtualizedList<T>({
  data,
  renderItem,
  keyExtractor,
  itemHeight = 80,
  windowSize = 21,
  initialNumToRender = 10,
  maxToRenderPerBatch = 5,
  updateCellsBatchingPeriod = 50,
  testID,
}: VirtualizedListProps<T>) {
  // Calculate optimal window size based on screen height
  const calculatedWindowSize = useMemo(() => {
    const visibleItems = Math.floor(height / itemHeight);
    const bufferSize = Math.ceil(visibleItems / 2);
    return visibleItems + bufferSize * 2;
  }, [height, itemHeight]);

  const getItemLayout = (_data: ArrayLike<T> | null | undefined, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items to display</Text>
    </View>
  );

  const ListFooterComponent = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Showing {data.length} items</Text>
    </View>
  );

  return (
    <FlatList
      testID={testID}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      windowSize={windowSize}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      updateCellsBatchingPeriod={updateCellsBatchingPeriod}
      removeClippedSubviews={true}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={data.length > 0 ? ListFooterComponent : undefined}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default VirtualizedList;