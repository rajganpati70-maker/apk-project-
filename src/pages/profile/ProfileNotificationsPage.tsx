/**
 * Profile Notifications Page - Premium Black Theme
 * Advanced notification management with deep content and premium design
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

const ProfileNotificationsPage: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
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
        <Text style={styles.backButtonText}>← Back to Profile</Text>
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
              <Text style={styles.heroBadge}>🔔 NOTIFICATIONS</Text>
              <Text style={styles.heroTitle}>Notification{'\n'}Preferences</Text>
              <Text style={styles.heroSubtitle}>Customize how and when you receive notifications for optimal productivity</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>3</Text>
                  <Text style={styles.heroStatLabel}>Active</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>12</Text>
                  <Text style={styles.heroStatLabel}>Types</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>Custom</Text>
                  <Text style={styles.heroStatLabel}>Settings</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[channelsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📡 Notification Channels</Text>
          <View style={styles.channelsList}>
            <View style={styles.channelCard}>
              <View style={styles.channelIconContainer}>
                <Text style={styles.channelIcon}>📱</Text>
              </View>
              <View style={styles.channelContent}>
                <Text style={styles.channelName}>Push Notifications</Text>
                <Text style={styles.channelDescription}>Real-time alerts on your device</Text>
              </View>
              <TouchableOpacity onPress={() => setPushEnabled(!pushEnabled)}>
                <View style={[styles.channelToggle, { backgroundColor: pushEnabled ? '#43e97b' : '#888888' }]}>
                  <Text style={styles.channelToggleText}>{pushEnabled ? 'On' : 'Off'}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.channelCard}>
              <View style={styles.channelIconContainer}>
                <Text style={styles.channelIcon}>📧</Text>
              </View>
              <View style={styles.channelContent}>
                <Text style={styles.channelName}>Email Notifications</Text>
                <Text style={styles.channelDescription}>Updates via email</Text>
              </View>
              <TouchableOpacity onPress={() => setEmailEnabled(!emailEnabled)}>
                <View style={[styles.channelToggle, { backgroundColor: emailEnabled ? '#43e97b' : '#888888' }]}>
                  <Text style={styles.channelToggleText}>{emailEnabled ? 'On' : 'Off'}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.channelCard}>
              <View style={styles.channelIconContainer}>
                <Text style={styles.channelIcon}>💬</Text>
              </View>
              <View style={styles.channelContent}>
                <Text style={styles.channelName}>SMS Notifications</Text>
                <Text style={styles.channelDescription}>Text message alerts</Text>
              </View>
              <TouchableOpacity onPress={() => setSmsEnabled(!smsEnabled)}>
                <View style={[styles.channelToggle, { backgroundColor: smsEnabled ? '#43e97b' : '#888888' }]}>
                  <Text style={styles.channelToggleText}>{smsEnabled ? 'On' : 'Off'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[typesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Notification Types</Text>
          {[
            { type: 'Rent Reminders', description: 'When rent is due or overdue', enabled: true, color: '#667eea' },
            { type: 'Maintenance Requests', description: 'New maintenance requests', enabled: true, color: '#43e97b' },
            { type: 'Lead Inquiries', description: 'New rental inquiries', enabled: true, color: '#f093fb' },
            { type: 'Payment Received', description: 'When payments are received', enabled: true, color: '#4facfe' },
            { type: 'Lease Expiry', description: 'Lease renewal reminders', enabled: false, color: '#ffd700' },
            { type: 'System Updates', description: 'Platform updates and news', enabled: false, color: '#f5576c' },
          ].map((item, index) => (
            <View key={index} style={styles.typeCard}>
              <View style={[styles.typeDot, { backgroundColor: item.color }]} />
              <View style={styles.typeContent}>
                <Text style={styles.typeName}>{item.type}</Text>
                <Text style={styles.typeDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity style={styles.typeToggleButton}>
                <Text style={[styles.typeToggleText, { color: item.enabled ? '#43e97b' : '#888888' }]}>
                  {item.enabled ? 'Enabled' : 'Disabled'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[scheduleSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⏰ Quiet Hours</Text>
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>Set quiet hours to avoid disturbance</Text>
              <Text style={styles.scheduleDescription}>You won't receive notifications during this time</Text>
            </View>
            <View style={styles.scheduleTimeContainer}>
              <View style={styles.scheduleTime}>
                <Text style={styles.scheduleTimeLabel}>Start</Text>
                <Text style={styles.scheduleTimeValue}>10:00 PM</Text>
              </View>
              <View style={styles.scheduleTime}>
                <Text style={styles.scheduleTimeLabel}>End</Text>
                <Text style={styles.scheduleTimeValue}>7:00 AM</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.scheduleEditButton}>
              <Text style={styles.scheduleEditText}>Edit Schedule</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={[recentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📜 Recent Notifications</Text>
          {[
            { notification: 'Rent payment received from Priya Sharma', time: '2 hours ago', type: 'Payment', color: '#43e97b' },
            { notification: 'New maintenance request from Room 302', time: '4 hours ago', type: 'Maintenance', color: '#f093fb' },
            { notification: 'Lead inquiry: Emily Watson interested in Green Valley', time: '6 hours ago', type: 'Lead', color: '#667eea' },
            { notification: 'Lease expiring in 30 days - Room 412', time: '1 day ago', type: 'Lease', color: '#ffd700' },
          ].map((item, index) => (
            <View key={index} style={styles.notificationCard}>
              <View style={[styles.notificationTypeDot, { backgroundColor: item.color }]} />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>{item.notification}</Text>
                <Text style={styles.notificationDetails}>{item.type} • {item.time}</Text>
              </View>
              <TouchableOpacity style={styles.notificationDismissButton}>
                <Text style={styles.notificationDismissText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[settingsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⚙️ Advanced Settings</Text>
          <View style={styles.settingsList}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Notification Sound</Text>
                <Text style={styles.settingDescription}>Choose notification sound</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Vibration Pattern</Text>
                <Text style={styles.settingDescription}>Customize vibration</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Do Not Disturb</Text>
                <Text style={styles.settingDescription}>Override all notifications</Text>
              </View>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Smart Notification Management</Text>
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
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
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
  channelToggle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  channelToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  typesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  typeCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  typeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  typeContent: {
    flex: 1,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    color: '#888888',
  },
  typeToggleButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  typeToggleText: {
    fontSize: 12,
    fontWeight: '600',
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
  scheduleHeader: {
    marginBottom: 20,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  scheduleDescription: {
    fontSize: 14,
    color: '#888888',
  },
  scheduleTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  scheduleTime: {
    alignItems: 'center',
  },
  scheduleTimeLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  scheduleTimeValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scheduleEditButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  scheduleEditText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
  recentSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  notificationTypeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  notificationDetails: {
    fontSize: 14,
    color: '#888888',
  },
  notificationDismissButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  notificationDismissText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
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

export default ProfileNotificationsPage;