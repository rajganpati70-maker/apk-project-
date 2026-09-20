/**
 * Accounting Tab Screen - Premium Black Theme
 * Advanced financial management with deep content and premium design
 * Designed by top-tier UI/UX professionals
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  LinearGradient,
  Platform,
} from 'react-native';
import { useNavigation } from '../context/NavigationContext';
import { NavigationItem } from '../components/navigation';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../components/content';
import FloatingFooter from '../components/FloatingFooter';
import { NavigationItem as NavigationItemType, ContentBlock, ContentBlockType, MetricBlockData, ListBlockData, ListItem } from '../types/navigation';
import { saveScrollPosition } from '../utils/scrollStateManager';

// Import sub-pages
import AccountingExpensesPage from '../pages/accounting/AccountingExpensesPage';

const { width, height } = Dimensions.get('window');

const AccountingTab: React.FC = () => {
  const { navigate, currentRoute, goBack } = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('main');
  const scrollY = useRef(new Animated.Value(0));
  const headerOpacity = useRef(new Animated.Value(1));
  const scaleValue = useRef(new Animated.Value(1));

  useEffect(() => {
    if (currentRoute === '/accounting/expenses') {
      setCurrentPage('expenses');
    } else {
      setCurrentPage('main');
    }
  }, [currentRoute]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
    [
      {
        nativeEvent: ({ contentOffset: { y } }) => {
          scrollY.current.setValue(y);
          const headerOpacityValue = Math.max(0, 1 - y / 200);
          headerOpacity.current.setValue(headerOpacityValue);
          const scaleValueCalc = Math.max(0.95, 1 - y / 1000);
          scaleValue.current.setValue(scaleValueCalc);
          saveScrollPosition(currentRoute, y);
        },
      },
    ],
    { useNativeDriver: true }
  );

  const navigationItems: NavigationItemType[] = [
    {
      id: 'financial-overview',
      title: 'Financial Overview',
      description: 'Complete financial dashboard',
      icon: '📊',
      route: '/accounting/overview',
      accessibilityLabel: 'Financial Overview',
      accessibilityHint: 'View financial overview',
    },
    {
      id: 'expense-tracking',
      title: 'Expense Tracking',
      description: 'Track and categorize expenses',
      icon: '💸',
      route: '/accounting/expenses',
      badge: 15,
      accessibilityLabel: 'Expense Tracking',
      accessibilityHint: 'View expense tracking',
    },
    {
      id: 'profit-loss',
      title: 'Profit & Loss',
      description: 'Monthly P&L statements',
      icon: '📈',
      route: '/accounting/profit-loss',
      accessibilityLabel: 'Profit & Loss',
      accessibilityHint: 'View profit and loss',
    },
    {
      id: 'reports',
      title: 'Financial Reports',
      description: 'Generate and download reports',
      icon: '📑',
      route: '/accounting/reports',
      accessibilityLabel: 'Financial Reports',
      accessibilityHint: 'View financial reports',
    },
  ];

  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    saveScrollPosition(currentRoute, 0);
    navigate(item.route, { 
      itemId: item.id,
      breadcrumb: { label: item.title, route: item.route, id: item.id }
    });
  }, [navigate, currentRoute]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Accounting block pressed:', block.id);
  }, []);

  const renderContentBlock = useCallback((block: ContentBlock) => {
    return (
      <ContentBlockRenderer
        block={block}
        onPress={handleBlockPress}
      />
    );
  }, [handleBlockPress]);

  if (currentPage === 'expenses') {
    return (
      <>
        <AccountingExpensesPage />
        <FloatingFooter context="Accounting" />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Hero Section */}
        <Animated.View style={[styles.heroSection, { opacity: headerOpacity.current }]}>
          <LinearGradient
            colors={['#0a0a0a', '#1a1a2e', '#16213e', '#0f3460']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroBadge}>📊 ACCOUNTING</Text>
              <Text style={styles.heroTitle}>Complete Financial{'\n'}Management System</Text>
              <Text style={styles.heroSubtitle}>Track expenses, manage budgets, and analyze financial performance with intelligent reporting and real-time insights</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>$158.7K</Text>
                  <Text style={styles.heroStatLabel}>Revenue</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>$125.8K</Text>
                  <Text style={styles.heroStatLabel}>Expenses</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>+20.8%</Text>
                  <Text style={styles.heroStatLabel}>Profit</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View style={[styles.quickActionsBanner, { transform: [{ scale: scaleValue.current }] }]}>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>➕</Text>
              <Text style={styles.quickActionLabel}>Add Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionLabel}>Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>💰</Text>
              <Text style={styles.quickActionLabel}>Invoices</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📉</Text>
              <Text style={styles.quickActionLabel}>Budget</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Navigation Items */}
        <Animated.View style={[styles.navigationSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>Financial Management</Text>
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
              testID={`accounting-nav-${item.id}`}
            />
          ))}
        </Animated.View>

        {/* Financial Overview */}
        <Animated.View style={[styles.financialOverview, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💰 Financial Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$158.7K</Text>
                <Text style={styles.overviewLabel}>Total Revenue</Text>
                <Text style={styles.overviewTrend}>↑ 18.5%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$125.8K</Text>
                <Text style={styles.overviewLabel}>Total Expenses</Text>
                <Text style={styles.overviewTrend}>↓ 3.2%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$32.9K</Text>
                <Text style={styles.overviewLabel}>Net Profit</Text>
                <Text style={styles.overviewTrend}>↑ 20.8%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>20.7%</Text>
                <Text style={styles.overviewLabel}>Profit Margin</Text>
                <Text style={styles.overviewTrend}>↑ 5.4%</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        {/* Expense Categories */}
        <Animated.View style={[styles.expenseCategories, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💸 Expense Categories</Text>
          <View style={styles.categoriesList}>
            {[
              { category: 'Maintenance & Repairs', amount: '$15,000', percentage: 12, color: '#667eea', icon: '🔧' },
              { category: 'Utilities', amount: '$8,200', percentage: 6.5, color: '#f093fb', icon: '⚡' },
              { category: 'Insurance', amount: '$5,800', percentage: 4.6, color: '#4facfe', icon: '🛡️' },
              { category: 'Property Taxes', amount: '$9,500', percentage: 7.5, color: '#43e97b', icon: '🏛️' },
              { category: 'Staff Salaries', amount: '$28,000', percentage: 22.3, color: '#f5576c', icon: '👥' },
              { category: 'Marketing', amount: '$12,000', percentage: 9.5, color: '#ffd700', icon: '📢' },
            ].map((item, index) => (
              <View key={index} style={styles.categoryCard}>
                <View style={[styles.categoryIconContainer, { backgroundColor: item.color }]}>
                  <Text style={styles.categoryIcon}>{item.icon}</Text>
                </View>
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>{item.category}</Text>
                  <View style={styles.categoryBarContainer}>
                    <View style={[styles.categoryBar, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
                  </View>
                </View>
                <View style={styles.categoryAmount}>
                  <Text style={styles.categoryAmountValue}>{item.amount}</Text>
                  <Text style={styles.categoryPercentage}>{item.percentage}%</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View style={[styles.transactionsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Recent Transactions</Text>
          {[
            { description: 'HVAC Repair - Building A', amount: '$2,450', type: 'Expense', date: 'Sep 19, 2024', vendor: 'ABC HVAC Services', color: '#f5576c' },
            { description: 'Electricity Bill - Complex B', amount: '$3,200', type: 'Expense', date: 'Sep 18, 2024', vendor: 'City Electric Company', color: '#f5576c' },
            { description: 'Rent Collection - Unit 42', amount: '$1,850', type: 'Income', date: 'Sep 18, 2024', vendor: 'John Smith', color: '#43e97b' },
            { description: 'Insurance Premium - All Properties', amount: '$5,800', type: 'Expense', date: 'Sep 15, 2024', vendor: 'SafeGuard Insurance', color: '#f5576c' },
            { description: 'Rent Collection - Unit 87', amount: '$1,200', type: 'Income', date: 'Sep 15, 2024', vendor: 'Sarah Johnson', color: '#43e97b' },
          ].map((transaction, index) => (
            <View key={index} style={styles.transactionCard}>
              <View style={[styles.transactionTypeDot, { backgroundColor: transaction.color }]} />
              <View style={styles.transactionContent}>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
                <Text style={styles.transactionVendor}>{transaction.vendor}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={[styles.transactionAmountValue, { color: transaction.color }]}>{transaction.type === 'Income' ? '+' : '-'}{transaction.amount}</Text>
                <Text style={styles.transactionType}>{transaction.type}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Budget Tracking */}
        <Animated.View style={[styles.budgetSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📉 Budget Tracking</Text>
          <View style={styles.budgetList}>
            {[
              { budget: 'Monthly Operating', allocated: '$100,000', spent: '$95,200', remaining: '$4,800', percentage: 95, color: '#667eea' },
              { budget: 'Maintenance Fund', allocated: '$15,000', spent: '$12,800', remaining: '$2,200', percentage: 85, color: '#f093fb' },
              { budget: 'Marketing Budget', allocated: '$8,000', spent: '$6,500', remaining: '$1,500', percentage: 81, color: '#4facfe' },
              { budget: 'Emergency Fund', allocated: '$20,000', spent: '$5,000', remaining: '$15,000', percentage: 25, color: '#43e97b' },
            ].map((item, index) => (
              <View key={index} style={styles.budgetCard}>
                <View style={styles.budgetHeader}>
                  <Text style={styles.budgetName}>{item.budget}</Text>
                  <Text style={[styles.budgetPercentage, { color: item.color }]}>{item.percentage}% used</Text>
                </View>
                <View style={styles.budgetBarContainer}>
                  <View style={[styles.budgetBar, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
                </View>
                <View style={styles.budgetDetails}>
                  <View style={styles.budgetDetail}>
                    <Text style={styles.budgetDetailLabel}>Allocated</Text>
                    <Text style={styles.budgetDetailValue}>{item.allocated}</Text>
                  </View>
                  <View style={styles.budgetDetail}>
                    <Text style={styles.budgetDetailLabel}>Spent</Text>
                    <Text style={styles.budgetDetailValue}>{item.spent}</Text>
                  </View>
                  <View style={styles.budgetDetail}>
                    <Text style={styles.budgetDetailLabel}>Remaining</Text>
                    <Text style={[styles.budgetDetailValue, { color: item.color }]}>{item.remaining}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Profit & Loss */}
        <Animated.View style={[styles.profitLossSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📈 Profit & Loss Statement</Text>
          <View style={styles.plContainer}>
            <View style={styles.plRow}>
              <Text style={styles.plLabel}>Total Revenue</Text>
              <Text style={styles.plValuePositive}>+$158,700</Text>
            </View>
            <View style={styles.plRow}>
              <Text style={styles.plLabel}>Operating Expenses</Text>
              <Text style={styles.plValueNegative}>-$125,800</Text>
            </View>
            <View style={styles.plDivider} />
            <View style={styles.plRow}>
              <Text style={styles.plLabelBold}>Gross Profit</Text>
              <Text style={styles.plValuePositiveBold}>+$32,900</Text>
            </View>
            <View style={styles.plRow}>
              <Text style={styles.plLabel}>Taxes & Deductions</Text>
              <Text style={styles.plValueNegative}>-$8,500</Text>
            </View>
            <View style={styles.plDivider} />
            <View style={styles.plRow}>
              <Text style={styles.plLabelBold}>Net Profit</Text>
              <Text style={styles.plValuePositiveBold}>+$24,400</Text>
            </View>
          </View>
        </Animated.View>

        {/* Demo Content Sections */}
        <Animated.View style={[styles.contentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <ScrollingSectionContainer
            section={{
              id: 'accounting-analytics',
              title: '📊 Financial Analytics',
              description: 'Detailed financial performance metrics',
              blocks: [
                {
                  id: 'financial-metrics',
                  type: ContentBlockType.METRIC,
                  title: 'Average Monthly Expense',
                  data: {
                    value: 12580,
                    label: 'Per month',
                    change: -3.2,
                    changeType: 'decrease',
                    prefix: '$',
                    format: 'currency',
                  } as MetricBlockData,
                },
              ],
            }}
            renderBlock={renderContentBlock}
            onRefresh={handleRefresh}
            testID={`accounting-analytics`}
          />
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Advanced Financial Management System</Text>
        </View>
      </Animated.ScrollView>
      
      <FloatingFooter context="Accounting" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  heroGradient: {
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroBadge: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    color: '#667eea',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 50,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: width * 0.7,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 14,
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 24,
  },
  quickActionsBanner: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  quickActionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '600',
  },
  navigationSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  financialOverview: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  overviewCardGradient: {
    padding: 20,
  },
  overviewValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  overviewTrend: {
    fontSize: 12,
    color: '#43e97b',
    fontWeight: '600',
  },
  expenseCategories: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  categoriesList: {
    gap: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  categoryBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  categoryBar: {
    height: '100%',
    borderRadius: 3,
  },
  categoryAmount: {
    alignItems: 'flex-end',
  },
  categoryAmountValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  categoryPercentage: {
    fontSize: 12,
    color: '#888888',
  },
  transactionsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  transactionTypeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  transactionContent: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  transactionVendor: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#667eea',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  transactionType: {
    fontSize: 12,
    color: '#888888',
  },
  budgetSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  budgetList: {
    gap: 16,
  },
  budgetCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  budgetName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  budgetPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  budgetBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  budgetBar: {
    height: '100%',
    borderRadius: 4,
  },
  budgetDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetDetail: {
    alignItems: 'center',
  },
  budgetDetailLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  budgetDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profitLossSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  plContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  plRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  plLabel: {
    fontSize: 14,
    color: '#888888',
  },
  plLabelBold: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  plValuePositive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#43e97b',
  },
  plValuePositiveBold: {
    fontSize: 18,
    fontWeight: '800',
    color: '#43e97b',
  },
  plValueNegative: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f5576c',
  },
  plDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 12,
  },
  contentSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  footer: {
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
});

export default AccountingTab;