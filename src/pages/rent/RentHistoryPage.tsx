/**
 * Rent History Page - Premium Black Theme
 * Advanced payment history with deep content and premium design
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

const RentHistoryPage: React.FC = () => {
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
        <Text style={styles.backButtonText}>← Back to Rent Collection</Text>
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
              <Text style={styles.heroBadge}>📜 PAYMENT HISTORY</Text>
              <Text style={styles.heroTitle}>Complete Rent{'\n'}Payment Records</Text>
              <Text style={styles.heroSubtitle}>View detailed payment history with receipts, transaction details, and financial insights</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>$892K</Text>
                  <Text style={styles.heroStatLabel}>Collected</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>94.2%</Text>
                  <Text style={styles.heroStatLabel}>On-time</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>1,245</Text>
                  <Text style={styles.heroStatLabel}>Payments</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.overviewSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Collection Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$892,400</Text>
                <Text style={styles.overviewLabel}>Total Collected</Text>
                <Text style={styles.overviewTrend}>↑ 12.4%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>94.2%</Text>
                <Text style={styles.overviewLabel}>On-time Rate</Text>
                <Text style={styles.overviewTrend}>↑ 3.8%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>1,245</Text>
                <Text style={styles.overviewLabel}>Transactions</Text>
                <Text style={styles.overviewTrend}>↑ 8.2%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$3.2M</Text>
                <Text style={styles.overviewLabel}>YTD Revenue</Text>
                <Text style={styles.overviewTrend}>↑ 15.6%</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.recentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💳 Recent Payments</Text>
          {[
            { tenant: 'Priya Sharma', property: 'Room 302 Green Valley', amount: '$1,050', date: 'Sep 19, 2024', method: 'UPI', status: 'Completed', color: '#43e97b' },
            { tenant: 'James Anderson', property: 'Room 405 Sunrise Apartments', amount: '$1,200', date: 'Sep 18, 2024', method: 'Card', status: 'Completed', color: '#43e97b' },
            { tenant: 'Maria Garcia', property: 'Room 215 Garden View', amount: '$950', date: 'Sep 17, 2024', method: 'Bank Transfer', status: 'Completed', color: '#43e97b' },
            { tenant: 'Alex Kim', property: 'Room 320 Downtown Lofts', amount: '$1,400', date: 'Sep 16, 2024', method: 'UPI', status: 'Completed', color: '#43e97b' },
            { tenant: 'David Wilson', property: 'Room 101 Sunset Tower', amount: '$1,100', date: 'Sep 15, 2024', method: 'Card', status: 'Completed', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.paymentCard}>
              <View style={[styles.paymentStatusDot, { backgroundColor: item.color }]} />
              <View style={styles.paymentContent}>
                <Text style={styles.paymentTenant}>{item.tenant}</Text>
                <Text style={styles.paymentProperty}>{item.property}</Text>
                <Text style={styles.paymentDetails}>{item.date} • {item.method}</Text>
              </View>
              <View style={styles.paymentAmountSection}>
                <Text style={styles.paymentAmount}>{item.amount}</Text>
                <TouchableOpacity style={styles.paymentReceiptButton}>
                  <Text style={styles.paymentReceiptText}>Receipt</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[methodsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💳 Payment Methods Breakdown</Text>
          <View style={styles.methodsGrid}>
            {[
              { method: 'UPI', count: 456, percentage: 37, color: '#667eea', icon: '📱' },
              { method: 'Card', count: 389, percentage: 31, color: '#f093fb', icon: '💳' },
              { method: 'Bank Transfer', count: 287, percentage: 23, color: '#4facfe', icon: '🏦' },
              { method: 'Cash', count: 113, percentage: 9, color: '#43e97b', icon: '💵' },
            ].map((item, index) => (
              <View key={index} style={[styles.methodCard, { borderColor: item.color }]}>
                <Text style={styles.methodIcon}>{item.icon}</Text>
                <Text style={styles.methodName}>{item.method}</Text>
                <Text style={styles.methodCount}>{item.count}</Text>
                <Text style={[styles.methodPercentage, { color: item.color }]}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[monthlySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📅 Monthly Collections</Text>
          <View style={styles.monthlyContainer}>
            {[
              { month: 'June', collected: '$78,450', target: '$90,000', rate: '87.2%', color: '#667eea' },
              { month: 'July', collected: '$82,300', target: '$90,000', rate: '91.4%', color: '#43e97b' },
              { month: 'August', collected: '$84,200', target: '$90,000', rate: '93.6%', color: '#43e97b' },
              { month: 'September', collected: '$90,620', target: '$90,000', rate: '100.7%', color: '#43e97b' },
            ].map((item, index) => (
              <View key={index} style={styles.monthlyCard}>
                <View style={styles.monthlyLabel}>
                  <Text style={styles.monthlyMonth}>{item.month}</Text>
                </View>
                <View style={styles.monthlyData}>
                  <Text style={styles.monthlyCollected}>{item.collected}</Text>
                  <Text style={styles.monthlyTarget}>Target: {item.target}</Text>
                </View>
                <View style={[styles.monthlyRateBadge, { backgroundColor: item.color }]}>
                  <Text style={styles.monthlyRateText}>{item.rate}</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[trendsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📈 Collection Trends</Text>
          <View style={styles.trendsContainer}>
            {[
              { period: 'Last 7 Days', amount: '$21,450', change: '+5.2%', color: '#43e97b' },
              { period: 'Last 30 Days', amount: '$90,620', change: '+8.4%', color: '#43e97b' },
              { period: 'Last 90 Days', amount: '$267,800', change: '+12.1%', color: '#43e97b' },
              { period: 'Year to Date', amount: '$892,400', change: '+15.6%', color: '#43e97b' },
            ].map((item, index) => (
              <View key={index} style={styles.trendCard}>
                <View style={styles.trendPeriod}>
                  <Text style={styles.trendPeriodText}>{item.period}</Text>
                </View>
                <View style={styles.trendData}>
                  <Text style={styles.trendAmount}>{item.amount}</Text>
                  <Text style={[styles.trendChange, { color: item.color }]}>{item.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[insightsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💡 Collection Insights</Text>
          {[
            { insight: 'UPI payments increased by 22%', description: 'More tenants prefer digital payments', icon: '📱', color: '#667eea' },
            { insight: 'On-time rate improved to 94.2%', description: 'Reminder system working effectively', icon: '⏰', color: '#43e97b' },
            { insight: 'Weekend collections up 15%', description: 'Consider weekend payment options', icon: '📅', color: '#f093fb' },
            { insight: 'Late payments decreased by 8%', description: 'Automation showing positive results', icon: '📉', color: '#4facfe' },
          ].map((item, index) => (
            <View key={index} style={styles.insightCard}>
              <View style={[styles.insightIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.insightIcon}>{item.icon}</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{item.insight}</Text>
                <Text style={styles.insightDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Complete Payment History System</Text>
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
  paymentCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  paymentStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  paymentContent: {
    flex: 1,
  },
  paymentTenant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  paymentProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  paymentDetails: {
    fontSize: 12,
    color: '#667eea',
  },
  paymentAmountSection: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#43e97b',
    marginBottom: 8,
  },
  paymentReceiptButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  paymentReceiptText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  methodsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  methodsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  methodCard: {
    width: (width - 48) / 4,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
  },
  methodIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  methodName: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  methodCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  methodPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  monthlySection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  monthlyContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  monthlyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthlyLabel: {
    width: 60,
  },
  monthlyMonth: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  monthlyData: {
    flex: 1,
  },
  monthlyCollected: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  monthlyTarget: {
    fontSize: 12,
    color: '#888888',
  },
  monthlyRateBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  monthlyRateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
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
  trendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendPeriod: {
    width: 100,
  },
  trendPeriodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  trendData: {
    flex: 1,
  },
  trendAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  trendChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  insightsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  insightIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  insightIcon: {
    fontSize: 24,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: '#888888',
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

export default RentHistoryPage;