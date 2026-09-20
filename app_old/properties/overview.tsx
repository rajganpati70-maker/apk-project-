/**
 * Property Overview Page
 * Completely different page with 6 scrollable sections
 * Complete property dashboard
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

const overviewSections: ContentSection[] = [
  {
    id: 'property-stats',
    title: '📊 Property Statistics',
    description: 'Overall property portfolio metrics',
    blocks: [
      {
        id: 'total-properties',
        type: 'metric',
        title: 'Total Properties',
        description: 'Properties in portfolio',
        value: '156',
        trend: '+12',
        positive: true
      },
      {
        id: 'total-units',
        type: 'metric',
        title: 'Total Units',
        description: 'Rental units across all properties',
        value: '1,245',
        trend: '+48',
        positive: true
      },
      {
        id: 'occupancy-rate',
        type: 'metric',
        title: 'Occupancy Rate',
        description: 'Overall occupancy percentage',
        value: '87.3%',
        trend: '+2.1%',
        positive: true
      }
    ]
  },
  {
    id: 'property-value',
    title: '💰 Property Value',
    description: 'Total portfolio valuation',
    blocks: [
      {
        id: 'total-value',
        type: 'metric',
        title: 'Total Portfolio Value',
        description: 'Combined property value',
        value: '$12.4M',
        trend: '+$450K',
        positive: true
      },
      {
        id: 'value-chart',
        type: 'chart',
        title: 'Value Growth',
        description: 'Portfolio value over time',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [11800, 11950, 12100, 12200, 12300, 12400],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'property-types',
    title: '🏢 Property Types',
    description: 'Distribution by property type',
    blocks: [
      {
        id: 'type-chart',
        type: 'chart',
        title: 'Property Type Distribution',
        description: 'Breakdown by category',
        data: {
          chartType: 'pie',
          labels: ['Apartments', 'Houses', 'Commercial', 'Industrial'],
          values: [65, 25, 8, 2],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'property-locations',
    title: '🗺️ Property Locations',
    description: 'Geographic distribution',
    blocks: [
      {
        id: 'location-list',
        type: 'list',
        title: 'Top Locations',
        description: 'Properties by area',
        data: [
          { id: 1, title: 'Downtown', value: '42 properties', trend: 'High demand' },
          { id: 2, title: 'Suburbs', value: '68 properties', trend: 'Growing' },
          { id: 3, title: 'Commercial Zone', value: '28 properties', trend: 'Stable' },
          { id: 4, title: 'Industrial Park', value: '18 properties', trend: 'Maintenance' }
        ]
      }
    ]
  },
  {
    id: 'property-performance',
    title: '📈 Property Performance',
    description: 'Top performing properties',
    blocks: [
      {
        id: 'performance-list',
        type: 'list',
        title: 'Top Performers',
        description: 'Best ROI properties',
        data: [
          { id: 1, title: 'Sunset Apartments', value: 'ROI 12%', trend: 'Excellent' },
          { id: 2, title: 'Riverside Complex', value: 'ROI 11%', trend: 'Excellent' },
          { id: 3, title: 'Downtown Lofts', value: 'ROI 15%', trend: 'Outstanding' }
        ]
      }
    ]
  },
  {
    id: 'property-alerts',
    title: '🚨 Property Alerts',
    description: 'Issues requiring attention',
    blocks: [
      {
        id: 'alert-list',
        type: 'list',
        title: 'Attention Required',
        description: 'Properties needing action',
        data: [
          { id: 1, title: 'Industrial Park Units', value: 'Maintenance needed', trend: 'Urgent' },
          { id: 2, title: 'Downtown Building B', value: 'Occupancy below target', trend: 'Review' },
          { id: 3, title: 'Suburbs Complex', value: 'Upcoming lease expirations', trend: 'Monitor' }
        ]
      }
    ]
  }
];

const PropertyOverviewPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Overview block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Property Overview</Text>
          <Text style={styles.headerSubtitle}>Complete property dashboard</Text>
        </View>

        <View style={styles.contentSection}>
          {overviewSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>156 properties managed</Text>
          <Text style={styles.footerSubtext}>87.3% occupancy rate</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PropertyOverviewIndex: React.FC = () => {
  return <PropertyOverviewPage />;
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

export default PropertyOverviewIndex;