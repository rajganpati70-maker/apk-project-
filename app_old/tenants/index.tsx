/**
 * Tenants Page
 * Completely different tenants page with 6 scrollable sections
 * Unique content for tenant management and communications
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
 * Tenants Page Content - 6 Unique Scrollable Sections
 */
const tenantsSections: ContentSection[] = [
  {
    id: 'tenants-overview',
    title: '👥 Tenants Overview',
    description: 'Complete tenant portfolio summary',
    blocks: [
      {
        id: 'total-tenants',
        type: 'metric',
        title: 'Total Tenants',
        description: 'Total active tenants across all properties',
        value: '142',
        trend: '+5',
        positive: true
      },
      {
        id: 'occupancy-rate',
        type: 'metric',
        title: 'Overall Occupancy',
        description: 'Total units occupied by tenants',
        value: '94.2%',
        trend: '+2.8%',
        positive: true
      },
      {
        id: 'tenant-satisfaction',
        type: 'metric',
        title: 'Tenant Satisfaction',
        description: 'Average tenant satisfaction score',
        value: '4.2/5.0',
        trend: '+0.3',
        positive: true
      }
    ]
  },
  {
    id: 'tenant-applications',
    title: '📝 Tenant Applications',
    description: 'Rental applications and approval process',
    blocks: [
      {
        id: 'pending-applications',
        type: 'metric',
        title: 'Pending Applications',
        description: 'Applications awaiting review',
        value: '8',
        trend: '+2',
        positive: false
      },
      {
        id: 'approved-applications',
        type: 'metric',
        title: 'This Month Approved',
        description: 'Applications approved this month',
        value: '12',
        trend: '+3',
        positive: true
      },
      {
        id: 'application-timeline',
        type: 'list',
        title: 'Recent Applications',
        description: 'Latest rental applications',
        data: [
          { id: 1, title: 'John Smith - Unit 302', value: 'Pending', trend: '2 days ago' },
          { id: 2, title: 'Sarah Johnson - Unit 108', value: 'Approved', trend: '5 days ago' },
          { id: 3, title: 'Mike Davis - Unit 512', value: 'Review', trend: '1 week ago' }
        ]
      }
    ]
  },
  {
    id: 'tenant-communications',
    title: '💬 Tenant Communications',
    description: 'Messaging and communication tracking',
    blocks: [
      {
        id: 'total-messages',
        type: 'metric',
        title: 'Messages This Month',
        description: 'Total communications with tenants',
        value: '1,245',
        trend: '+125',
        positive: true
      },
      {
        id: 'response-time',
        type: 'metric',
        title: 'Average Response Time',
        description: 'Time to respond to tenant inquiries',
        value: '2.4 hours',
        trend: '-0.5 hours',
        positive: true
      },
      {
        id: 'communication-chart',
        type: 'chart',
        title: 'Communication Volume',
        description: 'Messages over the last 30 days',
        data: {
          chartType: 'line',
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          values: [285, 320, 295, 345],
          color: '#3B82F6'
        }
      }
    ]
  },
  {
    id: 'tenant-directory',
    title: '� Tenant Directory',
    description: 'Complete tenant listing and search',
    blocks: [
      {
        id: 'active-tenants',
        type: 'metric',
        title: 'Active Tenants',
        description: 'Currently leasing tenants',
        value: '142',
        trend: '+5',
        positive: true
      },
      {
        id: 'long-term-tenants',
        type: 'metric',
        title: 'Long-term Tenants',
        description: 'Tenants with 2+ years',
        value: '48',
        trend: '+3',
        positive: true
      },
      {
        id: 'tenant-distribution',
        type: 'chart',
        title: 'Tenant Distribution',
        description: 'Tenants by property type',
        data: {
          chartType: 'pie',
          labels: ['Apartments', 'Houses', 'Condos', 'Commercial'],
          values: [89, 32, 18, 3],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6']
        }
      }
    ]
  },
  {
    id: 'tenant-renewals',
    title: '� Tenant Renewals',
    description: 'Lease renewals and retention management',
    blocks: [
      {
        id: 'upcoming-renewals',
        type: 'metric',
        title: 'Upcoming Renewals',
        description: 'Leases expiring in next 30 days',
        value: '15',
        trend: '+2',
        positive: false
      },
      {
        id: 'renewal-rate',
        type: 'metric',
        title: 'Renewal Rate',
        description: 'Percentage of tenants renewing leases',
        value: '87.3%',
        trend: '+4.1%',
        positive: true
      },
      {
        id: 'renewal-timeline',
        type: 'list',
        title: 'This Month\'s Renewals',
        description: 'Leases ending this month',
        data: [
          { id: 1, title: 'Unit 302 - John Smith', value: 'Oct 15', trend: '12 months' },
          { id: 2, title: 'Unit 108 - Sarah Johnson', value: 'Oct 22', trend: '6 months' },
          { id: 3, title: 'Unit 512 - Mike Davis', value: 'Oct 28', trend: '18 months' }
        ]
      }
    ]
  },
  {
    id: 'tenant-feedback',
    title: '⭐ Tenant Feedback',
    description: 'Reviews, ratings, and satisfaction surveys',
    blocks: [
      {
        id: 'total-reviews',
        type: 'metric',
        title: 'Total Reviews',
        description: 'Tenant reviews collected',
        value: '89',
        trend: '+12',
        positive: true
      },
      {
        id: 'average-rating',
        type: 'metric',
        title: 'Average Rating',
        description: 'Overall tenant satisfaction rating',
        value: '4.2/5.0',
        trend: '+0.2',
        positive: true
      },
      {
        id: 'feedback-distribution',
        type: 'chart',
        title: 'Rating Distribution',
        description: 'Reviews by star rating',
        data: {
          chartType: 'bar',
          labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
          values: [45, 28, 12, 3, 1],
          color: '#F59E0B'
        }
      }
    ]
  }
];

