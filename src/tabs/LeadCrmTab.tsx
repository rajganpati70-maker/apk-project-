/**
 * Lead CRM Tab Screen - Premium Black Theme
 * Advanced lead management with deep content and premium design
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
import LeadOverviewPage from '../pages/leads/LeadOverviewPage';

const { width, height } = Dimensions.get('window');

const LeadCrmTab: React.FC = () => {
  const { navigate, currentRoute, goBack } = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('main');
  const scrollY = useRef(new Animated.Value(0));
  const headerOpacity = useRef(new Animated.Value(1));
  const scaleValue = useRef(new Animated.Value(1));

  useEffect(() => {
    if (currentRoute === '/leads/overview') {
      setCurrentPage('overview');
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
      id: 'lead-overview',
      title: 'Lead Overview',
      description: '126 active leads in pipeline',
      icon: '👥',
      route: '/leads/overview',
      badge: 126,
      accessibilityLabel: 'Lead Overview',
      accessibilityHint: 'View all leads overview',
    },
    {
      id: 'new-leads',
      title: 'New Leads',
      description: '23 new leads today',
      icon: '🆕',
      route: '/leads/new',
      badge: 23,
      accessibilityLabel: 'New Leads',
      accessibilityHint: 'View new leads',
    },
    {
      id: 'follow-ups',
      title: 'Follow-ups',
      description: '8 leads requiring follow-up',
      icon: '📞',
      route: '/leads/followups',
      badge: 8,
      accessibilityLabel: 'Follow-ups',
      accessibilityHint: 'View leads requiring follow-up',
    },
    {
      id: 'conversions',
      title: 'Conversions',
      description: '12 leads converted this week',
      icon: '✅',
      route: '/leads/conversions',
      accessibilityLabel: 'Conversions',
      accessibilityHint: 'View converted leads',
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
    console.log('Lead block pressed:', block.id);
  }, []);

  const renderContentBlock = useCallback((block: ContentBlock) => {
    return (
      <ContentBlockRenderer
        block={block}
        onPress={handleBlockPress}
      />
    );
  }, [handleBlockPress]);

  if (currentPage === 'overview') {
    return (
      <>
        <LeadOverviewPage />
        <FloatingFooter context="Lead CRM" />
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
              <Text style={styles.heroBadge}>👥 LEAD CRM</Text>
              <Text style={styles.heroTitle}>Complete Lead{'\n'}Management System</Text>
              <Text style={styles.heroSubtitle}>Convert more leads to tenants with intelligent pipeline management, automated follow-ups, and real-time analytics</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>126</Text>
                  <Text style={styles.heroStatLabel}>Active Leads</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>24.5%</Text>
                  <Text style={styles.heroStatLabel}>Conversion</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>18</Text>
                  <Text style={styles.heroStatLabel}>Hot Leads</Text>
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
              <Text style={styles.quickActionLabel}>Add Lead</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📞</Text>
              <Text style={styles.quickActionLabel}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>💬</Text>
              <Text style={styles.quickActionLabel}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📧</Text>
              <Text style={styles.quickActionLabel}>Email</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Navigation Items */}
        <Animated.View style={[styles.navigationSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>Lead Management</Text>
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
              testID={`lead-nav-${item.id}`}
            />
          ))}
        </Animated.View>

        {/* Conversion Funnel */}
        <Animated.View style={[styles.funnelSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Conversion Funnel</Text>
          <View style={styles.funnelContainer}>
            {[
              { stage: 'Total Leads', value: 126, color: '#667eea', percentage: 100 },
              { stage: 'Qualified', value: 89, color: '#f093fb', percentage: 71 },
              { stage: 'In Contact', value: 56, color: '#4facfe', percentage: 44 },
              { stage: 'Hot Leads', value: 18, color: '#f5576c', percentage: 14 },
              { stage: 'Converted', value: 12, color: '#43e97b', percentage: 10 },
            ].map((stage, index) => (
              <View key={index} style={styles.funnelStage}>
                <View style={styles.funnelStageInfo}>
                  <Text style={styles.funnelStageName}>{stage.stage}</Text>
                  <Text style={styles.funnelStageValue}>{stage.value}</Text>
                </View>
                <View style={styles.funnelBarContainer}>
                  <View style={[styles.funnelBar, { width: `${stage.percentage}%`, backgroundColor: stage.color }]} />
                </View>
                <Text style={styles.funnelPercentage}>{stage.percentage}%</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Lead Sources */}
        <Animated.View style={[styles.sourcesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔍 Lead Sources</Text>
          <View style={styles.sourcesGrid}>
            {[
              { source: 'Website', count: 45, conversion: '35%', color: '#667eea', icon: '🌐' },
              { source: 'WhatsApp', count: 38, conversion: '42%', color: '#43e97b', icon: '💬' },
              { source: 'Referrals', count: 23, conversion: '65%', color: '#f093fb', icon: '👥' },
              { source: 'Social Media', count: 20, conversion: '28%', color: '#4facfe', icon: '📱' },
            ].map((item, index) => (
              <View key={index} style={[styles.sourceCard, { borderColor: item.color }]}>
                <Text style={styles.sourceIcon}>{item.icon}</Text>
                <Text style={styles.sourceCount}>{item.count}</Text>
                <Text style={styles.sourceName}>{item.source}</Text>
                <Text style={[styles.sourceConversion, { color: item.color }]}>{item.conversion} conv</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Lead Quality */}
        <Animated.View style={[styles.qualitySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⭐ Lead Quality Segmentation</Text>
          <View style={styles.qualityList}>
            {[
              { quality: 'Hot Leads', count: 18, description: 'Ready to convert within 7 days', color: '#f5576c', icon: '🔥' },
              { quality: 'Warm Leads', count: 45, description: 'Showing interest, follow-up needed', color: '#f093fb', icon: '🌡️' },
              { quality: 'Cold Leads', count: 63, description: 'Not yet ready, nurturing required', color: '#4facfe', icon: '❄️' },
            ].map((item, index) => (
              <View key={index} style={[styles.qualityCard, { borderLeftColor: item.color }]}>
                <View style={styles.qualityIconContainer}>
                  <Text style={styles.qualityIcon}>{item.icon}</Text>
                </View>
                <View style={styles.qualityContent}>
                  <Text style={styles.qualityName}>{item.quality}</Text>
                  <Text style={styles.qualityDescription}>{item.description}</Text>
                </View>
                <View style={styles.qualityCount}>
                  <Text style={styles.qualityCountValue}>{item.count}</Text>
                  <Text style={styles.qualityCountLabel}>leads</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Recent Leads */}
        <Animated.View style={[styles.recentLeadsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Recent Leads</Text>
          {[
            { name: 'Rahul Sharma', source: 'WhatsApp', property: '2BHK Green Valley', time: '2 min ago', status: 'Hot', color: '#f5576c' },
            { name: 'Priya Patel', source: 'Website', property: '1BHK Downtown', time: '15 min ago', status: 'Warm', color: '#f093fb' },
            { name: 'Amit Kumar', source: 'Referral', property: '3BHK Riverside', time: '1 hour ago', status: 'Hot', color: '#f5576c' },
            { name: 'Sneha Singh', source: 'Social Media', property: 'Studio Apartment', time: '2 hours ago', status: 'Cold', color: '#4facfe' },
            { name: 'Vikram Verma', source: 'WhatsApp', property: '1BHK Garden View', time: '3 hours ago', status: 'Warm', color: '#f093fb' },
          ].map((lead, index) => (
            <View key={index} style={styles.leadCard}>
              <View style={[styles.leadStatusDot, { backgroundColor: lead.color }]} />
              <View style={styles.leadContent}>
                <Text style={styles.leadName}>{lead.name}</Text>
                <Text style={styles.leadDetails}>{lead.source} • {lead.property}</Text>
                <Text style={styles.leadTime}>{lead.time}</Text>
              </View>
              <View style={[styles.leadStatusBadge, { backgroundColor: lead.color }]}>
                <Text style={styles.leadStatusText}>{lead.status}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Follow-up Schedule */}
        <Animated.View style={[styles.followupSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📅 Today's Follow-ups</Text>
          {[
            { time: '10:00 AM', name: 'Rahul Sharma', type: 'Phone Call', priority: 'High' },
            { time: '11:30 AM', name: 'Priya Patel', type: 'WhatsApp', priority: 'Medium' },
            { time: '2:00 PM', name: 'Amit Kumar', type: 'Property Visit', priority: 'High' },
            { time: '4:30 PM', name: 'Sneha Singh', type: 'Email', priority: 'Low' },
          ].map((followup, index) => (
            <View key={index} style={styles.followupCard}>
              <View style={styles.followupTime}>
                <Text style={styles.followupTimeText}>{followup.time}</Text>
              </View>
              <View style={styles.followupContent}>
                <Text style={styles.followupName}>{followup.name}</Text>
                <Text style={styles.followupType}>{followup.type}</Text>
              </View>
              <View style={[styles.followupPriority, { backgroundColor: followup.priority === 'High' ? '#f5576c' : followup.priority === 'Medium' ? '#f093fb' : '#4facfe' }]}>
                <Text style={styles.followupPriorityText}>{followup.priority}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Demo Content Sections */}
        <Animated.View style={[styles.contentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <ScrollingSectionContainer
            section={{
              id: 'lead-analytics',
              title: '📈 Lead Analytics',
              description: 'Detailed lead performance metrics',
              blocks: [
                {
                  id: 'lead-metrics',
                  type: ContentBlockType.METRIC,
                  title: 'Lead Generation Rate',
                  data: {
                    value: 18.5,
                    label: 'Leads per day',
                    change: 12.5,
                    changeType: 'increase',
                    unit: 'leads',
                    format: 'number',
                  } as MetricBlockData,
                },
              ],
            }}
            renderBlock={renderContentBlock}
            onRefresh={handleRefresh}
            testID={`lead-analytics`}
          />
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Advanced Lead Management System</Text>
        </View>
      </Animated.ScrollView>
      
      <FloatingFooter context="Lead CRM" />
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
  funnelStage: {
    marginBottom: 16,
  },
  funnelStageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  funnelStageName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  funnelStageValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#667eea',
  },
  funnelBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  funnelBar: {
    height: '100%',
    borderRadius: 4,
  },
  funnelPercentage: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
    textAlign: 'right',
  },
  sourcesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sourcesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sourceCard: {
    width: (width - 48) / 4,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
  },
  sourceIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  sourceCount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sourceName: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  sourceConversion: {
    fontSize: 12,
    fontWeight: '600',
  },
  qualitySection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  qualityList: {
    gap: 12,
  },
  qualityCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  qualityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  qualityIcon: {
    fontSize: 24,
  },
  qualityContent: {
    flex: 1,
  },
  qualityName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  qualityDescription: {
    fontSize: 14,
    color: '#888888',
  },
  qualityCount: {
    alignItems: 'flex-end',
  },
  qualityCountValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  qualityCountLabel: {
    fontSize: 12,
    color: '#888888',
  },
  recentLeadsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  leadCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  leadStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  leadContent: {
    flex: 1,
  },
  leadName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  leadDetails: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  leadTime: {
    fontSize: 12,
    color: '#667eea',
  },
  leadStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  leadStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  followupSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  followupCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  followupTime: {
    width: 80,
  },
  followupTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  followupContent: {
    flex: 1,
  },
  followupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  followupType: {
    fontSize: 14,
    color: '#888888',
  },
  followupPriority: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  followupPriorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
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

export default LeadCrmTab;