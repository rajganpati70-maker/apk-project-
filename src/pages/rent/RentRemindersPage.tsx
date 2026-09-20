/**
 * Rent Reminders Page - Premium Black Theme
 * Advanced reminder management with deep content and premium design
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

const RentRemindersPage: React.FC = () => {
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
              <Text style={styles.heroBadge}>⏰ REMINDERS</Text>
              <Text style={styles.heroTitle}>Automated Rent{'\n'}Reminders</Text>
              <Text style={styles.heroSubtitle}>Configure and manage automated rent reminders with intelligent scheduling</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>8</Text>
                  <Text style={styles.heroStatLabel}>Active</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>94%</Text>
                  <Text style={styles.heroStatLabel}>Success</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>Auto</Text>
                  <Text style={styles.heroStatLabel}>Enabled</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.overviewSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Reminder Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>94.2%</Text>
                <Text style={styles.overviewLabel}>Collection Rate</Text>
                <Text style={styles.overviewTrend}>↑ 8.5%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>8</Text>
                <Text style={styles.overviewLabel}>Pending</Text>
                <Text style={styles.overviewTrend}>3 Urgent</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>156</Text>
                <Text style={styles.overviewLabel}>Sent Today</Text>
                <Text style={styles.overviewTrend}>On Track</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>42s</Text>
                <Text style={styles.overviewLabel}>Avg Response</Text>
                <Text style={styles.overviewTrend}>↓ 12%</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.rulesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Reminder Rules</Text>
          {[
            { rule: 'Before Due Date', description: 'Send reminder 3 days before due date', enabled: true, color: '#667eea' },
            { rule: 'On Due Date', description: 'Send reminder on the due date', enabled: true, color: '#43e97b' },
            { rule: 'After Due Date', description: 'Send reminder 1 day after due date', enabled: true, color: '#f093fb' },
            { rule: 'Late Notice', description: 'Send late notice after 5 days', enabled: true, color: '#4facfe' },
            { rule: 'Final Notice', description: 'Send final notice after 15 days', enabled: false, color: '#f5576c' },
          ].map((item, index) => (
            <View key={index} style={styles.ruleCard}>
              <View style={[styles.ruleDot, { backgroundColor: item.color }]} />
              <View style={styles.ruleContent}>
                <Text style={styles.ruleName}>{item.rule}</Text>
                <Text style={styles.ruleDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity style={styles.ruleToggleButton}>
                <Text style={[styles.ruleToggleText, { color: item.enabled ? '#43e97b' : '#888888' }]}>
                  {item.enabled ? 'Active' : 'Inactive'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.channelsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📡 Reminder Channels</Text>
          <View style={styles.channelsList}>
            {[
              { channel: 'WhatsApp', description: 'Send via WhatsApp messages', success: '91%', icon: '💬', color: '#667eea' },
              { channel: 'SMS', description: 'Send via text messages', success: '85%', icon: '📱', color: '#43e97b' },
              { channel: 'Email', description: 'Send via email', success: '78%', icon: '📧', color: '#f093fb' },
              { channel: 'In-App', description: 'Send via app notifications', success: '95%', icon: '🔔', color: '#4facfe' },
            ].map((item, index) => (
              <View key={index} style={styles.channelCard}>
                <View style={[styles.channelIconContainer, { backgroundColor: item.color }]}>
                  <Text style={styles.channelIcon}>{item.icon}</Text>
                </View>
                <View style={styles.channelContent}>
                  <Text style={styles.channelName}>{item.channel}</Text>
                  <Text style={styles.channelDescription}>{item.description}</Text>
                </View>
                <View style={styles.channelSuccess}>
                  <Text style={[styles.channelSuccessValue, { color: item.color }]}>{item.success}</Text>
                  <Text style={styles.channelSuccessLabel}>success</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[scheduleSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📅 Schedule Configuration</Text>
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>First Reminder</Text>
              <Text style={styles.scheduleValue}>3 days before due</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Second Reminder</Text>
              <Text style={styles.scheduleValue}>On due date</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Late Notice</Text>
              <Text style={styles.scheduleValue}>5 days after due</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Final Notice</Text>
              <Text style={styles.scheduleValue}>15 days after due</Text>
            </View>
            <TouchableOpacity style={styles.scheduleEditButton}>
              <Text style={styles.scheduleEditText}>Edit Schedule</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={[styles.templatesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📝 Message Templates</Text>
          {[
            { template: 'Before Due', preview: 'Hi [Name], your rent of $[Amount] is due in 3 days...', type: 'WhatsApp', color: '#667eea' },
            { template: 'On Due Date', preview: 'Hi [Name], your rent of $[Amount] is due today...', type: 'SMS', color: '#43e97b' },
            { template: 'Late Notice', preview: 'Hi [Name], your rent of $[Amount] is 5 days overdue...', type: 'Email', color: '#f093fb' },
          ].map((item, index) => (
            <View key={index} style={styles.templateCard}>
              <View style={[styles.templateBadge, { backgroundColor: item.color }]}>
                <Text style={styles.templateBadgeText}>{item.type}</Text>
              </View>
              <View style={styles.templateContent}>
                <Text style={styles.templateName}>{item.template}</Text>
                <Text style={styles.templatePreview}>{item.preview}</Text>
              </View>
              <TouchableOpacity style={styles.templateEditButton}>
                <Text style={styles.templateEditText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.historySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📜 Reminder History</Text>
          {[
            { tenant: 'Rahul Kumar', property: 'Room 203 Green Valley', reminder: 'Due Date', sent: 'Sep 19, 2024', responded: 'Yes', color: '#43e97b' },
            { tenant: 'Sarah Johnson', property: 'Room 412 Sunrise Apartments', reminder: 'Before Due', sent: 'Sep 16, 2024', responded: 'Yes', color: '#43e97b' },
            { tenant: 'Michael Chen', property: 'Room 205 Garden View', reminder: 'Late Notice', sent: 'Sep 15, 2024', responded: 'No', color: '#f5576c' },
          ].map((item, index) => (
            <View key={index} style={styles.historyCard}>
              <View style={[styles.historyStatusDot, { backgroundColor: item.color }]} />
              <View style={styles.historyContent}>
                <Text style={styles.historyTenant}>{item.tenant}</Text>
                <Text style={styles.historyProperty}>{item.property}</Text>
                <Text style={styles.historyDetails}>{item.reminder} • {item.sent}</Text>
              </View>
              <Text style={[styles.historyResponded, { color: item.color }]}>{item.responded}</Text>
            </View>
          ))}
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Intelligent Reminder System</Text>
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
  rulesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  ruleCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  ruleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  ruleContent: {
    flex: 1,
  },
  ruleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  ruleDescription: {
    fontSize: 14,
    color: '#888888',
  },
  ruleToggleButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ruleToggleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  channelsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  channelsList: {
    gap: 12,
  },
  channelCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  channelIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  channelIcon: {
    fontSize: 24,
  },
  channelContent: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  channelDescription: {
    fontSize: 14,
    color: '#888888',
  },
  channelSuccess: {
    alignItems: 'flex-end',
  },
  channelSuccessValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  channelSuccessLabel: {
    fontSize: 12,
    color: '#888888',
  },
  scheduleSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  scheduleCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  scheduleLabel: {
    fontSize: 14,
    color: '#888888',
  },
  scheduleValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scheduleEditButton: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  scheduleEditText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  templatesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  templateCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  templateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  templateBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  templateContent: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  templatePreview: {
    fontSize: 14,
    color: '#888888',
  },
  templateEditButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  templateEditText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
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
  historyStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
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
  historyDetails: {
    fontSize: 12,
    color: '#667eea',
  },
  historyResponded: {
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

export default RentRemindersPage;