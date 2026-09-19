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
import AnalyticsIndex from './analytics/index';
import MaintenanceIndex from './maintenance/index';
import SettingsIndex from './settings/index';
import PropertyInventoryIndex from './properties/inventory';
import FinancialIndex from './financial/index';
import TenantIndex from './tenants/index';
// Analytics sub-pages
import AnalyticsOverviewIndex from './analytics/overview';
import AnalyticsRealtimeIndex from './analytics/realtime';
import AnalyticsFinancialIndex from './analytics/financial';
import AnalyticsTenantsIndex from './analytics/tenants';
import AnalyticsMarketIndex from './analytics/market';
import AnalyticsPredictiveIndex from './analytics/predictive';
// Maintenance sub-pages
import MaintenanceOverviewIndex from './maintenance/overview';
import MaintenanceActiveIndex from './maintenance/active';
import MaintenanceCalendarIndex from './maintenance/calendar';
import MaintenanceVendorsIndex from './maintenance/vendors';
import MaintenanceBudgetIndex from './maintenance/budget';
import MaintenanceHistoryIndex from './maintenance/history';
import MaintenanceNewIndex from './maintenance/new';
// Settings sub-pages
import SettingsOverviewIndex from './settings/overview';
import SettingsBillingIndex from './settings/billing';
import SettingsIntegrationsIndex from './settings/integrations';
import SettingsTeamIndex from './settings/team';
import SettingsAdvancedIndex from './settings/advanced';
import SettingsSecurityIndex from './settings/security';
// Properties sub-pages
import PropertyOverviewIndex from './properties/overview';
import PropertyListingsIndex from './properties/listings';
import PropertyAnalyticsIndex from './properties/analytics';
import PropertyFinancialsIndex from './properties/financials';
import PropertyDocumentsIndex from './properties/documents';
import PropertyInspectionsIndex from './properties/inspections';
// Financial sub-pages
import FinancialOverviewIndex from './financial/overview';
import FinancialPaymentsIndex from './financial/payments';
import FinancialExpensesIndex from './financial/expenses';
import FinancialInvoicesIndex from './financial/invoices';
import FinancialBudgetIndex from './financial/budget';
import FinancialTaxesIndex from './financial/taxes';
// Tenants sub-pages
import TenantOverviewIndex from './tenants/overview';
import TenantApplicationsIndex from './tenants/applications';
import TenantCommunicationsIndex from './tenants/communications';
import TenantDirectoryIndex from './tenants/directory';
import TenantRenewalsIndex from './tenants/renewals';
import TenantFeedbackIndex from './tenants/feedback';
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

  // Render different pages based on activePage
  const renderPage = () => {
    // Analytics sub-pages
    if (activePage === 'analytics-sub') {
      return (
        <View style={styles.subPageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back to Analytics</Text>
          </TouchableOpacity>
          {activeSubPage === '/analytics/overview' && <AnalyticsOverviewIndex />}
          {activeSubPage === '/analytics/realtime' && <AnalyticsRealtimeIndex />}
          {activeSubPage === '/analytics/financial' && <AnalyticsFinancialIndex />}
          {activeSubPage === '/analytics/tenants' && <AnalyticsTenantsIndex />}
          {activeSubPage === '/analytics/market' && <AnalyticsMarketIndex />}
          {activeSubPage === '/analytics/predictive' && <AnalyticsPredictiveIndex />}
        </View>
      );
    }
    
    // Maintenance sub-pages
    if (activePage === 'maintenance-sub') {
      return (
        <View style={styles.subPageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back to Maintenance</Text>
          </TouchableOpacity>
          {activeSubPage === '/maintenance/overview' && <MaintenanceOverviewIndex />}
          {activeSubPage === '/maintenance/active' && <MaintenanceActiveIndex />}
          {activeSubPage === '/maintenance/calendar' && <MaintenanceCalendarIndex />}
          {activeSubPage === '/maintenance/vendors' && <MaintenanceVendorsIndex />}
          {activeSubPage === '/maintenance/budget' && <MaintenanceBudgetIndex />}
          {activeSubPage === '/maintenance/history' && <MaintenanceHistoryIndex />}
          {activeSubPage === '/maintenance/new' && <MaintenanceNewIndex />}
        </View>
      );
    }
    
    // Settings sub-pages
    if (activePage === 'settings-sub') {
      return (
        <View style={styles.subPageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back to Settings</Text>
          </TouchableOpacity>
          {activeSubPage === '/settings/overview' && <SettingsOverviewIndex />}
          {activeSubPage === '/settings/billing' && <SettingsBillingIndex />}
          {activeSubPage === '/settings/integrations' && <SettingsIntegrationsIndex />}
          {activeSubPage === '/settings/team' && <SettingsTeamIndex />}
          {activeSubPage === '/settings/advanced' && <SettingsAdvancedIndex />}
          {activeSubPage === '/settings/security' && <SettingsSecurityIndex />}
        </View>
      );
    }
    
    // Properties sub-pages
    if (activePage === 'properties-sub') {
      return (
        <View style={styles.subPageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back to Properties</Text>
          </TouchableOpacity>
          {activeSubPage === '/properties/overview' && <PropertyOverviewIndex />}
          {activeSubPage === '/properties/listings' && <PropertyListingsIndex />}
          {activeSubPage === '/properties/analytics' && <PropertyAnalyticsIndex />}
          {activeSubPage === '/properties/financials' && <PropertyFinancialsIndex />}
          {activeSubPage === '/properties/documents' && <PropertyDocumentsIndex />}
          {activeSubPage === '/properties/inspections' && <PropertyInspectionsIndex />}
          {activeSubPage === '/properties/inventory' && (
            <PropertyInventoryIndex
              navigateToRoute={(route) => {
                setActivePage('properties-sub');
                setActiveSubPage(route);
                navigate(route);
              }}
            />
          )}
        </View>
      );
    }
    
    // Financial sub-pages
    if (activePage === 'financial-sub') {
      return (
        <View style={styles.subPageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back to Financial</Text>
          </TouchableOpacity>
          {activeSubPage === '/financial/overview' && <FinancialOverviewIndex />}
          {activeSubPage === '/financial/payments' && <FinancialPaymentsIndex />}
          {activeSubPage === '/financial/expenses' && <FinancialExpensesIndex />}
          {activeSubPage === '/financial/invoices' && <FinancialInvoicesIndex />}
          {activeSubPage === '/financial/budget' && <FinancialBudgetIndex />}
          {activeSubPage === '/financial/taxes' && <FinancialTaxesIndex />}
        </View>
      );
    }
    
    // Tenants sub-pages
    if (activePage === 'tenants-sub') {
      return (
        <View style={styles.subPageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back to Tenants</Text>
          </TouchableOpacity>
          {activeSubPage === '/tenants/overview' && <TenantOverviewIndex />}
          {activeSubPage === '/tenants/applications' && <TenantApplicationsIndex />}
          {activeSubPage === '/tenants/communications' && <TenantCommunicationsIndex />}
          {activeSubPage === '/tenants/directory' && <TenantDirectoryIndex />}
          {activeSubPage === '/tenants/renewals' && <TenantRenewalsIndex />}
          {activeSubPage === '/tenants/feedback' && <TenantFeedbackIndex />}
        </View>
      );
    }
    
    // Main sub-pages
    if (activePage !== 'main') {
      return (
        <View style={styles.subPageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back to Dashboard</Text>
          </TouchableOpacity>
          {activePage === 'analytics' && <AnalyticsIndex navigateToRoute={(route) => { setActivePage('analytics-sub'); setActiveSubPage(route); }} />}
          {activePage === 'maintenance' && <MaintenanceIndex navigateToRoute={(route) => { setActivePage('maintenance-sub'); setActiveSubPage(route); }} />}
          {activePage === 'settings' && <SettingsIndex navigateToRoute={(route) => { setActivePage('settings-sub'); setActiveSubPage(route); }} />}
          {activePage === 'properties' && <PropertyInventoryIndex navigateToRoute={(route) => { setActivePage('properties-sub'); setActiveSubPage(route); }} />}
          {activePage === 'financial' && <FinancialIndex navigateToRoute={(route) => { setActivePage('financial-sub'); setActiveSubPage(route); }} />}
          {activePage === 'tenants' && <TenantIndex navigateToRoute={(route) => { setActivePage('tenants-sub'); setActiveSubPage(route); }} />}
        </View>
      );
    }
    
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

  return renderPage();
};

/**
 * Main App Component with Navigation Provider
 */
const App: React.FC = () => {
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
    backgroundColor: '#F9FAFB',
  },
  subPageContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  backButton: {
    backgroundColor: '#3B82F6',
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

export default App;