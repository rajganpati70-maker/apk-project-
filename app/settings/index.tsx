/**
 * Settings Page
 * Completely different settings page with 6 scrollable sections
 * Unique content for app configuration, preferences, and account management
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
    id: 'profile-settings',
    title: '👤 Profile Settings',
    description: 'Manage your account and personal information',
    blocks: [
      {
        id: 'account-info',
        type: 'list',
        title: 'Account Information',
        description: 'Your personal account details',
        data: [
          { id: 1, title: 'Full Name', value: 'John Doe', trend: 'Edit' },
          { id: 2, title: 'Email Address', value: 'john.doe@anyrenting.com', trend: 'Edit' },
          { id: 3, title: 'Phone Number', value: '+1 (555) 123-4567', trend: 'Edit' },
          { id: 4, title: 'Account Type', value: 'Property Manager', trend: 'Premium' }
        ]
      },
      {
        id: 'profile-completion',
        type: 'metric',
        title: 'Profile Completion',
        description: 'Your profile is 85% complete',
        value: '85%',
        trend: '+15%',
        positive: true
      }
    ]
  },
  {
    id: 'notification-preferences',
    title: '🔔 Notification Preferences',
    description: 'Customize how and when you receive notifications',
    blocks: [
      {
        id: 'push-notifications',
        type: 'list',
        title: 'Push Notifications',
        description: 'Configure mobile push notifications',
        data: [
          { id: 1, title: 'Maintenance Requests', value: 'Enabled', trend: 'High Priority' },
          { id: 2, title: 'Tenant Messages', value: 'Enabled', trend: 'Medium Priority' },
          { id: 3, title: 'Payment Alerts', value: 'Enabled', trend: 'High Priority' },
          { id: 4, title: 'Marketing Updates', value: 'Disabled', trend: 'Low Priority' }
        ]
      },
      {
        id: 'email-notifications',
        type: 'list',
        title: 'Email Notifications',
        description: 'Configure email notification settings',
        data: [
          { id: 1, title: 'Daily Digest', value: 'Enabled', trend: '8:00 AM' },
          { id: 2, title: 'Weekly Reports', value: 'Enabled', trend: 'Every Monday' },
          { id: 3, title: 'Urgent Alerts', value: 'Enabled', trend: 'Immediate' },
          { id: 4, title: 'System Updates', value: 'Disabled', trend: 'Never' }
        ]
      }
    ]
  },
  {
    id: 'app-preferences',
    title: '⚙️ App Preferences',
    description: 'Customize app behavior and appearance',
    blocks: [
      {
        id: 'display-settings',
        type: 'list',
        title: 'Display Settings',
        description: 'Configure app appearance',
        data: [
          { id: 1, title: 'Theme', value: 'Light Mode', trend: 'Dark Available' },
          { id: 2, title: 'Font Size', value: 'Medium', trend: 'Adjustable' },
          { id: 3, title: 'Language', value: 'English', trend: '12 Languages' },
          { id: 4, title: 'Date Format', value: 'MM/DD/YYYY', trend: 'Customizable' }
        ]
      },
      {
        id: 'behavior-settings',
        type: 'list',
        title: 'Behavior Settings',
        description: 'Configure app behavior',
        data: [
          { id: 1, title: 'Auto-refresh', value: 'Every 5 minutes', trend: 'Enabled' },
          { id: 2, title: 'Offline Mode', value: 'Available', trend: 'Sync on WiFi' },
          { id: 3, title: 'Data Saver', value: 'Disabled', trend: 'WiFi Only' },
          { id: 4, title: 'Haptic Feedback', value: 'Enabled', trend: 'Adjustable' }
        ]
      }
    ]
  },
  {
    id: 'security-settings',
    title: '🔒 Security Settings',
    description: 'Manage account security and authentication',
    blocks: [
      {
        id: 'authentication',
        type: 'list',
        title: 'Authentication',
        description: 'Security and login settings',
        data: [
          { id: 1, title: 'Password', value: 'Last changed 30 days ago', trend: 'Strong' },
          { id: 2, title: 'Two-Factor Auth', value: 'Enabled', trend: 'SMS' },
          { id: 3, title: 'Biometric Login', value: 'Enabled', trend: 'Fingerprint' },
          { id: 4, title: 'Login Sessions', value: '3 Active', trend: 'Manage' }
        ]
      },
      {
        id: 'security-score',
        type: 'metric',
        title: 'Security Score',
        description: 'Your account security rating',
        value: 'Excellent',
        trend: '95/100',
        positive: true
      }
    ]
  },
  {
    id: 'data-management',
    title: '💾 Data Management',
    description: 'Manage your data and storage',
    blocks: [
      {
        id: 'storage-usage',
        type: 'metric',
        title: 'Storage Usage',
        description: 'Local app storage consumption',
        value: '245 MB',
        trend: '12%',
        positive: true
      },
      {
        id: 'data-sync',
        type: 'list',
        title: 'Data Synchronization',
        description: 'Cloud sync settings',
        data: [
          { id: 1, title: 'Auto-sync', value: 'Enabled', trend: 'Real-time' },
          { id: 2, title: 'Last Sync', value: '2 minutes ago', trend: '✓' },
          { id: 3, title: 'Sync Frequency', value: 'Every 5 minutes', trend: 'Adjustable' },
          { id: 4, title: 'Data Backup', value: 'Enabled', trend: 'Daily' }
        ]
      },
      {
        id: 'cache-management',
        type: 'list',
        title: 'Cache Management',
        description: 'Clear cached data to free space',
        data: [
          { id: 1, title: 'Image Cache', value: '125 MB', trend: 'Clear' },
          { id: 2, title: 'Data Cache', value: '85 MB', trend: 'Clear' },
          { id: 3, title: 'Temporary Files', value: '35 MB', trend: 'Clear' }
        ]
      }
    ]
  },
  {
    id: 'support-help',
    title: '🆘 Support & Help',
    description: 'Get help and access support resources',
    blocks: [
      {
        id: 'help-resources',
        type: 'list',
        title: 'Help Resources',
        description: 'Access help documentation and tutorials',
        data: [
          { id: 1, title: 'User Guide', value: 'Comprehensive guide', trend: 'Open' },
          { id: 2, title: 'Video Tutorials', value: '25 tutorials', trend: 'Watch' },
          { id: 3, title: 'FAQ Section', value: '150+ questions', trend: 'Browse' },
          { id: 4, title: 'Glossary', value: 'Terms explained', trend: 'Reference' }
        ]
      },
      {
        id: 'contact-support',
        type: 'list',
        title: 'Contact Support',
        description: 'Reach out to our support team',
        data: [
          { id: 1, title: 'Live Chat', value: 'Available 24/7', trend: 'Start Chat' },
          { id: 2, title: 'Email Support', value: 'support@anyrenting.com', trend: 'Send Email' },
          { id: 3, title: 'Phone Support', value: '+1 (800) 555-0199', trend: 'Call Now' },
          { id: 4, title: 'Community Forum', value: 'Active discussions', trend: 'Join' }
        ]
      },
      {
        id: 'app-info',
        type: 'metric',
        title: 'App Version',
        description: 'Current version and build information',
        value: 'v1.0.0',
        trend: 'Build 12345',
        positive: true
      }
    ]
  }
];

/**
 * Settings Page Component
 */
