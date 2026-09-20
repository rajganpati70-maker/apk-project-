/**
 * Main Index Page
 * Enhanced main page with navigation items and scrolling sections
 * Transforms static dashboard into dynamic navigation system
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NavigationProvider, useNavigation } from '../src/context/NavigationContext';
import { NavigationItem } from '../src/components/navigation';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../src/components/content';
import { mainDashboardContent } from '../src/data/demoContent';
import { NavigationItem as NavigationItemType, ContentBlock } from '../src/types';
import { saveScrollPosition, getScrollPosition } from '../src/utils/scrollStateManager';

/**
 * Main Content Component
 */
const MainContent: React.FC = () => {
  const { navigate, currentRoute } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);
  const [sections] = useState(mainDashboardContent.sections);
  const [activePage, setActivePage] = useState('main');
  const [activeSubPage, setActiveSubPage] = useState('');

  /**
   * Navigation items for main page
   */
  const navigationItems: NavigationItemType[] = [
    {
      id: 'properties',
      title: 'Property Management',
      description: 'Manage your 156 rental properties',
      icon: '🏢',
      route: '/properties',
      badge: 23,
      accessibilityLabel: 'Property Management',
      accessibilityHint: 'View and manage all properties',
    },
    {
      id: 'financial',
      title: 'Financial Management',
      description: 'Track revenue, expenses, and profits',
      icon: '💰',
      route: '/financial',
      badge: 5,
      accessibilityLabel: 'Financial Management',
      accessibilityHint: 'View financial analytics and reports',
    },
    {
      id: 'tenants',
      title: 'Tenant Management',
      description: 'Manage 142 active tenants',
      icon: '👥',
      route: '/tenants',
      badge: 8,
      accessibilityLabel: 'Tenant Management',
      accessibilityHint: 'View tenant directory and communications',
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      description: 'Deep insights and performance metrics',
      icon: '📊',
      route: '/analytics',
      accessibilityLabel: 'Analytics and Reports',
      accessibilityHint: 'View detailed analytics and reports',
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      description: '23 open maintenance requests',
      icon: '🔧',
      route: '/maintenance',
      badge: 23,
      accessibilityLabel: 'Maintenance',
      accessibilityHint: 'View and manage maintenance requests',
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'App configuration and preferences',
      icon: '⚙️',
      route: '/settings',
      accessibilityLabel: 'Settings',
      accessibilityHint: 'Configure app settings',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    // Save current scroll position before navigating
    saveScrollPosition(currentRoute, 0);
    
    // Navigate to the target route
    navigate(item.route, { itemId: item.id });
    
    // Set active page based on route
    let newPage = 'main';
    if (item.route === '/analytics') {
      newPage = 'analytics';
    } else if (item.route === '/maintenance') {
      newPage = 'maintenance';
    } else if (item.route === '/settings') {
      newPage = 'settings';
    } else if (item.route === '/properties') {
      newPage = 'properties';
    } else if (item.route === '/financial') {
      newPage = 'financial';
    } else if (item.route === '/tenants') {
      newPage = 'tenants';
    } else if (item.route.includes('/analytics/')) {
      setActiveSubPage(item.route);
      newPage = 'analytics-sub';
    } else if (item.route.includes('/maintenance/')) {
      setActiveSubPage(item.route);
      newPage = 'maintenance-sub';
    } else if (item.route.includes('/settings/')) {
      setActiveSubPage(item.route);
      newPage = 'settings-sub';
    } else if (item.route.includes('/properties/')) {
      setActiveSubPage(item.route);
      newPage = 'properties-sub';
    } else if (item.route.includes('/financial/')) {
      setActiveSubPage(item.route);
      newPage = 'financial-sub';
    } else if (item.route.includes('/tenants/')) {
      setActiveSubPage(item.route);
      newPage = 'tenants-sub';
    } else {
      newPage = 'main';
    }
    
    setActivePage(newPage);
    console.log('Navigated to:', item.route, 'Active page:', newPage, 'Sub page:', activeSubPage);
  }, [navigate, currentRoute, activeSubPage]);

  /**
   * Handle refresh
   */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, this would fetch fresh data
    setRefreshing(false);
  }, []);

  /**
   * Handle content block press
   */
  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Block pressed:', block.id, block.type);
    
    // Navigate to detail page based on block type
    switch (block.type) {
      case 'metric':
        Alert.alert('Metric Details', `Viewing details for ${block.title}`);
        break;
      case 'chart':
        Alert.alert('Chart Details', `Viewing detailed chart for ${block.title}`);
        break;
      case 'list':
        Alert.alert('List Details', `Viewing full list for ${block.title}`);
        break;
      default:
        Alert.alert('Content', `Viewing ${block.title}`);
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

  /**
   * Restore scroll position on mount
   */
  useEffect(() => {
    const restoreScroll = async () => {
      const position = await getScrollPosition(currentRoute);
      if (position > 0) {
        // Scroll to position (implementation depends on scroll ref)
        console.log('Restoring scroll position:', position);
      }
    };
    
    restoreScroll();
  }, [currentRoute]);

  /**
   * Handle back navigation
   */
  const handleBack = useCallback(() => {
    if (activePage.includes('-sub')) {
      // Go back to parent page
      const parentPage = activePage.replace('-sub', '');
      setActivePage(parentPage);
      setActiveSubPage('');
    } else {
      // Go back to main dashboard
      setActivePage('main');
      setActiveSubPage('');
    }
    saveScrollPosition(currentRoute, 0);
    navigate('/');
  }, [navigate, currentRoute, activePage]);

  // Render main dashboard
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
          <Text style={styles.headerTitle}>AnyRenting</Text>
          <Text style={styles.headerSubtitle}>Property Management Dashboard</Text>
        </View>

        {/* Navigation Items */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Quick Navigation</Text>
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
              testID={`nav-item-${item.id}`}
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
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>AnyRenting Property Management</Text>
          <Text style={styles.footerSubtext}>Dashboard v2.4.1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Index Component with Navigation Provider
 */
const MainApp: React.FC = () => {
  return (
    <NavigationProvider>
      <MainContent />
    </NavigationProvider>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
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
  footer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default MainApp;