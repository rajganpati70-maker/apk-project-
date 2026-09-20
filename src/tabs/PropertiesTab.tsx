/**
 * Properties Tab Screen - Premium Black Theme
 * Advanced property management with deep content and premium design
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
  Image,
  LinearGradient,
  Platform,
} from 'react-native';
import { useNavigation } from '../context/NavigationContext';
import { NavigationItem } from '../components/navigation';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../components/content';
import FloatingFooter from '../components/FloatingFooter';
import { propertyDetailContent } from '../data/demoContent';
import { saveScrollPosition } from '../utils/scrollStateManager';
import { NavigationItem as NavigationItemType, ContentBlock } from '../types/navigation';

// Import sub-pages
import PropertyOverviewPage from '../pages/properties/PropertyOverviewPage';
import PropertyAnalyticsPage from '../pages/properties/PropertyAnalyticsPage';
import PropertyTasksPage from '../pages/properties/PropertyTasksPage';
import PropertyMaintenancePage from '../pages/properties/PropertyMaintenancePage';

const { width, height } = Dimensions.get('window');

const PropertiesTab: React.FC = () => {
  const { navigate, currentRoute, goBack } = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [sections] = useState(propertyDetailContent.sections);
  const [currentPage, setCurrentPage] = useState<string>('main');
  const scrollY = useRef(new Animated.Value(0));
  const headerOpacity = useRef(new Animated.Value(1));
  const scaleValue = useRef(new Animated.Value(1));

  useEffect(() => {
    // Handle navigation to sub-pages
    if (currentRoute === '/properties/overview') {
      setCurrentPage('overview');
    } else if (currentRoute === '/properties/analytics') {
      setCurrentPage('analytics');
    } else if (currentRoute === '/properties/tasks') {
      setCurrentPage('tasks');
    } else if (currentRoute === '/properties/maintenance') {
      setCurrentPage('maintenance');
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
          // Parallax header effect
          const headerOpacityValue = Math.max(0, 1 - y / 200);
          headerOpacity.current.setValue(headerOpacityValue);
          
          // Scale effect for content
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
      id: 'property-overview',
      title: 'Property Overview',
      description: 'View all 156 properties in your portfolio',
      icon: '🏢',
      route: '/properties/overview',
      badge: 156,
      accessibilityLabel: 'Property Overview',
      accessibilityHint: 'View all properties overview',
    },
    {
      id: 'property-analytics',
      title: 'Property Analytics',
      description: 'Performance metrics and insights',
      icon: '📊',
      route: '/properties/analytics',
      accessibilityLabel: 'Property Analytics',
      accessibilityHint: 'View property analytics',
    },
    {
      id: 'property-tasks',
      title: 'Property Tasks',
      description: '15 active property management tasks',
      icon: '📋',
      route: '/properties/tasks',
      badge: 15,
      accessibilityLabel: 'Property Tasks',
      accessibilityHint: 'View property tasks',
    },
    {
      id: 'property-maintenance',
      title: 'Property Maintenance',
      description: '8 pending maintenance requests',
      icon: '🔧',
      route: '/properties/maintenance',
      badge: 8,
      accessibilityLabel: 'Property Maintenance',
      accessibilityHint: 'View property maintenance',
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
    console.log('Properties block pressed:', block.id);
  }, []);

  const renderContentBlock = useCallback((block: ContentBlock) => {
    return (
      <ContentBlockRenderer
        block={block}
        onPress={handleBlockPress}
      />
    );
  }, [handleBlockPress]);

  // Render sub-pages
  if (currentPage === 'overview') {
    return (
      <>
        <PropertyOverviewPage />
        <FloatingFooter context="Properties" />
      </>
    );
  }
  if (currentPage === 'analytics') {
    return (
      <>
        <PropertyAnalyticsPage />
        <FloatingFooter context="Analytics" />
      </>
    );
  }
  if (currentPage === 'tasks') {
    return (
      <>
        <PropertyTasksPage />
        <FloatingFooter context="Tasks" />
      </>
    );
  }
  if (currentPage === 'maintenance') {
    return (
      <>
        <PropertyMaintenancePage />
        <FloatingFooter context="Maintenance" />
      </>
    );
  }

  // Render main properties tab with premium black theme
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
              <Text style={styles.heroBadge}>🏢 PROPERTY MANAGEMENT</Text>
              <Text style={styles.heroTitle}>Your Complete{'\n'}Property Portfolio</Text>
              <Text style={styles.heroSubtitle}>Manage 156 properties, 142 tenants, and $284K monthly revenue from one powerful platform</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>156</Text>
                  <Text style={styles.heroStatLabel}>Properties</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>142</Text>
                  <Text style={styles.heroStatLabel}>Tenants</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>94.2%</Text>
                  <Text style={styles.heroStatLabel}>Occupancy</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Actions Banner */}
        <Animated.View style={[styles.quickActionsBanner, { transform: [{ scale: scaleValue.current }] }]}>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>➕</Text>
              <Text style={styles.quickActionLabel}>Add Property</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>🔍</Text>
              <Text style={styles.quickActionLabel}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={quickActionLabel}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📱</Text>
              <Text style={styles.quickActionLabel}>Mobile App</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Premium Navigation Items */}
        <Animated.View style={[styles.navigationSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>Property Management</Text>
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
              testID={`property-nav-${item.id}`}
            />
          ))}
        </Animated.View>

        {/* Premium Performance Banner */}
        <Animated.View style={[styles.performanceBanner, { transform: [{ scale: scaleValue.current }] }]}>
          <LinearGradient
            colors={['#667eea', '#764ba2', '#6B8DD6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.performanceGradient}
          >
            <View style={styles.performanceContent}>
              <Text style={styles.performanceTitle}>🚀 Performance This Month</Text>
              <Text style={styles.performanceSubtitle}>Revenue up 18.4% • Occupancy at 94.2% • 23 new leases signed</Text>
              <TouchableOpacity style={styles.performanceButton}>
                <Text style={styles.performanceButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Mobile App Demo Section */}
        <Animated.View style={[styles.mobileDemoSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📱 Mobile Experience</Text>
          <View style={styles.mobileMockupContainer}>
            <View style={styles.mobilePhone}>
              <View style={styles.mobilePhoneHeader}>
                <View style={styles.mobileNotch} />
                <Text style={styles.mobileTime}>9:41</Text>
                <View style={styles.mobileIcons}>
                  <Text style={styles.mobileIcon}>📶</Text>
                  <Text style={styles.mobileIcon}>📡</Text>
                  <Text style={styles.mobileIcon}>🔋</Text>
                </View>
              </View>
              <View style={styles.mobileScreen}>
                <View style={styles.mobileAppHeader}>
                  <Text style={styles.mobileAppTitle}>AnyRenting</Text>
                  <Text style={styles.mobileAppSubtitle}>Property Dashboard</Text>
                </View>
                <View style={styles.mobileCardContent}>
                  <View style={styles.mobileMetricCard}>
                    <Text style={styles.mobileMetricValue}>$84,520</Text>
                    <Text style={mobileMetricLabel}>Monthly Collection</Text>
                    <Text style={styles.mobileMetricChange}>+18.4%</Text>
                  </View>
                  <View style={styles.mobileQuickStats}>
                    <View style={styles.mobileQuickStat}>
                      <Text style={styles.mobileQuickStatValue}>482</Text>
                      <Text style={styles.mobileQuickStatLabel}>Tenants</Text>
                    </View>
                    <View style={styles.mobileQuickStat}>
                      <Text style={styles.mobileQuickStatValue}>37</Text>
                      <Text style={styles.mobileQuickStatLabel}>Vacant</Text>
                    </View>
                    <View style={styles.mobileQuickStat}>
                      <Text style={styles.mobileQuickStatValue}>126</Text>
                      <Text style={styles.mobileQuickStatLabel}>Leads</Text>
                    </View>
                  </View>
                  <View style={styles.mobileRecentActivity}>
                    <Text style={styles.mobileActivityTitle}>Recent Activity</Text>
                    <View style={styles.mobileActivityItem}>
                      <Text style={styles.mobileActivityIcon}>💰</Text>
                      <View style={styles.mobileActivityContent}>
                        <Text style={styles.mobileActivityTitle}>Rahul paid rent</Text>
                        <Text style={styles.mobileActivityTime}>$950 • 2 min ago</Text>
                      </View>
                    </View>
                    <View style={styles.mobileActivityItem}>
                      <Text style={styles.mobileActivityIcon}>👤</Text>
                      <View style={styles.mobileActivityContent}>
                        <Text style={styles.mobileActivityTitle}>New lead from WhatsApp</Text>
                        <Text style={styles.mobileActivityTime}>Arjun • Visit today</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.mobilePhoneFooter}>
                <View style={styles.mobileHomeIndicator} />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Featured Properties Section */}
        <Animated.View style={[styles.featuredSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⭐ Featured Properties</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.propertiesScroll}>
            {[
              { name: 'Sunset Apartments', location: 'Downtown', revenue: '$45,200', occupancy: '92%', image: '🌅' },
              { name: 'Riverside Complex', location: 'Waterfront', revenue: '$78,500', occupancy: '95%', image: '🌊' },
              { name: 'Garden Townhouses', location: 'Suburbs', revenue: '$28,800', occupancy: '100%', image: '🏡' },
              { name: 'Student Housing', location: 'University', revenue: '$38,400', occupancy: '97%', image: '🎓' },
            ].map((property, index) => (
              <View key={index} style={styles.propertyCard}>
                <View style={styles.propertyImage}>{property.image}</View>
                <View style={styles.propertyContent}>
                  <Text style={styles.propertyName}>{property.name}</Text>
                  <Text style={styles.propertyLocation}>{property.location}</Text>
                  <View style={styles.propertyStats}>
                    <Text style={styles.propertyRevenue}>{property.revenue}/mo</Text>
                    <Text style={styles.propertyOccupancy}>{property.occupancy} occupied</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Analytics Overview Section */}
        <Animated.View style={[styles.analyticsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Real-time Analytics</Text>
          <View style={styles.analyticsGrid}>
            <View style={styles.analyticsCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.analyticsCardGradient}>
                <Text style={styles.analyticsValue}>94.2%</Text>
                <Text style={styles.analyticsLabel}>Occupancy Rate</Text>
                <Text style={styles.analyticsTrend}>↑ 2.8%</Text>
              </LinearGradient>
            </View>
            <View style={styles.analyticsCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.analyticsCardGradient}>
                <Text style={styles.analyticsValue}>$284.5K</Text>
                <Text style={styles.analyticsLabel}>Monthly Revenue</Text>
                <Text style={styles.analyticsTrend}>↑ 8.5%</Text>
              </LinearGradient>
            </View>
            <View style={styles.analyticsCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.analyticsCardGradient}>
                <Text style={styles.analyticsValue}>142</Text>
                <Text style={styles.analyticsLabel}>Active Tenants</Text>
                <Text style={styles.analyticsTrend}>↑ 5.0%</Text>
              </LinearGradient>
            </View>
            <View style={styles.analyticsCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.analyticsCardGradient}>
                <Text style={styles.analyticsValue}>156</Text>
                <Text style={styles.analyticsLabel}>Total Properties</Text>
                <Text style={styles.analyticsTrend}>↑ 12.0%</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        {/* Property Types Section */}
        <Animated.View style={[styles.propertyTypesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🏢 Property Types</Text>
          <View style={styles.propertyTypesGrid}>
            {[
              { type: 'Apartments', count: 89, color: '#667eea', icon: '🏢' },
              { type: 'Houses', count: 34, color: '#f093fb', icon: '🏡' },
              { type: 'Commercial', count: 21, color: '#4facfe', icon: '🏙️' },
              { type: 'PG/Hostel', count: 12, color: '#43e97b', icon: '🎓' },
            ].map((item, index) => (
              <View key={index} style={[styles.propertyTypeCard, { borderColor: item.color }]}>
                <Text style={styles.propertyTypeIcon}>{item.icon}</Text>
                <Text style={styles.propertyTypeCount}>{item.count}</Text>
                <Text style={styles.propertyTypeName}>{item.type}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Recent Activities Section */}
        <Animated.View style={[styles.activitiesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Recent Activities</Text>
          {[
            { icon: '📝', title: 'New lease signed', description: 'Apartment 4B - Johnson Family', time: '2 hours ago', color: '#667eea' },
            { icon: '💳', title: 'Payment received', description: '$1,850 from Smith Inc.', time: '4 hours ago', color: '#43e97b' },
            { icon: '🔧', title: 'Maintenance request', description: 'HVAC repair needed - Unit 12A', time: '6 hours ago', color: '#f5576c' },
            { icon: '✅', title: 'Application approved', description: 'New tenant for Studio 7', time: '1 day ago', color: '#4facfe' },
            { icon: '🔍', title: 'Property inspection', description: 'Annual inspection completed', time: '2 days ago', color: '#f093fb' },
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

        {/* Demo Content Sections */}
        <Animated.View style={[styles.contentSection, { transform: [{ scale: scaleValue.current }] }]}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`property-section-${section.id}`}
            />
          ))}
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Premium Property Management Solution</Text>
        </View>
      </Animated.ScrollView>
      
      <FloatingFooter context="Properties" />
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
  performanceBanner: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  performanceGradient: {
    padding: 24,
  },
  performanceContent: {
    alignItems: 'flex-start',
  },
  performanceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  performanceSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  performanceButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  performanceButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  mobileDemoSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  mobileMockupContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  mobilePhone: {
    width: 280,
    height: 560,
    backgroundColor: '#1a1a2e',
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#2a2a4e',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  mobilePhoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  mobileNotch: {
    width: 120,
    height: 28,
    backgroundColor: '#0a0a0a',
    borderRadius: 14,
    alignSelf: 'center',
  },
  mobileTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  mobileIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  mobileIcon: {
    fontSize: 16,
  },
  mobileScreen: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
  },
  mobileAppHeader: {
    marginBottom: 16,
  },
  mobileAppTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  mobileAppSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
  mobileCardContent: {
    gap: 12,
  },
  mobileMetricCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  mobileMetricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#667eea',
    marginBottom: 4,
  },
  mobileMetricLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  mobileMetricChange: {
    fontSize: 12,
    color: '#43e97b',
    fontWeight: '600',
  },
  mobileQuickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mobileQuickStat: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  mobileQuickStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  mobileQuickStatLabel: {
    fontSize: 10,
    color: '#888888',
  },
  mobileRecentActivity: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 12,
  },
  mobileActivityTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  mobileActivityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mobileActivityIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  mobileActivityContent: {
    flex: 1,
  },
  mobileActivityTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  mobileActivityTime: {
    fontSize: 10,
    color: '#888888',
  },
  mobilePhoneFooter: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 8,
    alignItems: 'center',
  },
  mobileHomeIndicator: {
    width: 120,
    height: 5,
    backgroundColor: '#0a0a0a',
    borderRadius: 3,
  },
  featuredSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  propertiesScroll: {
    flexDirection: 'row',
  },
  propertyCard: {
    width: 200,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.3)',
    overflow: 'hidden',
  },
  propertyImage: {
    height: 120,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 48,
  },
  propertyContent: {
    padding: 12,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 8,
  },
  propertyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propertyRevenue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  propertyOccupancy: {
    fontSize: 12,
    color: '#43e97b',
  },
  analyticsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  analyticsCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  analyticsCardGradient: {
    padding: 20,
  },
  analyticsValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  analyticsLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  analyticsTrend: {
    fontSize: 12,
    color: '#43e97b',
    fontWeight: '600',
  },
  propertyTypesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  propertyTypesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propertyTypeCard: {
    width: (width - 48) / 4,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
  },
  propertyTypeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  propertyTypeCount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  propertyTypeName: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
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
    fontSize: 20,
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
    fontWeight: '500',
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

export default PropertiesTab;