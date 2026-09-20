/**
 * Tenant Analytics Page
 * Completely different page with 6 scrollable sections
 * Tenant behavior and satisfaction analytics
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

const tenantSections: ContentSection[] = [
  {
    id: 'tenant-overview',
    title: '👥 Tenant Overview',
    description: 'Complete tenant portfolio statistics',
    blocks: [
      {
        id: 'total-tenants',
        type: 'metric',
        title: 'Total Tenants',
        description: 'Currently active tenants',
        value: '142',
        trend: '+8',
        positive: true
      },
      {
        id: 'occupancy-rate',
        type: 'metric',
        title: 'Occupancy Rate',
        description: 'Percentage of occupied units',
        value: '87%',
        trend: '+5%',
        positive: true
      }
    ]
  },
  {
    id: 'tenant-retention',
    title: '🔄 Tenant Retention',
    description: 'Retention metrics and analysis',
    blocks: [
      {
        id: 'retention-rate',
        type: 'metric',
        title: 'Retention Rate',
        description: 'Percentage of tenants renewing',
        value: '78%',
        trend: '+6%',
        positive: true
      },
      {
        id: 'retention-chart',
        type: 'chart',
        title: 'Retention Trend',
        description: 'Monthly retention rates',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [72, 74, 75, 76, 77, 78],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'tenant-satisfaction',
    title: '⭐ Tenant Satisfaction',
    description: 'Satisfaction metrics and feedback',
    blocks: [
      {
        id: 'satisfaction-score',
        type: 'metric',
        title: 'Average Rating',
        description: 'Overall tenant satisfaction',
        value: '4.2/5.0',
        trend: '+0.3',
        positive: true
      },
      {
        id: 'satisfaction-chart',
        type: 'chart',
        title: 'Rating Distribution',
        description: 'Distribution of ratings',
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
    id: 'tenant-behavior',
    title: '📊 Tenant Behavior',
    description: 'Behavior patterns and analytics',
    blocks: [
      {
        id: 'payment-timeliness',
        type: 'metric',
        title: 'On-Time Payment Rate',
        description: 'Percentage of timely payments',
        value: '94%',
        trend: '+2%',
        positive: true
      },
      {
        id: 'behavior-chart',
        type: 'chart',
        title: 'Payment Patterns',
        description: 'Payment timing distribution',
        data: {
          chartType: 'bar',
          labels: ['Early', 'On-Time', 'Late', 'Very Late'],
          values: [35, 59, 5, 1],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'tenant-demographics',
    title: '👤 Tenant Demographics',
    description: 'Demographic analysis',
    blocks: [
      {
        id: 'age-distribution',
        type: 'chart',
        title: 'Age Distribution',
        description: 'Tenant age groups',
        data: {
          chartType: 'pie',
          labels: ['18-25', '26-35', '36-45', '46-55', '55+'],
          values: [15, 35, 28, 15, 7],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
        }
      },
      {
        id: 'income-levels',
        type: 'list',
        title: 'Income Levels',
        description: 'Tenant income distribution',
        data: [
          { id: 1, title: 'Low Income', value: '15%', trend: 'Below $50k' },
          { id: 2, title: 'Middle Income', value: '55%', trend: '$50k-$100k' },
          { id: 3, title: 'High Income', value: '30%', trend: 'Above $100k' }
        ]
      }
    ]
  },
  {
    id: 'tenant-feedback',
    title: '💬 Tenant Feedback',
    description: 'Feedback collection and analysis',
    blocks: [
      {
        id: 'feedback-volume',
        type: 'metric',
        title: 'Total Feedback',
        description: 'Feedback received this month',
        value: '234',
        trend: '+45',
        positive: true
      },
      {
        id: 'feedback-sentiment',
        type: 'metric',
        title: 'Positive Sentiment',
        description: 'Percentage of positive feedback',
        value: '82%',
        trend: '+5%',
        positive: true
      }
    ]
  }
];

const TenantAnalyticsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Tenant block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Tenant Analytics</Text>
          <Text style={styles.headerSubtitle}>Tenant behavior and satisfaction analytics</Text>
        </View>

        <View style={styles.contentSection}>
          {tenantSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Tenant data updated in real-time</Text>
          <Text style={styles.footerSubtext}>142 active tenants</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TenantAnalyticsIndex: React.FC = () => {
  return <TenantAnalyticsPage />;
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

export default TenantAnalyticsIndex;