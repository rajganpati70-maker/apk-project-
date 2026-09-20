/**
 * Lead New Page - Premium Black Theme
 * Advanced new lead management with deep content and premium design
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
  TextInput,
} from 'react-native';
import { useNavigation } from '../../context/NavigationContext';
import { saveScrollPosition } from '../../utils/scrollStateManager';

const { width, height } = Dimensions.get('window');

const LeadNewPage: React.FC = () => {
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
              <Text style={styles.heroBadge}>➕ NEW LEADS</Text>
              <Text style={styles.heroTitle}>Add New Leads{'\n'}to Your Pipeline</Text>
              <Text style={styles.heroSubtitle}>Capture and qualify new rental inquiries with intelligent lead scoring and automated follow-up</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>24</Text>
                  <Text style={styles.heroStatLabel}>Today</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>89%</Text>
                  <Text style={styles.heroStatLabel}>Quality</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>42s</Text>
                  <Text style={styles.heroStatLabel}>Response</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.formSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📝 Lead Information</Text>
          <View style={styles.formCard}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Lead Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter lead name"
                placeholderTextColor="#666666"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address *</Text>
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor="#666666"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number *</Text>
              <TextInput
                style={styles.input}
                placeholder="+1 234 567 8900"
                placeholderTextColor="#666666"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Lead Source</Text>
              <View style={styles.sourceContainer}>
                {['Website', 'Referral', 'Zillow', 'Craigslist', 'Social Media'].map((source, index) => (
                  <TouchableOpacity key={index} style={styles.sourceButton}>
                    <Text style={styles.sourceText}>{source}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Interest Level</Text>
              <View style={styles.interestContainer}>
                {['Hot', 'Warm', 'Cold'].map((level, index) => (
                  <TouchableOpacity key={index} style={[styles.interestButton, index === 0 && styles.interestButtonActive]}>
                    <Text style={[styles.interestText, index === 0 && styles.interestTextActive]}>{level}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.propertySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🏢 Property Interest</Text>
          <View style={styles.propertyList}>
            {[
              { name: 'Green Valley Apartments', type: 'Apartment', price: '$1,050/mo', available: 3, color: '#667eea' },
              { name: 'Sunrise Complex', type: 'Studio', price: '$950/mo', available: 5, color: '#f093fb' },
              { name: 'Downtown Lofts', type: '1 Bedroom', price: '$1,400/mo', available: 2, color: '#43e97b' },
              { name: 'Harbor View', type: '2 Bedroom', price: '$1,800/mo', available: 1, color: '#4facfe' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.propertyCard}>
                <View style={[styles.propertyBadge, { backgroundColor: item.color }]}>
                  <Text style={styles.propertyBadgeText}>{item.available} Available</Text>
                </View>
                <View style={styles.propertyContent}>
                  <Text style={styles.propertyName}>{item.name}</Text>
                  <Text style={styles.propertyType}>{item.type}</Text>
                  <Text style={styles.propertyPrice}>{item.price}</Text>
                </View>
                <TouchableOpacity style={styles.propertySelectButton}>
                  <Text style={styles.propertySelectText}>Select</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.timelineSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📅 Move-in Timeline</Text>
          <View style={styles.timelineContainer}>
            {[
              { timeline: 'Immediate', description: 'Looking to move within 7 days', icon: '⚡', color: '#f5576c' },
              { timeline: 'Within 1 Month', description: 'Planning to move in 30 days', icon: '📅', color: '#f093fb' },
              { timeline: 'Within 3 Months', description: 'Flexible timeline, up to 90 days', icon: '🗓️', color: '#667eea' },
              { timeline: 'Flexible', description: 'No specific move-in date', icon: '📆', color: '#43e97b' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.timelineCard}>
                <View style={[styles.timelineIconContainer, { backgroundColor: item.color }]}>
                  <Text style={styles.timelineIcon}>{item.icon}</Text>
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{item.timeline}</Text>
                  <Text style={styles.timelineDescription}>{item.description}</Text>
                </View>
                <TouchableOpacity style={styles.timelineSelectButton}>
                  <Text style={styles.timelineSelectText}>Choose</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[scoringSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Lead Scoring</Text>
          <View style={styles.scoringCard}>
            <View style={styles.scoreDisplay}>
              <Text style={styles.scoreValue}>78</Text>
              <Text style={styles.scoreLabel}>Lead Score</Text>
              <Text style={styles.scoreCategory}>High Quality</Text>
            </View>
            <View style={styles.scoreFactors}>
              {[
                { factor: 'Budget Match', score: 85, color: '#667eea' },
                { factor: 'Timeline', score: 90, color: '#43e97b' },
                { factor: 'Property Fit', score: 72, color: '#f093fb' },
                { factor: 'Contact Speed', score: 95, color: '#4facfe' },
              ].map((item, index) => (
                <View key={index} style={styles.scoreFactorItem}>
                  <Text style={styles.scoreFactorLabel}>{item.factor}</Text>
                  <View style={styles.scoreFactorBarContainer}>
                    <View style={[styles.scoreFactorBar, { width: `${item.score}%`, backgroundColor: item.color }]} />
                  </View>
                  <Text style={[styles.scoreFactorValue, { color: item.color }]}>{item.score}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[automationSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⚡ Automation Settings</Text>
          <View style={styles.automationList}>
            {[
              { setting: 'Auto Welcome Email', description: 'Send welcome email immediately', enabled: true, color: '#667eea' },
              { setting: 'Auto SMS Reminder', description: 'Send SMS follow-up in 24 hours', enabled: true, color: '#43e97b' },
              { setting: 'Auto Property Details', description: 'Send property brochure', enabled: false, color: '#f093fb' },
              { setting: 'Auto Schedule Tour', description: 'Offer tour scheduling', enabled: true, color: '#4facfe' },
            ].map((item, index) => (
              <View key={index} style={styles.automationCard}>
                <View style={[styles.automationIconContainer, { backgroundColor: item.color }]}>
                  <Text style={styles.automationIcon}>{item.enabled ? '✅' : '⏸️'}</Text>
                </View>
                <View style={styles.automationContent}>
                  <Text style={styles.automationTitle}>{item.setting}</Text>
                  <Text style={styles.automationDescription}>{item.description}</Text>
                </View>
                <TouchableOpacity style={styles.automationToggle}>
                  <Text style={styles.automationToggleText}>{item.enabled ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[recentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Recently Added Leads</Text>
          {[
            { name: 'Emily Watson', source: 'Website', score: 92, time: '2 hours ago', color: '#43e97b' },
            { name: 'James Rodriguez', source: 'Referral', score: 88, time: '4 hours ago', color: '#43e97b' },
            { name: 'Sarah Kim', source: 'Zillow', score: 76, time: '6 hours ago', color: '#f093fb' },
            { name: 'Michael Brown', source: 'Social Media', score: 65, time: '8 hours ago', color: '#667eea' },
          ].map((item, index) => (
            <View key={index} style={styles.recentCard}>
              <View style={[styles.recentScoreBadge, { backgroundColor: item.color }]}>
                <Text style={styles.recentScoreText}>{item.score}</Text>
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentName}>{item.name}</Text>
                <Text style={styles.recentSource}>{item.source}</Text>
                <Text style={styles.recentTime}>{item.time}</Text>
              </View>
              <TouchableOpacity style={styles.recentViewButton}>
                <Text style={styles.recentViewText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Add Lead</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Intelligent Lead Management</Text>
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
  formSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  formCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sourceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sourceButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sourceText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  interestContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  interestButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  interestButtonActive: {
    backgroundColor: '#667eea',
  },
  interestText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '600',
  },
  interestTextActive: {
    color: '#FFFFFF',
  },
  propertySection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  propertyList: {
    gap: 12,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  propertyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  propertyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
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
  propertyType: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  propertySelectButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  propertySelectText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  timelineSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  timelineContainer: {
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
  timelineSelectButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timelineSelectText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  scoringSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  scoringCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  scoreDisplay: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#667eea',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  scoreCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#43e97b',
  },
  scoreFactors: {
    gap: 16,
  },
  scoreFactorItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreFactorLabel: {
    width: 100,
    fontSize: 14,
    color: '#888888',
  },
  scoreFactorBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  scoreFactorBar: {
    height: '100%',
    borderRadius: 4,
  },
  scoreFactorValue: {
    width: 40,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
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
  automationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  automationIcon: {
    fontSize: 24,
  },
  automationContent: {
    flex: 1,
  },
  automationTitle: {
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
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  recentSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  recentCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  recentScoreBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recentScoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  recentContent: {
    flex: 1,
  },
  recentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recentSource: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  recentTime: {
    fontSize: 12,
    color: '#667eea',
  },
  recentViewButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  recentViewText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#667eea',
    marginHorizontal: 16,
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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

export default LeadNewPage;