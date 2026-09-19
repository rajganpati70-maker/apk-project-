/**
 * Financial Management Page
 * Completely different financial page with 6 scrollable sections
 * Unique content for revenue, expenses, and financial analytics
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
    description: 'Complete financial performance dashboard',
    blocks: [
      {
        id: 'total-revenue',
        type: 'metric',
        title: 'Total Monthly Revenue',
        description: 'All rental income and fees',
        value: '$124,500',
        trend: '+$8,200',
        positive: true
      },
      {
        id: 'total-expenses',
        type: 'metric',
        title: 'Total Monthly Expenses',
        description: 'All operating costs and fees',
        value: '$45,200',
        trend: '-$1,200',
        positive: true
      },
      {
        id: 'net-profit',
        type: 'metric',
        title: 'Net Monthly Profit',
        description: 'Revenue minus expenses',
        value: '$79,300',
        trend: '+$9,400',
        positive: true
      },
      {
        id: 'profit-margin',
        type: 'metric',
        title: 'Profit Margin',
        description: 'Profit as percentage of revenue',
        value: '63.7%',
        trend: '+4.2%',
        positive: true
      }
    ]
  },
  {
    id: 'revenue-analytics',
    title: '📈 Revenue Analytics',
    description: 'Detailed revenue breakdown and trends',
    blocks: [
      {
        id: 'revenue-sources',
        type: 'chart',
        title: 'Revenue by Source',
        description: 'Breakdown of income sources',
        data: {
          chartType: 'pie',
          labels: ['Rent', 'Fees', 'Services', 'Other'],
          values: [92, 5, 2, 1],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      },
      {
        id: 'revenue-trend',
        type: 'chart',
        title: 'Revenue Trend (6 Months)',
        description: 'Monthly revenue over time',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [108000, 112000, 118000, 121000, 119000, 124500],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'expense-tracking',
    title: '💸 Expense Tracking',
    description: 'Monitor and categorize all expenses',
    blocks: [
      {
        id: 'expense-categories',
        type: 'chart',
        title: 'Expenses by Category',
        description: 'Breakdown of spending categories',
        data: {
          chartType: 'bar',
          labels: ['Maintenance', 'Utilities', 'Insurance', 'Taxes', 'Other'],
          values: [12500, 8200, 5800, 9500, 9200],
          color: '#EF4444'
        }
      },
      {
        id: 'expense-trend',
        type: 'list',
        title: 'Expense Trend Analysis',
        description: 'Monthly expense comparison',
        data: [
          { id: 1, title: 'Maintenance', value: '$12,500', trend: '+8%' },
          { id: 2, title: 'Utilities', value: '$8,200', trend: '-2%' },
          { id: 3, title: 'Insurance', value: '$5,800', trend: '+5%' },
          { id: 4, title: 'Property Taxes', value: '$9,500', trend: '+3%' }
        ]
      }
    ]
  },
  {
    id: 'payment-tracking',
    title: '💳 Payment Tracking',
    description: 'Monitor incoming and outgoing payments',
    blocks: [
      {
        id: 'payments-received',
        type: 'metric',
        title: 'Payments Received Today',
        description: 'Total payments processed today',
        value: '$8,450',
        trend: '+$1,200',
        positive: true
      },
      {
        id: 'pending-payments',
        type: 'metric',
        title: 'Pending Payments',
        description: 'Awaiting tenant payments',
        value: '$12,300',
        trend: '15 pending',
        positive: false
      },
      {
        id: 'overdue-payments',
        type: 'metric',
        title: 'Overdue Payments',
        description: 'Late payments requiring attention',
        value: '$4,800',
        trend: '8 overdue',
        positive: false
      }
    ]
  },
  {
    id: 'budget-management',
    title: '📊 Budget Management',
    description: 'Track budgets and financial goals',
    blocks: [
      {
        id: 'budget-overview',
        type: 'list',
        title: 'Budget vs Actual',
        description: 'Current budget performance',
        data: [
          { id: 1, title: 'Maintenance Budget', value: '$15,000 / $12,500', trend: '83% used' },
          { id: 2, title: 'Marketing Budget', value: '$5,000 / $3,200', trend: '64% used' },
          { id: 3, title: 'Utilities Budget', value: '$10,000 / $8,200', trend: '82% used' },
          { id: 4, title: 'Capital Improvements', value: '$25,000 / $18,000', trend: '72% used' }
        ]
      },
      {
        id: 'savings-goals',
        type: 'metric',
        title: 'Reserve Fund Balance',
        description: 'Emergency and improvement reserves',
        value: '$125,000',
        trend: '+$15,000',
        positive: true
      }
    ]
  },
  {
    id: 'financial-reports',
    title: '📄 Financial Reports',
    description: 'Generate and view financial reports',
    blocks: [
      {
        id: 'report-types',
        type: 'list',
        title: 'Available Reports',
        description: 'Financial report templates',
        data: [
          { id: 1, title: 'Monthly P&L Statement', value: 'Last month', trend: 'Generate' },
          { id: 2, title: 'Quarterly Balance Sheet', value: 'Q2 2024', trend: 'Generate' },
          { id: 3, title: 'Annual Tax Summary', value: '2023', trend: 'Generate' },
          { id: 4, title: 'Cash Flow Statement', value: 'YTD', trend: 'Generate' }
        ]
      },
      {
        id: 'report-schedule',
        type: 'list',
        title: 'Scheduled Reports',
        description: 'Automated report generation',
        data: [
          { id: 1, title: 'Monthly Financial Report', value: '1st of each month', trend: 'Active' },
          { id: 2, title: 'Quarterly Tax Report', value: 'End of quarter', trend: 'Active' },
          { id: 3, title: 'Annual Budget Review', value: 'January 1st', trend: 'Scheduled' }
        ]
      }
    ]
  }
];

/**
 * Financial Page Component
 */
const FinancialPage: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for financial
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'financial-overview',
      title: 'Financial Overview',
      description: 'Complete financial dashboard',
      icon: '📊',
      route: '/financial/overview',
    },
    {
      id: 'payments',
      title: 'Payment Management',
      description: 'Process and track payments',
      icon: '💳',
      route: '/financial/payments',
    },
    {
      id: 'expenses',
      title: 'Expense Management',
      description: 'Categorize and track expenses',
      icon: '💸',
      route: '/financial/expenses',
    },
    {
      id: 'invoices',
      title: 'Invoice Management',
      description: 'Create and send invoices',
      icon: '📄',
      route: '/financial/invoices',
    },
    {
      id: 'budget',
      title: 'Budget Planning',
      description: 'Set and manage budgets',
      icon: '📊',
      route: '/financial/budget',
    },
    {
      id: 'taxes',
      title: 'Tax Management',
      description: 'Tax reporting and planning',
      icon: '�',
      route: '/financial/taxes',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Financial sub-navigation:', item.route);
    navigateToRoute(item.route);
  }, [navigateToRoute]);

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
          <Text style={styles.sectionTitle}>Financial Actions</Text>
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
          <Text style={styles.footerSubtext}>Next report due: July 1st</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const FinancialIndex: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  return <FinancialPage navigateToRoute={navigateToRoute} />;
};

/**
 * Styles
 */
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

export default FinancialIndex;