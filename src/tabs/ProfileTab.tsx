/**
 * Profile Tab Screen - Premium Black Theme
 * Advanced profile management with deep content and premium design
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
import ProfileSettingsPage from '../pages/profile/ProfileSettingsPage';

const { width, height } = Dimensions.get('window');

const ProfileTab: React.FC = () => {
  const { navigate, currentRoute, goBack } = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('main');
  const scrollY = useRef(new Animated.Value(0));
  const headerOpacity = useRef(new Animated.Value(1));
  const scaleValue = useRef(new Animated.Value(1));

  useEffect(() => {
    if (currentRoute === '/profile/settings') {
      setCurrentPage('settings');
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
      id: 'profile-settings',
      title: 'Profile Settings',
      description: 'Manage your account information',
      icon: '👤',
      route: '/profile/settings',
      accessibilityLabel: 'Profile Settings',
      accessibilityHint: 'Manage profile settings',
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Customize app experience',
      icon: '⚙️',
      route: '/profile/preferences',
      accessibilityLabel: 'Preferences',
      accessibilityHint: 'Manage app preferences',
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Password and authentication',
      icon: '🔒',
      route: '/profile/security',
      badge: 0,
      accessibilityLabel: 'Security',
      accessibilityHint: 'Manage security settings',
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: '❓',
      route: '/profile/help',
      accessibilityLabel: 'Help & Support',
      accessibilityHint: 'Get help and support',
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
    console.log('Profile block pressed:', block.id);
  }, []);

  const renderContentBlock = useCallback((block: ContentBlock) => {
    return (
      <ContentBlockRenderer
        block={block}
        onPress={handleBlockPress}
      />
    );
  }, [handleBlockPress]);

  if (currentPage === 'settings') {
    return (
      <>
        <ProfileSettingsPage />
        <FloatingFooter context="Profile" />
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
              <Text style={styles.heroBadge}>👤 PROFILE</Text>
              <Text style={styles.heroTitle}>Your Complete{'\n'}Account Management</Text>
              <Text style={styles.heroSubtitle}>Manage your profile, preferences, security settings, and get support all in one place</Text>
              
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
                  <Text style={styles.heroStatValue}>12</Text>
                  <Text style={styles.heroStatLabel}>Months</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Profile Card */}
        <Animated.View style={[styles.profileCard, { transform: [{ scale: scaleValue.current }] }]}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@anyrenting.com</Text>
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>⭐ Silver Plan</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileStats}>
            <View style={styles.profileStatItem}>
              <Text style={styles.profileStatValue}>156</Text>
              <Text style={styles.profileStatLabel}>Properties</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStatItem}>
              <Text style={styles.profileStatValue}>142</Text>
              <Text style={styles.profileStatLabel}>Tenants</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStatItem}>
              <Text style={styles.profileStatValue}>12</Text>
              <Text style={styles.profileStatLabel}>Months</Text>
            </View>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View style={[styles.quickActionsBanner, { transform: [{ scale: scaleValue.current }] }]}>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📧</Text>
              <Text style={styles.quickActionLabel}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📞</Text>
              <Text style={styles.quickActionLabel}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>💬</Text>
              <Text style={styles.quickActionLabel}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📱</Text>
              <Text style={styles.quickActionLabel}>Share</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Navigation Items */}
        <Animated.View style={[styles.navigationSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>Account Management</Text>
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
              testID={`profile-nav-${item.id}`}
            />
          ))}
        </Animated.View>

        {/* Account Overview */}
        <Animated.View style={[styles.accountOverview, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Account Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>85%</Text>
                <Text style={styles.overviewLabel}>Profile Complete</Text>
                <Text style={styles.overviewTrend}>Add details</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>Active</Text>
                <Text style={styles.overviewLabel}>Account Status</Text>
                <Text style={styles.overviewTrend}>Since 2023</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>Silver</Text>
                <Text style={styles.overviewLabel}>Current Plan</Text>
                <Text style={styles.overviewTrend}>Upgrade to Gold</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>100%</Text>
                <Text style={styles.overviewLabel}>Security Score</Text>
                <Text style={styles.overviewTrend}>Excellent</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        {/* Personal Information */}
        <Animated.View style={[styles.personalInfoSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>👤 Personal Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>John Doe</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>john.doe@anyrenting.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>+91 98765 43210</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>Mumbai, India</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Language</Text>
              <Text style={styles.infoValue}>English</Text>
            </View>
          </View>
        </Animated.View>

        {/* Quick Settings */}
        <Animated.View style={[styles.settingsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⚙️ Quick Settings</Text>
          {[
            { setting: 'Push Notifications', status: 'Enabled', icon: '🔔', color: '#667eea' },
            { setting: 'Dark Mode', status: 'Disabled', icon: '🌙', color: '#f093fb' },
            { setting: 'Biometric Login', status: 'Enabled', icon: '👆', color: '#43e97b' },
            { setting: 'Two-Factor Auth', status: 'Enabled', icon: '🔐', color: '#4facfe' },
          ].map((item, index) => (
            <View key={index} style={styles.settingCard}>
              <View style={[styles.settingIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.settingIcon}>{item.icon}</Text>
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingName}>{item.setting}</Text>
                <Text style={styles.settingStatus}>{item.status}</Text>
              </View>
              <TouchableOpacity style={styles.settingToggle}>
                <Text style={styles.settingToggleText}>Toggle</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        {/* Security Overview */}
        <Animated.View style={[styles.securitySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔒 Security Overview</Text>
          <View style={styles.securityCard}>
            <View style={styles.securityRow}>
              <View style={styles.securityIconContainer}>
                <Text style={styles.securityIcon}>🔐</Text>
              </View>
              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>Password Strength</Text>
                <Text style={styles.securityDescription}>Strong password • Last changed 30 days ago</Text>
              </View>
              <Text style={styles.securityStatus}>Strong</Text>
            </View>
            <View style={styles.securityRow}>
              <View style={styles.securityIconContainer}>
                <Text style={styles.securityIcon}>📱</Text>
              </View>
              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>Two-Factor Authentication</Text>
                <Text style={styles.securityDescription}>Enabled via SMS</Text>
              </View>
              <Text style={styles.securityStatus}>Active</Text>
            </View>
            <View style={styles.securityRow}>
              <View style={styles.securityIconContainer}>
                <Text style={styles.securityIcon}>👆</Text>
              </View>
              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>Biometric Login</Text>
                <Text style={styles.securityDescription}>Fingerprint enabled</Text>
              </View>
              <Text style={styles.securityStatus}>Active</Text>
            </View>
          </View>
        </Animated.View>

        {/* Help & Support */}
        <Animated.View style={[styles.helpSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>❓ Help & Support</Text>
          {[
            { option: 'Contact Support', description: 'Get help from our team', icon: '💬', color: '#667eea' },
            { option: 'FAQ', description: 'Find answers to common questions', icon: '❓', color: '#f093fb' },
            { option: 'Documentation', description: 'Read our guides and tutorials', icon: '📚', color: '#4facfe' },
            { option: 'Report Issue', description: 'Report a bug or problem', icon: '🐛', color: '#f5576c' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.helpCard}>
              <View style={[styles.helpIconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.helpIcon}>{item.icon}</Text>
              </View>
              <View style={styles.helpContent}>
                <Text style={styles.helpTitle}>{item.option}</Text>
                <Text style={styles.helpDescription}>{item.description}</Text>
              </View>
              <Text style={styles.helpArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Demo Content Sections */}
        <Animated.View style={[styles.contentSection, { transform: [{ scale: scaleValue.current }] }]}>
          <ScrollingSectionContainer
            section={{
              id: 'profile-analytics',
              title: '📊 Account Analytics',
              description: 'Detailed account usage metrics',
              blocks: [
                {
                  id: 'account-metrics',
                  type: ContentBlockType.METRIC,
                  title: 'Account Age',
                  data: {
                    value: 12,
                    label: 'Months active',
                    change: 0,
                    changeType: 'increase',
                    unit: 'months',
                    format: 'number',
                  } as MetricBlockData,
                },
              ],
            }}
            renderBlock={renderContentBlock}
            onRefresh={handleRefresh}
            testID={`profile-analytics`}
          />
        </Animated.View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Version 1.0.0 • Premium Property Management</Text>
        </View>
      </Animated.ScrollView>
      
      <FloatingFooter context="Profile" />
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
  profileCard: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  planBadge: {
    backgroundColor: 'rgba(240, 147, 251, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  planBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f093fb',
  },
  editButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileStatItem: {
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileStatLabel: {
    fontSize: 12,
    color: '#888888',
  },
  profileStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  accountOverview: {
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
    color: '#667eea',
    fontWeight: '600',
  },
  personalInfoSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  infoCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888888',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  settingsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  settingCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingContent: {
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingStatus: {
    fontSize: 14,
    color: '#888888',
  },
  settingToggle: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  settingToggleText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  securitySection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  securityCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  securityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(67, 233, 123, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  securityIcon: {
    fontSize: 24,
  },
  securityContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 14,
    color: '#888888',
  },
  securityStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#43e97b',
  },
  helpSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  helpCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  helpIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  helpIcon: {
    fontSize: 24,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  helpDescription: {
    fontSize: 14,
    color: '#888888',
  },
  helpArrow: {
    fontSize: 20,
    color: '#667eea',
  },
  contentSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  logoutSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: 'rgba(245, 87, 108, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5576c',
  },
  logoutButtonText: {
    color: '#f5576c',
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

export default ProfileTab;