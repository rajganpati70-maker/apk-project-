/**
 * Financial Management Index Page
 * Main financial management page with scrolling sections and navigation
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
import { financialManagementContent } from '../../../src/data/demoContent';
import { NavigationItem as NavigationItemType, ContentBlock } from '../../../src/types';
import { saveScrollPosition } from '../../../src/utils/scrollStateManager';

/**
 * Financial Management Content Component
 */
const FinancialManagementContent: React.FC = () => {
  const { navigate, currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);
  const [sections] = useState(financialManagementContent.sections);

  /**
   * Sub-navigation items for financial management
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'payments',
      title: 'Payments',
      description: 'Track all rent payments and transactions',
      icon: '💳',
      route: '/financial/payments',
      badge: 12,
      accessibilityLabel: 'Payments',
      accessibilityHint: 'View payment history and tracking',
    },
    {
      id: 'expenses',
      title: 'Expenses',
      description: 'Monitor and categorize expenses',
      icon: '📉',
      route: '/financial/expenses',
      accessibilityLabel: 'Expenses',
      accessibilityHint: 'View expense breakdown and analytics',
    },
    {
      id: 'financial-analytics',
      title: 'Financial Analytics',
      description: 'Deep financial insights and reports',
      icon: '📊',
      route: '/financial/analytics',
      accessibilityLabel: 'Financial Analytics',
      accessibilityHint: 'View detailed financial analytics',
    },
    {
      id: 'invoices',
      title: 'Invoices',
      description: 'Manage invoices and billing',
      icon: '📄',
      route: '/financial/invoices',
      badge: 3,
      accessibilityLabel: 'Invoices',
      accessibilityHint: 'View and manage invoices',
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
    console.log('Financial block pressed:', block.id, block.type);
    
    switch (block.type) {
      case 'metric':
        Alert.alert('Financial Metric', `Viewing details for ${block.title}`);
        break;
      case 'chart':
        Alert.alert('Financial Chart', `Viewing detailed chart for ${block.title}`);
        break;
      case 'list':
        Alert.alert('Financial List', `Viewing full list for ${block.title}`);
        break;
      default:
        Alert.alert('Financial Content', `Viewing ${block.title}`);
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
          <Text style={styles.headerTitle}>Financial Management</Text>
          <Text style={styles.headerSubtitle}>Track revenue, expenses, and profits</Text>
        </View>

        {/* Sub-navigation Items */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Financial Actions</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
              testID={`financial-nav-${item.id}`}
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
              testID={`financial-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Financial Management Page with Navigation Provider
 */
const FinancialManagementPage: React.FC = () => {
  return (
    <NavigationProvider>
      <FinancialManagementContent />
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

export default FinancialManagementPage;