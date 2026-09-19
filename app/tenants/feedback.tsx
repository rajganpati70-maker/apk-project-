/**
 * Tenant Feedback Page
 * Completely different page with 6 scrollable sections
 * Collect and review feedback
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../src/components/content';
import { ContentBlock, ContentSection } from '../../src/types';

const feedbackSections: ContentSection[] = [
  {
    id: 'feedback-overview',
    title: '⭐ Feedback Overview',
    description: 'Overall satisfaction metrics',
    blocks: [
      {
        id: 'average-rating',
        type: 'metric',
        title: 'Average Rating',
        description: 'Overall tenant satisfaction',
        value: '4.2/5.0',
        trend: '+0.3',
        positive: true
      },
      {
        id: 'total-reviews',
        type: 'metric',
        title: 'Total Reviews',
        description: 'Feedback received',
        value: '234',
        trend: '+45',
        positive: true
      }
    ]
  },
  {
    id: 'recent-reviews',
    title: '📋 Recent Reviews',
    description: 'Latest tenant feedback',
    blocks: [
      {
        id: 'review-list',
        type: 'list',
        title: 'Latest Feedback',
        description: 'Recent tenant reviews',
        data: [
          { id: 1, title: 'John Smith', value: '5 stars', trend: 'Excellent maintenance' },
          { id: 2, title: 'Sarah Johnson', value: '4 stars', trend: 'Good location' },
          { id: 3, title: 'Michael Chen', value: '5 stars', trend: 'Responsive staff' }
        ]
      }
    ]
  },
  {
    id: 'rating-distribution',
    title: '📊 Rating Distribution',
    description: 'Breakdown by rating',
    blocks: [
      {
        id: 'rating-chart',
        type: 'chart',
        title: 'Star Rating Breakdown',
        description: 'Rating percentages',
        data: {
          chartType: 'bar',
          labels: ['5★', '4★', '3★', '2★', '1★'],
          values: [65, 25, 8, 2, 0],
          color: '#F59E0B'
        }
      }
    ]
  },
  {
    id: 'feedback-categories',
    title: '📝 Feedback Categories',
    description: 'Feedback by topic',
    blocks: [
      {
        id: 'category-chart',
        type: 'chart',
        title: 'Feedback Topics',
        description: 'Most mentioned areas',
        data: {
          chartType: 'pie',
          labels: ['Maintenance', 'Communication', 'Cleanliness', 'Amenities'],
          values: [35, 25, 20, 20],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'feedback-trends',
    title: '📈 Feedback Trends',
    description: 'Historical feedback data',
    blocks: [
      {
        id: 'trend-chart',
        type: 'chart',
        title: 'Rating Trend',
        description: 'Satisfaction over time',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [3.9, 4.0, 4.1, 4.0, 4.1, 4.2],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'feedback-actions',
    title: '🎯 Feedback Actions',
    description: 'Addressing feedback',
    blocks: [
      {
        id: 'action-list',
        type: 'list',
        title: 'Action Items',
        description: 'Feedback requiring action',
        data: [
          { id: 1, title: 'Maintenance Response', value: 'Improve timing', trend: 'In Progress' },
          { id: 2, title: 'Communication', value: 'Update protocols', trend: 'Planned' },
          { id: 3, title: 'Amenities', value: 'Add gym hours', trend: 'Completed' }
        ]
      }
    ]
  }
];

const TenantFeedbackPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Feedback block pressed:', block.id);
  }, []);

  const renderContentBlock = useCallback((block: ContentBlock) => {
    return (
      <ContentBlockRenderer
        block={block}
        onPress={handleBlockPress}
      />
    );
  }, [handleBlockPress]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tenant Feedback</Text>
          <Text style={styles.headerSubtitle}>Collect and review feedback</Text>
        </View>

        <View style={styles.contentSection}>
          {feedbackSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Average rating: 4.2/5.0</Text>
          <Text style={styles.footerSubtext}>234 total reviews</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TenantFeedbackIndex: React.FC = () => {
  return <TenantFeedbackPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  contentSection: {
    marginTop: 16,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default TenantFeedbackIndex;