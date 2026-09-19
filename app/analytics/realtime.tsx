/**
 * Real-Time Analytics Page
 * Completely different sub-page with 6 scrollable sections
 * Live data streaming and instant updates
 */

import React, { useState, useCallback, useEffect } from 'react';
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

/**
 * Real-Time Analytics Content - 6 Unique Scrollable Sections
 */
const realtimeSections: ContentSection[] = [
  {
    id: 'live-metrics',
    title: '⚡ Live Metrics',
    description: 'Real-time performance indicators updating every second',
    blocks: [
      {
        id: 'live-revenue',
        type: 'metric',
        title: 'Live Revenue Today',
        description: 'Revenue generated in real-time',
        value: '$12,450',
        trend: '+$145',
        positive: true
      },
      {
        id: 'active-users',
        type: 'metric',
        title: 'Active Users Now',
        description: 'Users currently using the platform',
        value: '47',
        trend: '+5',
        positive: true
      },
      {
        id: 'live-occupancy',
        type: 'metric',
        title: 'Live Occupancy Rate',
        description: 'Current occupancy across all properties',
        value: '87.3%',
        trend: '+0.2%',
        positive: true
      },
      {
        id: 'live-requests',
        type: 'metric',
        title: 'Live Maintenance Requests',
        description: 'New requests in last hour',
        value: '12',
        trend: '+3',
        positive: false
      }
    ]
  },
  {
    id: 'live-revenue-stream',
    title: '💰 Live Revenue Stream',
    description: 'Real-time revenue transactions and payments',
    blocks: [
      {
        id: 'recent-transactions',
        type: 'list',
        title: 'Recent Transactions',
        description: 'Latest payment received',
        data: [
          { id: 1, title: 'Unit 204 - Rent Payment', value: '$1,850', trend: 'Just now' },
          { id: 2, title: 'Unit 156 - Rent Payment', value: '$1,720', trend: '2 min ago' },
          { id: 3, title: 'Unit 312 - Late Fee', value: '$45', trend: '5 min ago' },
          { id: 4, title: 'Unit 445 - Deposit', value: '$500', trend: '8 min ago' },
          { id: 5, title: 'Unit 567 - Rent Payment', value: '$1,950', trend: '12 min ago' }
        ]
      },
      {
        id: 'revenue-velocity',
        type: 'chart',
        title: 'Revenue Velocity',
        description: 'Revenue rate per hour',
        data: {
          chartType: 'line',
          labels: ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM'],
          values: [1200, 2500, 1800, 3200, 2800, 3450],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'live-activity',
    title: '📊 Live Activity Feed',
    description: 'Real-time user activities and system events',
    blocks: [
      {
        id: 'activity-log',
        type: 'list',
        title: 'Activity Log',
        description: 'Recent system activities',
        data: [
          { id: 1, title: 'Tenant Login - Unit 204', value: 'John Smith', trend: 'Just now' },
          { id: 2, title: 'Maintenance Submitted', value: 'Unit 312', trend: '2 min ago' },
          { id: 3, title: 'Payment Received', value: 'Unit 156', trend: '5 min ago' },
          { id: 4, title: 'Document Uploaded', value: 'Lease Agreement', trend: '8 min ago' },
          { id: 5, title: 'System Alert', value: 'Server Load', trend: '10 min ago' }
        ]
      },
      {
        id: 'activity-heatmap',
        type: 'chart',
        title: 'Activity Heatmap',
        description: 'Activity distribution by time',
        data: {
          chartType: 'bar',
          labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
          values: [145, 234, 189, 87],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'live-performance',
    title: '🚀 Live Performance',
    description: 'Real-time system and app performance metrics',
    blocks: [
      {
        id: 'app-performance',
        type: 'metric',
        title: 'App Response Time',
        description: 'Average API response time',
        value: '124ms',
        trend: '-15ms',
        positive: true
      },
      {
        id: 'server-load',
        type: 'metric',
        title: 'Server Load',
        description: 'Current server utilization',
        value: '42%',
        trend: 'Stable',
        positive: true
      },
      {
        id: 'error-rate',
        type: 'metric',
        title: 'Error Rate',
        description: 'System error percentage',
        value: '0.02%',
        trend: '-0.01%',
        positive: true
      },
      {
        id: 'uptime',
        type: 'metric',
        title: 'System Uptime',
        description: 'Current uptime streak',
        value: '99.99%',
        trend: '45 days',
        positive: true
      }
    ]
  },
  {
    id: 'live-alerts',
    title: '🔔 Live Alerts',
    description: 'Real-time alerts and notifications',
    blocks: [
      {
        id: 'critical-alerts',
        type: 'list',
        title: 'Critical Alerts',
        description: 'Immediate attention required',
        data: [
          { id: 1, title: 'Water Leak Detected', value: 'Unit 204', trend: 'URGENT' },
          { id: 2, title: 'Payment Overdue', value: 'Unit 312', trend: 'URGENT' },
          { id: 3, title: ' lease Expiring', value: 'Unit 456', trend: 'HIGH' }
        ]
      },
      {
        id: 'warning-alerts',
        type: 'list',
        title: 'Warning Alerts',
        description: 'Attention required soon',
        data: [
          { id: 1, title: 'Maintenance Due', value: 'HVAC Service', trend: 'Tomorrow' },
          { id: 2, title: 'Contract Renewal', value: 'Vendor Agreement', trend: 'In 3 days' },
          { id: 3, title: 'Budget Warning', value: 'Maintenance budget 85%', trend: 'Monitor' }
        ]
      }
    ]
  },
  {
    id: 'live-forecasts',
    title: '🔮 Live Forecasts',
    description: 'Real-time predictions and projections',
    blocks: [
      {
        id: 'hourly-revenue',
        type: 'chart',
        title: 'Hourly Revenue Forecast',
        description: 'Predicted revenue for next 6 hours',
        data: {
          chartType: 'line',
          labels: ['Now', '+1h', '+2h', '+3h', '+4h', '+5h'],
          values: [3450, 4200, 3800, 4600, 4100, 3900],
          color: '#F59E0B'
        }
      },
      {
        id: 'demand-prediction',
        type: 'metric',
        title: 'Demand Prediction',
        description: 'Predicted rental demand',
        value: 'High',
        trend: '+12%',
        positive: true
      },
      {
        id: 'occupancy-forecast',
        type: 'metric',
        title: 'Occupancy Forecast',
        description: 'Predicted occupancy rate',
        value: '89.5%',
        trend: '+2.2%',
        positive: true
      }
    ]
  }
];

/**
 * Real-Time Analytics Page Component
 */
const RealTimeAnalyticsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Handle refresh
   */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  /**
   * Handle content block press
   */
  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Real-time block pressed:', block.id);
  }, []);

  /**
   * Render content block
   */
  const renderContentBlock = useCallback((block: ContentBlock) => {
    return (
      <ContentBlockRenderer
        block={block}
        onPress={handleBlockPress}
      />
    );
  }, [handleBlockPress]);

  /**
   * Simulate live updates
   */
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Updating real-time data...');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Text style={styles.headerTitle}>Real-Time Analytics</Text>
          <Text style={styles.headerSubtitle}>Live data streaming and instant updates</Text>
        </View>

        {/* Real-Time Sections */}
        <View style={styles.contentSection}>
          {realtimeSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Auto-refreshing every 5 seconds</Text>
          <Text style={styles.footerSubtext}>Last update: Just now</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const RealTimeAnalyticsIndex: React.FC = () => {
  return <RealTimeAnalyticsPage />;
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
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
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
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

export default RealTimeAnalyticsIndex;