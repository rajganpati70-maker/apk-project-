/**
 * Invoice Management Page
 * Completely different page with 6 scrollable sections
 * Create and send invoices
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

const invoicesSections: ContentSection[] = [
  {
    id: 'invoice-overview',
    title: '📄 Invoice Overview',
    description: 'Invoice summary',
    blocks: [
      {
        id: 'total-invoices',
        type: 'metric',
        title: 'This Month',
        description: 'Invoices generated',
        value: '142',
        trend: '+12',
        positive: true
      },
      {
        id: 'total-amount',
        type: 'metric',
        title: 'Total Amount',
        description: 'Invoice value',
        value: '$284,500',
        trend: '+$9,500',
        positive: true
      }
    ]
  },
  {
    id: 'pending-invoices',
    title: '⏳ Pending Invoices',
    description: 'Unpaid invoices',
    blocks: [
      {
        id: 'pending-list',
        type: 'list',
        title: 'Awaiting Payment',
        description: 'Unpaid invoices',
        data: [
          { id: 1, title: 'INV-2024-142', value: '$1,850', trend: 'Overdue 5 days' },
          { id: 2, title: 'INV-2024-141', value: '$2,100', trend: 'Due tomorrow' },
          { id: 3, title: 'INV-2024-140', value: '$1,950', trend: 'Due in 3 days' }
        ]
      }
    ]
  },
  {
    id: 'invoice-templates',
    title: '📋 Invoice Templates',
    description: 'Pre-built templates',
    blocks: [
      {
        id: 'template-list',
        type: 'list',
        title: 'Available Templates',
        description: 'Quick invoice creation',
        data: [
          { id: 1, title: 'Standard Rental', value: 'Monthly rent', trend: 'Use' },
          { id: 2, title: 'Late Fee', value: 'Penalty charges', trend: 'Use' },
          { id: 3, title: 'Maintenance Fee', value: 'Service charges', trend: 'Use' }
        ]
      }
    ]
  },
  {
    id: 'invoice-history',
    title: '📜 Invoice History',
    description: 'Past invoices',
    blocks: [
      {
        id: 'history-list',
        type: 'list',
        title: 'Recent Paid',
        description: 'Recently paid invoices',
        data: [
          { id: 1, title: 'INV-2024-139', value: '$1,850', trend: 'Paid' },
          { id: 2, title: 'INV-2024-138', value: '$2,100', trend: 'Paid' },
          { id: 3, title: 'INV-2024-137', value: '$1,950', trend: 'Paid' }
        ]
      }
    ]
  },
  {
    id: 'invoice-analytics',
    title: '📊 Invoice Analytics',
    description: 'Invoice performance',
    blocks: [
      {
        id: 'payment-rate',
        type: 'metric',
        title: 'Payment Rate',
        description: 'On-time payments',
        value: '94%',
        trend: '+2%',
        positive: true
      }
    ]
  },
  {
    id: 'bulk-invoices',
    title: '📤 Bulk Invoices',
    description: 'Mass invoice generation',
    blocks: [
      {
        id: 'bulk-options',
        type: 'list',
        title: 'Bulk Actions',
        description: 'Generate multiple invoices',
        data: [
          { id: 1, title: 'Generate All', value: '142 invoices', trend: 'Process' },
          { id: 2, title: 'Generate by Property', value: 'Select property', trend: 'Process' },
          { id: 3, title: 'Generate by Date', value: 'Select date range', trend: 'Process' }
        ]
      }
    ]
  }
];

const InvoiceManagementPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Invoices block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Invoice Management</Text>
          <Text style={styles.headerSubtitle}>Create and send invoices</Text>
        </View>

        <View style={styles.contentSection}>
          {invoicesSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>142 invoices this month</Text>
          <Text style={styles.footerSubtext}>94% payment rate</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InvoiceManagementIndex: React.FC = () => {
  return <InvoiceManagementPage />;
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

export default InvoiceManagementIndex;