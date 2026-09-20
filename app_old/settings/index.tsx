/**
 * Settings Page
 * Completely different settings page with 6 scrollable sections
 * Unique content for app configuration and preferences
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
import { NavigationItem } from '../../src/components/navigation';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../src/components/content';
import { NavigationItem as NavigationItemType, ContentBlock, ContentSection } from '../../src/types';

/**
 * Settings Page Content - 6 Unique Scrollable Sections
 */
const settingsSections: ContentSection[] = [
  {
    id: 'settings-overview',
    title: '⚙️ Settings Overview',
    description: 'General app settings and preferences',
    blocks: [
      {
        id: 'app-version',
        type: 'metric',
        title: 'App Version',
        description: 'Current application version',
        value: '2.4.1',
        trend: 'Latest',
        positive: true
      },
      {
        id: 'user-account',
        type: 'metric',
        title: 'Account Status',
        description: 'Current user account status',
        value: 'Active',
        trend: 'Premium',
        positive: true
      },
      {
        id: 'data-sync',
        type: 'metric',
        title: 'Data Sync Status',
        description: 'Last successful data synchronization',
        value: 'Synced',
        trend: '2 min ago',
        positive: true
      }
    ]
  },
  {
    id: 'billing-management',
    title: '💳 Billing Management',
    description: 'Subscription and payment settings',
    blocks: [
      {
        id: 'subscription-plan',
        type: 'metric',
        title: 'Current Plan',
        description: 'Your subscription tier',
        value: 'Premium',
        trend: '$49/month',
        positive: true
      },
      {
        id: 'next-billing',
        type: 'metric',
        title: 'Next Billing Date',
        description: 'When your next payment is due',
        value: 'Oct 15, 2026',
        trend: '15 days',
        positive: true
      },
      {
        id: 'payment-method',
        type: 'list',
        title: 'Payment Methods',
        description: 'Available payment options',
        data: [
          { id: 1, title: 'Visa ending in 4242', value: 'Primary', trend: 'Expires 12/27' },
          { id: 2, title: 'Mastercard ending in 8888', value: 'Backup', trend: 'Expires 06/28' }
        ]
      }
    ]
  },
  {
    id: 'integrations',
    title: '🔗 Integrations',
    description: 'Third-party service connections',
    blocks: [
      {
        id: 'connected-services',
        type: 'list',
        title: 'Connected Services',
        description: 'Active third-party integrations',
        data: [
          { id: 1, title: 'QuickBooks Online', value: 'Connected', trend: 'Syncing daily' },
          { id: 2, title: 'Stripe Payments', value: 'Connected', trend: 'Active' },
          { id: 3, title: 'Google Calendar', value: 'Connected', trend: 'Syncing' },
          { id: 4, title: 'Slack Notifications', value: 'Connected', trend: 'Active' }
        ]
      },
      {
        id: 'integration-status',
        type: 'metric',
        title: 'Integration Health',
        description: 'Overall status of connected services',
        value: '98.5%',
        trend: '+0.5%',
        positive: true
      }
    ]
  },
  {
    id: 'team-management',
    title: '👥 Team Management',
    description: 'User accounts and permissions',
    blocks: [
      {
        id: 'team-members',
        type: 'metric',
        title: 'Team Members',
        description: 'Total users with access',
        value: '12',
        trend: '+2',
        positive: true
      },
      {
        id: 'active-users',
        type: 'metric',
        title: 'Active Users',
        description: 'Users currently logged in',
        value: '8',
        trend: '4',
        positive: true
      },
      {
        id: 'role-distribution',
        type: 'chart',
        title: 'Role Distribution',
        description: 'Team members by role',
        data: {
          chartType: 'pie',
          labels: ['Admin', 'Manager', 'Staff', 'Viewer'],
          values: [3, 4, 4, 1],
          colors: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6']
        }
      }
    ]
  },
  {
    id: 'advanced-settings',
    title: '🔧 Advanced Settings',
    description: 'Technical and advanced configurations',
    blocks: [
      {
        id: 'api-usage',
        type: 'metric',
        title: 'API Usage',
        description: 'Monthly API calls used',
        value: '45,230',
        trend: '+5,230',
        positive: false
      },
      {
        id: 'storage-usage',
        type: 'metric',
        title: 'Storage Usage',
        description: 'Cloud storage consumption',
        value: '2.4 GB',
        trend: 'of 10 GB',
        positive: true
      },
      {
        id: 'system-health',
        type: 'metric',
        title: 'System Health',
        description: 'Overall system performance',
        value: 'Excellent',
        trend: '99.9% uptime',
        positive: true
      }
    ]
  },
  {
    id: 'security-settings',
    title: '🔒 Security Settings',
    description: 'Account security and access controls',
    blocks: [
      {
        id: 'login-security',
        type: 'metric',
        title: 'Login Security',
        description: 'Current authentication level',
        value: '2FA Enabled',
        trend: 'Secure',
        positive: true
      },
      {
        id: 'last-login',
        type: 'metric',
        title: 'Last Login',
        description: 'Most recent account access',
        value: '2 hours ago',
        trend: 'New York, USA',
        positive: true
      },
      {
        id: 'security-events',
        type: 'list',
        title: 'Recent Security Events',
        description: 'Account security activity',
        data: [
          { id: 1, title: 'Password Changed', value: 'Success', trend: 'Yesterday' },
          { id: 2, title: 'New Device Login', value: 'Success', trend: '3 days ago' },
          { id: 3, title: '2FA Setup', value: 'Success', trend: '1 week ago' }
        ]
      }
    ]
  }
];

