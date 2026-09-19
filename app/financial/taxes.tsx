/**
 * Tax Management Page
 * Completely different page with 6 scrollable sections
 * Tax reporting and planning
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

const taxSections: ContentSection[] = [
  {
    id: 'tax-overview',
    title: '📋 Tax Overview',
    description: 'Tax summary',
    blocks: [
      {
        id: 'ytd-taxes',
        type: 'metric',
        title: 'YTD Taxes Paid',
        description: 'Total taxes this year',
        value: '$45,200',
        trend: '+$3,500',
        positive: false
      },
      {
        id: 'tax-rate',
        type: 'metric',
        title: 'Effective Tax Rate',
        description: 'Overall tax percentage',
        value: '15.9%',
        trend: '-0.5%',
        positive: true
      }
    ]
  },
  {
    id: 'tax-deadlines',
    title: '📅 Tax Deadlines',
    description: 'Upcoming due dates',
    blocks: [
      {
        id: 'deadline-list',
        type: 'list',
        title: 'This Quarter',
        description: 'Tax filing deadlines',
        data: [
          { id: 1, title: 'Q3 Estimated Tax', value: 'Sep 15', trend: '15 days' },
          { id: 2, title: 'Property Tax', value: 'Oct 1', trend: '30 days' },
          { id: 3, title: 'Sales Tax', value: 'Oct 20', trend: '50 days' }
        ]
      }
    ]
  },
  {
    id: 'tax-deductions',
    title: '💰 Tax Deductions',
    description: 'Available deductions',
    blocks: [
      {
        id: 'deduction-list',
        type: 'list',
        title: 'Claimed Deductions',
        description: 'Tax write-offs',
        data: [
          { id: 1, title: 'Depreciation', value: '$12,500', trend: 'Claimed' },
          { id: 2, title: 'Mortgage Interest', value: '$8,200', trend: 'Claimed' },
          { id: 3, title: 'Operating Expenses', value: '$15,600', trend: 'Claimed' }
        ]
      }
    ]
  },
  {
    id: 'tax-documents',
    title: '📄 Tax Documents',
    description: 'Tax paperwork',
    blocks: [
      {
        id: 'document-list',
        type: 'list',
        title: 'Available Documents',
        description: 'Tax forms and reports',
        data: [
          { id: 1, title: '1099-MISC', value: 'PDF', trend: 'Ready' },
          { id: 2, title: 'Schedule E', value: 'PDF', trend: 'Ready' },
          { id: 3, title: 'Tax Summary', value: 'PDF', trend: 'Generate' }
        ]
      }
    ]
  },
  {
    id: 'tax-compliance',
    title: '✅ Tax Compliance',
    description: 'Compliance status',
    blocks: [
      {
        id: 'compliance-metrics',
        type: 'metric',
        title: 'Compliance Score',
        description: 'Tax compliance rating',
        value: '98%',
        trend: 'Excellent',
        positive: true
      }
    ]
  },
  {
    id: 'tax-planning',
    title: '🔮 Tax Planning',
    description: 'Future tax strategy',
    blocks: [
      {
        id: 'planning-list',
        type: 'list',
        title: 'Planning Options',
        description: 'Tax optimization',
        data: [
          { id: 1, title: '1031 Exchange', value: 'Defer gains', trend: 'Explore' },
          { id: 2, title: 'Cost Segregation', value: 'Increase deductions', trend: 'Explore' },
          { id: 3, title: 'Pass-Through Deduction', value: '20% deduction', trend: 'Apply' }
        ]
      }
    ]
  }
];

const TaxManagementPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Tax block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Tax Management</Text>
          <Text style={styles.headerSubtitle}>Tax reporting and planning</Text>
        </View>

        <View style={styles.contentSection}>
          {taxSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>YTD taxes: $45,200</Text>
          <Text style={styles.footerSubtext}>Effective rate: 15.9%</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TaxManagementIndex: React.FC = () => {
  return <TaxManagementPage />;
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

export default TaxManagementIndex;