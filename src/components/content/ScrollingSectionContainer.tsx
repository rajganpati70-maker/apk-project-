/**
 * Scrolling Section Container
 * Container for content blocks with pull-to-refresh and scrolling support
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { ContentSection, ContentBlock } from '../../types/navigation';
import ContentBlockRenderer from './ContentBlockRenderer';

interface ScrollingSectionContainerProps {
  section: ContentSection;
  renderBlock: (block: ContentBlock) => React.ReactNode;
  onRefresh?: () => Promise<void>;
  testID?: string;
}

const ScrollingSectionContainer: React.FC<ScrollingSectionContainerProps> = ({
  section,
  renderBlock,
  onRefresh,
  testID,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      setRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh error:', error);
      } finally {
        setRefreshing(false);
      }
    }
  }, [onRefresh]);

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.title}>{section.title}</Text>
        {section.description && (
          <Text style={styles.description}>{section.description}</Text>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
          />
        }
        showsVerticalScrollIndicator={true}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading content...</Text>
          </View>
        ) : (
          section.blocks.map((block) => (
            <View key={block.id} style={styles.blockWrapper}>
              {renderBlock(block)}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    marginBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
  },
  scrollView: {
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingVertical: 8,
  },
  blockWrapper: {
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
});

export default ScrollingSectionContainer;