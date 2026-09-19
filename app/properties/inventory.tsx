/**
 * Property Inventory Page
 * Completely different sub-page with 6 scrollable sections
 * Detailed property listings and inventory management
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationItem } from '../../src/components/navigation';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../src/components/content';
import { NavigationItem as NavigationItemType, ContentBlock, ContentSection } from '../../src/types';

/**
 * Property Inventory Content - 6 Unique Scrollable Sections
 */
const inventorySections: ContentSection[] = [
  {
    id: 'inventory-overview',
    title: '📊 Inventory Overview',
    description: 'Current property portfolio statistics',
    blocks: [
      {
        id: 'total-properties',
        type: 'metric',
        title: 'Total Properties',
        description: 'All properties in portfolio',
        value: '156',
        trend: '+12',
        positive: true
      },
      {
        id: 'portfolio-value',
        type: 'metric',
        title: 'Portfolio Value',
        description: 'Total property valuation',
        value: '$24.5M',
        trend: '+$1.2M',
        positive: true
      },
      {
        id: 'avg-occupancy',
        type: 'metric',
        title: 'Average Occupancy',
        description: 'Overall occupancy rate',
        value: '87%',
        trend: '+5%',
        positive: true
      },
      {
        id: 'active-leases',
        type: 'metric',
        title: 'Active Leases',
        description: 'Currently active rental agreements',
        value: '142',
        trend: '+8',
        positive: true
      }
    ]
  },
  {
    id: 'property-listings',
    title: '🏢 Property Listings',
    description: 'Complete inventory of all properties',
    blocks: [
      {
        id: 'all-properties',
        type: 'list',
        title: 'All Properties',
        description: 'Complete property inventory',
        data: [
          { id: 1, title: 'Sunset Apartments', value: '24 units', trend: 'San Francisco' },
          { id: 2, title: 'Riverside Complex', value: '18 units', trend: 'Oakland' },
          { id: 3, title: 'Downtown Lofts', value: '32 units', trend: 'San Jose' },
          { id: 4, title: 'Green Garden Homes', value: '28 units', trend: 'Berkeley' },
          { id: 5, title: 'Metro Heights', value: '20 units', trend: 'Palo Alto' }
        ]
      },
      {
        id: 'property-types',
        type: 'chart',
        title: 'Property Type Distribution',
        description: 'Breakdown by property type',
        data: {
          chartType: 'pie',
          labels: ['Apartments', 'Houses', 'Condos', 'Commercial'],
          values: [65, 25, 12, 8],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'property-details',
    title: '🔍 Property Details',
    description: 'Detailed information for each property',
    blocks: [
      {
        id: 'top-performers',
        type: 'list',
        title: 'Top Performing Properties',
        description: 'Highest ROI and occupancy properties',
        data: [
          { id: 1, title: 'Sunset Apartments', value: '95% occupancy', trend: 'ROI 12%' },
          { id: 2, title: 'Riverside Complex', value: '92% occupancy', trend: 'ROI 11%' },
          { id: 3, title: 'Downtown Lofts', value: '89% occupancy', trend: 'ROI 15%' },
          { id: 4, title: 'Green Garden Homes', value: '88% occupancy', trend: 'ROI 10%' }
        ]
      },
      {
        id: 'needs-attention',
        type: 'list',
        title: 'Properties Needing Attention',
        description: 'Properties requiring immediate focus',
        data: [
          { id: 1, title: 'Metro Heights', value: '72% occupancy', trend: 'Action Needed' },
          { id: 2, title: 'Oakland Villas', value: '68% occupancy', trend: 'Maintenance Required' },
          { id: 3, title: 'Sunset Gardens', value: '75% occupancy', trend: 'Marketing Needed' }
        ]
      }
    ]
  },
  {
    id: 'property-conditions',
    title: '🔧 Property Conditions',
    description: 'Current condition status of properties',
    blocks: [
      {
        id: 'condition-overview',
        type: 'chart',
        title: 'Property Condition Ratings',
        description: 'Distribution of property conditions',
        data: {
          chartType: 'bar',
          labels: ['Excellent', 'Good', 'Fair', 'Needs Repair'],
          values: [45, 68, 32, 11],
          color: '#10B981'
        }
      },
      {
        id: 'maintenance-needs',
        type: 'list',
        title: 'Maintenance Needs by Property',
        description: 'Properties requiring maintenance',
        data: [
          { id: 1, title: 'Metro Heights', value: 'HVAC Service', trend: 'Scheduled' },
          { id: 2, title: 'Oakland Villas', value: 'Roof Repair', trend: 'Pending' },
          { id: 3, title: 'Sunset Gardens', value: 'Plumbing Update', trend: 'In Progress' },
          { id: 4, title: 'Downtown Lofts', value: 'Electrical Check', trend: 'Scheduled' }
        ]
      }
    ]
  },
  {
    id: 'property-financials',
    title: '💰 Property Financials',
    description: 'Financial performance per property',
    blocks: [
      {
        id: 'revenue-per-property',
        type: 'list',
        title: 'Monthly Revenue by Property',
        description: 'Revenue breakdown per property',
        data: [
          { id: 1, title: 'Sunset Apartments', value: '$45,600', trend: '+12%' },
          { id: 2, title: 'Riverside Complex', value: '$38,400', trend: '+8%' },
          { id: 3, title: 'Downtown Lofts', value: '$52,800', trend: '+15%' },
          { id: 4, title: 'Green Garden Homes', value: '$42,000', trend: '+6%' }
        ]
      },
      {
        id: 'expenses-per-property',
        type: 'list',
        title: 'Monthly Expenses by Property',
        description: 'Operating costs per property',
        data: [
          { id: 1, title: 'Sunset Apartments', value: '$12,400', trend: '-3%' },
          { id: 2, title: 'Riverside Complex', value: '$10,800', trend: '-5%' },
          { id: 3, title: 'Downtown Lofts', value: '$14,200', trend: '-2%' },
          { id: 4, title: 'Green Garden Homes', value: '$11,600', trend: '-4%' }
        ]
      }
    ]
  },
  {
    id: 'property-documents',
    title: '📄 Property Documents',
    description: 'Manage property-related documents',
    blocks: [
      {
        id: 'document-categories',
        type: 'list',
        title: 'Document Categories',
        description: 'Types of property documents',
        data: [
          { id: 1, title: 'Lease Agreements', value: '142 documents', trend: 'Up to date' },
          { id: 2, title: 'Insurance Policies', value: '156 documents', trend: 'Valid' },
          { id: 3, title: 'Property Deeds', value: '156 documents', trend: 'Secure' },
          { id: 4, title: 'Maintenance Records', value: '892 documents', trend: 'Organized' }
        ]
      },
      {
        id: 'expiring-documents',
        type: 'list',
        title: 'Documents Expiring Soon',
        description: 'Documents requiring renewal',
        data: [
          { id: 1, title: 'Insurance - Sunset Apartments', value: 'Expires in 30 days', trend: 'Action Required' },
          { id: 2, title: 'Lease - Unit 204', value: 'Expires in 45 days', trend: 'Contact Tenant' },
          { id: 3, title: 'Permit - Downtown Lofts', value: 'Expires in 60 days', trend: 'Renew Needed' }
        ]
      }
    ]
  }
];

/**
 * Property Inventory Page Component
 */
const PropertyInventoryPage: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for inventory
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'property-overview',
      title: 'Property Overview',
      description: 'Complete property dashboard',
      icon: '📊',
      route: '/properties/overview',
    },
    {
      id: 'property-listings',
      title: 'Property Listings',
      description: 'View all properties',
      icon: '🏢',
      route: '/properties/listings',
    },
    {
      id: 'property-analytics',
      title: 'Property Analytics',
      description: 'Property performance metrics',
      icon: '📈',
      route: '/properties/analytics',
    },
    {
      id: 'property-financials',
      title: 'Property Financials',
      description: 'Financial performance',
      icon: '�',
      route: '/properties/financials',
    },
    {
      id: 'property-documents',
      title: 'Property Documents',
      description: 'Manage property documents',
      icon: '�',
      route: '/properties/documents',
    },
    {
      id: 'property-inspections',
      title: 'Property Inspections',
      description: 'Inspection schedules and reports',
      icon: '🔍',
      route: '/properties/inspections',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Property inventory sub-navigation:', item.route);
    navigateToRoute(item.route);
  }, [navigateToRoute]);

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
    console.log('Inventory block pressed:', block.id);
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
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Property Inventory</Text>
          <Text style={styles.headerSubtitle}>Complete property portfolio management</Text>
        </View>

        {/* Sub-navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Inventory Actions</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
            />
          ))}
        </View>

        {/* Inventory Sections */}
        <View style={styles.contentSection}>
          {inventorySections.map((section) => (
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
          <Text style={styles.footerText}>Inventory updated in real-time</Text>
          <Text style={styles.footerSubtext}>156 properties in portfolio</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component without Navigation Provider (already in parent)
 */
const PropertyInventoryIndex: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  return <PropertyInventoryPage navigateToRoute={navigateToRoute} />;
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
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

export default PropertyInventoryIndex;