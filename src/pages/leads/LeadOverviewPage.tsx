/**
 * Lead Overview Page - Premium Black Theme
 * Advanced lead overview with deep content and premium design
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

const LeadOverviewPage: React.FC = () => {
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
              <Text style={styles.heroBadge}>👥 LEAD OVERVIEW</Text>
              <Text style={styles.heroTitle}>Complete Lead{'\n'}Pipeline Dashboard</Text>
              <Text style={styles.heroSubtitle}>Track 126 active leads through intelligent pipeline management with automated follow-ups and conversion tracking</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>126</Text>
                  <Text style={styles.heroStatLabel}>Active</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>24.5%</Text>
                  <Text style={styles.heroStatLabel}>Conversion</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>18</Text>
                  <Text style={styles.heroStatLabel}>Hot</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.pipelineSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Lead Pipeline</Text>
          <View style={styles.pipelineContainer}>
            {[
              { stage: 'Total Leads', value: 126, color: '#667eea', percentage: 100 },
              { stage: 'Qualified', value: 89, color: '#f093fb', percentage: 71 },
              { stage: 'In Contact', value: 56, color: '#4facfe', percentage: 44 },
              { stage: 'Hot Leads', value: 18, color: '#f5576c', percentage: 14 },
              { stage: 'Converted', value: 12, color: '#43e97b', percentage: 10 },
            ].map((stage, index) => (
              <View key={index} style={styles.pipelineStage}>
                <View style={styles.pipelineStageInfo}>
                  <Text style={styles.pipelineStageName}>{stage.stage}</Text>
                  <Text style={styles.pipelineStageValue}>{stage.value}</Text>
                </View>
                <View style={styles.pipelineBarContainer}>
                  <View style={[styles.pipelineBar, { width: `${stage.percentage}%`, backgroundColor: stage.color }]} />
                </View>
                <Text style={styles.pipelinePercentage}>{stage.percentage}%</Text>
              </View>
            ))}
          </View>
        </Animated.View>

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

        <Animated.View style={[styles.qualitySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⭐ Lead Quality</Text>
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

        <Animated.View style={[styles.recentSection, { transform: [{ scale: scaleValue.current }] }]}>
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

        <Animated.View style={[styles.conversionSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">✅ Conversion Metrics</Text>
          <View style={styles.conversionGrid}>
            {[
              { metric: 'Conversion Rate', value: '24.5%', change: '+3.2%', color: '#43e97b' },
              { metric: 'Avg Conversion Time', value: '5.2 days', change: '-1.5 days', color: '#667eea' },
              { metric: 'Lead to Visit Rate', value: '68%', change: '+5.4%', color: '#f093fb' },
              { metric: 'Visit to Lease Rate', value: '42%', change: '+2.8%', color: '#4facfe' },
            ].map((item, index) => (
              <View key={index} style={[styles.conversionCard, { borderColor: item.color }]}>
                <Text style={styles.conversionMetric}>{item.metric}</Text>
                <Text style={styles.conversionValue}>{item.value}</Text>
                <Text style={[styles.conversionChange, { color: item.color }]}>{item.change}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.teamSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>👥 Team Performance</Text>
          {[
            { agent: 'Sarah M.', leads: 45, converted: 12, rate: '26.7%', color: '#667eea' },
            { agent: 'John D.', leads: 38, converted: 9, rate: '23.7%', color: '#f093fb' },
            { agent: 'Mike R.', leads: 32, converted: 8, rate: '25.0%', color: '#43e97b' },
            { agent: 'Lisa K.', leads: 11, converted: 2, rate: '18.2%', color: '#4facfe' },
          ].map((agent, index) => (
            <View key={index} style={styles.agentCard}>
              <View style={styles.agentAvatar}>
                <Text style={styles.agentAvatarText}>{agent.agent.charAt(0)}</Text>
              </View>
              <View style={styles.agentContent}>
                <Text style={styles.agentName}>{agent.agent}</Text>
                <Text style={styles.agentStats}>{agent.leads} leads • {agent.converted} converted</Text>
              </View>
              <View style={styles.agentRate}>
                <Text style={[styles.agentRateValue, { color: agent.color }]}>{agent.rate}</Text>
                <Text style={styles.agentRateLabel}>conversion</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[insightsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💡 AI Insights</Text>
          {[
            { insight: 'Best Time to Contact', text: 'Leads respond 45% faster between 10 AM - 2 PM', icon: '⏰', color: '#667eea' },
            { insight: 'High-Value Properties', text: 'Properties above $25K convert 35% faster', icon: '💰', color: '#43e97b' },
            { insight: 'Follow-up Pattern', text: '3rd follow-up has highest conversion rate', icon: '📞', color: '#f093fb' },
            { insight: 'Source Performance', text: 'WhatsApp leads have 42% conversion rate', icon: '💬', color: '#4facfe' },
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
          <Text style={styles.footerSubtext}>Advanced Lead Management System</Text>
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
  pipelineSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  pipelineContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  pipelineStage: {
    marginBottom: 16,
  },
  pipelineStageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pipelineStageName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pipelineStageValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#667eea',
  },
  pipelineBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  pipelineBar: {
    height: '100%',
    borderRadius: 4,
  },
  pipelinePercentage: {
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
  recentSection: {
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
  conversionSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  conversionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  conversionCard: {
    width: (width - 48) / 2,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    marginBottom: 16,
  },
  conversionMetric: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  conversionValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  conversionChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  teamSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  agentCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  agentAvatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#667eea',
  },
  agentContent: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  agentStats: {
    fontSize: 14,
    color: '#888888',
  },
  agentRate: {
    alignItems: 'flex-end',
  },
  agentRateValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  agentRateLabel: {
    fontSize: 12,
    color: '#888888',
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

export default LeadOverviewPage;