/**
 * Settings Page Component
 */
const SettingsPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for settings
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'settings-overview',
      title: 'Settings Overview',
      description: 'General app settings',
      icon: '⚙️',
      route: '/settings/overview',
    },
    {
      id: 'billing-management',
      title: 'Billing Management',
      description: 'Subscription and payments',
      icon: '💳',
      route: '/settings/billing',
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Third-party connections',
      icon: '🔗',
      route: '/settings/integrations',
    },
    {
      id: 'team-management',
      title: 'Team Management',
      description: 'User accounts and permissions',
      icon: '👥',
      route: '/settings/team',
    },
    {
      id: 'advanced-settings',
      title: 'Advanced Settings',
      description: 'Technical configurations',
      icon: '🔧',
      route: '/settings/advanced',
    },
    {
      id: 'security-settings',
      title: 'Security Settings',
      description: 'Account security',
      icon: '🔒',
      route: '/settings/security',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Settings sub-navigation:', item.route);
    const routeMap: Record<string, string> = {
      '/settings/overview': 'SettingsOverview',
      '/settings/billing': 'SettingsBilling',
      '/settings/integrations': 'SettingsIntegrations',
      '/settings/team': 'SettingsTeam',
      '/settings/advanced': 'SettingsAdvanced',
      '/settings/security': 'SettingsSecurity',
    };
    
    const screenName = routeMap[item.route];
    if (screenName && navigation) {
      navigation.navigate(screenName);
    }
  }, [navigation]);

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
    console.log('Settings block pressed:', block.id);
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>App configuration and preferences</Text>
        </View>

        {/* Sub-navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Settings Categories</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
            />
          ))}
        </View>

        {/* Settings Sections */}
        <View style={styles.contentSection}>
          {settingsSections.map((section) => (
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
          <Text style={styles.footerText}>Settings preferences saved automatically</Text>
          <Text style={styles.footerSubtext}>Last saved: Just now</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const SettingsIndex: React.FC<{ navigation: any }> = ({ navigation }) => {
  return <SettingsPage navigation={navigation} />;
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  navigationSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  contentSection: {
    marginTop: 16,
  },
  footer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default SettingsIndex;