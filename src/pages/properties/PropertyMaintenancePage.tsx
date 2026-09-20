/**
 * Property Maintenance Page - Premium Black Theme
 * Advanced property maintenance with deep content and premium design
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

const PropertyMaintenancePage: React.FC = () => {
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
              <Text style={styles.heroBadge}>🔧 PROPERTY MAINTENANCE</Text>
              <Text style={styles.heroTitle}>Complete Maintenance{'\n'}Management System</Text>
              <Text style={styles.heroSubtitle}>Track, schedule, and manage all property maintenance with intelligent alerts and vendor coordination</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>8</Text>
                  <Text style={styles.heroStatLabel}>Pending</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>24</Text>
                  <Text style={styles.heroStatLabel}>Completed</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatValue}>
                  <Text style={styles.heroStatValue}>$12.4K</Text>
                  <Text style={styles.heroStatLabel}>Spent</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.quickActionsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>➕</Text>
              <Text style={styles.quickActionLabel}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📅</Text>
              <Text style={styles.quickActionLabel}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>👥</Text>
              <Text style={styles.quickActionLabel}>Vendors</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionLabel}>Reports</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={[styles.overviewSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Maintenance Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>8</Text>
                <Text style={styles.overviewLabel}>Pending Requests</Text>
                <Text style={styles.overviewTrend}>3 Urgent</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>24</Text>
                <Text style={styles.overviewLabel}>Completed This Month</Text>
                <Text style={styles.overviewTrend}>↑ 15%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$12,450</Text>
                <Text style={styles.overviewLabel}>Spent This Month</Text>
                <Text style={styles.overviewTrend}>↓ 8%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>4.2 hrs</Text>
                <Text style={styles.overviewLabel}>Avg Response Time</Text>
                <Text style={styles.overviewTrend}>↓ 12%</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.urgentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🚨 Urgent Repairs</Text>
          {[
            { issue: 'Water Leak - Unit 42', property: 'Green Valley', reported: '2 hours ago', priority: 'Critical', assigned: 'Emergency Team', color: '#f5576c' },
            { issue: 'Power Outage - Building A', property: 'Sunset Tower', reported: '4 hours ago', priority: 'Critical', assigned: 'Electric Team', color: '#f5576c' },
            { issue: 'Gas Leak - Unit 15', property: 'Harbor View', reported: '6 hours ago', priority: 'Critical', assigned: 'Gas Company', color: '#f5576c' },
          ].map((item, index) => (
            <View key={index} style={styles.urgentCard}>
              <View style={[styles.urgentBadge, { backgroundColor: item.color }]}>
                <Text style={styles.urgentBadgeText}>🚨 {item.priority}</Text>
              </View>
              <View style={styles.urgentContent}>
                <Text style={styles.urgentTitle}>{item.issue}</Text>
                <Text style={styles.urgentProperty}>{item.property}</Text>
                <Text style={styles.urgentReported}>Reported: {item.reported}</Text>
              </View>
              <View style={styles.urgentAssignment}>
                <Text style={styles.urgentAssigned}>{item.assigned}</Text>
                <TouchableOpacity style={styles.urgentActionButton}>
                  <Text style={styles.urgentActionText}>Track</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.pendingSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⏳ Pending Maintenance</Text>
          {[
            { issue: 'HVAC Repair - Building B', property: 'Sunset Tower', due: 'Today', type: 'HVAC', color: '#f093fb' },
            { issue: 'Plumbing - Unit 23', property: 'Green Valley', due: 'Tomorrow', type: 'Plumbing', color: '#667eea' },
            { issue: 'Window Replacement - Unit 12', property: 'Campus Heights', due: 'Sep 25', type: 'Structural', color: '#4facfe' },
            { issue: 'Electrical Check - Common Area', property: 'Harbor View', due: 'Sep 28', type: 'Electrical', color: '#ffd700' },
            { issue: 'Door Lock - Unit 45', property: 'Industrial Complex', due: 'Weekly', type: 'Security', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.pendingCard}>
              <View style={[styles.pendingTypeBadge, { backgroundColor: item.color }]}>
                <Text style={styles.pendingTypeText}>{item.type}</Text>
              </View>
              <View style={styles.pendingContent}>
                <Text style={styles.pendingTitle}>{item.issue}</Text>
                <Text style={styles.pendingProperty}>{item.property}</Text>
                <Text style={styles.pendingDue}>Due: {item.due}</Text>
              </View>
              <TouchableOpacity style={styles.pendingActionButton}>
                <Text style={styles.pendingActionText}>Schedule</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.categoriesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📂 Maintenance Categories</Text>
          <View style={styles.categoriesGrid}>
            {[
              { category: 'HVAC', count: 4, avgCost: '$2,450', color: '#667eea', icon: '❄️' },
              { category: 'Plumbing', count: 3, avgCost: '$850', color: '#f093fb', icon: '🚿' },
              { category: 'Electrical', count: 3, avgCost: '$1,200', color: '#4facfe', icon: '⚡' },
              { category: 'Structural', count: 2, avgCost: '$3,500', color: '#ffd700', icon: '🏗️' },
              { category: 'Appliances', count: 2, avgCost: '$650', color: '#43e97b', icon: '🔌' },
              { category: 'Security', count: 2, avgCost: '$400', color: '#f5576c', icon: '🔒' },
            ].map((item, index) => (
              <View key={index} style={[styles.categoryCard, { borderColor: item.color }]}>
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text style={styles.categoryCount}>{item.count}</Text>
                <Text style={styles.categoryName}>{item.category}</Text>
                <Text style={[styles.categoryCost, { color: item.color }]}>{item.avgCost}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.vendorsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>👥 Preferred Vendors</Text>
          {[
            { name: 'ABC HVAC Services', category: 'HVAC', rating: '4.8', jobs: 12, color: '#667eea' },
            { name: 'City Electric Company', category: 'Electrical', rating: '4.9', jobs: 8, color: '#4facfe' },
            { name: 'Quick Plumbing Pro', category: 'Plumbing', rating: '4.7', jobs: 15, color: '#f093fb' },
            { name: 'SafeGuard Security', category: 'Security', rating: '4.9', jobs: 6, color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.vendorCard}>
              <View style={[styles.vendorRatingBadge, { backgroundColor: item.color }]}>
                <Text style={styles.vendorRatingText}>⭐ {item.rating}</Text>
              </View>
              <View style={styles.vendorContent}>
                <Text style={styles.vendorName}>{item.name}</Text>
                <Text style={styles.vendorCategory}>{item.category}</Text>
                <Text style={styles.vendorJobs}>{item.jobs} jobs completed</Text>
              </View>
              <TouchableOpacity style={styles.vendorContactButton}>
                <Text style={styles.vendorContactText}>Contact</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.costSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">💰 Cost Analysis</Text>
          <View style={styles.costContainer}>
            {[
              { month: 'June', cost: '$15,200', repairs: 28 },
              { month: 'July', cost: '$13,800', repairs: 24 },
              { month: 'August', cost: '$14,500', repairs: 26 },
              { month: 'September', cost: '$12,450', repairs: 24 },
            ].map((item, index) => (
              <View key={index} style={styles.costRow}>
                <View style={styles.costMonth}>
                  <Text style={styles.costMonthText}>{item.month}</Text>
                </View>
                <View style={styles.costBarContainer}>
                  <View style={[styles.costBar, { width: `${(parseFloat(item.cost.replace('$', '').replace(',', '')) / 15200) * 100}%`, backgroundColor: '#667eea' }]} />
                </View>
                <View style={styles.costData}>
                  <Text style={styles.costValue}>{item.cost}</Text>
                  <Text style={styles.costRepairs}>{item.repairs} repairs</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.completedSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>✅ Recently Completed</Text>
          {[
            { task: 'AC Unit Replacement', property: 'Unit 23 - Green Valley', completed: '2 hours ago', cost: '$2,450', vendor: 'ABC HVAC', color: '#43e97b' },
            { task: 'Door Lock Repair', property: 'Unit 15 - Sunset Tower', completed: '4 hours ago', cost: '$150', vendor: 'Locksmith Pro', color: '#43e97b' },
            { task: 'Common Area Cleaning', property: 'Building A - Harbor View', completed: '1 day ago', cost: '$350', vendor: 'Clean Team', color: '#43e97b' },
            { task: 'Smoke Detector Check', property: 'All Properties', completed: '2 days ago', cost: '$200', vendor: 'Safety Team', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.completedCard}>
              <View style={styles.completedIconContainer}>
                <Text style={styles.completedIcon}>✅</Text>
              </View>
              <View style={styles.completedContent}>
                <Text style={styles.completedTitle}>{item.task}</Text>
                <Text style={styles.completedProperty}>{item.property}</Text>
                <Text style={styles.completedVendor}>Vendor: {item.vendor}</Text>
              </View>
              <View style={styles.completedCost}>
                <Text style={styles.completedCostValue}>{item.cost}</Text>
                <Text style={styles.completedTime}>{item.completed}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.scheduleSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📅 Upcoming Schedule</Text>
          {[
            { date: 'Sep 20', task: 'HVAC Repair - Building B', time: '10:00 AM', vendor: 'ABC HVAC' },
            { date: 'Sep 21', task: 'Plumbing Check - All Properties', time: '9:00 AM', vendor: 'Quick Plumbing' },
            { date: 'Sep 22', task: 'Electrical Inspection - Sunset Tower', time: '2:00 PM', vendor: 'City Electric' },
            { date: 'Sep 23', task: 'Annual Maintenance - Harbor View', time: '8:00 AM', vendor: 'Maintenance Team' },
            { date: 'Sep 24', task: 'Safety Check - Industrial Complex', time: '11:00 AM', vendor: 'SafeGuard' },
          ].map((item, index) => (
            <View key={index} style={styles.scheduleCard}>
              <View style={styles.scheduleDate}>
                <Text style={styles.scheduleDateText}>{item.date}</Text>
              </View>
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleTask}>{item.task}</Text>
                <Text style={styles.scheduleTime}>{item.time} • {item.vendor}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.preventiveSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">🛡️ Preventive Maintenance</Text>
          {[
            { task: 'HVAC Filter Change', frequency: 'Monthly', next: 'Oct 1', status: 'Scheduled', color: '#667eea' },
            { task: 'Fire Safety Inspection', frequency: 'Quarterly', next: 'Oct 15', status: 'Scheduled', color: '#f093fb' },
            { task: 'Elevator Inspection', frequency: 'Monthly', next: 'Oct 5', status: 'Scheduled', color: '#4facfe' },
            { task: 'Pool Maintenance', frequency: 'Weekly', next: 'Sep 26', status: 'Scheduled', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.preventiveCard}>
              <View style={[styles.preventiveIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.preventiveIcon}>🔧</Text>
              </View>
              <View style={styles.preventiveContent}>
                <Text style={styles.preventiveTitle}>{item.task}</Text>
                <Text style={styles.preventiveFrequency}>Frequency: {item.frequency}</Text>
                <Text style={styles.preventiveNext}>Next: {item.next}</Text>
              </View>
              <View style={[styles.preventiveStatusBadge, { backgroundColor: item.color }]}>
                <Text style={styles.preventiveStatusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Advanced Maintenance Management System</Text>
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
  quickActionsSection: {
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
  urgentTitle: {
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
  urgentReported: {
    fontSize: 12,
    color: '#f5576c',
  },
  urgentAssignment: {
    alignItems: 'flex-end',
  },
  urgentAssigned: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
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
  pendingTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  pendingTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pendingContent: {
    flex: 1,
  },
  pendingTitle: {
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
  categoriesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48) / 3,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryCount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  categoryCost: {
    fontSize: 14,
    fontWeight: '600',
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
  vendorJobs: {
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
  costSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  costContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  costRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  costMonth: {
    width: 70,
  },
  costMonthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  costBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  costBar: {
    height: '100%',
    borderRadius: 4,
  },
  costData: {
    width: 80,
    alignItems: 'flex-end',
  },
  costValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  costRepairs: {
    fontSize: 12,
    color: '#888888',
  },
  completedSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  completedCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  completedIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(67, 233, 123, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  completedIcon: {
    fontSize: 20,
  },
  completedContent: {
    flex: 1,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  completedProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  completedVendor: {
    fontSize: 12,
    color: '#667eea',
  },
  completedCost: {
    alignItems: 'flex-end',
  },
  completedCostValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#43e97b',
    marginBottom: 4,
  },
  completedTime: {
    fontSize: 12,
    color: '#888888',
  },
  scheduleSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  scheduleDate: {
    width: 70,
  },
  scheduleDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTask: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#888888',
  },
  preventiveSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  preventiveCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  preventiveIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  preventiveIcon: {
    fontSize: 24,
  },
  preventiveContent: {
    flex: 1,
  },
  preventiveTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  preventiveFrequency: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  preventiveNext: {
    fontSize: 12,
    color: '#667eea',
  },
  preventiveStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  preventiveStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
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

export default PropertyMaintenancePage;