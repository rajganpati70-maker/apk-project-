/**
 * Financial Reports Page
 * Completely different page with 6 scrollable sections
 * Detailed financial analytics and reporting
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

/**
 * Financial Reports Content - 6 Unique Scrollable Sections
 */
const financialSections: ContentSection[] = [
  {
    id: 'revenue-breakdown',
    title: '💰 Revenue Breakdown',
    description: 'Detailed revenue analysis',
    blocks: [
      {
        id: 'monthly-revenue',
        type: 'metric',
        title: 'Monthly Revenue',
        description: 'Total revenue this month',
        value: '$284,500',
        trend: '+$9,500',
        positive: true
      },
      {
        id: 'revenue-chart',
        type: 'chart',
        title: 'Revenue by Source',
        description: 'Revenue distribution',
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
    id: 'expense-analysis',
    title: '💸 Expense Analysis',
    description: 'Detailed expense tracking',
    blocks: [
      {
        id: 'total-expenses',
        type: 'metric',
        title: 'Total Expenses',
        description: 'Monthly operating costs',
        value: '$125,800',
        trend: '-$3,200',
        positive: true
      },
      {
        id: 'expense-chart',
        type: 'chart',
        title: 'Expenses by Category',
        description: 'Expense breakdown',
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
    id: 'profit-analysis',
    title: '📈 Profit Analysis',
    description: 'Profit metrics and trends',
    blocks: [
      {
        id: 'net-profit',
        type: 'metric',
        title: 'Net Profit',
        description: 'Monthly profit after expenses',
        value: '$158,700',
        trend: '+$12,300',
        positive: true
      },
      {
        id: 'profit-margin',
        type: 'metric',
        title: 'Profit Margin',
        description: 'Profit as percentage of revenue',
        value: '55.7%',
        trend: '+3.2%',
        positive: true
      }
    ]
  },
  {
    id: 'cash-flow',
    title: '💳 Cash Flow',
    description: 'Cash flow analysis',
    blocks: [
      {
        id: 'cash-position',
        type: 'metric',
        title: 'Cash Position',
        description: 'Current cash on hand',
        value: '$45,200',
        trend: '+$8,100',
        positive: true
      },
      {
        id: 'cash-flow-chart',
        type: 'chart',
        title: 'Cash Flow Trend',
        description: 'Monthly cash flow over time',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [35000, 38000, 32000, 41000, 37000, 45200],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'budget-performance',
    title: '📊 Budget Performance',
    description: 'Budget vs actual comparison',
    blocks: [
      {
        id: 'budget-variance',
        type: 'metric',
        title: 'Budget Variance',
        description: 'Difference from budget',
        value: '+$12,300',
        trend: 'Under budget',
        positive: true
      },
      {
        id: 'budget-chart',
        type: 'chart',
        title: 'Budget vs Actual',
        description: 'Budget performance by category',
        data: {
          chartType: 'bar',
          labels: ['Maintenance', 'Marketing', 'Utilities', 'Other'],
          values: [
            { name: 'Budget', data: [15000, 5000, 10000, 8000], color: '#3B82F6' },
            { name: 'Actual', data: [12500, 3200, 8200, 6200], color: '#10B981' }
          ]
        }
      }
    ]
  },
  {
    id: 'financial-forecasts',
    title: '🔮 Financial Forecasts',
    description: 'Future financial projections',
    blocks: [
      {
        id: 'forecast-revenue',
        type: 'chart',
        title: 'Revenue Forecast',
        description: 'Predicted revenue for next 6 months',
        data: {
          chartType: 'line',
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          values: [295000, 305000, 315000, 325000, 335000, 345000],
          color: '#F59E0B'
        }
      },
      {
        id: 'growth-projection',
        type: 'metric',
        title: 'Projected Growth',
        description: 'Expected annual growth rate',
        value: '12.5%',
        trend: '+2.1%',
        positive: true
      }
    ]
  }
];

/**
 * Financial Reports Page Component
 */
const FinancialReportsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Financial block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Financial Reports</Text>
          <Text style={styles.headerSubtitle}>Detailed financial analytics and reporting</Text>
        </View>

        <View style={styles.contentSection}>
          {financialSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Financial data updated daily</Text>
          <Text style={styles.footerSubtext}>Last sync: Today</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const FinancialReportsIndex: React.FC = () => {
  return <FinancialReportsPage />;
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

export default FinancialReportsIndex;