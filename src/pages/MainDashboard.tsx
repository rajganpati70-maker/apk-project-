/**
 * Main Dashboard Page Component
 * Extracted from App.tsx for better organization
 */

import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '../context/NavigationContext';
import { NavigationItem } from '../components/navigation';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../components/content';
import { mainDashboardContent } from '../data/demoContent';
import { saveScrollPosition } from '../utils/scrollStateManager';
import { NavigationItem as NavigationItemType, ContentBlock } from '../types/navigation';

const MainDashboard: React.FC = () => {
  const { navigate, currentRoute } = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [sections] = useState(mainDashboardContent.sections);

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
    console.log('Block pressed:', block.id, block.type);
  }, []);

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
              testID={`section-${section.id}`}
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default MainDashboard;