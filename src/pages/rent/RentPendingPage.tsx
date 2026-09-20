/**
 * Rent Pending Page - Premium Black Theme
 * Advanced pending rent management with deep content and premium design
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

const RentPendingPage: React.FC = () => {
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
              <Text style={styles.heroBadge}>⏰ PENDING PAYMENTS</Text>
              <Text style={styles.heroTitle}>Complete Pending{'\n'}Rent Management</Text>
              <Text style={styles.heroSubtitle}>Track $6,100 in pending payments from 8 tenants with intelligent reminders and automated collection strategies</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>8</Text>
                  <Text style={styles.heroStatLabel}>Pending</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>$6.1K</Text>
                  <Text style={styles.heroStatLabel}>Amount</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>92%</Text>
                  <Text style={styles.heroStatLabel}>Rate</Text>
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
                <Text style={styles.overviewValue}>$6,100</Text>
                <Text style={styles.overviewLabel}>Total Pending</Text>
                <Text style={styles.overviewTrend}>↓ 8.2%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>8</Text>
                <Text style={styles.overviewLabel}>Tenants</Text>
                <Text style={styles.overviewTrend}>3 Urgent</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>92.8%</Text>
                <Text style={styles.overviewLabel}>Collection Rate</Text>
                <Text style={styles.overviewTrend}>↑ 5.4%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>4.2 days</Text>
                <Text style={styles.overviewLabel}>Avg Overdue</Text>
                <Text style={styles.overviewTrend}>↓ 12%</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.urgentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🚨 Urgent Collections</Text>
          {[
            { name: 'Rahul Kumar', property: 'Room 203 Green Valley', amount: '$1,050', overdue: '15 days', priority: 'Critical', color: '#f5576c' },
            { name: 'Sarah Johnson', property: 'Room 412 Sunrise Apartments', amount: '$1,200', overdue: '10 days', priority: 'Critical', color: '#f5576c' },
            { name: 'Michael Chen', property: 'Room 205 Garden View', amount: '$950', overdue: '8 days', priority: 'High', color: '#f093fb' },
          ].map((item, index) => (
            <View key={index} style={styles.urgentCard}>
              <View style={[styles.urgentBadge, { backgroundColor: item.color }]}>
                <Text style={styles.urgentBadgeText}>🚨 {item.priority}</Text>
              </View>
              <View style={styles.urgentContent}>
                <Text style={styles.urgentName}>{item.name}</Text>
                <Text style={styles.urgentProperty}>{item.property}</Text>
                <Text style={styles.urgentOverdue}>{item.overdue} overdue</Text>
              </View>
              <View style={styles.urgentAmount}>
                <Text style={styles.urgentAmountValue}>{item.amount}</Text>
                <TouchableOpacity style={styles.urgentActionButton}>
                  <Text style={styles.urgentActionText}>Remind</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.pendingSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⏳ All Pending Payments</Text>
          {[
            { name: 'Rahul Kumar', property: 'Room 203 Green Valley', amount: '$1,050', due: 'Sep 5', days: 15, color: '#f5576c' },
            { name: 'Sarah Johnson', property: 'Room 412 Sunrise Apartments', amount: '$1,200', due: 'Sep 10', days: 10, color: '#f5576c' },
            { name: 'Michael Chen', property: 'Room 205 Garden View', amount: '$950', due: 'Sep 12', days: 8, color: '#f093fb' },
            { name: 'Emily Davis', property: 'Room 567 Downtown Lofts', amount: '$1,400', due: 'Sep 15', days: 5, color: '#f093fb' },
            { name: 'David Wilson', property: 'Room 101 Sunset Tower', amount: '$1,100', due: 'Sep 16', days: 4, color: '#667eea' },
            { name: 'Jennifer Lee', property: 'Room 332 Harbor View', amount: '$850', due: 'Sep 17', days: 3, color: '#667eea' },
            { name: 'Robert Brown', property: 'Room 118 Campus Heights', amount: '$1,250', due: 'Sep 18', days: 2, color: '#4facfe' },
            { name: 'Lisa Garcia', property: 'Room 245 Green Valley', amount: '$300', due: 'Sep 19', days: 1, color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.pendingCard}>
              <View style={[styles.pendingDaysBadge, { backgroundColor: item.color }]}>
                <Text style={styles.pendingDaysText}>{item.days}d</Text>
              </View>
              <View style={styles.pendingContent}>
                <Text style={styles.pendingName}>{item.name}</Text>
                <Text style={styles.pendingProperty}>{item.property}</Text>
                <Text style={styles.pendingDue}>Due: {item.due}</Text>
              </View>
              <View style={styles.pendingAmount}>
                <Text style={styles.pendingAmountValue}>{item.amount}</Text>
                <TouchableOpacity style={styles.pendingActionButton}>
                  <Text style={styles.pendingActionText}>Action</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.actionsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📞 Collection Actions</Text>
          {[
            { action: 'WhatsApp Reminder Sent', tenant: 'Rahul Kumar', time: '2 hours ago', result: 'Pending', color: '#667eea' },
            { action: 'Payment Link Generated', tenant: 'Sarah Johnson', time: '4 hours ago', result: 'Pending', color: '#f093fb' },
            { action: 'Phone Call Made', tenant: 'Michael Chen', time: '1 day ago', result: 'Promised', color: '#43e97b' },
            { action: 'Email Reminder', tenant: 'Emily Davis', time: '2 days ago', result: 'Pending', color: '#4facfe' },
          ].map((item, index) => (
            <View key={index} style={styles.actionCard}>
              <View style={[styles.actionIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.actionIcon}>📞</Text>
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionAction}>{item.action}</Text>
                <Text style={styles.actionTenant}>{item.tenant}</Text>
                <Text style={styles.actionTime}>{item.time}</Text>
              </View>
              <View style={[styles.actionResultBadge, { backgroundColor: item.color }]}>
                <Text style={styles.actionResultText}>{item.result}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.timelineSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📅 Collection Timeline</Text>
          <View style={styles.timelineContainer}>
            {[
              { date: 'Sep 1', label: 'Rent Due', value: '$90,620', status: 'completed' },
              { date: 'Sep 5', label: 'First Reminder', value: '$6,100', status: 'completed' },
              { date: 'Sep 10', label: 'Second Reminder', value: '$3,200', status: 'completed' },
              { date: 'Sep 15', label: 'Late Notice', value: '$1,850', status: 'in-progress' },
              { date: 'Sep 20', label: 'Final Notice', value: '$450', status: 'pending' },
            ].map((item, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineDate}>
                  <Text style={styles.timelineDateText}>{item.date}</Text>
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineLabel}>{item.label}</Text>
                  <Text style={styles.timelineValue}>{item.value}</Text>
                </View>
                <View style={[styles.timelineStatus, { backgroundColor: item.status === 'completed' ? '#43e97b' : item.status === 'in-progress' ? '#f093fb' : '#4facfe' }]}>
                  <Text style={styles.timelineStatusText}>{item.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[strategiesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💡 Collection Strategies</Text>
          {[
            { strategy: 'Automated Reminders', success: '45%', description: 'WhatsApp messages sent 3 days before due', icon: '💬', color: '#667eea' },
            { strategy: 'Payment Links', success: '38%', description: 'Direct payment links increase conversion', icon: '🔗', color: '#43e97b' },
            { strategy: 'Phone Follow-up', success: '52%', description: 'Personal calls for high-value tenants', icon: '📞', color: '#f093fb' },
            { strategy: 'Late Fees', success: '28%', description: 'Late fee reminders encourage payment', icon: '💰', color: '#4facfe' },
          ].map((item, index) => (
            <View key={index} style={styles.strategyCard}>
              <View style={[styles.strategyIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.strategyIcon}>{item.icon}</Text>
              </View>
              <View style={styles.strategyContent}>
                <Text style={styles.strategyName}>{item.strategy}</Text>
                <Text style={styles.strategyDescription}>{item.description}</Text>
              </View>
              <View style={styles.strategySuccess}>
                <Text style={[styles.strategySuccessValue, { color: item.color }]}>{item.success}%</Text>
                <Text style={styles.strategySuccessLabel}>success</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[methodsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💳 Payment Methods</Text>
          <View style={styles.methodsGrid}>
            {[
              { method: 'UPI', percentage: 45, color: '#667eea', icon: '📱' },
              { method: 'Card', percentage: 30, color: '#f093fb', icon: '💳' },
              { method: 'Bank Transfer', percentage: 20, color: '#4facfe', icon: '🏦' },
              { method: 'Cash', percentage: 5, color: '#43e97b', icon: '💵' },
            ].map((item, index) => (
              <View key={index} style={[styles.methodCard, { borderColor: item.color }]}>
                <Text style={styles.methodIcon}>{item.icon}</Text>
                <Text style={styles.methodPercentage}>{item.percentage}%</Text>
                <Text style={styles.methodName}>{item.method}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[historySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Payment History</Text>
          {[
            { tenant: 'Priya Sharma', property: 'Room 302 Green Valley', amount: '$1,050', date: 'Sep 18', method: 'UPI', color: '#43e97b' },
            { tenant: 'James Anderson', property: 'Room 405 Sunrise Apartments', amount: '$1,200', date: 'Sep 17', method: 'Card', color: '#43e97b' },
            { tenant: 'Maria Garcia', property: 'Room 215 Garden View', amount: '$950', date: 'Sep 16', method: 'Bank Transfer', color: '#43e97b' },
            { tenant: 'Alex Kim', property: 'Room 320 Downtown Lofts', amount: '$1,400', date: 'Sep 15', method: 'UPI', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.historyCard}>
              <View style={styles.historyIconContainer}>
                <Text style={styles.historyIcon}>✅</Text>
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyTenant}>{item.tenant}</Text>
                <Text style={styles.historyProperty}>{item.property}</Text>
                <Text style={styles.historyDate}>{item.date} • {item.method}</Text>
              </View>
              <Text style={styles.historyAmount}>{item.amount}</Text>
            </View>
          ))}
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Advanced Rent Collection System</Text>
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
  urgentSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  urgentCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#f5576c',
    alignItems: 'center',
  },
  urgentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  urgentBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  urgentContent: {
    flex: 1,
  },
  urgentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  urgentProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  urgentOverdue: {
    fontSize: 12,
    color: '#f5576c',
  },
  urgentAmount: {
    alignItems: 'flex-end',
  },
  urgentAmountValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  urgentActionButton: {
    backgroundColor: 'rgba(245, 87, 108, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  urgentActionText: {
    color: '#f5576c',
    fontSize: 12,
    fontWeight: '600',
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
  pendingDaysBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  pendingDaysText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pendingContent: {
    flex: 1,
  },
  pendingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pendingProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  pendingDue: {
    fontSize: 12,
    color: '#667eea',
  },
  pendingAmount: {
    alignItems: 'flex-end',
  },
  pendingAmountValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  pendingActionButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pendingActionText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  actionsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  actionCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionContent: {
    flex: 1,
  },
  actionAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  actionTenant: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  actionTime: {
    fontSize: 12,
    color: '#667eea',
  },
  actionResultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  actionResultText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timelineSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  timelineContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineDate: {
    width: 60,
  },
  timelineDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  timelineContent: {
    flex: 1,
  },
  timelineLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  timelineValue: {
    fontSize: 12,
    color: '#888888',
  },
  timelineStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timelineStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  strategiesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  strategyCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  strategyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  strategyIcon: {
    fontSize: 24,
  },
  strategyContent: {
    flex: 1,
  },
  strategyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  strategyDescription: {
    fontSize: 14,
    color: '#888888',
  },
  strategySuccess: {
    alignItems: 'flex-end',
  },
  strategySuccessValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  strategySuccessLabel: {
    fontSize: 12,
    color: '#888888',
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
  methodPercentage: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  methodName: {
    fontSize: 12,
    color: '#888888',
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
  historyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(67, 233, 123, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  historyIcon: {
    fontSize: 20,
  },
  historyContent: {
    flex: 1,
  },
  historyTenant: {
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
  historyDate: {
    fontSize: 12,
    color: '#667eea',
  },
  historyAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#43e97b',
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

export default RentPendingPage;