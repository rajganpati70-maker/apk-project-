/**
 * Budget Planning Page
 * Completely different page with 6 scrollable sections
 * Set and manage budgets
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
    title: '📊 Budget Overview',
    description: 'Total budget status',
    blocks: [
      {
        id: 'total-budget',
        type: 'metric',
        title: 'Monthly Budget',
        description: 'Total allocated budget',
        value: '$150,000',
        trend: '67% used',
        positive: true
      },
      {
        id: 'remaining',
        type: 'metric',
        title: 'Remaining',
        description: 'Budget left',
        value: '$49,500',
        trend: '33% available',
        positive: true
      }
    ]
  },
  {
    id: 'budget-categories',
    title: '💰 Budget Categories',
    description: 'Budget by type',
    blocks: [
      {
        id: 'category-chart',
        type: 'chart',
        title: 'Budget Distribution',
        description: 'Allocation by category',
        data: {
          chartType: 'pie',
          labels: ['Maintenance', 'Marketing', 'Utilities', 'Staff', 'Other'],
          values: [30, 15, 20, 25, 10],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
        }
      }
    ]
  },
  {
    id: 'budget-performance',
    title: '📈 Budget Performance',
    description: 'Budget vs actual',
    blocks: [
      {
        id: 'performance-list',
        type: 'list',
        title: 'Category Performance',
        description: 'Budget utilization',
        data: [
          { id: 1, title: 'Maintenance', value: '$12,500 / $15,000', trend: '83% used' },
          { id: 2, title: 'Marketing', value: '$3,200 / $5,000', trend: '64% used' },
          { id: 3, title: 'Utilities', value: '$8,200 / $10,000', trend: '82% used' }
        ]
      }
    ]
  },
  {
    id: 'budget-forecasts',
    title: '🔮 Budget Forecasts',
    description: 'Future projections',
    blocks: [
      {
        id: 'forecast-chart',
        type: 'chart',
        title: 'Budget Projection',
        description: '6-month forecast',
        data: {
          chartType: 'line',
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          values: [150000, 155000, 160000, 165000, 170000, 175000],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'budget-adjustments',
    title: '⚙️ Budget Adjustments',
    description: 'Modify budgets',
    blocks: [
      {
        id: 'adjustment-list',
        type: 'list',
        title: 'Pending Adjustments',
        description: 'Requested changes',
        data: [
          { id: 1, title: 'Maintenance +$2,000', value: 'Seasonal increase', trend: 'Approve' },
          { id: 2, title: 'Marketing +$1,000', value: 'Holiday campaign', trend: 'Review' },
          { id: 3, title: 'Staff +$500', value: 'New hire', trend: 'Pending' }
        ]
      }
    ]
  },
  {
    id: 'budget-alerts',
    title: '🚨 Budget Alerts',
    description: 'Overspending warnings',
    blocks: [
      {
        id: 'alert-list',
        type: 'list',
        title: 'Attention Required',
        description: 'Budget issues',
        data: [
          { id: 1, title: 'Insurance', value: '97% used', trend: 'Near limit' },
          { id: 2, title: 'Other', value: '92% used', trend: 'Monitor' }
        ]
      }
    ]
  }
];

const BudgetPlanningPage: React.FC = () => {
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
          <Text style={styles.headerTitle}>Budget Planning</Text>
          <Text style={styles.headerSubtitle}>Set and manage budgets</Text>
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
          <Text style={styles.footerText}>Budget: $150,000/month</Text>
          <Text style={styles.footerSubtext}>67% utilized</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const BudgetPlanningIndex: React.FC = () => {
  return <BudgetPlanningPage />;
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

export default BudgetPlanningIndex;