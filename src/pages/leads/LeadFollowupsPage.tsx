/**
 * Lead Followups Page - Premium Black Theme
 * Advanced follow-up management with deep content and premium design
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

const LeadFollowupsPage: React.FC = () => {
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
              <Text style={styles.heroBadge}>📞 FOLLOW-UPS</Text>
              <Text style={styles.heroTitle}>Manage Lead{'\n'}Follow-ups Efficiently</Text>
              <Text style={styles.heroSubtitle}>Track and schedule follow-ups with intelligent automation and activity monitoring</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>28</Text>
                  <Text style={styles.heroStatLabel}>Today</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>94%</Text>
                  <Text style={styles.heroStatLabel}>Response</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>12h</Text>
                  <Text style={styles.heroStatLabel}>Avg Time</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.todaySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📅 Today's Follow-ups</Text>
          {[
            { name: 'Emily Watson', property: 'Green Valley Apartments', time: '10:00 AM', type: 'Phone Call', status: 'pending', color: '#f5576c' },
            { name: 'James Rodriguez', property: 'Sunrise Complex', time: '11:30 AM', type: 'Video Tour', status: 'pending', color: '#f093fb' },
            { name: 'Sarah Kim', property: 'Downtown Lofts', time: '2:00 PM', type: 'In-person Tour', status: 'pending', color: '#667eea' },
            { name: 'Michael Brown', property: 'Harbor View', time: '4:00 PM', type: 'Email Follow-up', status: 'pending', color: '#4facfe' },
          ].map((item, index) => (
            <View key={index} style={styles.followupCard}>
              <View style={[styles.followupTimeBadge, { backgroundColor: item.color }]}>
                <Text style={styles.followupTimeText}>{item.time}</Text>
              </View>
              <View style={styles.followupContent}>
                <Text style={styles.followupName}>{item.name}</Text>
                <Text style={styles.followupProperty}>{item.property}</Text>
                <Text style={styles.followupType}>{item.type}</Text>
              </View>
              <TouchableOpacity style={styles.followupActionButton}>
                <Text style={styles.followupActionText}>Start</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.overdueSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⚠️ Overdue Follow-ups</Text>
          {[
            { name: 'Lisa Garcia', property: 'Campus Heights', overdue: '2 days', type: 'Phone Call', color: '#f5576c' },
            { name: 'Robert Chen', property: 'Garden View', overdue: '1 day', type: 'Email', color: '#f093fb' },
          ].map((item, index) => (
            <View key={index} style={styles.overdueCard}>
              <View style={[styles.overdueBadge, { backgroundColor: item.color }]}>
                <Text style={styles.overdueBadgeText}>⚠️ {item.overdue}</Text>
              </View>
              <View style={styles.overdueContent}>
                <Text style={styles.overdueName}>{item.name}</Text>
                <Text style={styles.overdueProperty}>{item.property}</Text>
                <Text style={styles.overdueType}>{item.type}</Text>
              </View>
              <TouchableOpacity style={styles.overdueActionButton}>
                <Text style={styles.overdueActionText}>Priority</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.upcomingSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📆 Upcoming Follow-ups</Text>
          {[
            { name: 'Jennifer Lee', property: 'Sunset Tower', date: 'Tomorrow', time: '9:00 AM', type: 'Tour', color: '#667eea' },
            { name: 'David Wilson', property: 'Green Valley', date: 'Sep 22', time: '3:00 PM', type: 'Phone Call', color: '#43e97b' },
            { name: 'Amanda Foster', property: 'Downtown Lofts', date: 'Sep 23', time: '11:00 AM', type: 'Video Call', color: '#4facfe' },
          ].map((item, index) => (
            <View key={index} style={styles.upcomingCard}>
              <View style={[styles.upcomingDateBadge, { backgroundColor: item.color }]}>
                <Text style={styles.upcomingDateText}>{item.date}</Text>
              </View>
              <View style={styles.upcomingContent}>
                <Text style={styles.upcomingName}>{item.name}</Text>
                <Text style={styles.upcomingProperty}>{item.property}</Text>
                <Text style={styles.upcomingDetails}>{item.time} • {item.type}</Text>
              </View>
              <TouchableOpacity style={styles.upcomingRescheduleButton}>
                <Text style={styles.upcomingRescheduleText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[historySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Follow-up History</Text>
          {[
            { name: 'Priya Sharma', property: 'Green Valley', date: 'Sep 19', type: 'Phone Call', result: 'Promised to visit', color: '#43e97b' },
            { name: 'Alex Kim', property: 'Sunrise Complex', date: 'Sep 18', type: 'In-person Tour', result: 'Submitted application', color: '#43e97b' },
            { name: 'Maria Garcia', property: 'Downtown Lofts', date: 'Sep 17', type: 'Email', result: 'Requested more info', color: '#f093fb' },
            { name: 'James Anderson', property: 'Harbor View', date: 'Sep 16', type: 'Video Tour', result: 'Interested', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.historyCard}>
              <View style={[styles.historyResultBadge, { backgroundColor: item.color }]}>
                <Text style={styles.historyResultText}>✓</Text>
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyName}>{item.name}</Text>
                <Text style={styles.historyProperty}>{item.property}</Text>
                <Text style={styles.historyDetails}>{item.date} • {item.type}</Text>
                <Text style={styles.historyResult}>{item.result}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[automationSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⚡ Follow-up Automation</Text>
          <View style={styles.automationList}>
            {[
              { rule: 'Auto-remind at 24h', description: 'Send reminder 24 hours after first contact', active: true, color: '#667eea' },
              { rule: 'Auto-schedule at 48h', description: 'Suggest tour after 48 hours', active: true, color: '#43e97b' },
              { rule: 'Auto-escalate at 72h', description: 'Escalate to priority after 72 hours', active: false, color: '#f093fb' },
              { rule: 'Auto-cold at 7 days', description: 'Mark as cold after 7 days no response', active: true, color: '#4facfe' },
            ].map((item, index) => (
              <View key={index} style={styles.automationCard}>
                <View style={[styles.automationDot, { backgroundColor: item.color }]} />
                <View style={styles.automationContent}>
                  <Text style={styles.automationRule}>{item.rule}</Text>
                  <Text style={styles.automationDescription}>{item.description}</Text>
                </View>
                <TouchableOpacity style={styles.automationToggle}>
                  <Text style={[styles.automationToggleText, { color: item.active ? '#43e97b' : '#888888' }]}>
                    {item.active ? 'Active' : 'Inactive'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[methodsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📞 Follow-up Methods</Text>
          <View style={styles.methodsGrid}>
            {[
              { method: 'Phone Call', success: '82%', icon: '📞', color: '#667eea' },
              { method: 'Email', success: '78%', icon: '📧', color: '#43e97b' },
              { method: 'SMS', success: '91%', icon: '💬', color: '#f093fb' },
              { method: 'Video Call', success: '75%', icon: '📹', color: '#4facfe' },
            ].map((item, index) => (
              <View key={index} style={[styles.methodCard, { borderColor: item.color }]}>
                <Text style={styles.methodIcon}>{item.icon}</Text>
                <Text style={styles.methodName}>{item.method}</Text>
                <Text style={[styles.methodSuccess, { color: item.color }]}>{item.success}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.bestPracticesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💡 Best Practices</Text>
          {[
            { practice: 'Response Time', description: 'Respond within 1 hour for best conversion', icon: '⏱️', color: '#f5576c' },
            { practice: 'Personalization', description: 'Customize communication for each lead', icon: '🎯', color: '#667eea' },
            { practice: 'Multi-channel', description: 'Use phone, email, and SMS together', icon: '📱', color: '#43e97b' },
            { practice: 'Timing', description: 'Schedule calls during business hours', icon: '🕐', color: '#f093fb' },
          ].map((item, index) => (
            <View key={index} style={styles.practiceCard}>
              <View style={[styles.practiceIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.practiceIcon}>{item.icon}</Text>
              </View>
              <View style={styles.practiceContent}>
                <Text style={styles.practiceName}>{item.practice}</Text>
                <Text style={styles.practiceDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Intelligent Follow-up Management</Text>
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
  todaySection: {
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
  followupTimeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  followupTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
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
  followupProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  followupType: {
    fontSize: 12,
    color: '#667eea',
  },
  followupActionButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  followupActionText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  overdueSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  overdueCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#f5576c',
    alignItems: 'center',
  },
  overdueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  overdueBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  overdueContent: {
    flex: 1,
  },
  overdueName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  overdueProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  overdueType: {
    fontSize: 12,
    color: '#f5576c',
  },
  overdueActionButton: {
    backgroundColor: 'rgba(245, 87, 108, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  overdueActionText: {
    color: '#f5576c',
    fontSize: 12,
    fontWeight: '600',
  },
  upcomingSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  upcomingCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  upcomingDateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  upcomingDateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  upcomingContent: {
    flex: 1,
  },
  upcomingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  upcomingProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  upcomingDetails: {
    fontSize: 12,
    color: '#667eea',
  },
  upcomingRescheduleButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  upcomingRescheduleText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  historySection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  historyResultBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  historyResultText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  historyContent: {
    flex: 1,
  },
  historyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  historyProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  historyDetails: {
    fontSize: 12,
    color: '#667eea',
    marginBottom: 4,
  },
  historyResult: {
    fontSize: 14,
    color: '#43e97b',
    fontWeight: '600',
  },
  automationSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  automationList: {
    gap: 12,
  },
  automationCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  automationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  automationContent: {
    flex: 1,
  },
  automationRule: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  automationDescription: {
    fontSize: 14,
    color: '#888888',
  },
  automationToggle: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  automationToggleText: {
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
  methodSuccess: {
    fontSize: 16,
    fontWeight: '700',
  },
  bestPracticesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  practiceCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  practiceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  practiceIcon: {
    fontSize: 24,
  },
  practiceContent: {
    flex: 1,
  },
  practiceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  practiceDescription: {
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

export default LeadFollowupsPage;