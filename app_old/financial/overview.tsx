/**
 * Financial Overview Page
 * Completely different page with 6 scrollable sections
 * Complete financial dashboard
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
    id: 'financial-summary',
    title: '💰 Financial Summary',
    description: 'Overall financial health',
    blocks: [
      {
        id: 'total-revenue',
        type: 'metric',
        title: 'Total Revenue',
        description: 'Monthly income',
        value: '$284,500',
        trend: '+$9,500',
        positive: true
      },
      {
        id: 'total-expenses',
        type: 'metric',
        title: 'Total Expenses',
        description: 'Monthly costs',
        value: '$125,800',
        trend: '-$3,200',
        positive: true
      },
      {
        id: 'net-profit',
        type: 'metric',
        title: 'Net Profit',
        description: 'Monthly profit',
        value: '$158,700',
        trend: '+$12,300',
        positive: true
      }
    ]
  },
  {
    id: 'revenue-breakdown',
    title: '📊 Revenue Breakdown',
    description: 'Revenue by source',
    blocks: [
      {
        id: 'revenue-chart',
        type: 'chart',
        title: 'Revenue Sources',
        description: 'Income distribution',
        data: {
          chartType: 'pie',
          labels: ['Rent', 'Fees', 'Services', 'Other'],
          values: [92, 5, 2, 1],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'expense-breakdown',
    title: '💸 Expense Breakdown',
    description: 'Expenses by category',
    blocks: [
      {
        id: 'expense-chart',
        type: 'chart',
        title: 'Expense Categories',
        description: 'Cost distribution',
        data: {
          chartType: 'bar',
          labels: ['Maintenance', 'Utilities', 'Insurance', 'Taxes'],
          values: [12500, 8200, 5800, 9500],
          color: '#EF4444'
        }
      }
    ]
  },
  {
    id: 'cash-flow',
    title: '💳 Cash Flow',
    description: 'Cash position',
    blocks: [
      {
        id: 'cash-metrics',
        type: 'metric',
        title: 'Cash Position',
        description: 'Available cash',
        value: '$45,200',
        trend: '+$8,100',
        positive: true
      }
    ]
  },
  {
    id: 'financial-trends',
    title: '📈 Financial Trends',
    description: 'Historical performance',
    blocks: [
      {
        id: 'trend-chart',
        type: 'chart',
        title: '6-Month Trend',
        description: 'Revenue over time',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [245000, 252000, 261000, 268000, 275000, 284500],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'financial-alerts',
    title: '🚨 Financial Alerts',
    description: 'Items needing attention',
    blocks: [
      {
        id: 'alert-list',
        type: 'list',
        title: 'Attention Required',
        description: 'Financial issues',
        data: [
          { id: 1, title: 'Overdue Payments', value: '$4,800', trend: '8 pending' },
          { id: 2, title: 'Budget Variance', value: '+$2,300', trend: 'Monitor' },
          { id: 3, title: 'Tax Deadline', value: 'Q3 Due', trend: '15 days' }
        ]
      }
    ]
  }
];

const FinancialOverviewPage: React.FC = () => {
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
          <Text style={styles.headerTitle}>Financial Overview</Text>
          <Text style={styles.headerSubtitle}>Complete financial dashboard</Text>
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
          <Text style={styles.footerText}>Net profit: $158,700/mo</Text>
          <Text style={styles.footerSubtext}>Profit margin: 55.7%</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const FinancialOverviewIndex: React.FC = () => {
  return <FinancialOverviewPage />;
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

export default FinancialOverviewIndex;