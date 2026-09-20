/**
 * Accounting Expenses Page - Premium Black Theme
 * Advanced expense tracking with deep content and premium design
 * Designed by top-tier UI/UX professionals with 15+ years experience
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
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
import { useNavigation } from '../../context/NavigationContext';
import { saveScrollPosition } from '../../utils/scrollStateManager';

const { width, height } = Dimensions.get('window');

const AccountingExpensesPage: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const scrollY = useRef(new Animated.Value(0));
  const headerOpacity = useRef(new Animated.Value(1));
  const scaleValue = useRef(new Animated.Value(1));

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>← Back to Accounting</Text>
      </TouchableOpacity>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.heroSection, { opacity: headerOpacity.current }]}>
          <LinearGradient
            colors={['#0a0a0a', '#1a1a2e', '#16213e', '#0f3460']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroBadge}>💸 EXPENSE TRACKING</Text>
              <Text style={styles.heroTitle}>Complete Expense{'\n'}Management System</Text>
              <Text style={styles.heroSubtitle}>Track $125,800 in monthly expenses with intelligent categorization, budget tracking, and vendor management</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>$125.8K</Text>
                  <Text style={styles.heroStatLabel}>Total</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>15</Text>
                  <Text style={styles.heroStatLabel}>Categories</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>-3.2%</Text>
                  <Text style={styles.heroStatLabel}>Trend</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.overviewSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Expense Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$125,800</Text>
                <Text style={styles.overviewLabel}>Total Expenses</Text>
                <Text style={styles.overviewTrend}>↓ 3.2%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$806</Text>
                <Text style={styles.overviewLabel}>Per Property</Text>
                <Text style={styles.overviewTrend}>↓ 2.1%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>78.9%</Text>
                <Text style={styles.overviewLabel}>Budget Used</Text>
                <Text style={styles.overviewTrend}>Within Range</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>24</Text>
                <Text style={styles.overviewLabel}>Transactions</Text>
                <Text style={styles.overviewTrend}>This Month</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.categoriesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📂 Expense Categories</Text>
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

        <Animated.View style={[styles.recentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Recent Expenses</Text>
          {[
            { description: 'HVAC Repair - Building A', amount: '$2,450', type: 'Expense', date: 'Sep 19, 2024', vendor: 'ABC HVAC Services', color: '#f5576c' },
            { description: 'Electricity Bill - Complex B', amount: '$3,200', type: 'Expense', date: 'Sep 18, 2024', vendor: 'City Electric Company', color: '#f5576c' },
            { description: 'Insurance Premium - All Properties', amount: '$5,800', type: 'Expense', date: 'Sep 15, 2024', vendor: 'SafeGuard Insurance', color: '#f5576c' },
            { description: 'Plumbing Repair - Unit 42', amount: '$850', type: 'Expense', date: 'Sep 14, 2024', vendor: 'Quick Plumbing Pro', color: '#f5576c' },
            { description: 'Security Service - Monthly', amount: '$2,500', type: 'Expense', date: 'Sep 13, 2024', vendor: 'SafeGuard Security', color: '#f5576c' },
          ].map((item, index) => (
            <View key={index} style={styles.expenseCard}>
              <View style={[styles.expenseTypeDot, { backgroundColor: item.color }]} />
              <View style={styles.expenseContent}>
                <Text style={styles.expenseDescription}>{item.description}</Text>
                <Text style={styles.expenseVendor}>{item.vendor}</Text>
                <Text style={styles.expenseDate}>{item.date}</Text>
              </View>
              <View style={styles.expenseAmount}>
                <Text style={[styles.expenseAmountValue, { color: item.color }]}>{item.amount}</Text>
                <Text style={styles.expenseType}>{item.type}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

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

        <Animated.View style={[styles.vendorsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>👥 Top Vendors</Text>
          {[
            { name: 'ABC HVAC Services', category: 'HVAC', spent: '$8,450', rating: '4.8', color: '#667eea' },
            { name: 'City Electric Company', category: 'Utilities', spent: '$12,800', rating: '4.9', color: '#f093fb' },
            { name: 'SafeGuard Insurance', category: 'Insurance', spent: '$5,800', rating: '4.9', color: '#43e97b' },
            { name: 'Quick Plumbing Pro', category: 'Plumbing', spent: '$4,200', rating: '4.7', color: '#4facfe' },
          ].map((item, index) => (
            <View key={index} style={styles.vendorCard}>
              <View style={[styles.vendorRatingBadge, { backgroundColor: item.color }]}>
                <Text style={styles.vendorRatingText}>⭐ {item.rating}</Text>
              </View>
              <View style={styles.vendorContent}>
                <Text style={styles.vendorName}>{item.name}</Text>
                <Text style={styles.vendorCategory}>{item.category}</Text>
                <Text style={styles.vendorSpent}>Spent: {item.spent}</Text>
              </View>
              <TouchableOpacity style={styles.vendorContactButton}>
                <Text style={styles.vendorContactText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.trendsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📈 Expense Trends</Text>
          <View style={styles.trendsContainer}>
            {[
              { month: 'June', expense: '$130,200', change: '+5.2%' },
              { month: 'July', expense: '$128,500', change: '-1.3%' },
              { month: 'August', expense: '$125,800', change: '-2.1%' },
              { month: 'September', expense: '$125,800', change: '0%' },
            ].map((item, index) => (
              <View key={index} style={styles.trendRow}>
                <View style={styles.trendMonth}>
                  <Text style={styles.trendMonthText}>{item.month}</Text>
                </View>
                <View style={styles.trendBarContainer}>
                  <View style={[styles.trendBar, { width: `${(parseFloat(item.expense.replace('$', '').replace(',', '')) / 130200) * 100}%`, backgroundColor: '#667eea' }]} />
                </View>
                <View style={styles.trendData}>
                  <Text style={styles.trendExpense}>{item.expense}</Text>
                  <Text style={[styles.trendChange, { color: item.change.includes('+') ? '#f5576c' : '#43e97b' }]}>{item.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[savingsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">💰 Savings Opportunities</Text>
          {[
            { opportunity: 'Bulk Vendor Discounts', potential: '$2,400/month', description: 'Consolidate vendors for better rates', icon: '💼', color: '#43e97b' },
            { opportunity: 'Energy Efficiency', potential: '$1,800/month', description: 'Upgrade to LED and smart thermostats', icon: '⚡', color: '#667eea' },
            { opportunity: 'Insurance Review', potential: '$950/month', description: 'Shop for better insurance rates', icon: '🛡️', color: '#f093fb' },
            { opportunity: 'Staff Optimization', potential: '$3,200/month', description: 'Optimize staff scheduling', icon: '👥', color: '#4facfe' },
          ].map((item, index) => (
            <View key={index} style={styles.savingsCard}>
              <View style={[styles.savingsIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.savingsIcon}>{item.icon}</Text>
              </View>
              <View style={styles.savingsContent}>
                <Text style={styles.savingsOpportunity}>{item.opportunity}</Text>
                <Text style={styles.savingsDescription}>{item.description}</Text>
              </View>
              <View style={styles.savingsPotential}>
                <Text style={[styles.savingsPotentialValue, { color: item.color }]}>{item.potential}</Text>
                <Text style={styles.savingsPotentialLabel}/mo</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[analyticsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Expense Analytics</Text>
          <View style={styles.analyticsContainer}>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Average Monthly</Text>
                <Text style={styles.analyticsValue}>$125,800</Text>
                <Text style={styles.analyticsTrend}>↓ 3.2%</Text>
              </View>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Per Property</Text>
                <Text style={styles.analyticsValue}>$806</Text>
                <Text style={styles.analyticsTrend}>↓ 2.1%</Text>
              </View>
            </View>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Cost Ratio</Text>
                <Text style={styles.analyticsValue}>42.3%</Text>
                <Text style={styles.analyticsTrend}>Of Revenue</Text>
              </View>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Variance</Text>
                <Text style={styles.analyticsValue}>±8.5%</Text>
                <Text style={styles.analyticsTrend}>Target: ±5%</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Advanced Expense Management System</Text>
        </View>
      </Animated.ScrollView>
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
  backButton: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  overviewSection: {
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
  categoriesSection: {
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
  recentSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  expenseCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  expenseTypeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  expenseContent: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  expenseVendor: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  expenseDate: {
    fontSize: 12,
    color: '#667eea',
  },
  expenseAmount: {
    alignItems: 'flex-end',
  },
  expenseAmountValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  expenseType: {
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
  vendorsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  vendorCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  vendorRatingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  vendorRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  vendorContent: {
    flex: 1,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  vendorCategory: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  vendorSpent: {
    fontSize: 12,
    color: '#667eea',
  },
  vendorContactButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  vendorContactText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  trendsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  trendsContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendMonth: {
    width: 70,
  },
  trendMonthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  trendBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  trendBar: {
    height: '100%',
    borderRadius: 4,
  },
  trendData: {
    width: 100,
    alignItems: 'flex-end',
  },
  trendExpense: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  trendChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  savingsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  savingsCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  savingsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  savingsIcon: {
    fontSize: 24,
  },
  savingsContent: {
    flex: 1,
  },
  savingsOpportunity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  savingsDescription: {
    fontSize: 14,
    color: '#888888',
  },
  savingsPotential: {
    alignItems: 'flex-end',
  },
  savingsPotentialValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  savingsPotentialLabel: {
    fontSize: 12,
    color: '#888888',
  },
  analyticsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  analyticsContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  analyticsBox: {
    flex: 1,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  analyticsLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 8,
  },
  analyticsValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  analyticsTrend: {
    fontSize: 12,
    color: '#43e97b',
    fontWeight: '600',
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

export default AccountingExpensesPage;