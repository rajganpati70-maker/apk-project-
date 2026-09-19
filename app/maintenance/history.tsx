/**
 * Maintenance History Page
 * Completely different page with 6 scrollable sections
 * Completed maintenance records
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

const historySections: ContentSection[] = [
  {
    id: 'recent-completions',
    title: '✅ Recent Completions',
    description: 'Recently completed tasks',
    blocks: [
      {
        id: 'completed-list',
        type: 'list',
        title: 'Last 7 Days',
        description: 'Recently completed maintenance',
        data: [
          { id: 1, title: 'Kitchen Sink Repair', value: 'Unit 102', trend: 'Completed' },
          { id: 2, title: 'Light Fixture', value: 'Unit 215', trend: 'Completed' },
          { id: 3, title: 'Door Handle', value: 'Unit 334', trend: 'Completed' },
          { id: 4, title: 'Thermostat', value: 'Unit 456', trend: 'Completed' }
        ]
      }
    ]
  },
  {
    id: 'completion-trends',
    title: '📈 Completion Trends',
    description: 'Historical completion data',
    blocks: [
      {
        id: 'trend-chart',
        type: 'chart',
        title: 'Monthly Completions',
        description: 'Tasks completed per month',
        data: {
          chartType: 'bar',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [45, 52, 48, 55, 60, 58],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'category-history',
    title: '🔧 Category History',
    description: 'Maintenance by category',
    blocks: [
      {
        id: 'category-chart',
        type: 'chart',
        title: 'Work by Category',
        description: 'Historical distribution',
        data: {
          chartType: 'pie',
          labels: ['Plumbing', 'Electrical', 'HVAC', 'Structural', 'Other'],
          values: [35, 25, 20, 12, 8],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
        }
      }
    ]
  },
  {
    id: 'cost-history',
    title: '💰 Cost History',
    description: 'Historical maintenance costs',
    blocks: [
      {
        id: 'cost-chart',
        type: 'chart',
        title: 'Monthly Cost History',
        description: 'Expenses over time',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [10500, 11200, 10800, 11500, 12100, 12450],
          color: '#F59E0B'
        }
      }
    ]
  },
  {
    id: 'vendor-history',
    title: '👷 Vendor History',
    description: 'Vendor performance over time',
    blocks: [
      {
        id: 'vendor-list',
        type: 'list',
        title: 'Vendor Work History',
        description: 'Tasks by vendor',
        data: [
          { id: 1, title: 'Plumbing Pro Services', value: '156 tasks', trend: 'Excellent' },
          { id: 2, title: 'Electric Masters', value: '98 tasks', trend: 'Good' },
          { id: 3, title: 'HVAC Specialists', value: '142 tasks', trend: 'Excellent' }
        ]
      }
    ]
  },
  {
    id: 'maintenance-archive',
    title: '📜 Maintenance Archive',
    description: 'Historical records archive',
    blocks: [
      {
        id: 'archive-metrics',
        type: 'metric',
        title: 'Total Records',
        description: 'All-time completed tasks',
        value: '1,248',
        trend: 'Since 2020',
        positive: true
      },
      {
        id: 'archive-list',
        type: 'list',
        title: 'Archive Categories',
        description: 'Historical data organization',
        data: [
          { id: 1, title: '2024 Records', value: '318 tasks', trend: 'Current year' },
          { id: 2, title: '2023 Records', value: '456 tasks', trend: 'Last year' },
          { id: 3, title: '2022 Records', value: '474 tasks', trend: 'Previous year' }
        ]
      }
    ]
  }
];

const MaintenanceHistoryPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('History block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Maintenance History</Text>
          <Text style={styles.headerSubtitle}>Completed maintenance records</Text>
        </View>

        <View style={styles.contentSection}>
          {historySections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>1,248 total records</Text>
          <Text style={styles.footerSubtext}>Since January 2020</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MaintenanceHistoryIndex: React.FC = () => {
  return <MaintenanceHistoryPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3C7',
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

export default MaintenanceHistoryIndex;