const SettingsPage: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for settings
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'settings-overview',
      title: 'Settings Overview',
      description: 'Complete settings dashboard',
      icon: '📊',
      route: '/settings/overview',
    },
    {
      id: 'account-security',
      title: 'Account Security',
      description: 'Manage passwords and authentication',
      icon: '🔒',
      route: '/settings/security',
    },
    {
      id: 'billing-payments',
      title: 'Billing & Payments',
      description: 'View billing history and payment methods',
      icon: '💳',
      route: '/settings/billing',
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect with third-party services',
      icon: '🔗',
      route: '/settings/integrations',
    },
    {
      id: 'team-management',
      title: 'Team Management',
      description: 'Manage team members and permissions',
      icon: '👥',
      route: '/settings/team',
    },
    {
      id: 'advanced-settings',
      title: 'Advanced Settings',
      description: 'Advanced configuration options',
      icon: '⚡',
      route: '/settings/advanced',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Settings sub-navigation:', item.route);
    navigateToRoute(item.route);
  }, [navigateToRoute]);

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
          <Text style={styles.headerSubtitle}>Configure app preferences and account settings</Text>
        </View>

        {/* Sub-navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Quick Settings</Text>
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
          <Text style={styles.footerText}>Settings are saved automatically</Text>
          <Text style={styles.footerSubtext}>All changes synced to cloud</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component without Navigation Provider (already in parent)
 */
const SettingsIndex: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  return <SettingsPage navigateToRoute={navigateToRoute} />;
};

/**
 * Styles
 */
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

export default SettingsIndex;