/**
 * Properties Page
 * Completely different properties page with 6 scrollable sections
 * Unique content for property management and inventory
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
 * Properties Page Content - 6 Unique Scrollable Sections
 */
const propertiesSections: ContentSection[] = [
  {
    id: 'properties-overview',
    title: '🏢 Properties Overview',
    description: 'Total property portfolio summary',
    blocks: [
      {
        id: 'total-properties',
        type: 'metric',
        title: 'Total Properties',
        description: 'Total rental properties in portfolio',
        value: '156',
        trend: '+12',
        positive: true
      },
      {
        id: 'total-units',
        type: 'metric',
        title: 'Total Units',
        description: 'Total rental units across all properties',
        value: '1,245',
        trend: '+45',
        positive: true
      },
      {
        id: 'portfolio-value',
        type: 'metric',
        title: 'Portfolio Value',
        description: 'Estimated total property value',
        value: '$28.5M',
        trend: '+$2.1M',
        positive: true
      }
    ]
  },
  {
    id: 'property-listings',
    title: '📋 Property Listings',
    description: 'Current available properties and vacancies',
    blocks: [
      {
        id: 'available-units',
        type: 'metric',
        title: 'Available Units',
        description: 'Currently vacant units',
        value: '23',
        trend: '-5',
        positive: true
      },
      {
        id: 'listing-activity',
        type: 'chart',
        title: 'Listing Activity',
        description: 'Property listing and rental activity',
        data: {
          chartType: 'line',
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [8, 12, 15, 10, 18, 22, 14],
          color: '#3B82F6'
        }
      },
      {
        id: 'top-listings',
        type: 'list',
        title: 'Featured Listings',
        description: 'Most viewed properties this week',
        data: [
          { id: 1, title: 'Sunset Apartments #302', value: '45 views', trend: 'Hot' },
          { id: 2, title: 'Downtown Lofts #108', value: '38 views', trend: 'Popular' },
          { id: 3, title: 'Riverside Complex #512', value: '32 views', trend: 'New' }
        ]
      }
    ]
  },
  {
    id: 'property-analytics',
    title: '📊 Property Analytics',
    description: 'Performance metrics and analytics',
    blocks: [
      {
        id: 'occupancy-by-property',
        type: 'chart',
        title: 'Occupancy by Property Type',
        description: 'Occupancy rates across property categories',
        data: {
          chartType: 'bar',
          labels: ['Apartments', 'Houses', 'Condos', 'Commercial'],
          values: [92, 88, 95, 85],
          color: '#10B981'
        }
      },
      {
        id: 'revenue-per-property',
        type: 'metric',
        title: 'Avg Revenue per Property',
        description: 'Average monthly revenue per property',
        value: '$1,823',
        trend: '+$145',
        positive: true
      },
      {
        id: 'maintenance-costs',
        type: 'metric',
        title: 'Avg Maintenance Cost',
        description: 'Average monthly maintenance per property',
        value: '$127',
        trend: '-$23',
        positive: true
      }
    ]
  },
  {
    id: 'property-financials',
    title: '💰 Property Financials',
    description: 'Financial performance and profitability',
    blocks: [
      {
        id: 'total-revenue',
        type: 'metric',
        title: 'Total Monthly Revenue',
        description: 'Combined revenue from all properties',
        value: '$284,500',
        trend: '+$12,500',
        positive: true
      },
      {
        id: 'net-income',
        type: 'metric',
        title: 'Net Monthly Income',
        description: 'Revenue after expenses',
        value: '$194,300',
        trend: '+$8,200',
        positive: true
      },
      {
        id: 'roi-chart',
        type: 'chart',
        title: 'ROI by Property',
        description: 'Return on investment distribution',
        data: {
          chartType: 'pie',
          labels: ['High ROI', 'Medium ROI', 'Low ROI'],
          values: [45, 78, 33],
          colors: ['#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'property-documents',
    title: '📄 Property Documents',
    description: 'Legal documents and property records',
    blocks: [
      {
        id: 'total-documents',
        type: 'metric',
        title: 'Total Documents',
        description: 'Property-related documents stored',
        value: '1,245',
        trend: '+45',
        positive: true
      },
      {
        id: 'recent-uploads',
        type: 'list',
        title: 'Recent Document Uploads',
        description: 'Latest documents added',
        data: [
          { id: 1, title: 'Lease Agreement #302', value: 'PDF', trend: '2 days ago' },
          { id: 2, title: 'Property Inspection #108', value: 'PDF', trend: '5 days ago' },
          { id: 3, title: 'Insurance Policy All', value: 'PDF', trend: '1 week ago' }
        ]
      },
      {
        id: 'document-categories',
        type: 'chart',
        title: 'Document Categories',
        description: 'Documents by type',
        data: {
          chartType: 'pie',
          labels: ['Leases', 'Inspections', 'Insurance', 'Other'],
          values: [345, 278, 156, 466],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6']
        }
      }
    ]
  },
  {
    id: 'property-inspections',
    title: '🔍 Property Inspections',
    description: 'Inspection schedules and reports',
    blocks: [
      {
        id: 'scheduled-inspections',
        type: 'metric',
        title: 'Scheduled Inspections',
        description: 'Upcoming property inspections',
        value: '18',
        trend: '+3',
        positive: true
      },
      {
        id: 'inspection-score',
        type: 'metric',
        title: 'Average Inspection Score',
        description: 'Overall property condition rating',
        value: '4.5/5.0',
        trend: '+0.2',
        positive: true
      },
      {
        id: 'inspection-timeline',
        type: 'list',
        title: 'This Week\'s Inspections',
        description: 'Scheduled property inspections',
        data: [
          { id: 1, title: 'Unit 302 - Move-out', value: 'Monday', trend: '10:00 AM' },
          { id: 2, title: 'Building C - Annual', value: 'Wednesday', trend: '2:00 PM' },
          { id: 3, title: 'Unit 512 - Routine', value: 'Friday', trend: '11:00 AM' }
        ]
      }
    ]
  }
];

/**
 * Properties Page Component
 */
const PropertiesPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for properties
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'properties-overview',
      title: 'Properties Overview',
      description: 'Complete property portfolio',
      icon: '🏢',
      route: '/properties/overview',
    },
    {
      id: 'property-listings',
      title: 'Property Listings',
      description: 'Available properties and vacancies',
      icon: '📋',
      route: '/properties/listings',
      badge: '23',
    },
    {
      id: 'property-analytics',
      title: 'Property Analytics',
      description: 'Performance metrics',
      icon: '📊',
      route: '/properties/analytics',
    },
    {
      id: 'property-financials',
      title: 'Property Financials',
      description: 'Financial performance',
      icon: '💰',
      route: '/properties/financials',
    },
    {
      id: 'property-documents',
      title: 'Property Documents',
      description: 'Legal documents',
      icon: '📄',
      route: '/properties/documents',
    },
    {
      id: 'property-inspections',
      title: 'Property Inspections',
      description: 'Inspection schedules',
      icon: '🔍',
      route: '/properties/inspections',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Properties sub-navigation:', item.route);
    const routeMap: Record<string, string> = {
      '/properties/overview': 'PropertyOverview',
      '/properties/listings': 'PropertyListings',
      '/properties/analytics': 'PropertyAnalytics',
      '/properties/financials': 'PropertyFinancials',
      '/properties/documents': 'PropertyDocuments',
      '/properties/inspections': 'PropertyInspections',
    };
    
    const screenName = routeMap[item.route];
    if (screenName && navigation) {
      navigation.navigate(screenName);
    }
  }, [navigation]);

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
    console.log('Properties block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Property Management</Text>
          <Text style={styles.headerSubtitle}>Manage your 156 rental properties</Text>
        </View>

        {/* Sub-navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Property Tools</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
            />
          ))}
        </View>

        {/* Properties Sections */}
        <View style={styles.contentSection}>
          {propertiesSections.map((section) => (
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
          <Text style={styles.footerText}>Property data synchronized in real-time</Text>
          <Text style={styles.footerSubtext}>Last sync: Just now</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const PropertyInventoryIndex: React.FC<{ navigation: any }> = ({ navigation }) => {
  return <PropertiesPage navigation={navigation} />;
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

export default PropertyInventoryIndex;