/**
 * Lead Conversions Page - Premium Black Theme
 * Advanced conversion tracking with deep content and premium design
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

const LeadConversionsPage: React.FC = () => {
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
        <Text style={styles.backButtonText}>← Back to Lead CRM</Text>
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
              <Text style={styles.heroBadge}>📈 CONVERSIONS</Text>
              <Text style={styles.heroTitle}>Track Lead{'\n'}Conversion Rates</Text>
              <Text style={styles.heroSubtitle}>Monitor and optimize your lead-to-tenant conversion pipeline with advanced analytics</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>34.2%</Text>
                  <Text style={styles.heroStatLabel}>Rate</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>156</Text>
                  <Text style={styles.heroStatLabel}>Converted</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>28d</Text>
                  <Text style={styles.heroStatLabel}>Avg Time</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.overviewSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Conversion Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>34.2%</Text>
                <Text style={styles.overviewLabel}>Conversion Rate</Text>
                <Text style={styles.overviewTrend}>↑ 8.5%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>156</Text>
                <Text style={styles.overviewLabel}>Converted</Text>
                <Text style={styles.overviewTrend}>↑ 12.3%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>28 days</Text>
                <Text style={styles.overviewLabel}>Avg Cycle</Text>
                <Text style={styles.overviewTrend}>↓ 15%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$85.4K</Text>
                <Text style={styles.overviewLabel}>Revenue</Text>
                <Text style={styles.overviewTrend}>↑ 22.1%</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.funnelSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Conversion Funnel</Text>
          <View style={styles.funnelContainer}>
            {[
              { stage: 'Leads Generated', count: 456, percentage: 100, color: '#667eea' },
              { stage: 'Qualified Leads', count: 312, percentage: 68, color: '#f093fb' },
              { stage: 'Tours Scheduled', count: 245, percentage: 54, color: '#4facfe' },
              { stage: 'Applications', count: 189, percentage: 41, color: '#43e97b' },
              { stage: 'Converted', count: 156, percentage: 34, color: '#ffd700' },
            ].map((item, index) => (
              <View key={index} style={styles.funnelItem}>
                <View style={styles.funnelLabel}>
                  <Text style={styles.funnelStage}>{item.stage}</Text>
                  <Text style={styles.funnelCount}>{item.count}</Text>
                </View>
                <View style={styles.funnelBarContainer}>
                  <View style={[styles.funnelBar, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
                </View>
                <Text style={[styles.funnelPercentage, { color: item.color }]}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.recentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>✅ Recent Conversions</Text>
          {[
            { name: 'Emily Watson', property: 'Green Valley Apartments', date: 'Sep 19', time: '12 days', source: 'Website', color: '#43e97b' },
            { name: 'James Rodriguez', property: 'Sunrise Complex', date: 'Sep 18', time: '8 days', source: 'Referral', color: '#43e97b' },
            { name: 'Sarah Kim', property: 'Downtown Lofts', date: 'Sep 17', time: '15 days', source: 'Zillow', color: '#43e97b' },
            { name: 'Michael Brown', property: 'Harbor View', date: 'Sep 16', time: '22 days', source: 'Social Media', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.conversionCard}>
              <View style={[styles.conversionBadge, { backgroundColor: item.color }]}>
                <Text style={styles.conversionBadgeText}>✓</Text>
              </View>
              <View style={styles.conversionContent}>
                <Text style={styles.conversionName}>{item.name}</Text>
                <Text style={styles.conversionProperty}>{item.property}</Text>
                <Text style={styles.conversionDetails}>{item.date} • {item.time} • {item.source}</Text>
              </View>
              <TouchableOpacity style={styles.conversionViewButton}>
                <Text style={styles.conversionViewText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.pipelineSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔄 Conversion Pipeline</Text>
          {[
            { name: 'Lisa Garcia', property: 'Campus Heights', stage: 'Application', probability: '85%', color: '#667eea' },
            { name: 'Robert Chen', property: 'Garden View', stage: 'Tour Scheduled', probability: '72%', color: '#f093fb' },
            { name: 'Jennifer Lee', property: 'Sunset Tower', stage: 'Qualified', probability: '58%', color: '#4facfe' },
            { name: 'David Wilson', property: 'Green Valley', stage: 'New Lead', probability: '32%', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.pipelineCard}>
              <View style={[styles.pipelineStageBadge, { backgroundColor: item.color }]}>
                <Text style={styles.pipelineStageText}>{item.probability}</Text>
              </View>
              <View style={styles.pipelineContent}>
                <Text style={styles.pipelineName}>{item.name}</Text>
                <Text style={styles.pipelineProperty}>{item.property}</Text>
                <Text style={styles.pipelineStage}>{item.stage}</Text>
              </View>
              <TouchableOpacity style={styles.pipelineActionButton}>
                <Text style={styles.pipelineActionText}>Nudge</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.analyticsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Conversion Analytics</Text>
          <View style={styles.analyticsContainer}>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Best Source</Text>
                <Text style={styles.analyticsValue}>Referral</Text>
                <Text style={styles.analyticsTrend}>42% rate</Text>
              </View>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Best Property</Text>
                <Text style={styles.analyticsValue}>Green Valley</Text>
                <Text style={styles.analyticsTrend}>38% rate</Text>
              </View>
            </View>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Peak Time</Text>
                <Text style={styles.analyticsValue}>2-4 PM</Text>
                <Text style={styles.analyticsTrend}>35% faster</Text>
              </View>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Best Method</Text>
                <Text style={styles.analyticsValue}>In-person</Text>
                <Text style={styles.analyticsTrend}>45% rate</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[trendsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📈 Monthly Trends</Text>
          <View style={styles.trendsContainer}>
            {[
              { month: 'June', rate: '28.5%', leads: 412, converted: 117, change: '+2.1%' },
              { month: 'July', rate: '31.2%', leads: 445, converted: 139, change: '+2.7%' },
              { month: 'August', rate: '32.8%', leads: 478, converted: 157, change: '+1.6%' },
              { month: 'September', rate: '34.2%', leads: 456, converted: 156, change: '+1.4%' },
            ].map((item, index) => (
              <View key={index} style={styles.trendRow}>
                <View style={styles.trendMonth}>
                  <Text style={styles.trendMonthText}>{item.month}</Text>
                </View>
                <View style={styles.trendData}>
                  <Text style={styles.trendRate}>{item.rate}</Text>
                  <Text style={styles.trendDetails}>{item.leads} leads → {item.converted} converted</Text>
                </View>
                <Text style={[styles.trendChange, { color: '#43e97b' }]}>{item.change}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[insightsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💡 Conversion Insights</Text>
          {[
            { insight: 'Referral leads convert 42% faster', description: 'Encourage tenant referrals for higher conversion', icon: '🎯', color: '#667eea' },
            { insight: 'In-person tours increase rate by 15%', description: 'Prioritize in-person tours over virtual', icon: '🏢', color: '#43e97b' },
            { insight: 'Fast response boosts conversion by 28%', description: 'Respond within 1 hour for best results', icon: '⚡', color: '#f093fb' },
            { insight: 'Follow-up within 24h adds 22%', description: 'Automated follow-ups significantly help', icon: '📞', color: '#4facfe' },
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
          <Text style={styles.footerSubtext}>Advanced Conversion Analytics</Text>
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
  funnelSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  funnelContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  funnelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  funnelLabel: {
    width: 120,
  },
  funnelStage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  funnelCount: {
    fontSize: 12,
    color: '#888888',
  },
  funnelBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  funnelBar: {
    height: '100%',
    borderRadius: 4,
  },
  funnelPercentage: {
    width: 50,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  recentSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  conversionCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  conversionBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  conversionBadgeText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  conversionContent: {
    flex: 1,
  },
  conversionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  conversionProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  conversionDetails: {
    fontSize: 12,
    color: '#667eea',
  },
  conversionViewButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  conversionViewText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  pipelineSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  pipelineCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  pipelineStageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  pipelineStageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pipelineContent: {
    flex: 1,
  },
  pipelineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pipelineProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  pipelineStage: {
    fontSize: 12,
    color: '#667eea',
  },
  pipelineActionButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pipelineActionText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
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
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  analyticsTrend: {
    fontSize: 12,
    color: '#43e97b',
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
    width: 60,
  },
  trendMonthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  trendData: {
    flex: 1,
  },
  trendRate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  trendDetails: {
    fontSize: 12,
    color: '#888888',
  },
  trendChange: {
    width: 60,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
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

export default LeadConversionsPage;