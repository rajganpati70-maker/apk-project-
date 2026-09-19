/**
 * Lease Renewals Page
 * Completely different page with 6 scrollable sections
 * Manage lease expirations
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

const renewalsSections: ContentSection[] = [
  {
    id: 'expiring-soon',
    title: '⚠️ Expiring Soon',
    description: 'Leases ending soon',
    blocks: [
      {
        id: 'expiring-count',
        type: 'metric',
        title: 'Expiring in 30 Days',
        description: 'Leases needing renewal',
        value: '8',
        trend: '+2 this month',
        positive: false
      },
      {
        id: 'expiring-list',
        type: 'list',
        title: 'Urgent Renewals',
        description: 'Leases expiring soon',
        data: [
          { id: 1, title: 'Unit 204 - John Smith', value: '30 days', trend: 'Contact' },
          { id: 2, title: 'Unit 312 - Sarah Johnson', value: '45 days', trend: 'Contact' },
          { id: 3, title: 'Unit 456 - Michael Chen', value: '60 days', trend: 'Monitor' }
        ]
      }
    ]
  },
  {
    id: 'renewal-options',
    title: '🔄 Renewal Options',
    description: 'Renewal terms and conditions',
    blocks: [
      {
        id: 'option-list',
        type: 'list',
        title: 'Available Terms',
        description: 'Renewal options',
        data: [
          { id: 1, title: 'Standard Renewal', value: 'Same terms', trend: 'Offer' },
          { id: 2, title: 'Extended Term', value: '+12 months', trend: 'Offer' },
          { id: 3, title: 'Rate Adjustment', value: '+3% increase', trend: 'Offer' }
        ]
      }
    ]
  },
  {
    id: 'renewal-statistics',
    title: '📊 Renewal Statistics',
    description: 'Renewal performance',
    blocks: [
      {
        id: 'renewal-rate',
        type: 'metric',
        title: 'Renewal Rate',
        description: 'Lease renewal percentage',
        value: '78%',
        trend: '+6%',
        positive: true
      }
    ]
  },
  {
    id: 'renewal-timeline',
    title: '📅 Renewal Timeline',
    description: 'Upcoming renewals',
    blocks: [
      {
        id: 'timeline-chart',
        type: 'chart',
        title: 'Monthly Renewals',
        description: 'Renewals by month',
        data: {
          chartType: 'bar',
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          values: [12, 15, 18, 14, 16, 15],
          color: '#F59E0B'
        }
      }
    ]
  },
  {
    id: 'renewal-templates',
    title: '📄 Renewal Templates',
    description: 'Pre-built renewal documents',
    blocks: [
      {
        id: 'template-list',
        type: 'list',
        title: 'Available Templates',
        description: 'Renewal document templates',
        data: [
          { id: 1, title: 'Standard Renewal', value: 'PDF', trend: 'Use' },
          { id: 2, title: 'Rent Increase', value: 'PDF', trend: 'Use' },
          { id: 3, title: 'Lease Extension', value: 'PDF', trend: 'Use' }
        ]
      }
    ]
  },
  {
    id: 'renewal-reminders',
    title: '🔔 Renewal Reminders',
    description: 'Automated reminders',
    blocks: [
      {
        id: 'reminder-list',
        type: 'list',
        title: 'Reminder Settings',
        description: 'Notification schedule',
        data: [
          { id: 1, title: '60 Days Before', value: 'Email', trend: 'Enabled' },
          { id: 2, title: '30 Days Before', value: 'Email + SMS', trend: 'Enabled' },
          { id: 3, title: '7 Days Before', value: 'Call', trend: 'Enabled' }
        ]
      }
    ]
  }
];

const LeaseRenewalsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Renewals block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Lease Renewals</Text>
          <Text style={styles.headerSubtitle}>Manage lease expirations</Text>
        </View>

        <View style={styles.contentSection}>
          {renewalsSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>8 leases expiring soon</Text>
          <Text style={styles.footerSubtext}>78% renewal rate</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const LeaseRenewalsIndex: React.FC = () => {
  return <LeaseRenewalsPage />;
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

export default LeaseRenewalsIndex;