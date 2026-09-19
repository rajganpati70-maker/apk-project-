/**
 * Advanced Settings Page
 * Completely different page with 6 scrollable sections
 * Advanced configuration options
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

const advancedSections: ContentSection[] = [
  {
    id: 'api-settings',
    title: '🔌 API Settings',
    description: 'API configuration options',
    blocks: [
      {
        id: 'api-version',
        type: 'metric',
        title: 'API Version',
        description: 'Current API version',
        value: 'v2.4.1',
        trend: 'Latest',
        positive: true
      },
      {
        id: 'rate-limit',
        type: 'metric',
        title: 'Rate Limit',
        description: 'API rate limit',
        value: '1000/hr',
        trend: 'Available: 765',
        positive: true
      }
    ]
  },
  {
    id: 'data-exports',
    title: '📤 Data Exports',
    description: 'Export configuration',
    blocks: [
      {
        id: 'export-list',
        type: 'list',
        title: 'Export Options',
        description: 'Available export formats',
        data: [
          { id: 1, title: 'CSV Export', value: 'All data', trend: 'Enabled' },
          { id: 2, title: 'PDF Reports', value: 'Financial data', trend: 'Enabled' },
          { id: 3, title: 'JSON Export', value: 'API integration', trend: 'Enabled' }
        ]
      }
    ]
  },
  {
    id: 'audit-logs',
    title: '📜 Audit Logs',
    description: 'System audit trails',
    blocks: [
      {
        id: 'log-list',
        type: 'list',
        title: 'Recent Audit Events',
        description: 'System activity logs',
        data: [
          { id: 1, title: 'User Login', value: 'John Smith', trend: '2 hours ago' },
          { id: 2, title: 'Settings Changed', value: 'Admin', trend: '1 day ago' },
          { id: 3, title: 'API Key Generated', value: 'System', trend: '3 days ago' }
        ]
      }
    ]
  },
  {
    id: 'system-health',
    title: '🏥 System Health',
    description: 'System status monitoring',
    blocks: [
      {
        id: 'health-chart',
        type: 'chart',
        title: 'System Performance',
        description: 'Health metrics',
        data: {
          chartType: 'bar',
          labels: ['API', 'Database', 'Cache', 'Queue'],
          values: [98, 95, 99, 92],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'backup-restore',
    title: '💾 Backup & Restore',
    description: 'Data backup management',
    blocks: [
      {
        id: 'backup-list',
        type: 'list',
        title: 'Backup Options',
        description: 'Data backup configuration',
        data: [
          { id: 1, title: 'Automatic Backup', value: 'Daily at 2 AM', trend: 'Enabled' },
          { id: 2, title: 'Manual Backup', value: 'On demand', trend: 'Available' },
          { id: 3, title: 'Restore Point', value: '7 days retention', trend: 'Configured' }
        ]
      }
    ]
  },
  {
    id: 'danger-zone',
    title: '⚠️ Danger Zone',
    description: 'Critical system actions',
    blocks: [
      {
        id: 'danger-list',
        type: 'list',
        title: 'Critical Actions',
        description: 'Irreversible operations',
        data: [
          { id: 1, title: 'Delete All Data', value: 'Permanent', trend: 'Requires confirmation' },
          { id: 2, title: 'Reset Application', value: 'Factory reset', trend: 'Requires confirmation' },
          { id: 3, title: 'Cancel Subscription', value: 'Immediate', trend: 'Requires confirmation' }
        ]
      }
    ]
  }
];

const AdvancedSettingsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Advanced block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Advanced Settings</Text>
          <Text style={styles.headerSubtitle}>Advanced configuration options</Text>
        </View>

        <View style={styles.contentSection}>
          {advancedSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>System status: Healthy</Text>
          <Text style={styles.footerSubtext}>API v2.4.1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AdvancedSettingsIndex: React.FC = () => {
  return <AdvancedSettingsPage />;
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

export default AdvancedSettingsIndex;