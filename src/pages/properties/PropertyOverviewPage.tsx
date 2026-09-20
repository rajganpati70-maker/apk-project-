/**
 * Property Overview Page - Premium Black Theme
 * Advanced property overview with deep content and premium design
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

const PropertyOverviewPage: React.FC = () => {
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
      
      {/* Back Button */}
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
        {/* Premium Hero Section */}
        <Animated.View style={[styles.heroSection, { opacity: headerOpacity.current }]}>
          <LinearGradient
            colors={['#0a0a0a', '#1a1a2e', '#16213e', '#0f3460']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroBadge}>🏢 PROPERTY OVERVIEW</Text>
              <Text style={styles.heroTitle}>Complete Property{'\n'}Portfolio Dashboard</Text>
              <Text style={styles.heroSubtitle}>Manage 156 properties across 8 locations with real-time insights and advanced analytics</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>156</Text>
                  <Text style={styles.heroStatLabel}>Total</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>142</Text>
                  <Text style={styles.heroStatLabel}>Occupied</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>14</Text>
                  <Text style={styles.heroStatLabel}>Vacant</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Stats Grid */}
        <Animated.View style={[styles.quickStatsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Quick Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.statCardGradient}>
                <Text style={styles.statValue}>94.2%</Text>
                <Text style={styles.statLabel}>Occupancy Rate</Text>
                <Text style={styles.statTrend}>↑ 2.8%</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.statCardGradient}>
                <Text style={styles.statValue}>$284.5K</Text>
                <Text style={styles.statLabel}>Monthly Revenue</Text>
                <Text style={styles.statTrend}>↑ 8.5%</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.statCardGradient}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.statLabel}>Total Properties</Text>
                <Text style={styles.statTrend}>↑ 12.0%</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.statCardGradient}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Locations</Text>
                <Text style={styles.statTrend}>Stable</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        {/* Property Locations */}
        <Animated.View style={[styles.locationsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📍 Properties by Location</Text>
          <View style={styles.locationsList}>
            {[
              { location: 'Downtown', count: 45, occupancy: '92%', revenue: '$125,400', color: '#667eea', icon: '🏙️' },
              { location: 'Suburbs', count: 38, occupancy: '95%', revenue: '$89,600', color: '#f093fb', icon: '🏡' },
              { location: 'Waterfront', count: 28, occupancy: '100%', revenue: '$98,700', color: '#4facfe', icon: '🌊' },
              { location: 'University Area', count: 22, occupancy: '97%', revenue: '$45,200', color: '#43e97b', icon: '🎓' },
              { location: 'Industrial Zone', count: 15, occupancy: '88%', revenue: '$38,500', color: '#f5576c', icon: '🏭' },
              { location: 'Business District', count: 8, occupancy: '100%', revenue: '$52,800', color: '#ffd700', icon: '💼' },
            ].map((item, index) => (
              <View key={index} style={styles.locationCard}>
                <View style={[styles.locationIconContainer, { backgroundColor: item.color }]}>
                  <Text style={styles.locationIcon}>{item.icon}</Text>
                </View>
                <View style={styles.locationContent}>
                  <Text style={styles.locationName}>{item.location}</Text>
                  <Text style={styles.locationDetails}>{item.count} properties • {item.occupancy} occupied</Text>
                </View>
                <View style={styles.locationRevenue}>
                  <Text style={styles.locationRevenueValue}>{item.revenue}</Text>
                  <Text style={styles.locationRevenueLabel}/mo</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Property Types Breakdown */}
        <Animated.View style={[styles.typesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🏢 Property Types</Text>
          <View style={styles.typesGrid}>
            {[
              { type: 'Apartments', count: 89, percentage: 57, color: '#667eea', icon: '🏢' },
              { type: 'Houses', count: 34, percentage: 22, color: '#f093fb', icon: '🏡' },
              { type: 'Commercial', count: 21, percentage: 13, color: '#4facfe', icon: '🏙️' },
              { type: 'PG/Hostel', count: 12, percentage: 8, color: '#43e97b', icon: '🎓' },
            ].map((item, index) => (
              <View key={index} style={[styles.typeCard, { borderColor: item.color }]}>
                <Text style={styles.typeIcon}>{item.icon}</Text>
                <Text style={styles.typeCount}>{item.count}</Text>
                <Text style={styles.typeName}>{item.type}</Text>
                <View style={styles.typeBarContainer}>
                  <View style={[styles.typeBar, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
                </View>
                <Text style={styles.typePercentage}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Recent Properties */}
        <Animated.View style={[styles.recentPropertiesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🏠 Recently Added Properties</Text>
          {[
            { name: 'Sunset Tower Apartments', location: 'Downtown', units: 24, status: 'Active', color: '#667eea' },
            { name: 'Green Valley Residences', location: 'Suburbs', units: 18, status: 'Active', color: '#43e97b' },
            { name: 'Harbor View Complex', location: 'Waterfront', units: 32, status: 'Filling', color: '#f093fb' },
            { name: 'Campus Heights', location: 'University Area', units: 45, status: 'Active', color: '#4facfe' },
            { name: 'Tech Park Offices', location: 'Business District', units: 12, status: 'New', color: '#ffd700' },
          ].map((property, index) => (
            <View key={index} style={styles.propertyCard}>
              <View style={[styles.propertyStatusDot, { backgroundColor: property.color }]} />
              <View style={styles.propertyContent}>
                <Text style={styles.propertyName}>{property.name}</Text>
                <Text style={styles.propertyLocation}>{property.location} • {property.units} units</Text>
              </View>
              <View style={[styles.propertyStatusBadge, { backgroundColor: property.color }]}>
                <Text style={styles.propertyStatusText}>{property.status}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Occupancy Trends */}
        <Animated.View style={[styles.trendsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📈 Occupancy Trends</Text>
          <View style={styles.trendsContainer}>
            {[
              { month: 'Jan', occupancy: 91, revenue: '$265K' },
              { month: 'Feb', occupancy: 92, revenue: '$272K' },
              { month: 'Mar', occupancy: 90, revenue: '$268K' },
              { month: 'Apr', occupancy: 93, revenue: '$278K' },
              { month: 'May', occupancy: 92, revenue: '$275K' },
              { month: 'Jun', occupancy: 94, revenue: '$284K' },
            ].map((item, index) => (
              <View key={index} style={styles.trendItem}>
                <View style={styles.trendMonth}>
                  <Text style={styles.trendMonthText}>{item.month}</Text>
                </View>
                <View style={styles.trendBarContainer}>
                  <View style={[styles.trendBar, { width: `${item.occupancy}%`, backgroundColor: item.occupancy >= 93 ? '#43e97b' : item.occupancy >= 90 ? '#667eea' : '#f093fb' }]} />
                </View>
                <View style={styles.trendData}>
                  <Text style={styles.trendOccupancy}>{item.occupancy}%</Text>
                  <Text style={styles.trendRevenue}>{item.revenue}</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Maintenance Overview */}
        <Animated.View style={[styles.maintenanceSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔧 Maintenance Overview</Text>
          <View style={styles.maintenanceGrid}>
            <View style={styles.maintenanceCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.maintenanceCardGradient}>
                <Text style={styles.maintenanceValue}>8</Text>
                <Text style={styles.maintenanceLabel}>Pending Requests</Text>
                <Text style={styles.maintenanceTrend}>High Priority</Text>
              </LinearGradient>
            </View>
            <View style={styles.maintenanceCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.maintenanceCardGradient}>
                <Text style={styles.maintenanceValue}>24</Text>
                <Text style={styles.maintenanceLabel}>Completed This Month</Text>
                <Text style={styles.maintenanceTrend}>↑ 15%</Text>
              </LinearGradient>
            </View>
            <View style={styles.maintenanceCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.maintenanceCardGradient}>
                <Text style={styles.maintenanceValue}>$12,450</Text>
                <Text style={styles.maintenanceLabel}>Spent This Month</Text>
                <Text style={styles.maintenanceTrend}>↓ 8%</Text>
              </LinearGradient>
            </View>
            <View style={styles.maintenanceCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.maintenanceCardGradient}>
                <Text style={styles.maintenanceValue}>4.2</Text>
                <Text style={styles.maintenanceLabel}>Avg Response Time</Text>
                <Text style={styles.maintenanceTrend}>Hours</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        {/* Top Performing Properties */}
        <Animated.View style={[styles.topPropertiesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⭐ Top Performing Properties</Text>
          {[
            { name: 'Sunset Tower', revenue: '$28,500', occupancy: '100%', trend: '+12%', color: '#43e97b' },
            { name: 'Green Valley', revenue: '$24,200', occupancy: '100%', trend: '+8%', color: '#43e97b' },
            { name: 'Harbor View', revenue: '$32,100', occupancy: '95%', trend: '+15%', color: '#43e97b' },
            { name: 'Campus Heights', revenue: '$18,700', occupancy: '97%', trend: '+10%', color: '#43e97b' },
          ].map((property, index) => (
            <View key={index} style={styles.topPropertyCard}>
              <View style={styles.topPropertyRank}>
                <Text style={styles.topPropertyRankText}>#{index + 1}</Text>
              </View>
              <View style={styles.topPropertyContent}>
                <Text style={styles.topPropertyName}>{property.name}</Text>
                <Text style={styles.topPropertyDetails}>{property.occupancy} occupied</Text>
              </View>
              <View style={styles.topPropertyMetrics}>
                <Text style={styles.topPropertyRevenue}>{property.revenue}</Text>
                <Text style={[styles.topPropertyTrend, { color: property.color }]}>{property.trend}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Properties Needing Attention */}
        <Animated.View style={[styles.attentionSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⚠️ Properties Needing Attention</Text>
          {[
            { name: 'Industrial Complex', issue: 'Low Occupancy', details: '65% occupancy - 5 vacant units', action: 'Marketing Required', color: '#f5576c' },
            { name: 'Old Town House', issue: 'Maintenance', details: 'HVAC repair needed - 2 units affected', action: 'Schedule Repair', color: '#f093fb' },
            { name: 'Lake View PG', issue: 'Tenant Turnover', details: '3 tenants leaving this month', action: 'Find Replacements', color: '#ffd700' },
          ].map((property, index) => (
            <View key={index} style={styles.attentionCard}>
              <View style={[styles.attentionIconContainer, { backgroundColor: property.color }]}>
                <Text style={styles.attentionIcon}>⚠️</Text>
              </View>
              <View style={styles.attentionContent}>
                <Text style={styles.attentionName}>{property.name}</Text>
                <Text style={styles.attentionIssue}>{property.issue}</Text>
                <Text style={styles.attentionDetails}>{property.details}</Text>
              </View>
              <TouchableOpacity style={[styles.attentionActionButton, { backgroundColor: property.color }]}>
                <Text style={styles.attentionActionText}>{property.action}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        {/* Property Features */}
        <Animated.View style={[styles.featuresSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>✨ Property Features</Text>
          <View style={styles.featuresGrid}>
            {[
              { feature: 'Parking Available', count: 142, percentage: 91, icon: '🚗', color: '#667eea' },
              { feature: '24/7 Security', count: 156, percentage: 100, icon: '🔒', color: '#43e97b' },
              { feature: 'Gym/Fitness', count: 89, percentage: 57, icon: '💪', color: '#f093fb' },
              { feature: 'Swimming Pool', count: 34, percentage: 22, icon: '🏊', color: '#4facfe' },
              { feature: 'Laundry Service', count: 112, percentage: 72, icon: '🧺', color: '#ffd700' },
              { feature: 'Wi-Fi Included', count: 156, percentage: 100, icon: '📶', color: '#43e97b' },
            ].map((item, index) => (
              <View key={index} style={[styles.featureCard, { borderColor: item.color }]}>
                <Text style={styles.featureIcon}>{item.icon}</Text>
                <Text style={styles.featureCount}>{item.count}</Text>
                <Text style={styles.featureName}>{item.feature}</Text>
                <Text style={[styles.featurePercentage, { color: item.color }]}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Property Analytics */}
        <Animated.View style={[styles.analyticsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Advanced Analytics</Text>
          <View style={styles.analyticsContainer}>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Average Rent</Text>
                <Text style={styles.analyticsValue}>$1,822</Text>
                <Text style={styles.analyticsTrend}>↑ 5.2%</Text>
              </View>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Tenant Retention</Text>
                <Text style={styles.analyticsValue}>87.5%</Text>
                <Text style={styles.analyticsTrend}>↑ 3.1%</Text>
              </View>
            </View>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Vacancy Rate</Text>
                <Text style={styles.analyticsValue}>5.8%</Text>
                <Text style={styles.analyticsTrend}>↓ 2.2%</Text>
              </View>
              <View style={styles.analyticsBox}>
                <Text style={styles.analyticsLabel}>Response Time</Text>
                <Text style={styles.analyticsValue}>2.4 hrs</Text>
                <Text style={styles.analyticsTrend}>↓ 12%</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Recent Activities */}
        <Animated.View style={[styles.activitiesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Recent Activities</Text>
          {[
            { icon: '📝', title: 'New lease signed', description: 'Apartment 4B - Johnson Family', time: '2 hours ago', color: '#667eea' },
            { icon: '🔧', title: 'Maintenance completed', description: 'HVAC repair - Building A', time: '4 hours ago', color: '#43e97b' },
            { icon: '💳', title: 'Payment received', description: '$1,850 from Smith Inc.', time: '6 hours ago', color: '#4facfe' },
            { icon: '👤', title: 'New tenant moved in', description: 'Studio 7 - David Wilson', time: '1 day ago', color: '#f093fb' },
            { icon: '🔍', title: 'Property inspection', description: 'Annual inspection completed', time: '2 days ago', color: '#ffd700' },
          ].map((activity, index) => (
            <View key={index} style={styles.activityCard}>
              <View style={[styles.activityIconContainer, { backgroundColor: activity.color }]}>
                <Text style={styles.activityIcon}>{activity.icon}</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Premium Property Management Solution</Text>
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
  quickStatsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: 20,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  statTrend: {
    fontSize: 12,
    color: '#43e97b',
    fontWeight: '600',
  },
  locationsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  locationsList: {
    gap: 12,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  locationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationIcon: {
    fontSize: 24,
  },
  locationContent: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationDetails: {
    fontSize: 14,
    color: '#888888',
  },
  locationRevenue: {
    alignItems: 'flex-end',
  },
  locationRevenueValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  locationRevenueLabel: {
    fontSize: 12,
    color: '#888888',
  },
  typesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  typesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeCard: {
    width: (width - 48) / 4,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
  },
  typeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  typeCount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  typeName: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 8,
  },
  typeBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  typeBar: {
    height: '100%',
    borderRadius: 2,
  },
  typePercentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  recentPropertiesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  propertyStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  propertyContent: {
    flex: 1,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#888888',
  },
  propertyStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  propertyStatusText: {
    fontSize: 12,
    fontWeight: '600',
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
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendMonth: {
    width: 50,
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
    width: 80,
    alignItems: 'flex-end',
  },
  trendOccupancy: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  trendRevenue: {
    fontSize: 12,
    color: '#888888',
  },
  maintenanceSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  maintenanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  maintenanceCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  maintenanceCardGradient: {
    padding: 20,
  },
  maintenanceValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  maintenanceLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  maintenanceTrend: {
    fontSize: 12,
    color: '#43e97b',
    fontWeight: '600',
  },
  topPropertiesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  topPropertyCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  topPropertyRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(67, 233, 123, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  topPropertyRankText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#43e97b',
  },
  topPropertyContent: {
    flex: 1,
  },
  topPropertyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  topPropertyDetails: {
    fontSize: 14,
    color: '#888888',
  },
  topPropertyMetrics: {
    alignItems: 'flex-end',
  },
  topPropertyRevenue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  topPropertyTrend: {
    fontSize: 12,
    fontWeight: '600',
  },
  attentionSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  attentionCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  attentionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  attentionIcon: {
    fontSize: 24,
  },
  attentionContent: {
    flex: 1,
  },
  attentionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  attentionIssue: {
    fontSize: 14,
    color: '#f5576c',
    marginBottom: 4,
  },
  attentionDetails: {
    fontSize: 12,
    color: '#888888',
  },
  attentionActionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  attentionActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featuresSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 48) / 3,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureCount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureName: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  featurePercentage: {
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
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  analyticsTrend: {
    fontSize: 12,
    color: '#43e97b',
    fontWeight: '600',
  },
  activitiesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityIcon: {
    fontSize: 24,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#667eea',
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

export default PropertyOverviewPage;