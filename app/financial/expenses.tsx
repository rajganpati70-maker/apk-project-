/**
 * Expense Management Page
 * Completely different page with 6 scrollable sections
 * Categorize and track expenses
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

const expensesSections: ContentSection[] = [
  {
    id: 'expense-overview',
    title: '💸 Expense Overview',
    description: 'Total expenses summary',
    blocks: [
      {
        id: 'total-expenses',
        type: 'metric',
        title: 'Monthly Expenses',
        description: 'Total operating costs',
        value: '$125,800',
        trend: '-$3,200',
        positive: true
      }
    ]
  },
  {
    id: 'expense-categories',
    title: '📊 Expense Categories',
    description: 'Breakdown by type',
    blocks: [
      {
        id: 'category-chart',
        type: 'chart',
        title: 'Expense Distribution',
        description: 'Costs by category',
        data: {
          chartType: 'pie',
          labels: ['Maintenance', 'Utilities', 'Insurance', 'Taxes', 'Other'],
          values: [12500, 8200, 5800, 9500, 9200],
          colors: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6']
        }
      }
    ]
  },
  {
    id: 'recent-expenses',
    title: '📋 Recent Expenses',
    description: 'Latest costs',
    blocks: [
      {
        id: 'expense-list',
        type: 'list',
        title: 'This Week',
        description: 'Recent spending',
        data: [
          { id: 1, title: 'HVAC Repair', value: '$450', trend: 'Unit 204' },
          { id: 2, title: 'Water Bill', value: '$820', trend: 'Building A' },
          { id: 3, title: 'Insurance Premium', value: '$1,200', trend: 'Annual' }
        ]
      }
    ]
  },
  {
    id: 'expense-trends',
    title: '📈 Expense Trends',
    description: 'Historical data',
    blocks: [
      {
        id: 'trend-chart',
        type: 'chart',
        title: 'Monthly Expenses',
        description: 'Spending over time',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [129000, 127000, 126000, 128000, 126000, 125800],
          color: '#EF4444'
        }
      }
    ]
  },
  {
    id: 'budget-vs-actual',
    title: '⚖️ Budget vs Actual',
    description: 'Budget comparison',
    blocks: [
      {
        id: 'budget-list',
        type: 'list',
        title: 'Budget Performance',
        description: 'Category variance',
        data: [
          { id: 1, title: 'Maintenance', value: '$12,500 / $15,000', trend: '83% used' },
          { id: 2, title: 'Utilities', value: '$8,200 / $10,000', trend: '82% used' },
          { id: 3, title: 'Insurance', value: '$5,800 / $6,000', trend: '97% used' }
        ]
      }
    ]
  },
  {
    id: 'expense-approvals',
    title: '✅ Expense Approvals',
    description: 'Pending approvals',
    blocks: [
      {
        id: 'approval-list',
        type: 'list',
        title: 'Awaiting Approval',
        description: 'Expenses needing review',
        data: [
          { id: 1, title: 'Emergency Repair', value: '$2,500', trend: 'Urgent' },
          { id: 2, title: 'Equipment Purchase', value: '$1,800', trend: 'Pending' },
          { id: 3, title: 'Service Contract', value: '$3,200', trend: 'Pending' }
        ]
      }
    ]
  }
];

const ExpenseManagementPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Expenses block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Expense Management</Text>
          <Text style={styles.headerSubtitle}>Categorize and track expenses</Text>
        </View>

        <View style={styles.contentSection}>
          {expensesSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Monthly expenses: $125,800</Text>
          <Text style={styles.footerSubtext}>3 pending approvals</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ExpenseManagementIndex: React.FC = () => {
  return <ExpenseManagementPage />;
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

export default ExpenseManagementIndex;