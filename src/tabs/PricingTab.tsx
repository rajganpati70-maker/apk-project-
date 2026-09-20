/**
 * Pricing Tab Screen - Premium Black Theme
 * Advanced pricing management with deep content and premium design
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
import PricingUpgradePage from '../pages/pricing/PricingUpgradePage';

const { width, height } = Dimensions.get('window');

const PricingTab: React.FC = () => {
  const { navigate, currentRoute, goBack } = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('silver');
  const [currentPage, setCurrentPage] = useState<string>('main');
  const scrollY = useRef(new Animated.Value(0));
  const headerOpacity = useRef(new Animated.Value(1));
  const scaleValue = useRef(new Animated.Value(1));

  useEffect(() => {
    if (currentRoute === '/pricing/upgrade') {
      setCurrentPage('upgrade');
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
      id: 'current-plan',
      title: 'Current Plan',
      description: 'Silver Plan - Active',
      icon: '⭐',
      route: '/pricing/current',
      badge: 0,
      accessibilityLabel: 'Current Plan',
      accessibilityHint: 'View current subscription plan',
    },
    {
      id: 'upgrade-options',
      title: 'Upgrade Options',
      description: 'View available plans',
      icon: '🚀',
      route: '/pricing/upgrade',
      accessibilityLabel: 'Upgrade Options',
      accessibilityHint: 'View upgrade options',
    },
    {
      id: 'billing-history',
      title: 'Billing History',
      description: 'View past invoices',
      icon: '📄',
      route: '/pricing/billing',
      accessibilityLabel: 'Billing History',
      accessibilityHint: 'View billing history',
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      description: 'Manage payment options',
      icon: '💳',
      route: '/pricing/payments',
      accessibilityLabel: 'Payment Methods',
      accessibilityHint: 'Manage payment methods',
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
    console.log('Pricing block pressed:', block.id);
  }, []);

  const renderContentBlock = useCallback((block: ContentBlock) => {
    return (
      <ContentBlockRenderer
        block={block}
        onPress={handleBlockPress}
      />
    );
  }, [handleBlockPress]);

  const plans = [
    {
      id: 'silver',
      name: 'Silver Plan',
      price: '$49',
      period: '/month',
      popular: false,
      features: [
        'Up to 50 properties',
        'Basic analytics',
        'Email support',
        'Mobile app access',
        'Standard reports',
      ],
    },
    {
      id: 'gold',
      name: 'Gold Plan',
      price: '$99',
      period: '/month',
      popular: true,
      features: [
        'Unlimited properties',
        'Advanced analytics',
        'Priority support',
        'API access',
        'Custom reports',
        'White-label branding',
      ],
    },
  ];

  if (currentPage === 'upgrade') {
    return (
      <>
        <PricingUpgradePage />
        <FloatingFooter context="Pricing" />
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
              <Text style={styles.heroBadge}>💎 PRICING</Text>
              <Text style={styles.heroTitle}>Choose the Perfect{'\n'}Plan for Your Business</Text>
              <Text style={styles.heroSubtitle}>Scale your property management with flexible pricing plans designed for growth and success</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>50+</Text>
                  <Text style={styles.heroStatLabel}>Properties</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>94%</Text>
                  <Text style={styles.heroStatLabel}>Satisfaction</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>24/7</Text>
                  <Text style={styles.heroStatLabel}>Support</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View style={[styles.quickActionsBanner, { transform: [{ scale: scaleValue.current }] }]}>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>🔄</Text>
              <Text style={styles.quickActionLabel}>Switch Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📋</Text>
              <Text style={styles.quickActionLabel}>Invoices</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>💳</Text>
              <Text style={styles.quickActionLabel}>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>❓</Text>
              <Text style={styles.quickActionLabel}>FAQ</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Navigation Items */}
        <Animated.View style={[styles.navigationSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>Subscription Management</Text>
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
              testID={`pricing-nav-${item.id}`}
            />
          ))}
        </Animated.View>

        {/* Pricing Plans */}
        <Animated.View style={[styles.plansSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💎 Available Plans</Text>
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.selectedPlanCard,
                  plan.popular && styles.popularPlanCard,
                ]}
                onPress={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                  </View>
                )}
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planPeriod}>{plan.period}</Text>
                  </View>
                </View>
                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Text style={styles.featureBullet}>✓</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={[
                    styles.selectButton,
                    selectedPlan === plan.id && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedPlan(plan.id)}
                >
                  <Text style={[
                    styles.selectButtonText,
                    selectedPlan === plan.id && styles.selectedButtonText,
                  ]}>
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Feature Comparison */}
        <Animated.View style={[styles.comparisonSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Feature Comparison</Text>
          <View style={styles.comparisonTable}>
            <View style={styles.comparisonHeader}>
              <Text style={styles.comparisonHeaderCell}>Feature</Text>
              <Text style={styles.comparisonHeaderCell}>Silver</Text>
              <Text style={[styles.comparisonHeaderCell, styles.goldHeader]}>Gold</Text>
            </View>
            {[
              { feature: 'Properties', silver: '50', gold: 'Unlimited' },
              { feature: 'Analytics', silver: 'Basic', gold: 'Advanced' },
              { feature: 'Support', silver: 'Email', gold: 'Priority 24/7' },
              { feature: 'API Access', silver: '❌', gold: '✅' },
              { feature: 'Custom Reports', silver: '❌', gold: '✅' },
              { feature: 'White-label', silver: '❌', gold: '✅' },
            ].map((item, index) => (
              <View key={index} style={styles.comparisonRow}>
                <Text style={styles.comparisonCell}>{item.feature}</Text>
                <Text style={styles.comparisonCell}>{item.silver}</Text>
                <Text style={[styles.comparisonCell, styles.goldCell]}>{item.gold}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Billing Overview */}
        <Animated.View style={[styles.billingSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💳 Billing Overview</Text>
          <View style={styles.billingCard}>
            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Current Plan</Text>
              <Text style={styles.billingValue}>Silver Plan</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Monthly Cost</Text>
              <Text style={styles.billingValue}>$49.00</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Next Billing</Text>
              <Text style={styles.billingValue}>Oct 1, 2024</Text>
            </View>
            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Payment Method</Text>
              <Text style={styles.billingValue}>Visa •••• 4242</Text>
            </View>
            <TouchableOpacity style={styles.billingButton}>
              <Text style={styles.billingButtonText}>Update Payment Method</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Recent Invoices */}
        <Animated.View style={[styles.invoicesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📄 Recent Invoices</Text>
          {[
            { invoice: 'INV-2024-009', date: 'Sep 1, 2024', amount: '$49.00', status: 'Paid', color: '#43e97b' },
            { invoice: 'INV-2024-008', date: 'Aug 1, 2024', amount: '$49.00', status: 'Paid', color: '#43e97b' },
            { invoice: 'INV-2024-007', date: 'Jul 1, 2024', amount: '$49.00', status: 'Paid', color: '#43e97b' },
            { invoice: 'INV-2024-006', date: 'Jun 1, 2024', amount: '$49.00', status: 'Paid', color: '#43e97b' },
          ].map((invoice, index) => (
            <View key={index} style={styles.invoiceCard}>
              <View style={styles.invoiceIcon}>
                <Text style={styles.invoiceIconText}>📄</Text>
              </View>
              <View style={styles.invoiceContent}>
                <Text style={styles.invoiceNumber}>{invoice.invoice}</Text>
                <Text style={styles.invoiceDate}>{invoice.date}</Text>
              </View>
              <View style={styles.invoiceAmount}>
                <Text style={styles.invoiceAmountValue}>{invoice.amount}</Text>
                <View style={[styles.invoiceStatus, { backgroundColor: invoice.color }]}>
                  <Text style={styles.invoiceStatusText}>{invoice.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* FAQ Section */}
        <Animated.View style={[styles.faqSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>❓ Frequently Asked Questions</Text>
          {[
            { question: 'Can I switch plans anytime?', answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
            { question: 'Is there a free trial?', answer: 'Yes, we offer a 14-day free trial for all plans. No credit card required.' },
            { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, and bank transfers.' },
            { question: 'Can I cancel my subscription?', answer: 'Yes, you can cancel anytime. Your access continues until the end of your billing period.' },
          ].map((faq, index) => (
            <View key={index} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Demo Content Sections */}
        <Animated.View style={[styles.contentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <ScrollingSectionContainer
            section={{
              id: 'pricing-analytics',
              title: '📊 Usage Analytics',
              description: 'Detailed usage and performance metrics',
              blocks: [
                {
                  id: 'usage-metrics',
                  type: ContentBlockType.METRIC,
                  title: 'Monthly Usage',
                  data: {
                    value: 87,
                    label: 'Of plan limit',
                    change: 5.2,
                    changeType: 'increase',
                    unit: '%',
                    suffix: '%',
                    format: 'percentage',
                  } as MetricBlockData,
                },
              ],
            }}
            renderBlock={renderContentBlock}
            onRefresh={handleRefresh}
            testID={`pricing-analytics`}
          />
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Flexible Pricing for Every Business</Text>
        </View>
      </Animated.ScrollView>
      
      <FloatingFooter context="Pricing" />
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
  plansSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  plansContainer: {
    gap: 16,
  },
  planCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedPlanCard: {
    borderColor: '#667eea',
    borderWidth: 2,
  },
  popularPlanCard: {
    borderColor: '#f093fb',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#f093fb',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  planHeader: {
    marginBottom: 20,
  },
  planName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: 36,
    fontWeight: '900',
    color: '#667eea',
    marginRight: 4,
  },
  planPeriod: {
    fontSize: 16,
    color: '#888888',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureBullet: {
    fontSize: 16,
    marginRight: 12,
    color: '#43e97b',
  },
  featureText: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  selectButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#667eea',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
  comparisonSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  comparisonTable: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  comparisonHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  comparisonHeaderCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  goldHeader: {
    color: '#f093fb',
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  comparisonCell: {
    flex: 1,
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  goldCell: {
    color: '#f093fb',
    fontWeight: '600',
  },
  billingSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  billingCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  billingLabel: {
    fontSize: 14,
    color: '#888888',
  },
  billingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  billingButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  billingButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
  invoicesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  invoiceCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  invoiceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  invoiceIconText: {
    fontSize: 20,
  },
  invoiceContent: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  invoiceDate: {
    fontSize: 14,
    color: '#888888',
  },
  invoiceAmount: {
    alignItems: 'flex-end',
  },
  invoiceAmountValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  invoiceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  invoiceStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  faqSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  faqCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
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

export default PricingTab;