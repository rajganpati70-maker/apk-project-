/**
 * Property Analytics Page - Premium Black Theme
 * Advanced property analytics with deep content and premium design
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

const PropertyAnalyticsPage: React.FC = () => {
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
        <Text style={styles.backButtonText}>← Back to Properties</Text>
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
              <Text style={styles.heroBadge}>📊 PROPERTY ANALYTICS</Text>
              <Text style={styles.heroTitle}>Advanced Property{'\n'}Performance Insights</Text>
              <Text style={styles.heroSubtitle}>Deep dive into property performance with real-time metrics, trends, and predictive analytics</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>+18.4%</Text>
                  <Text style={styles.heroStatLabel}>Revenue Growth</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>94.2%</Text>
                  <Text style={styles.heroStatLabel}>Occupancy</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>87.5%</Text>
                  <Text style={styles.heroStatLabel}>Retention</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.keyMetricsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📈 Key Performance Metrics</Text>
          <View style={styles.metricsGrid}>
            {[
              { metric: 'Total Revenue', value: '$284,520', change: '+18.4%', color: '#667eea' },
              { metric: 'Occupancy Rate', value: '94.2%', change: '+2.8%', color: '#43e97b' },
              { metric: 'Tenant Retention', value: '87.5%', change: '+3.1%', color: '#f093fb' },
              { metric: 'Avg Rent', value: '$1,822', change: '+5.2%', color: '#4facfe' },
              { metric: 'Vacancy Rate', value: '5.8%', change: '-2.2%', color: '#f5576c' },
              { metric: 'Response Time', value: '2.4 hrs', change: '-12%', color: '#ffd700' },
            ].map((item, index) => (
              <View key={index} style={[styles.metricCard, { borderColor: item.color }]}>
                <Text style={styles.metricName}>{item.metric}</Text>
                <Text style={styles.metricValue}>{item.value}</Text>
                <Text style={[styles.metricChange, { color: item.color }]}>{item.change}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.revenueSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💰 Revenue Breakdown</Text>
          <View style={styles.revenueContainer}>
            {[
              { source: 'Rent Income', amount: '$254,200', percentage: 89, color: '#667eea' },
              { source: 'Parking Fees', amount: '$12,800', percentage: 4.5, color: '#f093fb' },
              { source: 'Utility Charges', amount: '$8,500', percentage: 3, color: '#4facfe' },
              { source: 'Other Income', amount: '$9,020', percentage: 3.5, color: '#43e97b' },
            ].map((item, index) => (
              <View key={index} style={styles.revenueItem}>
                <View style={styles.revenueInfo}>
                  <Text style={styles.revenueSource}>{item.source}</Text>
                  <Text style={styles.revenueAmount}>{item.amount}</Text>
                </View>
                <View style={styles.revenueBarContainer}>
                  <View style={[styles.revenueBar, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
                </View>
                <Text style={styles.revenuePercentage}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.occupancySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">🏠 Occupancy by Property Type</Text>
          <View style={styles.occupancyList}>
            {[
              { type: 'Apartments', total: 89, occupied: 82, color: '#667eea' },
              { type: 'Houses', total: 34, occupied: 32, color: '#f093fb' },
              { type: 'Commercial', total: 21, occupied: 18, color: '#4facfe' },
              { type: 'PG/Hostel', total: 12, occupied: 10, color: '#43e97b' },
            ].map((item, index) => {
              const occupancyRate = Math.round((item.occupied / item.total) * 100);
              return (
                <View key={index} style={styles.occupancyCard}>
                  <View style={styles.occupancyHeader}>
                    <Text style={styles.occupancyType}>{item.type}</Text>
                    <Text style={[styles.occupancyRate, { color: item.color }]}>{occupancyRate}%</Text>
                  </View>
                  <View style={styles.occupancyBarContainer}>
                    <View style={[styles.occupancyBar, { width: `${occupancyRate}%`, backgroundColor: item.color }]} />
                  </View>
                  <View style={styles.occupancyDetails}>
                    <Text style={styles.occupancyDetail}>{item.occupied} occupied</Text>
                    <Text style={styles.occupancyDetail}>{item.total} total</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Animated.View>

        <Animated.View style={[styles.trendsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Monthly Trends</Text>
          <View style={styles.trendsContainer}>
            {[
              { month: 'Jan', revenue: '$265K', occupancy: '91%', profit: '$42K' },
              { month: 'Feb', revenue: '$272K', occupancy: '92%', profit: '$45K' },
              { month: 'Mar', revenue: '$268K', occupancy: '90%', profit: '$43K' },
              { month: 'Apr', revenue: '$278K', occupancy: '93%', profit: '$48K' },
              { month: 'May', revenue: '$275K', occupancy: '92%', profit: '$46K' },
              { month: 'Jun', revenue: '$284K', occupancy: '94%', profit: '$52K' },
            ].map((item, index) => (
              <View key={index} style={styles.trendCard}>
                <View style={styles.trendMonth}>
                  <Text style={styles.trendMonthText}>{item.month}</Text>
                </View>
                <View style={styles.trendMetrics}>
                  <View style={styles.trendMetric}>
                    <Text style={styles.trendMetricLabel}>Revenue</Text>
                    <Text style={styles.trendMetricValue}>{item.revenue}</Text>
                  </View>
                  <View style={styles.trendMetric}>
                    <Text style={styles.trendMetricLabel}>Occupancy</Text>
                    <Text style={styles.trendMetricValue}>{item.occupancy}</Text>
                  </View>
                  <View style={styles.trendMetric}>
                    <Text style={styles.trendMetricLabel}>Profit</Text>
                    <Text style={styles.trendMetricValue}>{item.profit}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.performanceSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">⭐ Property Performance Ranking</Text>
          {[
            { rank: 1, name: 'Sunset Tower', score: 98, revenue: '$28,500', color: '#43e97b' },
            { rank: 2, name: 'Green Valley', score: 95, revenue: '$24,200', color: '#667eea' },
            { rank: 3, name: 'Harbor View', score: 92, revenue: '$32,100', color: '#f093fb' },
            { rank: 4, name: 'Campus Heights', score: 89, revenue: '$18,700', color: '#4facfe' },
            { rank: 5, name: 'Tech Park', score: 85, revenue: '$52,800', color: '#ffd700' },
          ].map((property, index) => (
            <View key={index} style={styles.performanceCard}>
              <View style={[styles.performanceRank, { backgroundColor: property.color }]}>
                <Text style={styles.performanceRankText}>#{property.rank}</Text>
              </View>
              <View style={styles.performanceContent}>
                <Text style={styles.performanceName}>{property.name}</Text>
                <View style={styles.performanceScoreBar}>
                  <View style={[styles.performanceScoreFill, { width: `${property.score}%`, backgroundColor: property.color }]} />
                </View>
                <Text style={styles.performanceScore}>Score: {property.score}/100</Text>
              </View>
              <View style={styles.performanceRevenue}>
                <Text style={styles.performanceRevenueValue}>{property.revenue}</Text>
                <Text style={styles.performanceRevenueLabel}/mo</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.predictiveSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔮 Predictive Analytics</Text>
          <View style={styles.predictiveContainer}>
            {[
              { prediction: 'Revenue Forecast', value: '$312K next month', confidence: '87%', trend: 'up', color: '#43e97b' },
              { prediction: 'Occupancy Prediction', value: '95% expected', confidence: '92%', trend: 'up', color: '#667eea' },
              { prediction: 'Maintenance Need', value: '8 properties likely', confidence: '78%', trend: 'neutral', color: '#f093fb' },
              { prediction: 'Tenant Turnover', value: '5 tenants leaving', confidence: '85%', trend: 'down', color: '#f5576c' },
            ].map((item, index) => (
              <View key={index} style={styles.predictiveCard}>
                <View style={[styles.predictiveIconContainer, { backgroundColor: item.color }]}>
                  <Text style={styles.predictiveIcon}>{item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '➡️'}</Text>
                </View>
                <View style={styles.predictiveContent}>
                  <Text style={styles.predictiveTitle}>{item.prediction}</Text>
                  <Text style={styles.predictiveValue}>{item.value}</Text>
                  <Text style={styles.predictiveConfidence}>Confidence: {item.confidence}</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.comparisonSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">📊 Year-over-Year Comparison</Text>
          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonYear}>
              <Text style={styles.comparisonYearLabel}>Current Year</Text>
              <View style={styles.comparisonMetrics}>
                <View style={styles.comparisonMetric}>
                  <Text style={styles.comparisonMetricValue}>$284.5K</Text>
                  <Text style={styles.comparisonMetricLabel}>Revenue</Text>
                </View>
                <View style={styles.comparisonMetric}>
                  <Text style={styles.comparisonMetricValue}>94.2%</Text>
                  <Text style={styles.comparisonMetricLabel}>Occupancy</Text>
                </View>
              </View>
            </View>
            <View style={styles.comparisonDivider} />
            <View style={styles.comparisonYear}>
              <Text style={styles.comparisonYearLabel}>Last Year</Text>
              <View style={styles.comparisonMetrics}>
                <View style={styles.comparisonMetric}>
                  <Text style={styles.comparisonMetricValue}>$240.2K</Text>
                  <Text style={styles.comparisonMetricLabel}>Revenue</Text>
                </View>
                <View style={styles.comparisonMetric}>
                  <Text style={styles.comparisonMetricValue}>91.4%</Text>
                  <Text style={styles.comparisonMetricLabel}>Occupancy</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.comparisonGrowth}>
            <Text style={styles.comparisonGrowthText}>Overall Growth: +18.4% YoY</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.insightsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">💡 AI-Powered Insights</Text>
          {[
            { insight: 'Occupancy Trend', text: '92% occupancy expected next month based on historical patterns', icon: '📈', color: '#667eea' },
            { insight: 'Revenue Opportunity', text: 'Downtown properties could generate 12% more revenue with premium pricing', icon: '💰', color: '#43e97b' },
            { insight: 'Maintenance Alert', text: '3 properties likely need HVAC repairs in next 30 days', icon: '🔧', color: '#f093fb' },
            { insight: 'Market Insight', text: 'Rental demand in university area up 15% this quarter', icon: '🎓', color: '#4facfe' },
          ].map((item, index) => (
            <View key={index} style={styles.insightCard}>
              <View style={[styles.insightIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.insightIcon}>{item.icon}</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{item.insight}</Text>
                <Text style={styles.insightText}>{item.text}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Advanced Property Analytics</Text>
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
  keyMetricsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - 48) / 2,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  metricName: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  revenueSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  revenueContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  revenueItem: {
    marginBottom: 16,
  },
  revenueInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  revenueSource: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  revenueAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#667eea',
  },
  revenueBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  revenueBar: {
    height: '100%',
    borderRadius: 4,
  },
  revenuePercentage: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'right',
  },
  occupancySection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  occupancyList: {
    gap: 16,
  },
  occupancyCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  occupancyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  occupancyType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  occupancyRate: {
    fontSize: 18,
    fontWeight: '700',
  },
  occupancyBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  occupancyBar: {
    height: '100%',
    borderRadius: 4,
  },
  occupancyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  occupancyDetail: {
    fontSize: 14,
    color: '#888888',
  },
  trendsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  trendsContainer: {
    gap: 12,
  },
  trendCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  trendMonth: {
    width: 50,
  },
  trendMonthText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#667eea',
  },
  trendMetrics: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trendMetric: {
    alignItems: 'center',
  },
  trendMetricLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  trendMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  performanceSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  performanceCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  performanceRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  performanceRankText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  performanceContent: {
    flex: 1,
  },
  performanceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  performanceScoreBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  performanceScoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  performanceScore: {
    fontSize: 12,
    color: '#888888',
  },
  performanceRevenue: {
    alignItems: 'flex-end',
  },
  performanceRevenueValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  performanceRevenueLabel: {
    fontSize: 12,
    color: '#888888',
  },
  predictiveSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  predictiveContainer: {
    gap: 12,
  },
  predictiveCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  predictiveIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  predictiveIcon: {
    fontSize: 24,
  },
  predictiveContent: {
    flex: 1,
  },
  predictiveTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  predictiveValue: {
    fontSize: 14,
    color: '#667eea',
    marginBottom: 4,
  },
  predictiveConfidence: {
    fontSize: 12,
    color: '#888888',
  },
  comparisonSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  comparisonContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  comparisonYear: {
    flex: 1,
  },
  comparisonYearLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  comparisonMetrics: {
    gap: 12,
  },
  comparisonMetric: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  comparisonMetricValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  comparisonMetricLabel: {
    fontSize: 12,
    color: '#888888',
  },
  comparisonDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
  },
  comparisonGrowth: {
    marginTop: 16,
    backgroundColor: 'rgba(67, 233, 123, 0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  comparisonGrowthText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#43e97b',
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
  insightText: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
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

export default PropertyAnalyticsPage;