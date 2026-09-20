/**
 * Tenant Management Index Page
 * Main tenant management page with scrolling sections and navigation
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NavigationProvider, useNavigation } from '../../../src/context/NavigationContext';
import { NavigationItem } from '../../../src/components/navigation';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../../src/components/content';
import { tenantManagementContent } from '../../../src/data/demoContent';
import { NavigationItem as NavigationItemType, ContentBlock } from '../../../src/types';
import { saveScrollPosition } from '../../../src/utils/scrollStateManager';

/**
 * Tenant Management Content Component
 */
const TenantManagementContent: React.FC = () => {
  const { navigate, currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);
  const [sections] = useState(tenantManagementContent.sections);

  /**
   * Sub-navigation items for tenant management
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'tenant-directory',
      title: 'Tenant Directory',
      description: 'View all 142 active tenants',
      icon: '👥',
      route: '/tenants/directory',
      accessibilityLabel: 'Tenant Directory',
      accessibilityHint: 'View complete tenant directory',
    },
    {
      id: 'applications',
      title: 'Applications',
      description: '8 pending applications to review',
      icon: '📝',
      route: '/tenants/applications',
      badge: 8,
      accessibilityLabel: 'Applications',
      accessibilityHint: 'Review and process tenant applications',
    },
    {
      id: 'communications',
      title: 'Communications',
      description: 'Message center and announcements',
      icon: '💬',
      route: '/tenants/communications',
      badge: 4,
      accessibilityLabel: 'Communications',
      accessibilityHint: 'View messages and send announcements',
    },
    {
      id: 'lease-management',
      title: 'Lease Management',
      description: '12 leases expiring soon',
      icon: '📄',
      route: '/tenants/leases',
      badge: 12,
      accessibilityLabel: 'Lease Management',
      accessibilityHint: 'Manage leases and renewals',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    saveScrollPosition(currentRoute, 0);
    navigate(item.route, { itemId: item.id });
    
    Alert.alert(
      'Navigation',
      `Navigating to ${item.title}`,
      [
        { text: 'OK', onPress: () => console.log('Navigated to', item.route) }
      ]
    );
  }, [navigate, currentRoute]);

  /**
   * Handle refresh
   */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  /**
   * Handle content block press
   */
  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Tenant block pressed:', block.id, block.type);
    
    switch (block.type) {
      case 'metric':
        Alert.alert('Tenant Metric', `Viewing details for ${block.title}`);
        break;
      case 'chart':
        Alert.alert('Tenant Chart', `Viewing detailed chart for ${block.title}`);
        break;
      case 'list':
        Alert.alert('Tenant List', `Viewing full list for ${block.title}`);
        break;
      default:
        Alert.alert('Tenant Content', `Viewing ${block.title}`);
    }
  }, []);

  /**
   * Render content block
   */
  const renderContentBlock = useCallback((block: ContentBlock) => {
    return (
      <ContentBlockRenderer
        block={block}
        onPress={handleBlockPress}
      />
    );
  }, [handleBlockPress]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          saveScrollPosition(currentRoute, offsetY);
        }}
        scrollEventThrottle={100}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tenant Management</Text>
          <Text style={styles.headerSubtitle}>Manage 142 active tenants</Text>
        </View>

        {/* Sub-navigation Items */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Tenant Actions</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
              testID={`tenant-nav-${item.id}`}
            />
          ))}
        </View>

        {/* Demo Content Sections */}
        <View style={styles.contentSection}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`tenant-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Tenant Management Page with Navigation Provider
 */
const TenantManagementPage: React.FC = () => {
  return (
    <NavigationProvider>
      <TenantManagementContent />
    </NavigationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  navigationSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  contentSection: {
    marginTop: 16,
  },
});

export default TenantManagementPage;