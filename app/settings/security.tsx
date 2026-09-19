/**
 * Account Security Page
 * Completely different sub-page with 6 scrollable sections
 * Manage passwords, authentication, and security settings
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../src/components/content';
import { ContentBlock, ContentSection } from '../../src/types';

/**
 * Account Security Content - 6 Unique Scrollable Sections
 */
const securitySections: ContentSection[] = [
  {
    id: 'password-management',
    title: '🔐 Password Management',
    description: 'Manage your password and security credentials',
    blocks: [
      {
        id: 'current-password',
        type: 'list',
        title: 'Current Password Status',
        description: 'Your password security information',
        data: [
          { id: 1, title: 'Last Changed', value: '30 days ago', trend: 'Good' },
          { id: 2, title: 'Password Strength', value: 'Strong', trend: 'Excellent' },
          { id: 3, title: 'Compromised Check', value: 'No issues found', trend: 'Secure' },
          { id: 4, title: 'Password Age', value: '30 days', trend: 'Recent' }
        ]
      },
      {
        id: 'password-requirements',
        type: 'list',
        title: 'Password Requirements',
        description: 'Security requirements for passwords',
        data: [
          { id: 1, title: 'Minimum Length', value: '12 characters', trend: 'Required' },
          { id: 2, title: 'Uppercase Letters', value: 'At least 1', trend: 'Required' },
          { id: 3, title: 'Numbers', value: 'At least 1', trend: 'Required' },
          { id: 4, title: 'Special Characters', value: 'At least 1', trend: 'Required' }
        ]
      }
    ]
  },
  {
    id: 'two-factor-auth',
    title: '📱 Two-Factor Authentication',
    description: 'Enhanced security with 2FA',
    blocks: [
      {
        id: '2fa-status',
        type: 'metric',
        title: '2FA Status',
        description: 'Current two-factor authentication status',
        value: 'Enabled',
        trend: 'SMS Verification',
        positive: true
      },
      {
        id: '2fa-methods',
        type: 'list',
        title: 'Available 2FA Methods',
        description: 'Choose your preferred authentication method',
        data: [
          { id: 1, title: 'SMS Verification', value: 'Text message code', trend: 'Active' },
          { id: 2, title: 'Authenticator App', value: 'Google Authenticator', trend: 'Available' },
          { id: 3, title: 'Email Verification', value: 'Email code', trend: 'Available' },
          { id: 4, title: 'Hardware Key', value: 'USB security key', trend: 'Available' }
        ]
      },
      {
        id: 'backup-codes',
        type: 'list',
        title: 'Backup Codes',
        description: 'Recovery codes for emergency access',
        data: [
          { id: 1, title: 'Codes Generated', value: '10 codes', trend: 'Secure' },
          { id: 2, title: 'Codes Used', value: '0 codes', trend: 'All available' },
          { id: 3, title: 'Last Regenerated', value: '60 days ago', trend: 'Recent' }
        ]
      }
    ]
  },
  {
    id: 'biometric-auth',
    title: '👆 Biometric Authentication',
    description: 'Use fingerprint or face recognition',
    blocks: [
      {
        id: 'biometric-status',
        type: 'metric',
        title: 'Biometric Status',
        description: 'Current biometric authentication setup',
        value: 'Enabled',
        trend: 'Fingerprint',
        positive: true
      },
      {
        id: 'biometric-devices',
        type: 'list',
        title: 'Available Biometric Methods',
        description: 'Supported biometric authentication',
        data: [
          { id: 1, title: 'Fingerprint Scanner', value: 'Available', trend: 'Enabled' },
          { id: 2, title: 'Face Recognition', value: 'Available', trend: 'Not Set Up' },
          { id: 3, title: 'Iris Scanner', value: 'Not Available', trend: 'N/A' },
          { id: 4, title: 'Voice Recognition', value: 'Not Available', trend: 'N/A' }
        ]
      },
      {
        id: 'biometric-security',
        type: 'metric',
        title: 'Biometric Security Level',
        description: 'Security rating of biometric auth',
        value: 'High',
        trend: 'Industry Standard',
        positive: true
      }
    ]
  },
  {
    id: 'login-sessions',
    title: '💻 Login Sessions',
    description: 'Manage active login sessions',
    blocks: [
      {
        id: 'active-sessions',
        type: 'list',
        title: 'Active Sessions',
        description: 'Currently logged in devices',
        data: [
          { id: 1, title: 'iPhone 14 Pro', value: 'San Francisco, CA', trend: 'Current' },
          { id: 2, title: 'MacBook Pro', value: 'San Francisco, CA', trend: '2 hours ago' },
          { id: 3, title: 'Windows PC', value: 'New York, NY', trend: '1 day ago' }
        ]
      },
      {
        id: 'session-security',
        type: 'metric',
        title: 'Session Security',
        description: 'Current session security status',
        value: 'Secure',
        trend: '3 Active Sessions',
        positive: true
      },
      {
        id: 'recent-logins',
        type: 'list',
        title: 'Recent Login Attempts',
        description: 'Login activity in last 7 days',
        data: [
          { id: 1, title: 'Successful Login', value: 'iPhone 14 Pro', trend: 'Today' },
          { id: 2, title: 'Failed Attempt', value: 'Unknown Device', trend: 'Yesterday' },
          { id: 3, title: 'Successful Login', value: 'MacBook Pro', trend: '2 days ago' }
        ]
      }
    ]
  },
  {
    id: 'security-alerts',
    title: '🚨 Security Alerts',
    description: 'Configure security notifications',
    blocks: [
      {
        id: 'alert-settings',
        type: 'list',
        title: 'Security Alert Settings',
        description: 'Choose which alerts to receive',
        data: [
          { id: 1, title: 'New Login', value: 'Notify on new device', trend: 'Enabled' },
          { id: 2, title: 'Password Change', value: 'Notify on password change', trend: 'Enabled' },
          { id: 3, title: 'Suspicious Activity', value: 'Notify on unusual activity', trend: 'Enabled' },
          { id: 4, title: '2FA Changes', value: 'Notify on 2FA changes', trend: 'Enabled' }
        ]
      },
      {
        id: 'recent-alerts',
        type: 'list',
        title: 'Recent Security Alerts',
        description: 'Latest security notifications',
        data: [
          { id: 1, title: 'New Login Detected', value: 'iPhone 14 Pro', trend: 'Today' },
          { id: 2, title: 'Failed Login Attempt', value: 'Unknown location', trend: 'Yesterday' },
          { id: 3, title: 'Password Changed', value: 'Via settings', trend: '30 days ago' }
        ]
      }
    ]
  },
  {
    id: 'advanced-security',
    title: '🛡️ Advanced Security',
    description: 'Additional security features',
    blocks: [
      {
        id: 'encryption-status',
        type: 'metric',
        title: 'Data Encryption',
        description: 'Current encryption status',
        value: 'AES-256',
        trend: 'Military Grade',
        positive: true
      },
      {
        id: 'security-audit',
        type: 'list',
        title: 'Security Audit Log',
        description: 'Recent security-related activities',
        data: [
          { id: 1, title: 'Password Strength Check', value: 'Passed', trend: 'Today' },
          { id: 2, title: '2FA Verification', value: 'Enabled', trend: '30 days ago' },
          { id: 3, title: 'Session Review', value: 'Clean', trend: 'Weekly' },
          { id: 4, title: 'Device Trust Check', value: 'All devices trusted', trend: 'Daily' }
        ]
      },
      {
        id: 'security-score',
        type: 'metric',
        title: 'Overall Security Score',
        description: 'Your account security rating',
        value: '95/100',
        trend: 'Excellent',
        positive: true
      }
    ]
  }
];

/**
 * Account Security Page Component
 */
const SecurityPage: React.FC = () => {
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
    console.log('Security block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Account Security</Text>
          <Text style={styles.headerSubtitle}>Manage passwords and authentication</Text>
        </View>

        {/* Security Sections */}
        <View style={styles.contentSection}>
          {securitySections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Review All Sessions</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Security settings updated in real-time</Text>
          <Text style={styles.footerSubtext}>Last security check: Today</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const SecurityIndex: React.FC = () => {
  return <SecurityPage />;
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
  contentSection: {
    marginTop: 16,
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#E5E7EB',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#111827',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 16,
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

export default SecurityIndex;