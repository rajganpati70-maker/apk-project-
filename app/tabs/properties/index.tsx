/**
 * Property Management Index Page
 * Main property management page with scrolling sections and navigation
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
import { NavigationProvider, useNavigation } from '../../src/context/NavigationContext';
import { NavigationItem } from '../../src/components/navigation';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../src/components/content';
import { propertyManagementContent } from '../../src/data/demoContent';
import { NavigationItem as NavigationItemType, ContentBlock } from '../../src/types';
import { saveScrollPosition } from '../../src/utils/scrollStateManager';

/**
 * Property Management Content Component
 */
const PropertyManagementContent: React.FC = () => {
  const { navigate, currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);
  const [sections] = useState(propertyManagementContent.sections);

  /**
   * Sub-navigation items for property management
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'property-analytics',
      title: 'Property Analytics',
      description: 'Detailed analytics and trends',
      icon: '📊',
      route: '/properties/analytics',
      accessibilityLabel: 'Property Analytics',
      accessibilityHint: 'View detailed property analytics',
    },
    {
      id: 'tenant-management',
      title: 'Tenant Management',
      description: 'Manage tenants across properties',
      icon: '👥',
      route: '/properties/tenants',
      badge: 8,
      accessibilityLabel: 'Tenant Management',
      accessibilityHint: 'View and manage tenants',
    },
    {
      id: 'maintenance-requests',
      title: 'Maintenance Requests',
      description: '23 open maintenance requests',
      icon: '🔧',
      route: '/properties/maintenance',
      badge: 23,
      accessibilityLabel: 'Maintenance Requests',
      accessibilityHint: 'View and manage maintenance requests',
    },
    {
      id: 'property-listings',
      title: 'Property Listings',
      description: 'View all 156 properties',
      icon: '🏢',
      route: '/properties/listings',
      accessibilityLabel: 'Property Listings',
      accessibilityHint: 'View all property listings',
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
    console.log('Property block pressed:', block.id, block.type);
    
    switch (block.type) {
      case 'metric':
        Alert.alert('Property Metric', `Viewing details for ${block.title}`);
        break;
      case 'chart':
        Alert.alert('Property Chart', `Viewing detailed chart for ${block.title}`);
        break;
      case 'list':
        Alert.alert('Property List', `Viewing full list for ${block.title}`);
        break;
      default:
        Alert.alert('Property Content', `Viewing ${block.title}`);
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
          <Text style={styles.headerTitle}>Property Management</Text>
          <Text style={styles.headerSubtitle}>Manage your 156 rental properties</Text>
        </View>

        {/* Sub-navigation Items */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Property Actions</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
              testID={`property-nav-${item.id}`}
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
              testID={`property-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Property Management Page with Navigation Provider
 */
const PropertyManagementPage: React.FC = () => {
  return (
    <NavigationProvider>
      <PropertyManagementContent />
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

export default PropertyManagementPage;