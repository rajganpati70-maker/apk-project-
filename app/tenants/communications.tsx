/**
 * Tenant Communications Page
 * Completely different page with 6 scrollable sections
 * Messages and notifications
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

const communicationsSections: ContentSection[] = [
  {
    id: 'inbox',
    title: '📬 Inbox',
    description: 'Tenant messages',
    blocks: [
      {
        id: 'unread-count',
        type: 'metric',
        title: 'Unread Messages',
        description: 'Messages requiring attention',
        value: '23',
        trend: '+5',
        positive: false
      },
      {
        id: 'message-list',
        type: 'list',
        title: 'Recent Messages',
        description: 'Latest tenant communications',
        data: [
          { id: 1, title: 'Maintenance Request', value: 'Unit 204', trend: '2 hours ago' },
          { id: 2, title: 'Payment Inquiry', value: 'Unit 312', trend: '5 hours ago' },
          { id: 3, title: 'Lease Question', value: 'Unit 456', trend: '1 day ago' }
        ]
      }
    ]
  },
  {
    id: 'sent-messages',
    title: '📤 Sent Messages',
    description: 'Messages sent to tenants',
    blocks: [
      {
        id: 'sent-list',
        type: 'list',
        title: 'Recently Sent',
        description: 'Messages you sent',
        data: [
          { id: 1, title: 'Rent Reminder', value: 'All tenants', trend: 'Yesterday' },
          { id: 2, title: 'Maintenance Update', value: 'Building A', trend: '2 days ago' },
          { id: 3, title: 'Policy Change', value: 'All tenants', trend: '3 days ago' }
        ]
      }
    ]
  },
  {
    id: 'message-templates',
    title: '📋 Message Templates',
    description: 'Pre-built message templates',
    blocks: [
      {
        id: 'template-list',
        type: 'list',
        title: 'Available Templates',
        description: 'Quick message options',
        data: [
          { id: 1, title: 'Rent Reminder', value: '7 days before', trend: 'Use' },
          { id: 2, title: 'Maintenance Notice', value: 'Scheduled work', trend: 'Use' },
          { id: 3, title: 'Welcome Message', value: 'New tenant', trend: 'Use' }
        ]
      }
    ]
  },
  {
    id: 'communication-preferences',
    title: '⚙️ Communication Preferences',
    description: 'Tenant notification settings',
    blocks: [
      {
        id: 'preference-list',
        type: 'list',
        title: 'Default Settings',
        description: 'Communication preferences',
        data: [
          { id: 1, title: 'Email Notifications', value: 'Enabled', trend: 'All tenants' },
          { id: 2, title: 'SMS Alerts', value: 'Emergency only', trend: 'All tenants' },
          { id: 3, title: 'Push Notifications', value: 'Enabled', trend: 'Opt-in' }
        ]
      }
    ]
  },
  {
    id: 'message-history',
    title: '📜 Message History',
    description: 'Past communications',
    blocks: [
      {
        id: 'history-chart',
        type: 'chart',
        title: 'Message Volume',
        description: 'Messages over time',
        data: {
          chartType: 'bar',
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [45, 52, 38, 48, 55, 12, 8],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'bulk-communications',
    title: '📢 Bulk Communications',
    description: 'Send messages to multiple tenants',
    blocks: [
      {
        id: 'bulk-options',
        type: 'list',
        title: 'Bulk Send Options',
        description: 'Mass communication tools',
        data: [
          { id: 1, title: 'Send to All', value: '142 tenants', trend: 'Send' },
          { id: 2, title: 'Send by Property', value: 'Select property', trend: 'Send' },
          { id: 3, title: 'Send by Type', value: 'Select tenant type', trend: 'Send' }
        ]
      }
    ]
  }
];

const TenantCommunicationsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Communications block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Tenant Communications</Text>
          <Text style={styles.headerSubtitle}>Messages and notifications</Text>
        </View>

        <View style={styles.contentSection}>
          {communicationsSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>23 unread messages</Text>
          <Text style={styles.footerSubtext}>142 tenants contacted</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TenantCommunicationsIndex: React.FC = () => {
  return <TenantCommunicationsPage />;
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

export default TenantCommunicationsIndex;