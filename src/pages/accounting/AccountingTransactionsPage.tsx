/**
 * Accounting Transactions Page - Premium Black Theme
 * Advanced transaction management with deep content and premium design
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

const AccountingTransactionsPage: React.FC = () => {
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
              <Text style={styles.heroBadge}>💳 TRANSACTIONS</Text>
              <Text style={styles.heroTitle}>Complete Financial{'\n'}Transaction Records</Text>
              <Text style={styles.heroSubtitle}>Track all financial transactions with detailed categorization, filtering, and reconciliation</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>2,847</Text>
                  <Text style={styles.heroStatLabel}>Total</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>$1.2M</Text>
                  <Text style={styles.heroStatLabel}>Volume</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>98.5%</Text>
                  <Text style={styles.heroStatLabel}>Reconciled</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.overviewSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Transaction Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>2,847</Text>
                <Text style={styles.overviewLabel}>Total Transactions</Text>
                <Text style={styles.overviewTrend}>↑ 12.4%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$1.2M</Text>
                <Text style={styles.overviewLabel}>Total Volume</Text>
                <Text style={styles.overviewTrend}>↑ 8.2%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>98.5%</Text>
                <Text style={styles.overviewLabel}>Reconciled</Text>
                <Text style={styles.overviewTrend}>↑ 2.1%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>24</Text>
                <Text style={styles.overviewLabel}>This Month</Text>
                <Text style={styles.overviewTrend}>On Track</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.recentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Recent Transactions</Text>
          {[
            { description: 'Rent Payment - Room 302', amount: '$1,050', type: 'Income', date: 'Sep 19, 2024', category: 'Rent', status: 'Completed', color: '#43e97b' },
            { description: 'HVAC Maintenance - Building A', amount: '$2,450', type: 'Expense', date: 'Sep 18, 2024', category: 'Maintenance', status: 'Completed', color: '#f5576c' },
            { description: 'Rent Payment - Room 405', amount: '$1,200', type: 'Income', date: 'Sep 18, 2024', category: 'Rent', status: 'Completed', color: '#43e97b' },
            { description: 'Electricity Bill - Complex B', amount: '$3,200', type: 'Expense', date: 'Sep 17, 2024', category: 'Utilities', status: 'Completed', color: '#f5576c' },
            { description: 'Rent Payment - Room 215', amount: '$950', type: 'Income', date: 'Sep 17, 2024', category: 'Rent', status: 'Completed', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.transactionCard}>
              <View style={[styles.transactionTypeDot, { backgroundColor: item.color }]} />
              <View style={styles.transactionContent}>
                <Text style={styles.transactionDescription}>{item.description}</Text>
                <Text style={styles.transactionCategory}>{item.category}</Text>
                <Text style={styles.transactionDetails}>{item.date} • {item.type}</Text>
              </View>
              <View style={styles.transactionAmountSection}>
                <Text style={[styles.transactionAmount, { color: item.color }]}>{item.amount}</Text>
                <TouchableOpacity style={styles.transactionDetailsButton}>
                  <Text style={styles.transactionDetailsText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[categoriesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📂 Transaction Categories</Text>
          <View style={styles.categoriesList}>
            {[
              { category: 'Rent Income', count: 1,245, amount: '$892,400', percentage: 74, color: '#43e97b', icon: '💰' },
              { category: 'Maintenance', count: 328, amount: '$125,800', percentage: 10, color: '#f5576c', icon: '🔧' },
              { category: 'Utilities', count: 245, amount: '$82,300', percentage: 7, color: '#667eea', icon: '⚡' },
              { category: 'Insurance', count: 156, amount: '$45,600', percentage: 4, color: '#f093fb', icon: '🛡️' },
              { category: 'Staff Salaries', count: 156, amount: '$78,000', percentage: 6, color: '#4facfe', icon: '👥' },
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
                  <Text style={styles.categoryCount}>{item.count} transactions</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[pendingSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⏳ Pending Transactions</Text>
          {[
            { description: 'Rent Payment - Room 203', amount: '$1,050', type: 'Income', date: 'Sep 19, 2024', category: 'Rent', status: 'Pending', color: '#f093fb' },
            { description: 'Insurance Premium Due', amount: '$5,800', type: 'Expense', date: 'Sep 20, 2024', category: 'Insurance', status: 'Pending', color: '#f093fb' },
            { description: 'Property Tax Payment', amount: '$9,500', type: 'Expense', date: 'Sep 21, 2024', category: 'Taxes', status: 'Pending', color: '#f093fb' },
          ].map((item, index) => (
            <View key={index} style={styles.pendingCard}>
              <View style={[styles.pendingBadge, { backgroundColor: item.color }]}>
                <Text style={styles.pendingBadgeText}>⏳</Text>
              </View>
              <View style={styles.pendingContent}>
                <Text style={styles.pendingDescription}>{item.description}</Text>
                <Text style={styles.pendingCategory}>{item.category}</Text>
                <Text style={styles.pendingDetails}>{item.date} • {item.type}</Text>
              </View>
              <View style={styles.pendingAmountSection}>
                <Text style={styles.pendingAmount}>{item.amount}</Text>
                <TouchableOpacity style={styles.pendingActionButton}>
                  <Text style={styles.pendingActionText}>Process</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[reconciliationSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔄 Reconciliation Status</Text>
          <View style={styles.reconciliationCard}>
            <View style={styles.reconciliationProgress}>
              <View style={styles.reconciliationBarContainer}>
                <View style={[styles.reconciliationBar, { width: '98.5%', backgroundColor: '#43e97b' }]} />
              </View>
              <Text style={styles.reconciliationPercentage}>98.5% Reconciled</Text>
            </View>
            <View style={styles.reconciliationDetails}>
              <View style={styles.reconciliationDetail}>
                <Text style={styles.reconciliationDetailLabel}>Reconciled</Text>
                <Text style={styles.reconciliationDetailValue}>2,804</Text>
              </View>
              <View style={styles.reconciliationDetail}>
                <Text style={styles.reconciliationDetailLabel}>Pending</Text>
                <Text style={styles.reconciliationDetailValue}>43</Text>
              </View>
              <View style={styles.reconciliationDetail}>
                <Text style={styles.reconciliationDetailLabel}>Flagged</Text>
                <Text style={[styles.reconciliationDetailValue, { color: '#f5576c' }]}>0</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[exportSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📤 Export Options</Text>
          <View style={styles.exportGrid}>
            {[
              { format: 'CSV', description: 'Spreadsheet compatible', icon: '📊', color: '#667eea' },
              { format: 'PDF', description: 'Print-ready reports', icon: '📄', color: '#f093fb' },
              { format: 'Excel', description: 'Advanced formatting', icon: '📈', color: '#43e97b' },
              { format: 'QuickBooks', description: 'Accounting integration', icon: '💼', color: '#4facfe' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={[styles.exportCard, { borderColor: item.color }]}>
                <Text style={styles.exportIcon}>{item.icon}</Text>
                <Text style={styles.exportFormat}>{item.format}</Text>
                <Text style={styles.exportDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Advanced Transaction Management</Text>
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
  recentSection: {
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
  transactionCategory: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  transactionDetails: {
    fontSize: 12,
    color: '#667eea',
  },
  transactionAmountSection: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  transactionDetailsButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  transactionDetailsText: {
    color: '#667eea',
    fontSize: 12,
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
  categoryCount: {
    fontSize: 12,
    color: '#888888',
  },
  pendingSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  pendingCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  pendingBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pendingBadgeText: {
    fontSize: 20,
  },
  pendingContent: {
    flex: 1,
  },
  pendingDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pendingCategory: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  pendingDetails: {
    fontSize: 12,
    color: '#667eea',
  },
  pendingAmountSection: {
    alignItems: 'flex-end',
  },
  pendingAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f093fb',
    marginBottom: 8,
  },
  pendingActionButton: {
    backgroundColor: 'rgba(240, 147, 251, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pendingActionText: {
    color: '#f093fb',
    fontSize: 12,
    fontWeight: '600',
  },
  reconciliationSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  reconciliationCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  reconciliationProgress: {
    marginBottom: 24,
  },
  reconciliationBarContainer: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  reconciliationBar: {
    height: '100%',
    borderRadius: 6,
  },
  reconciliationPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#43e97b',
    textAlign: 'center',
  },
  reconciliationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reconciliationDetail: {
    alignItems: 'center',
  },
  reconciliationDetailLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  reconciliationDetailValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  exportSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  exportGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exportCard: {
    width: (width - 48) / 4,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
  },
  exportIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  exportFormat: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  exportDescription: {
    fontSize: 10,
    color: '#888888',
    textAlign: 'center',
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

export default AccountingTransactionsPage;