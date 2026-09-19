/**
 * Tenant Management Page
 * Completely different tenant page with 6 scrollable sections
 * Unique content for tenant directory, communications, and applications
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
 * Tenant Page Content - 6 Unique Scrollable Sections
 */
const tenantSections: ContentSection[] = [
  {
    id: 'tenant-overview',
    title: '👥 Tenant Overview',
    description: 'Complete tenant portfolio statistics',
    blocks: [
      {
        id: 'total-tenants',
        type: 'metric',
        title: 'Total Active Tenants',
        description: 'Currently active rental agreements',
        value: '142',
        trend: '+8',
        positive: true
      },
      {
        id: 'occupancy-rate',
        type: 'metric',
        title: 'Occupancy Rate',
        description: 'Percentage of occupied units',
        value: '87%',
        trend: '+5%',
        positive: true
      },
      {
        id: 'new-tenants',
        type: 'metric',
        title: 'New Tenants This Month',
        description: 'Recently signed leases',
        value: '12',
        trend: '+3',
        positive: true
      },
      {
        id: 'retention-rate',
        type: 'metric',
        title: 'Tenant Retention Rate',
        description: 'Percentage of tenants renewing leases',
        value: '78%',
        trend: '+6%',
        positive: true
      }
    ]
  },
  {
    id: 'tenant-directory',
    title: '📋 Tenant Directory',
    description: 'Complete listing of all tenants',
    blocks: [
      {
        id: 'all-tenants',
        type: 'list',
        title: 'All Tenants',
        description: 'Complete tenant roster',
        data: [
          { id: 1, title: 'John Smith', value: 'Unit 204', trend: 'Active' },
          { id: 2, title: 'Sarah Johnson', value: 'Unit 312', trend: 'Active' },
          { id: 3, title: 'Michael Chen', value: 'Unit 456', trend: 'Active' },
          { id: 4, title: 'Emily Davis', value: 'Unit 567', trend: 'Active' },
          { id: 5, title: 'Robert Wilson', value: 'Unit 689', trend: 'Active' }
        ]
      },
      {
        id: 'tenant-types',
        type: 'chart',
        title: 'Tenant Type Distribution',
        description: 'Breakdown by tenant category',
        data: {
          chartType: 'pie',
          labels: ['Individual', 'Family', 'Corporate', 'Student'],
          values: [65, 25, 8, 2],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'lease-management',
    title: '📄 Lease Management',
    description: 'Track and manage all lease agreements',
    blocks: [
      {
        id: 'lease-status',
        type: 'list',
        title: 'Lease Status Overview',
        description: 'Current lease distribution',
        data: [
          { id: 1, title: 'Active Leases', value: '142 agreements', trend: '87% occupancy' },
          { id: 2, title: 'Expiring Soon', value: '8 leases', trend: 'Next 30 days' },
          { id: 3, title: 'Pending Renewals', value: '15 leases', trend: 'Action needed' },
          { id: 4, title: 'New Applications', value: '12 pending', trend: 'Review required' }
        ]
      },
      {
        id: 'lease-timeline',
        type: 'chart',
        title: 'Lease Expiration Timeline',
        description: 'Leases expiring by month',
        data: {
          chartType: 'bar',
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          values: [8, 12, 15, 10, 8, 7],
          color: '#F59E0B'
        }
      }
    ]
  },
  {
    id: 'communications',
    title: '💬 Communications',
    description: 'Manage tenant communications and messages',
    blocks: [
      {
        id: 'message-inbox',
        type: 'metric',
        title: 'Unread Messages',
        description: 'Messages requiring your attention',
        value: '23',
        trend: '+5',
        positive: false
      },
      {
        id: 'communication-types',
        type: 'list',
        title: 'Recent Communications',
        description: 'Latest tenant interactions',
        data: [
          { id: 1, title: 'Maintenance Request', value: 'Unit 204', trend: '2 hours ago' },
          { id: 2, title: 'Payment Inquiry', value: 'Unit 312', trend: '5 hours ago' },
          { id: 3, title: 'Lease Question', value: 'Unit 456', trend: '1 day ago' },
          { id: 4, title: 'Noise Complaint', value: 'Unit 567', trend: '2 days ago' }
        ]
      }
    ]
  },
  {
    id: 'tenant-analytics',
    title: '📊 Tenant Analytics',
    description: 'Analyze tenant behavior and satisfaction',
    blocks: [
      {
        id: 'satisfaction-score',
        type: 'metric',
        title: 'Average Satisfaction Score',
        description: 'Based on tenant feedback',
        value: '4.2/5.0',
        trend: '+0.3',
        positive: true
      },
      {
        id: 'payment-timeliness',
        type: 'metric',
        title: 'On-Time Payment Rate',
        description: 'Percentage of timely rent payments',
        value: '94%',
        trend: '+2%',
        positive: true
      },
      {
        id: 'tenant-ltv',
        type: 'metric',
        title: 'Average Tenant LTV',
        description: 'Lifetime value per tenant',
        value: '$24,500',
        trend: '+$1,200',
        positive: true
      }
    ]
  },
  {
    id: 'tenant-services',
    title: '🛠️ Tenant Services',
    description: 'Manage tenant requests and services',
    blocks: [
      {
        id: 'service-requests',
        type: 'list',
        title: 'Active Service Requests',
        description: 'Tenant requests in progress',
        data: [
          { id: 1, title: 'Plumbing Repair', value: 'Unit 204', trend: 'In Progress' },
          { id: 2, title: 'HVAC Service', value: 'Unit 312', trend: 'Scheduled' },
          { id: 3, title: 'Key Replacement', value: 'Unit 456', trend: 'Pending' },
          { id: 4, title: 'Package Delivery', value: 'Unit 567', trend: 'Completed' }
        ]
      },
      {
        id: 'amenity-usage',
        type: 'chart',
        title: 'Amenity Usage Statistics',
        description: 'Most used property amenities',
        data: {
          chartType: 'bar',
          labels: ['Gym', 'Pool', 'Parking', 'Laundry', 'Common Area'],
          values: [45, 38, 67, 52, 34],
          color: '#8B5CF6'
        }
      }
    ]
  }
];

/**
 * Tenant Page Component
 */
const TenantPage: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for tenants
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'tenant-overview',
      title: 'Tenant Overview',
      description: 'Complete tenant dashboard',
      icon: '📊',
      route: '/tenants/overview',
    },
    {
      id: 'applications',
      title: 'Rental Applications',
      description: 'Review and process applications',
      icon: '📝',
      route: '/tenants/applications',
    },
    {
      id: 'communications',
      title: 'Tenant Communications',
      description: 'Messages and notifications',
      icon: '💬',
      route: '/tenants/communications',
    },
    {
      id: 'directory',
      title: 'Tenant Directory',
      description: 'Complete tenant listing',
      icon: '📋',
      route: '/tenants/directory',
    },
    {
      id: 'lease-renewals',
      title: 'Lease Renewals',
      description: 'Manage lease expirations',
      icon: '🔄',
      route: '/tenants/renewals',
    },
    {
      id: 'tenant-feedback',
      title: 'Tenant Feedback',
      description: 'Collect and review feedback',
      icon: '⭐',
      route: '/tenants/feedback',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Tenant sub-navigation:', item.route);
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
    console.log('Tenant block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Tenant Management</Text>
          <Text style={styles.headerSubtitle}>Manage tenants and lease agreements</Text>
        </View>

        {/* Sub-navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Tenant Actions</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
            />
          ))}
        </View>

        {/* Tenant Sections */}
        <View style={styles.contentSection}>
          {tenantSections.map((section) => (
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
          <Text style={styles.footerText}>Tenant data updated in real-time</Text>
          <Text style={styles.footerSubtext}>Average response time: 2.4 hours</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const TenantIndex: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  return <TenantPage navigateToRoute={navigateToRoute} />;
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
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

export default TenantIndex;