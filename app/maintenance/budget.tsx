/**
 * Budget Tracking Page
 * Completely different page with 6 scrollable sections
 * Track maintenance expenses
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

const budgetSections: ContentSection[] = [
  {
    id: 'budget-overview',
    title: '💰 Budget Overview',
    description: 'Current budget status',
    blocks: [
      {
        id: 'budget-used',
        type: 'metric',
        title: 'Budget Used',
        description: 'Monthly budget utilization',
        value: '$12,450',
        trend: '67%',
        positive: true
      },
      {
        id: 'remaining-budget',
        type: 'metric',
        title: 'Remaining Budget',
        description: 'Budget left for month',
        value: '$6,150',
        trend: '33%',
        positive: true
      }
    ]
  },
  {
    id: 'expense-breakdown',
    title: '💸 Expense Breakdown',
    description: 'Detailed expense analysis',
    blocks: [
      {
        id: 'expense-chart',
        type: 'chart',
        title: 'Expenses by Category',
        description: 'Maintenance expense distribution',
        data: {
          chartType: 'pie',
          labels: ['Repairs', 'Preventive', 'Emergency', 'Upgrades'],
          values: [45, 25, 20, 10],
          colors: ['#3B82F6', '#10B981', '#EF4444', '#F59E0B']
        }
      }
    ]
  },
  {
    id: 'cost-comparison',
    title: '📊 Cost Comparison',
    description: 'Monthly cost comparison',
    blocks: [
      {
        id: 'comparison-chart',
        type: 'chart',
        title: 'Monthly Cost Trend',
        description: 'This month vs last month',
        data: {
          chartType: 'bar',
          labels: ['Last Month', 'This Month'],
          values: [11500, 12450],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'budget-variance',
    title: '📈 Budget Variance',
    description: 'Budget vs actual comparison',
    blocks: [
      {
        id: 'variance-list',
        type: 'list',
        title: 'Budget vs Actual',
        description: 'Category-wise comparison',
        data: [
          { id: 1, title: 'Maintenance Budget', value: '$15,000 / $12,500', trend: '83% used' },
          { id: 2, title: 'Marketing Budget', value: '$5,000 / $3,200', trend: '64% used' },
          { id: 3, title: 'Utilities Budget', value: '$10,000 / $8,200', trend: '82% used' }
        ]
      }
    ]
  },
  {
    id: 'cost-saving',
    title: '💎 Cost Saving',
    description: 'Cost reduction opportunities',
    blocks: [
      {
        id: 'savings-list',
        type: 'list',
        title: 'Savings Opportunities',
        description: 'Potential cost reductions',
        data: [
          { id: 1, title: 'Vendor Negotiation', value: 'Potential: $500/mo', trend: 'High Impact' },
          { id: 2, title: 'Preventive Maintenance', value: 'Potential: $800/mo', trend: 'Medium Impact' },
          { id: 3, title: 'Bulk Purchasing', value: 'Potential: $300/mo', trend: 'Low Impact' }
        ]
      }
    ]
  },
  {
    id: 'budget-forecast',
    title: '🔮 Budget Forecast',
    description: 'Future budget projections',
    blocks: [
      {
        id: 'forecast-chart',
        type: 'chart',
        title: 'Budget Projection',
        description: '6-month budget forecast',
        data: {
          chartType: 'line',
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          values: [18000, 17500, 17000, 18500, 19000, 19500],
          color: '#10B981'
        }
      }
    ]
  }
];

const BudgetTrackingPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Budget block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Budget Tracking</Text>
          <Text style={styles.headerSubtitle}>Track maintenance expenses</Text>
        </View>

        <View style={styles.contentSection}>
          {budgetSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Budget: $18,600/month</Text>
          <Text style={styles.footerSubtext}>67% utilized</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const BudgetTrackingIndex: React.FC = () => {
  return <BudgetTrackingPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3C7',
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

export default BudgetTrackingIndex;