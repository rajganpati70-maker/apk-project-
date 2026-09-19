/**
 * Settings Overview Page
 * Completely different page with 6 scrollable sections
 * Complete settings dashboard
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
    id: 'account-summary',
    title: '👤 Account Summary',
    description: 'Your account information',
    blocks: [
      {
        id: 'account-status',
        type: 'metric',
        title: 'Account Status',
        description: 'Current account status',
        value: 'Active',
        trend: 'Premium Plan',
        positive: true
      },
      {
        id: 'subscription',
        type: 'metric',
        title: 'Subscription',
        description: 'Current plan',
        value: 'Premium',
        trend: 'Renews Dec 2024',
        positive: true
      }
    ]
  },
  {
    id: 'security-status',
    title: '🔒 Security Status',
    description: 'Account security overview',
    blocks: [
      {
        id: 'security-score',
        type: 'metric',
        title: 'Security Score',
        description: 'Overall security rating',
        value: '92%',
        trend: 'Excellent',
        positive: true
      },
      {
        id: 'last-login',
        type: 'metric',
        title: 'Last Login',
        description: 'Most recent login',
        value: '2 hours ago',
        trend: 'From New York',
        positive: true
      }
    ]
  },
  {
    id: 'notification-status',
    title: '🔔 Notification Status',
    description: 'Notification preferences',
    blocks: [
      {
        id: 'notification-count',
        type: 'metric',
        title: 'Active Notifications',
        description: 'Enabled notification types',
        value: '8',
        trend: 'All enabled',
        positive: true
      }
    ]
  },
  {
    id: 'data-usage',
    title: '📊 Data Usage',
    description: 'Storage and data statistics',
    blocks: [
      {
        id: 'storage-used',
        type: 'metric',
        title: 'Storage Used',
        description: 'Data storage consumption',
        value: '2.4 GB',
        trend: '12% of limit',
        positive: true
      },
      {
        id: 'api-calls',
        type: 'metric',
        title: 'API Calls',
        description: 'Monthly API usage',
        value: '1,245',
        trend: '23% of limit',
        positive: true
      }
    ]
  },
  {
    id: 'activity-log',
    title: '📋 Activity Log',
    description: 'Recent account activity',
    blocks: [
      {
        id: 'activity-list',
        type: 'list',
        title: 'Recent Activities',
        description: 'Latest account actions',
        data: [
          { id: 1, title: 'Password Changed', value: '2 hours ago', trend: 'Security' },
          { id: 2, title: 'Settings Updated', value: '1 day ago', trend: 'Preferences' },
          { id: 3, title: 'Payment Processed', value: '3 days ago', trend: 'Billing' }
        ]
      }
    ]
  },
  {
    id: 'quick-actions',
    title: '⚡ Quick Actions',
    description: 'Common settings actions',
    blocks: [
      {
        id: 'action-list',
        type: 'list',
        title: 'Available Actions',
        description: 'Quick settings access',
        data: [
          { id: 1, title: 'Change Password', value: 'Security', trend: 'Tap to change' },
          { id: 2, title: 'Update Profile', value: 'Account', trend: 'Tap to edit' },
          { id: 3, title: 'Manage Billing', value: 'Subscription', trend: 'Tap to view' }
        ]
      }
    ]
  }
];

const SettingsOverviewPage: React.FC = () => {
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
          <Text style={styles.headerTitle}>Settings Overview</Text>
          <Text style={styles.headerSubtitle}>Complete settings dashboard</Text>
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
          <Text style={styles.footerText}>Settings synced automatically</Text>
          <Text style={styles.footerSubtext}>Last sync: Just now</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsOverviewIndex: React.FC = () => {
  return <SettingsOverviewPage />;
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

export default SettingsOverviewIndex;