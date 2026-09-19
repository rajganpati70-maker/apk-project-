/**
 * Property Analytics Page
 * Completely different page with 6 scrollable sections
 * Property performance metrics
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

const analyticsSections: ContentSection[] = [
  {
    id: 'performance-metrics',
    title: '📊 Performance Metrics',
    description: 'Overall property performance',
    blocks: [
      {
        id: 'avg-occupancy',
        type: 'metric',
        title: 'Average Occupancy',
        description: 'Portfolio-wide occupancy',
        value: '87.3%',
        trend: '+2.1%',
        positive: true
      },
      {
        id: 'avg-revenue',
        type: 'metric',
        title: 'Average Revenue',
        description: 'Per property monthly',
        value: '$1,824',
        trend: '+$142',
        positive: true
      }
    ]
  },
  {
    id: 'top-performers',
    title: '⭐ Top Performers',
    description: 'Best performing properties',
    blocks: [
      {
        id: 'top-list',
        type: 'list',
        title: 'Highest ROI',
        description: 'Properties with best returns',
        data: [
          { id: 1, title: 'Downtown Lofts', value: 'ROI 15%', trend: 'Outstanding' },
          { id: 2, title: 'Sunset Apartments', value: 'ROI 12%', trend: 'Excellent' },
          { id: 3, title: 'Riverside Complex', value: 'ROI 11%', trend: 'Excellent' }
        ]
      }
    ]
  },
  {
    id: 'performance-trends',
    title: '📈 Performance Trends',
    description: 'Historical performance data',
    blocks: [
      {
        id: 'trend-chart',
        type: 'chart',
        title: 'Monthly Performance',
        description: 'Portfolio metrics over time',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [84, 85, 86, 87, 87, 87],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'property-comparison',
    title: '⚖️ Property Comparison',
    description: 'Compare properties',
    blocks: [
      {
        id: 'comparison-chart',
        type: 'chart',
        title: 'Revenue Comparison',
        description: 'Revenue by property type',
        data: {
          chartType: 'bar',
          labels: ['Apartments', 'Houses', 'Commercial', 'Industrial'],
          values: [145000, 68000, 52000, 19500],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'occupancy-analysis',
    title: '🏢 Occupancy Analysis',
    description: 'Detailed occupancy metrics',
    blocks: [
      {
        id: 'occupancy-chart',
        type: 'chart',
        title: 'Occupancy by Type',
        description: 'Occupancy percentages',
        data: {
          chartType: 'pie',
          labels: ['Full', 'Partial', 'Vacant'],
          values: [68, 19, 13],
          colors: ['#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'property-insights',
    title: '💡 Property Insights',
    description: 'AI-powered recommendations',
    blocks: [
      {
        id: 'insight-list',
        type: 'list',
        title: 'Recommendations',
        description: 'AI-suggested improvements',
        data: [
          { id: 1, title: 'Increase Rent', value: 'Unit 204', trend: '3% increase possible' },
          { id: 2, title: 'Renovate Kitchen', value: 'Building A', trend: 'ROI 18%' },
          { id: 3, title: 'Marketing Push', value: 'Industrial Park', trend: 'Boost occupancy' }
        ]
      }
    ]
  }
];

const PropertyAnalyticsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Analytics block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Property Analytics</Text>
          <Text style={styles.headerSubtitle}>Property performance metrics</Text>
        </View>

        <View style={styles.contentSection}>
          {analyticsSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Analytics updated daily</Text>
          <Text style={styles.footerSubtext}>3 properties need attention</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PropertyAnalyticsIndex: React.FC = () => {
  return <PropertyAnalyticsPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
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

export default PropertyAnalyticsIndex;