/**
 * Tenants Page Component
 */
const TenantsPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for tenants
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'tenants-overview',
      title: 'Tenants Overview',
      description: 'Complete tenant portfolio',
      icon: '�',
      route: '/tenants/overview',
    },
    {
      id: 'tenant-applications',
      title: 'Tenant Applications',
      description: 'Rental applications',
      icon: '📝',
      route: '/tenants/applications',
      badge: '8',
    },
    {
      id: 'tenant-communications',
      title: 'Tenant Communications',
      description: 'Messaging and support',
      icon: '💬',
      route: '/tenants/communications',
    },
    {
      id: 'tenant-directory',
      title: 'Tenant Directory',
      description: 'Complete tenant listing',
      icon: '📋',
      route: '/tenants/directory',
    },
    {
      id: 'tenant-renewals',
      title: 'Tenant Renewals',
      description: 'Lease renewals',
      icon: '🔄',
      route: '/tenants/renewals',
    },
    {
      id: 'tenant-feedback',
      title: 'Tenant Feedback',
      description: 'Reviews and ratings',
      icon: '⭐',
      route: '/tenants/feedback',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Tenants sub-navigation:', item.route);
    const routeMap: Record<string, string> = {
      '/tenants/overview': 'TenantOverview',
      '/tenants/applications': 'TenantApplications',
      '/tenants/communications': 'TenantCommunications',
      '/tenants/directory': 'TenantDirectory',
      '/tenants/renewals': 'TenantRenewals',
      '/tenants/feedback': 'TenantFeedback',
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
    console.log('Tenants block pressed:', block.id);
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
          <Text style={styles.headerSubtitle}>Manage 142 active tenants</Text>
        </View>

        {/* Sub-navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Tenant Tools</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
            />
          ))}
        </View>

        {/* Tenants Sections */}
        <View style={styles.contentSection}>
          {tenantsSections.map((section) => (
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
          <Text style={styles.footerSubtext}>Last sync: Just now</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const TenantIndex: React.FC<{ navigation: any }> = ({ navigation }) => {
  return <TenantsPage navigation={navigation} />;
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

export default TenantIndex;