/**
 * Pricing Billing Page - Premium Black Theme
 * Advanced billing management with deep content and premium design
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

const PricingBillingPage: React.FC = () => {
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
              <Text style={styles.heroBadge}>💳 BILLING</Text>
              <Text style={styles.heroTitle}>Complete Billing{'\n'}Management System</Text>
              <Text style={styles.heroSubtitle}>View invoices, payment history, and manage your subscription with complete transparency</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>12</Text>
                  <Text style={styles.heroStatLabel}>Invoices</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>$1,188</Text>
                  <Text style={styles.heroStatLabel}>YTD</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>Gold</Text>
                  <Text style={styles.heroStatLabel}>Plan</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.currentPlanSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💎 Current Plan</Text>
          <View style={styles.currentPlanCard}>
            <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.currentPlanGradient}>
              <View style={styles.currentPlanHeader}>
                <Text style={styles.currentPlanBadge}>CURRENT PLAN</Text>
                <Text style={styles.currentPlanName}>Gold Plan</Text>
                <Text style={styles.currentPlanPrice}>$99/month</Text>
              </View>
              <View style={styles.currentPlanFeatures}>
                {['Unlimited Properties', 'Advanced Analytics', 'Priority Support', 'API Access', 'Custom Reports'].map((feature, index) => (
                  <View key={index} style={styles.currentPlanFeature}>
                    <Text style={styles.currentPlanFeatureBullet}>✓</Text>
                    <Text style={styles.currentPlanFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.managePlanButton}>
                <Text style={styles.managePlanButtonText}>Manage Plan</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Animated.View>

        <Animated.View style={[styles.invoicesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📄 Recent Invoices</Text>
          {[
            { invoice: 'INV-2024-009', amount: '$99', date: 'Sep 19, 2024', status: 'Paid', due: 'Sep 19, 2024', color: '#43e97b' },
            { invoice: 'INV-2024-008', amount: '$99', date: 'Aug 19, 2024', status: 'Paid', due: 'Aug 19, 2024', color: '#43e97b' },
            { invoice: 'INV-2024-007', amount: '$99', date: 'Jul 19, 2024', status: 'Paid', due: 'Jul 19, 2024', color: '#43e97b' },
            { invoice: 'INV-2024-006', amount: '$99', date: 'Jun 19, 2024', status: 'Paid', due: 'Jun 19, 2024', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.invoiceCard}>
              <View style={[styles.invoiceStatusDot, { backgroundColor: item.color }]} />
              <View style={styles.invoiceContent}>
                <Text style={styles.invoiceNumber}>{item.invoice}</Text>
                <Text style={styles.invoiceDate}>Due: {item.due}</Text>
                <Text style={styles.invoicePaid}>Paid: {item.date}</Text>
              </View>
              <View style={styles.invoiceAmountSection}>
                <Text style={styles.invoiceAmount}>{item.amount}</Text>
                <TouchableOpacity style={styles.invoiceDownloadButton}>
                  <Text style={styles.invoiceDownloadText}>Download</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[paymentMethodsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💳 Payment Methods</Text>
          {[
            { method: 'Visa ending in 4242', expiry: '12/26', default: true, icon: '💳', color: '#667eea' },
            { method: 'Mastercard ending in 8888', expiry: '08/25', default: false, icon: '💳', color: '#f093fb' },
          ].map((item, index) => (
            <View key={index} style={styles.paymentMethodCard}>
              <View style={[styles.paymentMethodIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.paymentMethodIcon}>{item.icon}</Text>
              </View>
              <View style={styles.paymentMethodContent}>
                <Text style={styles.paymentMethodName}>{item.method}</Text>
                <Text style={styles.paymentMethodExpiry}>Expires: {item.expiry}</Text>
              </View>
              {item.default && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              )}
              <TouchableOpacity style={styles.paymentMethodEditButton}>
                <Text style={styles.paymentMethodEditText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addPaymentMethodButton}>
            <Text style={styles.addPaymentMethodText}>+ Add Payment Method</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[billingHistorySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Billing History</Text>
          <View style={styles.billingHistoryCard}>
            <View style={styles.billingHistoryHeader}>
              <Text style={styles.billingHistoryLabel}>Year to Date</Text>
              <Text style={styles.billingHistoryValue}>$1,188</Text>
            </View>
            <View style={styles.billingHistoryBreakdown}>
              {[
                { period: 'Q3 2024', amount: '$297', count: 3 },
                { period: 'Q2 2024', amount: '$297', count: 3 },
                { period: 'Q1 2024', amount: '$297', count: 3 },
                { period: 'Q4 2023', amount: '$297', count: 3 },
              ].map((item, index) => (
                <View key={index} style={styles.billingHistoryItem}>
                  <Text style={styles.billingHistoryPeriod}>{item.period}</Text>
                  <Text style={styles.billingHistoryAmount}>{item.amount}</Text>
                  <Text style={styles.billingHistoryCount}>{item.count} invoices</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[settingsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⚙️ Billing Settings</Text>
          <View style={styles.settingsList}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Email Invoices</Text>
                <Text style={styles.settingDescription}>Receive invoices via email</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Auto-renewal</Text>
                <Text style={styles.settingDescription}>Auto-renew subscription</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Tax Information</Text>
                <Text style={styles.settingDescription}>Update tax details</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Billing Address</Text>
                <Text style={styles.settingDescription}>Update billing address</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={[supportSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>💬 Billing Support</Text>
          <View style={styles.supportCard}>
            <View style={styles.supportIconContainer}>
              <Text style={styles.supportIcon}>💬</Text>
            </View>
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Need Help with Billing?</Text>
              <Text style={styles.supportDescription}>Contact our billing support team for assistance</Text>
            </View>
            <TouchableOpacity style={styles.supportButton}>
              <Text style={styles.supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Transparent Billing System</Text>
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
  currentPlanSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  currentPlanCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  currentPlanGradient: {
    padding: 24,
  },
  currentPlanHeader: {
    marginBottom: 20,
  },
  currentPlanBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  currentPlanName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  currentPlanPrice: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  currentPlanFeatures: {
    marginBottom: 20,
  },
  currentPlanFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentPlanFeatureBullet: {
    fontSize: 16,
    marginRight: 12,
    color: '#FFFFFF',
  },
  currentPlanFeatureText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  managePlanButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  managePlanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
  invoiceStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
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
    marginBottom: 4,
  },
  invoicePaid: {
    fontSize: 12,
    color: '#43e97b',
  },
  invoiceAmountSection: {
    alignItems: 'flex-end',
  },
  invoiceAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  invoiceDownloadButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  invoiceDownloadText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  paymentMethodsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  paymentMethodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentMethodIcon: {
    fontSize: 24,
  },
  paymentMethodContent: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  paymentMethodExpiry: {
    fontSize: 14,
    color: '#888888',
  },
  defaultBadge: {
    backgroundColor: '#43e97b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  paymentMethodEditButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  paymentMethodEditText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  addPaymentMethodButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addPaymentMethodText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
  billingHistorySection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  billingHistoryCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  billingHistoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  billingHistoryLabel: {
    fontSize: 14,
    color: '#888888',
  },
  billingHistoryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  billingHistoryBreakdown: {
    gap: 12,
  },
  billingHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billingHistoryPeriod: {
    fontSize: 14,
    color: '#888888',
  },
  billingHistoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  billingHistoryCount: {
    fontSize: 12,
    color: '#667eea',
  },
  settingsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  settingsList: {
    gap: 0,
  },
  settingItem: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#888888',
  },
  settingArrow: {
    fontSize: 24,
    color: '#667eea',
  },
  supportSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  supportCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  supportIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportIcon: {
    fontSize: 24,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: '#888888',
  },
  supportButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  supportButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
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

export default PricingBillingPage;