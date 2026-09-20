/**
 * Integrations Page
 * Completely different page with 6 scrollable sections
 * Connect with third-party services
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

const integrationSections: ContentSection[] = [
  {
    id: 'active-integrations',
    title: '🔗 Active Integrations',
    description: 'Currently connected services',
    blocks: [
      {
        id: 'integration-list',
        type: 'list',
        title: 'Connected Services',
        description: 'Active third-party connections',
        data: [
          { id: 1, title: 'QuickBooks', value: 'Accounting', trend: 'Connected' },
          { id: 2, title: 'Stripe', value: 'Payments', trend: 'Connected' },
          { id: 3, title: 'Slack', value: 'Notifications', trend: 'Connected' }
        ]
      }
    ]
  },
  {
    id: 'available-integrations',
    title: '📋 Available Integrations',
    description: 'Services you can connect',
    blocks: [
      {
        id: 'available-list',
        type: 'list',
        title: 'Ready to Connect',
        description: 'Available third-party services',
        data: [
          { id: 1, title: 'Xero', value: 'Accounting', trend: 'Connect' },
          { id: 2, title: 'PayPal', value: 'Payments', trend: 'Connect' },
          { id: 3, title: 'Zapier', value: 'Automation', trend: 'Connect' }
        ]
      }
    ]
  },
  {
    id: 'integration-stats',
    title: '📊 Integration Stats',
    description: 'Integration performance metrics',
    blocks: [
      {
        id: 'sync-status',
        type: 'metric',
        title: 'Sync Status',
        description: 'Data synchronization status',
        value: 'All synced',
        trend: 'Last sync: 5 min ago',
        positive: true
      },
      {
        id: 'api-calls',
        type: 'metric',
        title: 'API Calls Today',
        description: 'External API requests',
        value: '234',
        trend: 'Normal',
        positive: true
      }
    ]
  },
  {
    id: 'webhooks',
    title: '🔔 Webhooks',
    description: 'Webhook configurations',
    blocks: [
      {
        id: 'webhook-list',
        type: 'list',
        title: 'Active Webhooks',
        description: 'Configured webhook endpoints',
        data: [
          { id: 1, title: 'Tenant Created', value: 'POST', trend: 'Active' },
          { id: 2, title: 'Payment Received', value: 'POST', trend: 'Active' },
          { id: 3, title: 'Maintenance Request', value: 'POST', trend: 'Active' }
        ]
      }
    ]
  },
  {
    id: 'api-keys',
    title: '🔑 API Keys',
    description: 'API key management',
    blocks: [
      {
        id: 'key-list',
        type: 'list',
        title: 'Your API Keys',
        description: 'Manage your API credentials',
        data: [
          { id: 1, title: 'Production Key', value: 'pk_live_****', trend: 'Active' },
          { id: 2, title: 'Test Key', value: 'pk_test_****', trend: 'Active' },
          { id: 3, title: 'Webhook Secret', value: 'whsec_****', trend: 'Active' }
        ]
      }
    ]
  },
  {
    id: 'integration-logs',
    title: '📜 Integration Logs',
    description: 'Recent integration activity',
    blocks: [
      {
        id: 'log-list',
        type: 'list',
        title: 'Recent Activity',
        description: 'Latest integration events',
        data: [
          { id: 1, title: 'QuickBooks Sync', value: 'Success', trend: '2 min ago' },
          { id: 2, title: 'Stripe Payment', value: 'Success', trend: '15 min ago' },
          { id: 3, title: 'Slack Notification', value: 'Success', trend: '1 hour ago' }
        ]
      }
    ]
  }
];

const IntegrationsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Integration block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Integrations</Text>
          <Text style={styles.headerSubtitle}>Connect with third-party services</Text>
        </View>

        <View style={styles.contentSection}>
          {integrationSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>3 active integrations</Text>
          <Text style={styles.footerSubtext}>All systems operational</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const IntegrationsIndex: React.FC = () => {
  return <IntegrationsPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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

export default IntegrationsIndex;