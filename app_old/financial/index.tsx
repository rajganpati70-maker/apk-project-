/**
 * Financial Page
 * Completely different financial page with 6 scrollable sections
 * Unique content for financial management and reporting
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
import { NavigationItem } from '../../src/components/navigation';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../src/components/content';
import { NavigationItem as NavigationItemType, ContentBlock, ContentSection } from '../../src/types';

/**
 * Financial Page Content - 6 Unique Scrollable Sections
 */
const financialSections: ContentSection[] = [
  {
    id: 'financial-overview',
    title: '💰 Financial Overview',
    description: 'Complete financial dashboard summary',
    blocks: [
      {
        id: 'monthly-revenue',
        type: 'metric',
        title: 'Monthly Revenue',
        description: 'Total income this month',
        value: '$284,500',
        trend: '+$12,500',
        positive: true
      },
      {
        id: 'monthly-expenses',
        type: 'metric',
        title: 'Monthly Expenses',
        description: 'Total operating costs',
        value: '$90,200',
        trend: '+$3,200',
        positive: false
      },
      {
        id: 'net-profit',
        type: 'metric',
        title: 'Net Profit',
        description: 'Revenue minus expenses',
        value: '$194,300',
        trend: '+$9,300',
        positive: true
      }
    ]
  },
  {
    id: 'payments-management',
    title: '💳 Payments Management',
    description: 'Rent collection and payment tracking',
    blocks: [
      {
        id: 'collected-rent',
        type: 'metric',
        title: 'Rent Collected',
        description: 'Total rent collected this month',
        value: '$267,200',
        trend: '+$11,200',
        positive: true
      },
      {
        id: 'pending-payments',
        type: 'metric',
        title: 'Pending Payments',
        description: 'Outstanding rent payments',
        value: '$17,300',
        trend: '-$2,100',
        positive: true
      },
      {
        id: 'collection-rate',
        type: 'metric',
        title: 'Collection Rate',
        description: 'Percentage of rent collected on time',
        value: '94.8%',
        trend: '+2.3%',
        positive: true
      }
    ]
  },
  {
    id: 'expenses-tracking',
    title: '� Expenses Tracking',
    description: 'Operating costs and expense categories',
    blocks: [
      {
        id: 'expense-breakdown',
        type: 'chart',
        title: 'Expense Breakdown',
        description: 'Spending by category',
        data: {
          chartType: 'pie',
          labels: ['Maintenance', 'Utilities', 'Insurance', 'Taxes', 'Other'],
          values: [32000, 18000, 15000, 12000, 13200],
          colors: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
        }
      },
      {
        id: 'expense-trend',
        type: 'chart',
        title: 'Expense Trend',
        description: 'Monthly expense comparison',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [85000, 88000, 82000, 91000, 87000, 90200],
          color: '#EF4444'
        }
      }
    ]
  },
  {
    id: 'invoices-management',
    title: '� Invoices Management',
    description: 'Invoice creation and tracking',
    blocks: [
      {
        id: 'total-invoices',
        type: 'metric',
        title: 'Total Invoices',
        description: 'Invoices issued this month',
        value: '142',
        trend: '+12',
        positive: true
      },
      {
        id: 'paid-invoices',
        type: 'metric',
        title: 'Paid Invoices',
        description: 'Invoices fully paid',
        value: '118',
        trend: '+8',
        positive: true
      },
      {
        id: 'outstanding-invoices',
        type: 'list',
        title: 'Outstanding Invoices',
        description: 'Unpaid invoices awaiting payment',
        data: [
          { id: 1, title: 'Invoice #1042 - ABC Corp', value: '$4,500', trend: '15 days overdue' },
          { id: 2, title: 'Invoice #1043 - XYZ LLC', value: '$2,800', trend: '8 days overdue' },
          { id: 3, title: 'Invoice #1044 - Metro Inc', value: '$1,200', trend: '3 days overdue' }
        ]
      }
    ]
  },
  {
    id: 'budget-management',
    title: '� Budget Management',
    description: 'Budget planning and variance analysis',
    blocks: [
      {
        id: 'budget-utilization',
        type: 'metric',
        title: 'Budget Utilization',
        description: 'Percentage of budget used',
        value: '87.3%',
        trend: '+2.1%',
        positive: false
      },
      {
        id: 'remaining-budget',
        type: 'metric',
        title: 'Remaining Budget',
        description: 'Budget left for the month',
        value: '$42,800',
        trend: '-$12,200',
        positive: true
      },
      {
        id: 'budget-variance',
        type: 'chart',
        title: 'Budget Variance',
        description: 'Actual vs budgeted spending',
        data: {
          chartType: 'bar',
          labels: ['Under', 'On Target', 'Over'],
          values: [45, 82, 23],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'taxes-compliance',
    title: '🏛️ Taxes & Compliance',
    description: 'Tax reporting and regulatory compliance',
    blocks: [
      {
        id: 'tax-liability',
        type: 'metric',
        title: 'Current Tax Liability',
        description: 'Estimated tax obligation',
        value: '$28,450',
        trend: '+$1,200',
        positive: false
      },
      {
        id: 'tax-deductions',
        type: 'metric',
        title: 'Tax Deductions',
        description: 'Total deductible expenses',
        value: '$45,200',
        trend: '+$3,100',
        positive: true
      },
      {
        id: 'compliance-status',
        type: 'metric',
        title: 'Compliance Status',
        description: 'Regulatory compliance rating',
        value: 'Compliant',
        trend: '100%',
        positive: true
      }
    ]
  }
];

/**
 * Financial Page Component
 */
const FinancialPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for financial
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'financial-overview',
      title: 'Financial Overview',
      description: 'Complete financial dashboard',
      icon: '�',
      route: '/financial/overview',
    },
    {
      id: 'payments-management',
      title: 'Payments Management',
      description: 'Rent collection tracking',
      icon: '💳',
      route: '/financial/payments',
      badge: '5',
    },
    {
      id: 'expenses-tracking',
      title: 'Expenses Tracking',
      description: 'Operating costs',
      icon: '�',
      route: '/financial/expenses',
    },
    {
      id: 'invoices-management',
      title: 'Invoices Management',
      description: 'Invoice tracking',
      icon: '📄',
      route: '/financial/invoices',
    },
    {
      id: 'budget-management',
      title: 'Budget Management',
      description: 'Budget planning',
      icon: '�',
      route: '/financial/budget',
    },
    {
      id: 'taxes-compliance',
      title: 'Taxes & Compliance',
      description: 'Tax reporting',
      icon: '🏛️',
      route: '/financial/taxes',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Financial sub-navigation:', item.route);
    const routeMap: Record<string, string> = {
      '/financial/overview': 'FinancialOverview',
      '/financial/payments': 'FinancialPayments',
      '/financial/expenses': 'FinancialExpenses',
      '/financial/invoices': 'FinancialInvoices',
      '/financial/budget': 'FinancialBudget',
      '/financial/taxes': 'FinancialTaxes',
    };
    
    const screenName = routeMap[item.route];
    if (screenName && navigation) {
      navigation.navigate(screenName);
    }
  }, [navigation]);

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
    console.log('Financial block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Financial Management</Text>
          <Text style={styles.headerSubtitle}>Track revenue, expenses, and profits</Text>
        </View>

        {/* Sub-navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Financial Tools</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
            />
          ))}
        </View>

        {/* Financial Sections */}
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

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Financial data updated in real-time</Text>
          <Text style={styles.footerSubtext}>Last sync: Just now</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const FinancialIndex: React.FC<{ navigation: any }> = ({ navigation }) => {
  return <FinancialPage navigation={navigation} />;
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  navigationSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  contentSection: {
    marginTop: 16,
  },
  footer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default FinancialIndex;