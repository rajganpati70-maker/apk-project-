/**
 * Maintenance Overview Page
 * Completely different page with 6 scrollable sections
 * Complete maintenance dashboard
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
    id: 'maintenance-stats',
    title: '📊 Maintenance Statistics',
    description: 'Overall maintenance performance',
    blocks: [
      {
        id: 'open-requests',
        type: 'metric',
        title: 'Open Requests',
        description: 'Currently active tickets',
        value: '23',
        trend: '+3',
        positive: false
      },
      {
        id: 'completed-today',
        type: 'metric',
        title: 'Completed Today',
        description: 'Tasks finished today',
        value: '8',
        trend: '+2',
        positive: true
      },
      {
        id: 'avg-response-time',
        type: 'metric',
        title: 'Avg Response Time',
        description: 'Time to respond to requests',
        value: '4.2 hrs',
        trend: '-0.5 hr',
        positive: true
      }
    ]
  },
  {
    id: 'priority-breakdown',
    title: '🚨 Priority Breakdown',
    description: 'Requests by priority level',
    blocks: [
      {
        id: 'priority-chart',
        type: 'chart',
        title: 'Request Priority Distribution',
        description: 'Breakdown by urgency',
        data: {
          chartType: 'pie',
          labels: ['Critical', 'High', 'Medium', 'Low'],
          values: [5, 8, 7, 3],
          colors: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981']
        }
      }
    ]
  },
  {
    id: 'category-breakdown',
    title: '🔧 Category Breakdown',
    description: 'Requests by maintenance type',
    blocks: [
      {
        id: 'category-chart',
        type: 'chart',
        title: 'Maintenance Categories',
        description: 'Breakdown by type',
        data: {
          chartType: 'bar',
          labels: ['Plumbing', 'Electrical', 'HVAC', 'Structural', 'Other'],
          values: [8, 5, 6, 2, 2],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'budget-overview',
    title: '💰 Budget Overview',
    description: 'Maintenance budget status',
    blocks: [
      {
        id: 'budget-used',
        type: 'metric',
        title: 'Budget Used',
        description: 'Monthly budget utilization',
        value: '$12,450',
        trend: '67%',
        positive: true
      },
      {
        id: 'budget-chart',
        type: 'chart',
        title: 'Budget vs Actual',
        description: 'Budget performance',
        data: {
          chartType: 'bar',
          labels: ['Plumbing', 'Electrical', 'HVAC', 'Other'],
          values: [
            { name: 'Budget', data: [5000, 4000, 4000, 3000], color: '#3B82F6' },
            { name: 'Actual', data: [4500, 3200, 3800, 2500], color: '#10B981' }
          ]
        }
      }
    ]
  },
  {
    id: 'vendor-performance',
    title: '👷 Vendor Performance',
    description: 'Service provider metrics',
    blocks: [
      {
        id: 'active-vendors',
        type: 'metric',
        title: 'Active Vendors',
        description: 'Currently contracted providers',
        value: '5',
        trend: 'All rated',
        positive: true
      },
      {
        id: 'vendor-chart',
        type: 'chart',
        title: 'Vendor Ratings',
        description: 'Average performance scores',
        data: {
          chartType: 'bar',
          labels: ['Plumbing', 'Electrical', 'HVAC', 'General'],
          values: [4.8, 4.5, 4.7, 4.3],
          color: '#F59E0B'
        }
      }
    ]
  },
  {
    id: 'recent-activity',
    title: '📋 Recent Activity',
    description: 'Latest maintenance activities',
    blocks: [
      {
        id: 'activity-list',
        type: 'list',
        title: 'Recent Tasks',
        description: 'Latest completed tasks',
        data: [
          { id: 1, title: 'Kitchen Sink Repair', value: 'Unit 102', trend: 'Completed' },
          { id: 2, title: 'Light Fixture', value: 'Unit 215', trend: 'Completed' },
          { id: 3, title: 'Door Handle', value: 'Unit 334', trend: 'Completed' },
          { id: 4, title: 'Thermostat', value: 'Unit 456', trend: 'Completed' }
        ]
      }
    ]
  }
];

const MaintenanceOverviewPage: React.FC = () => {
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
          <Text style={styles.headerTitle}>Maintenance Overview</Text>
          <Text style={styles.headerSubtitle}>Complete maintenance dashboard</Text>
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
          <Text style={styles.footerText}>Maintenance data updated in real-time</Text>
          <Text style={styles.footerSubtext}>23 open requests</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MaintenanceOverviewIndex: React.FC = () => {
  return <MaintenanceOverviewPage />;
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

export default MaintenanceOverviewIndex;