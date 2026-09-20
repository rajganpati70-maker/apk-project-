/**
 * Tenant Overview Page
 * Completely different page with 6 scrollable sections
 * Complete tenant dashboard
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
    id: 'tenant-stats',
    title: '👥 Tenant Statistics',
    description: 'Tenant portfolio metrics',
    blocks: [
      {
        id: 'total-tenants',
        type: 'metric',
        title: 'Total Tenants',
        description: 'Active tenants',
        value: '142',
        trend: '+8',
        positive: true
      },
      {
        id: 'occupancy-rate',
        type: 'metric',
        title: 'Occupancy Rate',
        description: 'Property occupancy',
        value: '87%',
        trend: '+5%',
        positive: true
      }
    ]
  },
  {
    id: 'tenant-types',
    title: '📊 Tenant Types',
    description: 'Demographic breakdown',
    blocks: [
      {
        id: 'type-chart',
        type: 'chart',
        title: 'Tenant Distribution',
        description: 'By tenant type',
        data: {
          chartType: 'pie',
          labels: ['Individual', 'Family', 'Corporate', 'Student'],
          values: [65, 25, 8, 2],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'tenant-activity',
    title: '📈 Tenant Activity',
    description: 'Recent tenant actions',
    blocks: [
      {
        id: 'activity-list',
        type: 'list',
        title: 'Recent Activity',
        description: 'Latest tenant interactions',
        data: [
          { id: 1, title: 'New Lease Signed', value: 'Unit 204', trend: '2 hours ago' },
          { id: 2, title: 'Payment Received', value: 'Unit 312', trend: '5 hours ago' },
          { id: 3, title: 'Maintenance Request', value: 'Unit 456', trend: '1 day ago' }
        ]
      }
    ]
  },
  {
    id: 'tenant-retention',
    title: '🔄 Tenant Retention',
    description: 'Retention metrics',
    blocks: [
      {
        id: 'retention-rate',
        type: 'metric',
        title: 'Retention Rate',
        description: 'Lease renewal rate',
        value: '78%',
        trend: '+6%',
        positive: true
      }
    ]
  },
  {
    id: 'tenant-satisfaction',
    title: '⭐ Tenant Satisfaction',
    description: 'Satisfaction metrics',
    blocks: [
      {
        id: 'satisfaction-chart',
        type: 'chart',
        title: 'Rating Distribution',
        description: 'Tenant ratings',
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
    id: 'tenant-alerts',
    title: '🚨 Tenant Alerts',
    description: 'Issues requiring attention',
    blocks: [
      {
        id: 'alert-list',
        type: 'list',
        title: 'Attention Required',
        description: 'Tenant issues',
        data: [
          { id: 1, title: 'Lease Expiring', value: 'Unit 204', trend: '30 days' },
          { id: 2, title: 'Late Payment', value: 'Unit 567', trend: '15 days' },
          { id: 3, title: 'Maintenance Request', value: 'Unit 456', trend: 'Urgent' }
        ]
      }
    ]
  }
];

const TenantOverviewPage: React.FC = () => {
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
          <Text style={styles.headerTitle}>Tenant Overview</Text>
          <Text style={styles.headerSubtitle}>Complete tenant dashboard</Text>
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
          <Text style={styles.footerText}>142 active tenants</Text>
          <Text style={styles.footerSubtext}>87% occupancy rate</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TenantOverviewIndex: React.FC = () => {
  return <TenantOverviewPage />;
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

export default TenantOverviewIndex;