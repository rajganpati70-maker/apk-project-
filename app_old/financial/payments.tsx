/**
 * Payment Management Page
 * Completely different page with 6 scrollable sections
 * Process and track payments
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

const paymentsSections: ContentSection[] = [
  {
    id: 'payments-received',
    title: '💳 Payments Received',
    description: 'Incoming payments',
    blocks: [
      {
        id: 'today-payments',
        type: 'metric',
        title: 'Today\'s Payments',
        description: 'Payments received today',
        value: '$8,450',
        trend: '+$1,200',
        positive: true
      },
      {
        id: 'payment-list',
        type: 'list',
        title: 'Recent Payments',
        description: 'Latest transactions',
        data: [
          { id: 1, title: 'Unit 204 - John Smith', value: '$1,850', trend: 'Paid' },
          { id: 2, title: 'Unit 312 - Sarah Johnson', value: '$2,100', trend: 'Paid' },
          { id: 3, title: 'Unit 456 - Michael Chen', value: '$1,950', trend: 'Paid' }
        ]
      }
    ]
  },
  {
    id: 'pending-payments',
    title: '⏳ Pending Payments',
    description: 'Awaiting payments',
    blocks: [
      {
        id: 'pending-metrics',
        type: 'metric',
        title: 'Pending Amount',
        description: 'Total pending',
        value: '$12,300',
        trend: '15 pending',
        positive: false
      }
    ]
  },
  {
    id: 'overdue-payments',
    title: '🚨 Overdue Payments',
    description: 'Late payments',
    blocks: [
      {
        id: 'overdue-list',
        type: 'list',
        title: 'Overdue Accounts',
        description: 'Late payment tracking',
        data: [
          { id: 1, title: 'Unit 567 - Emily Davis', value: '$1,850', trend: '15 days late' },
          { id: 2, title: 'Unit 689 - Robert Wilson', value: '$2,200', trend: '8 days late' },
          { id: 3, title: 'Unit 712 - Lisa Brown', value: '$1,750', trend: '5 days late' }
        ]
      }
    ]
  },
  {
    id: 'payment-methods',
    title: '💰 Payment Methods',
    description: 'Payment options',
    blocks: [
      {
        id: 'method-chart',
        type: 'chart',
        title: 'Payment Distribution',
        description: 'Methods used',
        data: {
          chartType: 'pie',
          labels: ['Bank Transfer', 'Credit Card', 'Cash', 'Check'],
          values: [45, 30, 15, 10],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'payment-schedule',
    title: '📅 Payment Schedule',
    description: 'Upcoming due dates',
    blocks: [
      {
        id: 'schedule-list',
        type: 'list',
        title: 'This Week',
        description: 'Payments due',
        data: [
          { id: 1, title: 'Unit 204', value: '$1,850', trend: 'Due tomorrow' },
          { id: 2, title: 'Unit 312', value: '$2,100', trend: 'Due Friday' },
          { id: 3, title: 'Unit 456', value: '$1,950', trend: 'Due Saturday' }
        ]
      }
    ]
  },
  {
    id: 'payment-reminders',
    title: '🔔 Payment Reminders',
    description: 'Automated reminders',
    blocks: [
      {
        id: 'reminder-list',
        type: 'list',
        title: 'Active Reminders',
        description: 'Reminder settings',
        data: [
          { id: 1, title: 'Email Reminders', value: '3 days before', trend: 'Enabled' },
          { id: 2, title: 'SMS Reminders', value: '1 day before', trend: 'Enabled' },
          { id: 3, title: 'Push Notifications', value: 'On due date', trend: 'Enabled' }
        ]
      }
    ]
  }
];

const PaymentManagementPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Payments block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Payment Management</Text>
          <Text style={styles.headerSubtitle}>Process and track payments</Text>
        </View>

        <View style={styles.contentSection}>
          {paymentsSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>$8,450 received today</Text>
          <Text style={styles.footerSubtext}>15 pending payments</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PaymentManagementIndex: React.FC = () => {
  return <PaymentManagementPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
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

export default PaymentManagementIndex;