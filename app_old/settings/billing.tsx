/**
 * Billing & Payments Page
 * Completely different page with 6 scrollable sections
 * Billing history and payment methods
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

const billingSections: ContentSection[] = [
  {
    id: 'current-plan',
    title: '💳 Current Plan',
    description: 'Your subscription details',
    blocks: [
      {
        id: 'plan-name',
        type: 'metric',
        title: 'Plan',
        description: 'Current subscription plan',
        value: 'Premium',
        trend: 'Active',
        positive: true
      },
      {
        id: 'monthly-cost',
        type: 'metric',
        title: 'Monthly Cost',
        description: 'Monthly subscription fee',
        value: '$49.99',
        trend: 'Auto-renew',
        positive: true
      }
    ]
  },
  {
    id: 'payment-methods',
    title: '💰 Payment Methods',
    description: 'Your payment options',
    blocks: [
      {
        id: 'method-list',
        type: 'list',
        title: 'Payment Methods',
        description: 'Available payment options',
        data: [
          { id: 1, title: 'Visa **** 4242', value: 'Primary', trend: 'Expires 12/25' },
          { id: 2, title: 'Mastercard **** 5555', value: 'Backup', trend: 'Expires 08/26' },
          { id: 3, title: 'PayPal', value: 'Connected', trend: 'Instant' }
        ]
      }
    ]
  },
  {
    id: 'billing-history',
    title: '📜 Billing History',
    description: 'Past invoices and payments',
    blocks: [
      {
        id: 'history-list',
        type: 'list',
        title: 'Recent Invoices',
        description: 'Latest billing statements',
        data: [
          { id: 1, title: 'October 2024', value: '$49.99', trend: 'Paid' },
          { id: 2, title: 'September 2024', value: '$49.99', trend: 'Paid' },
          { id: 3, title: 'August 2024', value: '$49.99', trend: 'Paid' }
        ]
      }
    ]
  },
  {
    id: 'usage-stats',
    title: '📊 Usage Statistics',
    description: 'Plan usage metrics',
    blocks: [
      {
        id: 'usage-chart',
        type: 'chart',
        title: 'Monthly Usage',
        description: 'API calls and storage',
        data: {
          chartType: 'bar',
          labels: ['API Calls', 'Storage', 'Bandwidth'],
          values: [1245, 2400, 8500],
          color: '#3B82F6'
        }
      }
    ]
  },
  {
    id: 'upcoming-charges',
    title: '🔮 Upcoming Charges',
    description: 'Next billing information',
    blocks: [
      {
        id: 'next-billing',
        type: 'metric',
        title: 'Next Billing Date',
        description: 'Next charge date',
        value: 'Dec 1, 2024',
        trend: '$49.99',
        positive: true
      }
    ]
  },
  {
    id: 'billing-support',
    title: '💬 Billing Support',
    description: 'Help with billing issues',
    blocks: [
      {
        id: 'support-list',
        type: 'list',
        title: 'Support Options',
        description: 'Billing assistance',
        data: [
          { id: 1, title: 'Contact Support', value: '24/7 available', trend: 'Tap to contact' },
          { id: 2, title: 'Refund Policy', value: '30-day guarantee', trend: 'View policy' },
          { id: 3, title: 'FAQ', value: 'Common questions', trend: 'View FAQ' }
        ]
      }
    ]
  }
];

const BillingPaymentsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Billing block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Billing & Payments</Text>
          <Text style={styles.headerSubtitle}>View billing history and payment methods</Text>
        </View>

        <View style={styles.contentSection}>
          {billingSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Next billing: Dec 1, 2024</Text>
          <Text style={styles.footerSubtext}>$49.99/month</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const BillingPaymentsIndex: React.FC = () => {
  return <BillingPaymentsPage />;
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

export default BillingPaymentsIndex;