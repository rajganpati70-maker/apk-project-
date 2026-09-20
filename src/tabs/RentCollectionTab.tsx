/**
 * Rent Collection Tab Screen - Premium Black Theme
 * Advanced rent collection with deep content and premium design
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
import RentPendingPage from '../pages/rent/RentPendingPage';

const { width, height } = Dimensions.get('window');

const RentCollectionTab: React.FC = () => {
  const { navigate, currentRoute, goBack } = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('main');
  const scrollY = useRef(new Animated.Value(0));
  const headerOpacity = useRef(new Animated.Value(1));
  const scaleValue = useRef(new Animated.Value(1));

  useEffect(() => {
    if (currentRoute === '/rent/pending') {
      setCurrentPage('pending');
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
      id: 'collection-overview',
      title: 'Collection Overview',
      description: '$84,520 collected this month',
      icon: '💰',
      route: '/rent/overview',
      badge: 0,
      accessibilityLabel: 'Collection Overview',
      accessibilityHint: 'View rent collection overview',
    },
    {
      id: 'pending-payments',
      title: 'Pending Payments',
      description: '$6,100 pending from 8 tenants',
      icon: '⏰',
      route: '/rent/pending',
      badge: 8,
      accessibilityLabel: 'Pending Payments',
      accessibilityHint: 'View pending rent payments',
    },
    {
      id: 'payment-reminders',
      title: 'Payment Reminders',
      description: '43 reminders sent this week',
      icon: '📧',
      route: '/rent/reminders',
      badge: 43,
      accessibilityLabel: 'Payment Reminders',
      accessibilityHint: 'View payment reminders',
    },
    {
      id: 'payment-history',
      title: 'Payment History',
      description: 'View all past transactions',
      icon: '📊',
      route: '/rent/history',
      accessibilityLabel: 'Payment History',
      accessibilityHint: 'View payment history',
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
    console.log('Rent collection block pressed:', block.id);
  }, []);

  const renderContentBlock = useCallback((block: ContentBlock) => {
    return (
      <ContentBlockRenderer
        block={block}
        onPress={handleBlockPress}
      />
    );
  }, [handleBlockPress]);

  if (currentPage === 'pending') {
    return (
      <>
        <RentPendingPage />
        <FloatingFooter context="Rent Collection" />
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
              <Text style={styles.heroBadge}>💰 RENT COLLECTION</Text>
              <Text style={styles.heroTitle}>Smart Rent{'\n'}Collection System</Text>
              <Text style={styles.heroSubtitle}>Automate rent collection, track payments, and manage cash flow with intelligent reminders and real-time analytics</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>$84.5K</Text>
                  <Text style={styles.heroStatLabel}>Collected</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>92.8%</Text>
                  <Text style={styles.heroStatLabel}>Collection</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>$6.1K</Text>
                  <Text style={styles.heroStatLabel}>Pending</Text>
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
              <Text style={styles.quickActionLabel}>Record</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📧</Text>
              <Text style={styles.quickActionLabel}>Remind</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>🔗</Text>
              <Text style={styles.quickActionLabel}>Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionLabel}>Report</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Navigation Items */}
        <Animated.View style={[styles.navigationSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>Collection Management</Text>
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
              testID={`rent-nav-${item.id}`}
            />
          ))}
        </Animated.View>

        {/* Monthly Overview */}
        <Animated.View style={[styles.monthlyOverview, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Monthly Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$84,520</Text>
                <Text style={styles.overviewLabel}>Total Collected</Text>
                <Text style={styles.overviewTrend}>↑ 12.5%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$6,100</Text>
                <Text style={styles.overviewLabel}>Pending</Text>
                <Text style={styles.overviewTrend}>↓ 8.2%</Text>
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
                <Text style={styles.overviewValue}>142</Text>
                <Text style={styles.overviewLabel}>Paid Tenants</Text>
                <Text style={styles.overviewTrend}>↑ 3.1%</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        {/* Pending Payments */}
        <Animated.View style={[styles.pendingSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⏰ Pending Payments</Text>
          {[
            { name: 'Rahul Kumar', property: 'Room 203 Green Valley', amount: '$1,050', due: '5 days overdue', color: '#f5576c' },
            { name: 'Sarah Johnson', property: 'Room 412 Sunrise Apartments', amount: '$1,200', due: '10 days overdue', color: '#f5576c' },
            { name: 'Michael Chen', property: 'Room 205 Garden View', amount: '$950', due: '8 days overdue', color: '#f5576c' },
            { name: 'Emily Davis', property: 'Room 567 Downtown Lofts', amount: '$1,400', due: 'Due today', color: '#f093fb' },
            { name: 'David Wilson', property: 'Room 101 Sunset Tower', amount: '$1,100', due: 'Due tomorrow', color: '#f093fb' },
          ].map((payment, index) => (
            <View key={index} style={styles.paymentCard}>
              <View style={[styles.paymentStatusDot, { backgroundColor: payment.color }]} />
              <View style={styles.paymentContent}>
                <Text style={styles.paymentName}>{payment.name}</Text>
                <Text style={styles.paymentProperty}>{payment.property}</Text>
                <Text style={styles.paymentDue}>{payment.due}</Text>
              </View>
              <View style={styles.paymentAmount}>
                <Text style={styles.paymentAmountValue}>{payment.amount}</Text>
                <TouchableOpacity style={styles.paymentRemindButton}>
                  <Text style={styles.paymentRemindText}>Remind</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Recent Payments */}
        <Animated.View style={[styles.recentPaymentsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>✅ Recent Payments</Text>
          {[
            { name: 'Priya Sharma', property: 'Room 302 Green Valley', amount: '$1,050', time: '2 hours ago', method: 'UPI' },
            { name: 'James Anderson', property: 'Room 405 Sunrise Apartments', amount: '$1,200', time: '4 hours ago', method: 'Card' },
            { name: 'Maria Garcia', property: 'Room 215 Garden View', amount: '$950', time: '6 hours ago', method: 'Bank Transfer' },
            { name: 'Alex Kim', property: 'Room 320 Downtown Lofts', amount: '$1,400', time: '1 day ago', method: 'UPI' },
            { name: 'Sophie Martin', property: 'Room 105 Sunset Tower', amount: '$1,100', time: '2 days ago', method: 'Card' },
          ].map((payment, index) => (
            <View key={index} style={styles.recentPaymentCard}>
              <View style={styles.recentPaymentIcon}>
                <Text style={styles.recentPaymentIconText}>✅</Text>
              </View>
              <View style={styles.recentPaymentContent}>
                <Text style={styles.recentPaymentName}>{payment.name}</Text>
                <Text style={styles.recentPaymentProperty}>{payment.property}</Text>
                <Text style={styles.recentPaymentTime}>{payment.time} • {payment.method}</Text>
              </View>
              <Text style={styles.recentPaymentAmount}>{payment.amount}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Payment Methods */}
        <Animated.View style={[styles.methodsSection, { transform: [{ scale: scaleValue.current }] }]}>
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

        {/* Collection Timeline */}
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

        {/* Demo Content Sections */}
        <Animated.View style={[styles.contentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <ScrollingSectionContainer
            section={{
              id: 'rent-analytics',
              title: '📈 Collection Analytics',
              description: 'Detailed collection performance metrics',
              blocks: [
                {
                  id: 'collection-metrics',
                  type: ContentBlockType.METRIC,
                  title: 'Average Collection Time',
                  data: {
                    value: 3.2,
                    label: 'Days to collect',
                    change: -15.5,
                    changeType: 'decrease',
                    unit: 'days',
                    format: 'number',
                  } as MetricBlockData,
                },
              ],
            }}
            renderBlock={renderContentBlock}
            onRefresh={handleRefresh}
            testID={`rent-analytics`}
          />
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Smart Rent Collection System</Text>
        </View>
      </Animated.ScrollView>
      
      <FloatingFooter context="Rent Collection" />
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
  monthlyOverview: {
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
  pendingSection: {
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
  paymentName: {
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
  paymentDue: {
    fontSize: 12,
    color: '#f5576c',
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  paymentAmountValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  paymentRemindButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  paymentRemindText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667eea',
  },
  recentPaymentsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  recentPaymentCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  recentPaymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(67, 233, 123, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recentPaymentIconText: {
    fontSize: 20,
  },
  recentPaymentContent: {
    flex: 1,
  },
  recentPaymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recentPaymentProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  recentPaymentTime: {
    fontSize: 12,
    color: '#667eea',
  },
  recentPaymentAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#43e97b',
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

export default RentCollectionTab;