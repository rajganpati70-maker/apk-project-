/**
 * Profile Security Page - Premium Black Theme
 * Advanced security management with deep content and premium design
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

const ProfileSecurityPage: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
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
              <Text style={styles.heroBadge}>🔒 SECURITY</Text>
              <Text style={styles.heroTitle}>Account Security{'\n'}Management</Text>
              <Text style={styles.heroSubtitle}>Protect your account with advanced security features and monitoring</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>A+</Text>
                  <Text style={styles.heroStatLabel}>Score</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>0</Text>
                  <Text style={styles.heroStatLabel}>Threats</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>Active</Text>
                  <Text style={styles.heroStatLabel}>Status</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.securityScoreSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Security Score</Text>
          <View style={styles.securityScoreCard}>
            <View style={styles.securityScoreDisplay}>
              <Text style={styles.securityScoreValue}>92%</Text>
              <Text style={styles.securityScoreLabel}>Security Score</Text>
              <Text style={styles.securityScoreCategory}>Excellent</Text>
            </View>
            <View style={styles.securityScoreFactors}>
              {[
                { factor: 'Password Strength', score: 95, color: '#43e97b' },
                { factor: '2FA Enabled', score: 0, color: '#f5576c' },
                { factor: 'Device Security', score: 100, color: '#43e97b' },
                { factor: 'Login Alerts', score: 100, color: '#43e97b' },
              ].map((item, index) => (
                <View key={index} style={styles.securityScoreFactorItem}>
                  <Text style={styles.securityScoreFactorLabel}>{item.factor}</Text>
                  <View style={styles.securityScoreFactorBarContainer}>
                    <View style={[styles.securityScoreFactorBar, { width: `${item.score}%`, backgroundColor: item.color }]} />
                  </View>
                  <Text style={[styles.securityScoreFactorValue, { color: item.color }]}>{item.score}%</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.passwordSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔑 Password Management</Text>
          <View style={styles.passwordCard}>
            <View style={styles.passwordStrength}>
              <Text style={styles.passwordStrengthLabel}>Password Strength</Text>
              <View style={styles.passwordStrengthBarContainer}>
                <View style={[styles.passwordStrengthBar, { width: '95%', backgroundColor: '#43e97b' }]} />
              </View>
              <Text style={styles.passwordStrengthValue}>Strong</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Current Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter current password"
                placeholderTextColor="#666666"
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>New Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#666666"
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#666666"
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={styles.updatePasswordButton}>
              <Text style={styles.updatePasswordButtonText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={[styles.twoFactorSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔐 Two-Factor Authentication</Text>
          <View style={styles.twoFactorCard}>
            <View style={styles.twoFactorStatus}>
              <View style={[styles.twoFactorStatusBadge, { backgroundColor: twoFactorEnabled ? '#43e97b' : '#f5576c' }]}>
                <Text style={styles.twoFactorStatusText}>{twoFactorEnabled ? 'Enabled' : 'Disabled'}</Text>
              </View>
              <Text style={styles.twoFactorDescription}>
                {twoFactorEnabled 
                  ? 'Two-factor authentication is active on your account' 
                  : 'Enable 2FA for enhanced security'}
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.twoFactorButton, { backgroundColor: twoFactorEnabled ? 'rgba(67, 233, 123, 0.2)' : 'rgba(102, 126, 234, 0.2)' }]}
              onPress={() => setTwoFactorEnabled(!twoFactorEnabled)}
            >
              <Text style={[styles.twoFactorButtonText, { color: twoFactorEnabled ? '#43e97b' : '#667eea' }]}>
                {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={[devicesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📱 Active Devices</Text>
          {[
            { device: 'iPhone 15 Pro', location: 'New York, USA', lastActive: '2 minutes ago', current: true, color: '#43e97b' },
            { device: 'MacBook Pro M3', location: 'New York, USA', lastActive: '1 hour ago', current: false, color: '#667eea' },
            { device: 'iPad Pro', location: 'Boston, USA', lastActive: '3 days ago', current: false, color: '#f093fb' },
          ].map((item, index) => (
            <View key={index} style={styles.deviceCard}>
              <View style={[styles.deviceBadge, { backgroundColor: item.color }]}>
                <Text style={styles.deviceBadgeText}>{item.current ? 'Current' : 'Active'}</Text>
              </View>
              <View style={styles.deviceContent}>
                <Text style={styles.deviceName}>{item.device}</Text>
                <Text style={styles.deviceLocation}>{item.location}</Text>
                <Text style={styles.deviceLastActive}>{item.lastActive}</Text>
              </View>
              {!item.current && (
                <TouchableOpacity style={styles.deviceRemoveButton}>
                  <Text style={styles.deviceRemoveText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[alertsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔔 Security Alerts</Text>
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Login Alerts</Text>
                <Text style={styles.settingDescription}>Get notified of new logins</Text>
              </View>
              <TouchableOpacity onPress={() => setLoginAlerts(!loginAlerts)}>
                <View style={[styles.settingToggle, { backgroundColor: loginAlerts ? '#43e97b' : '#888888' }]}>
                  <Text style={styles.settingToggleText}>{loginAlerts ? 'On' : 'Off'}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Session Timeout</Text>
                <Text style={styles.settingDescription}>Auto-logout after inactivity</Text>
              </View>
              <TouchableOpacity onPress={() => setSessionTimeout(!sessionTimeout)}>
                <View style={[styles.settingToggle, { backgroundColor: sessionTimeout ? '#43e97b' : '#888888' }]}>
                  <Text style={styles.settingToggleText}>{sessionTimeout ? 'On' : 'Off'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[loginHistorySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Login History</Text>
          {[
            { date: 'Sep 19, 2024', time: '10:45 AM', device: 'iPhone 15 Pro', location: 'New York, USA', status: 'Successful', color: '#43e97b' },
            { date: 'Sep 18, 2024', time: '2:30 PM', device: 'MacBook Pro M3', location: 'New York, USA', status: 'Successful', color: '#43e97b' },
            { date: 'Sep 17, 2024', time: '9:15 AM', device: 'iPhone 15 Pro', location: 'New York, USA', status: 'Successful', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.loginHistoryCard}>
              <View style={[styles.loginHistoryStatusDot, { backgroundColor: item.color }]} />
              <View style={styles.loginHistoryContent}>
                <Text style={styles.loginHistoryDate}>{item.date} • {item.time}</Text>
                <Text style={styles.loginHistoryDevice}>{item.device}</Text>
                <Text style={styles.loginHistoryLocation}>{item.location}</Text>
              </View>
              <Text style={[styles.loginHistoryStatus, { color: item.color }]}>{item.status}</Text>
            </View>
          ))}
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Advanced Security Protection</Text>
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
  securityScoreSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  securityScoreCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  securityScoreDisplay: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  securityScoreValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#43e97b',
    marginBottom: 8,
  },
  securityScoreLabel: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  securityScoreCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#43e97b',
  },
  securityScoreFactors: {
    gap: 16,
  },
  securityScoreFactorItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityScoreFactorLabel: {
    width: 120,
    fontSize: 14,
    color: '#888888',
  },
  securityScoreFactorBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  securityScoreFactorBar: {
    height: '100%',
    borderRadius: 4,
  },
  securityScoreFactorValue: {
    width: 40,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  passwordSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  passwordCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  passwordStrength: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  passwordStrengthLabel: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  passwordStrengthBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  passwordStrengthBar: {
    height: '100%',
    borderRadius: 4,
  },
  passwordStrengthValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#43e97b',
  },
  inputContainer: {
    marginBottom: 16,
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
  updatePasswordButton: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  updatePasswordButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  twoFactorSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  twoFactorCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  twoFactorStatus: {
    marginBottom: 20,
  },
  twoFactorStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  twoFactorStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  twoFactorDescription: {
    fontSize: 14,
    color: '#888888',
  },
  twoFactorButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  twoFactorButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  devicesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  deviceCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  deviceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  deviceBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deviceContent: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  deviceLocation: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  deviceLastActive: {
    fontSize: 12,
    color: '#667eea',
  },
  deviceRemoveButton: {
    backgroundColor: 'rgba(245, 87, 108, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deviceRemoveText: {
    color: '#f5576c',
    fontSize: 12,
    fontWeight: '600',
  },
  alertsSection: {
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
  settingToggle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  settingToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loginHistorySection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  loginHistoryCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  loginHistoryStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  loginHistoryContent: {
    flex: 1,
  },
  loginHistoryDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  loginHistoryDevice: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  loginHistoryLocation: {
    fontSize: 12,
    color: '#667eea',
  },
  loginHistoryStatus: {
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

export default ProfileSecurityPage;