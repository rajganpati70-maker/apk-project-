/**
 * Pricing Features Page - Premium Black Theme
 * Advanced feature details with deep content and premium design
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

const PricingFeaturesPage: React.FC = () => {
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
              <Text style={styles.heroBadge}>✨ FEATURES</Text>
              <Text style={styles.heroTitle}>Complete Feature{'\n'}Documentation</Text>
              <Text style={styles.heroSubtitle}>Explore all features available in your plan with detailed descriptions and benefits</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>50+</Text>
                  <Text style={styles.heroStatLabel}>Features</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>8</Text>
                  <Text style={styles.heroStatLabel}>Categories</Text>
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

        <Animated.View style={[styles.featureCategoriesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📂 Feature Categories</Text>
          <View style={styles.featureCategoriesGrid}>
            {[
              { category: 'Property Management', count: 12, icon: '🏢', color: '#667eea' },
              { category: 'Lead Management', count: 8, icon: '👥', color: '#f093fb' },
              { category: 'Rent Collection', count: 10, icon: '💰', color: '#43e97b' },
              { category: 'Accounting', count: 9, icon: '📊', color: '#4facfe' },
              { category: 'Analytics', count: 7, icon: '📈', color: '#ffd700' },
              { category: 'Communication', count: 6, icon: '💬', color: '#f5576c' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={[styles.featureCategoryCard, { borderColor: item.color }]}>
                <Text style={styles.featureCategoryIcon}>{item.icon}</Text>
                <Text style={styles.featureCategoryName}>{item.category}</Text>
                <Text style={styles.featureCategoryCount}>{item.count} features</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[coreFeaturesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🚀 Core Features</Text>
          {[
            { feature: 'Property Dashboard', description: 'Comprehensive overview of all properties with real-time metrics', status: 'Included', color: '#43e97b', icon: '📊' },
            { feature: 'Tenant Management', description: 'Complete tenant lifecycle management from application to move-out', status: 'Included', color: '#43e97b', icon: '👥' },
            { feature: 'Maintenance Tracking', description: 'Track and manage maintenance requests with automated workflows', status: 'Included', color: '#43e97b', icon: '🔧' },
            { feature: 'Rent Collection', description: 'Automated rent collection with multiple payment methods', status: 'Included', color: '#43e97b', icon: '💰' },
            { feature: 'Financial Reporting', description: 'Advanced financial reports with export capabilities', status: 'Included', color: '#43e97b', icon: '📈' },
          ].map((item, index) => (
            <View key={index} style={styles.coreFeatureCard}>
              <View style={[styles.coreFeatureIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.coreFeatureIcon}>{item.icon}</Text>
              </View>
              <View style={styles.coreFeatureContent}>
                <Text style={styles.coreFeatureName}>{item.feature}</Text>
                <Text style={styles.coreFeatureDescription}>{item.description}</Text>
              </View>
              <View style={[styles.coreFeatureStatusBadge, { backgroundColor: item.color }]}>
                <Text style={styles.coreFeatureStatusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[advancedFeaturesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">⭐ Advanced Features</Text>
          {[
            { feature: 'API Integration', description: 'Full REST API for custom integrations and automation', status: 'Gold', color: '#f093fb', icon: '🔌' },
            { feature: 'White-label Branding', description: 'Custom branding with your logo and colors', status: 'Gold', color: '#f093fb', icon: '🎨' },
            { feature: 'Multi-user Access', description: 'Team collaboration with role-based permissions', status: 'Gold', color: '#f093fb', icon: '👥' },
            { feature: 'Advanced Analytics', description: 'Predictive analytics and custom dashboards', status: 'Gold', color: '#f093fb', icon: '📊' },
            { feature: 'Custom Reports', description: 'Build and schedule custom reports', status: 'Gold', color: '#f093fb', icon: '📄' },
          ].map((item, index) => (
            <View key={index} style={styles.advancedFeatureCard}>
              <View style={[styles.advancedFeatureIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.advancedFeatureIcon}>{item.icon}</Text>
              </View>
              <View style={styles.advancedFeatureContent}>
                <Text style={styles.advancedFeatureName}>{item.feature}</Text>
                <Text style={styles.advancedFeatureDescription}>{item.description}</Text>
              </View>
              <View style={[styles.advancedFeatureStatusBadge, { backgroundColor: item.color }]}>
                <Text style={styles.advancedFeatureStatusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.integrationsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔗 Integrations</Text>
          <View style={styles.integrationsGrid}>
            {[
              { integration: 'QuickBooks', description: 'Accounting integration', icon: '💼', color: '#667eea' },
              { integration: 'Stripe', description: 'Payment processing', icon: '💳', color: '#43e97b' },
              { integration: 'Zillow', description: 'Listing syndication', icon: '🏠', color: '#f093fb' },
              { integration: 'Gmail', description: 'Email integration', icon: '📧', color: '#4facfe' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={[styles.integrationCard, { borderColor: item.color }]}>
                <Text style={styles.integrationIcon}>{item.icon}</Text>
                <Text style={styles.integrationName}>{item.integration}</Text>
                <Text style={styles.integrationDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.upcomingFeaturesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🚀 Upcoming Features</Text>
          {[
            { feature: 'AI-powered lead scoring', description: 'Machine learning for better lead qualification', status: 'Q4 2024', color: '#667eea', icon: '🤖' },
            { feature: 'Mobile app version 3.0', description: 'Completely redesigned mobile experience', status: 'Q1 2025', color: '#f093fb', icon: '📱' },
            { feature: 'Voice commands', description: 'Voice-activated property management', status: 'Q2 2025', color: '#43e97b', icon: '🎤' },
          ].map((item, index) => (
            <View key={index} style={styles.upcomingFeatureCard}>
              <View style={[styles.upcomingFeatureIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.upcomingFeatureIcon}>{item.icon}</Text>
              </View>
              <View style={styles.upcomingFeatureContent}>
                <Text style={styles.upcomingFeatureName}>{item.feature}</Text>
                <Text style={styles.upcomingFeatureDescription}>{item.description}</Text>
              </View>
              <View style={[styles.upcomingFeatureStatusBadge, { backgroundColor: item.color }]}>
                <Text style={styles.upcomingFeatureStatusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </Animated.Section>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Complete Feature Documentation</Text>
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
  featureCategoriesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  featureCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCategoryCard: {
    width: (width - 48) / 3,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  featureCategoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureCategoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureCategoryCount: {
    fontSize: 10,
    color: '#888888',
  },
  coreFeaturesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  coreFeatureCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  coreFeatureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  coreFeatureIcon: {
    fontSize: 24,
  },
  coreFeatureContent: {
    flex: 1,
  },
  coreFeatureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  coreFeatureDescription: {
    fontSize: 14,
    color: '#888888',
  },
  coreFeatureStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  coreFeatureStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  advancedFeaturesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  integrationsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  advancedFeatureCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  advancedFeatureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  advancedFeatureIcon: {
    fontSize: 24,
  },
  advancedFeatureContent: {
    flex: 1,
  },
  advancedFeatureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  advancedFeatureDescription: {
    fontSize: 14,
    color: '#888888',
  },
  advancedFeatureStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  advancedFeatureStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  integrationsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  upcomingFeaturesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  integrationsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  integrationCard: {
    width: (width - 48) / 4,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
  },
  integrationIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  integrationName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  integrationDescription: {
    fontSize: 10,
    color: '#888888',
    textAlign: 'center',
  },
  upcomingFeatureCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  upcomingFeatureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  upcomingFeatureIcon: {
    fontSize: 24,
  },
  upcomingFeatureContent: {
    flex: 1,
  },
  upcomingFeatureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  upcomingFeatureDescription: {
    fontSize: 14,
    color: '#888888',
  },
  upcomingFeatureStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  upcomingFeatureStatusText: {
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

export default PricingFeaturesPage;