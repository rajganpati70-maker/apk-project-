/**
 * Pricing Upgrade Page - Premium Black Theme
 * Advanced upgrade options with deep content and premium design
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

const PricingUpgradePage: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState<string>('gold');
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>← Back to Pricing</Text>
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
              <Text style={styles.heroBadge}>🚀 UPGRADE OPTIONS</Text>
              <Text style={styles.heroTitle}>Choose the Perfect{'\n'}Plan for Growth</Text>
              <Text style={styles.heroSubtitle}>Scale your property management with unlimited properties, advanced analytics, and premium support</Text>
              
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

        <Animated.View style={[styles.benefitsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💎 Upgrade Benefits</Text>
          <View style={styles.benefitsList}>
            {[
              { benefit: 'Unlimited Properties', description: 'No limit on property management', icon: '✅', color: '#667eea' },
              { benefit: 'Advanced Analytics', description: 'Deep insights and predictive analytics', icon: '✅', color: '#f093fb' },
              { benefit: 'API Access', description: 'Full API integration capabilities', icon: '✅', color: '#43e97b' },
              { benefit: 'Priority Support', description: '24/7 dedicated support team', icon: '✅', color: '#4facfe' },
              { benefit: 'Custom Reports', description: 'Tailored reporting solutions', icon: '✅', color: '#ffd700' },
              { benefit: 'White-label Branding', description: 'Your brand, your app', icon: '✅', color: '#f5576c' },
            ].map((item, index) => (
              <View key={index} style={styles.benefitCard}>
                <View style={[styles.benefitIconContainer, { backgroundColor: item.color }]}>
                  <Text style={styles.benefitIcon}>{item.icon}</Text>
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitName}>{item.benefit}</Text>
                  <Text style={styles.benefitDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

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

        <Animated.View style={[styles.timelineSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📅 Upgrade Timeline</Text>
          <View style={styles.timelineList}>
            {[
              { timeline: 'Immediate Upgrade', description: 'Upgrade now and get prorated billing', icon: '⚡', color: '#667eea' },
              { timeline: 'Next Billing Cycle', description: 'Schedule upgrade for next month', icon: '📅', color: '#f093fb' },
              { timeline: 'Annual Renewal', description: 'Upgrade at annual renewal for max savings', icon: '💰', color: '#43e97b' },
            ].map((item, index) => (
              <View key={index} style={styles.timelineCard}>
                <View style={[styles.timelineIconContainer, { backgroundColor: item.color }]}>
                  <Text style={styles.timelineIcon}>{item.icon}</Text>
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{item.timeline}</Text>
                  <Text style={styles.timelineDescription}>{item.description}</Text>
                </View>
                <TouchableOpacity style={styles.timelineButton}>
                  <Text style={styles.timelineButtonText}>Choose</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[savingsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">💰 Savings Calculator</Text>
          <View style={styles.savingsContainer}>
            <View style={styles.savingsInput}>
              <Text style={styles.savingsLabel}>Current Plan</Text>
              <Text style={styles.savingsValue}>Silver Plan</Text>
            </View>
            <View style={styles.savingsInput}>
              <Text style={styles.savingsLabel}>Upgrade To</Text>
              <Text style={[styles.savingsValue, { color: '#f093fb' }]}>Gold Plan</Text>
            </View>
            <View style={styles.savingsResult}>
              <Text style={styles.savingsResultLabel}>Annual Savings</Text>
              <Text style={styles.savingsResultValue}>$600</Text>
              <Text style={styles.savingsResultSubtext}>20% discount on annual plan</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[featuresDetailSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🚀 Gold Plan Features</Text>
          <View style={styles.featuresDetailGrid}>
            {[
              { feature: 'Unlimited Properties', description: 'Manage as many properties as you need', icon: '🏢', color: '#667eea' },
              { feature: 'Advanced Analytics', description: 'Predictive insights and dashboards', icon: '📊', color: '#f093fb' },
              { feature: 'API Integration', description: 'Connect with your existing systems', icon: '🔌', color: '#43e97b' },
              { feature: 'Priority Support', description: '24/7 dedicated support team', icon: '🎧', color: '#4facfe' },
              { feature: 'Custom Reports', description: 'Build and export custom reports', icon: '📈', color: '#ffd700' },
              { feature: 'White-label Branding', description: 'Custom app with your branding', icon: '🎨', color: '#f5576c' },
              { feature: 'Multi-user Access', description: 'Team collaboration features', icon: '👥', color: '#667eea' },
              { feature: 'Advanced Security', description: 'SSO and enhanced security', icon: '🔒', color: '#f093fb' },
            ].map((item, index) => (
              <View key={index} style={[styles.featureDetailCard, { borderColor: item.color }]}>
                <Text style={styles.featureDetailIcon}>{item.icon}</Text>
                <Text style={styles.featureDetailName}>{item.feature}</Text>
                <Text style={styles.featureDetailDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        </Animated.Section>

        <Animated.View style={[faqSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>❓ Upgrade FAQ</Text>
          {[
            { question: 'Can I cancel anytime?', answer: 'Yes, you can cancel anytime. Your access continues until the end of your billing period.' },
            { question: 'Will I lose my data?', answer: 'No, your data is always safe. You can downgrade without losing any information.' },
            { question: 'How long does migration take?', answer: 'Migration is instant. Your account is upgraded immediately after payment.' },
            { question: 'Is there a free trial?', answer: 'Yes, we offer a 14-day free trial for the Gold plan.' },
          ].map((item, index) => (
            <View key={index} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[contactSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💬 Need Help Choosing?</Text>
          <View style={styles.contactContainer}>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactIcon}>💬</Text>
              <Text style={styles.contactText}>Chat with Sales</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactIcon}>📞</Text>
              <Text style={styles.contactText}>Call Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactIcon}>📧</Text>
              <Text style={styles.contactText}>Email Us</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Flexible Pricing for Every Business</Text>
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
  benefitsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  benefitIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: center,
    marginRight: 16,
  },
  benefitIcon: {
    fontSize: 24,
  },
  benefitContent: {
    flex: 1,
  },
  benefitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#888888',
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
  timelineSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  timelineList: {
    gap: 12,
  },
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  timelineIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  timelineIcon: {
    fontSize: 24,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#888888',
  },
  timelineButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timelineButtonText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  savingsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  savingsContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  savingsInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  savingsLabel: {
    fontSize: 14,
    color: '#888888',
  },
  savingsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  savingsResult: {
    backgroundColor: 'rgba(67, 233, 123, 0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  savingsResultLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  savingsResultValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#43e97b',
    marginBottom: 4,
  },
  savingsResultSubtext: {
    fontSize: 12,
    color: '#667eea',
  },
  featuresDetailSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  featuresDetailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureDetailCard: {
    width: (width - 48) / 2,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  featureDetailIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureDetailName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDetailDescription: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
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
  contactSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    flex: 1,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  contactIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
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

export default PricingUpgradePage;