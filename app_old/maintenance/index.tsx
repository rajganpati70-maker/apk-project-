/**
 * Maintenance Page
 * Completely different maintenance page with 6 scrollable sections
 * Unique content for maintenance requests, scheduling, and tracking
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
 * Maintenance Page Content - 6 Unique Scrollable Sections
 */
const maintenanceSections: ContentSection[] = [
  {
    id: 'maintenance-overview',
    title: '🔧 Maintenance Overview',
    description: 'Current maintenance status and quick actions',
    blocks: [
      {
        id: 'open-requests',
        type: 'metric',
        title: 'Open Maintenance Requests',
        description: 'Currently active maintenance tickets',
        value: '23',
        trend: '+3',
        positive: false
      },
      {
        id: 'urgent-requests',
        type: 'metric',
        title: 'Urgent Requests',
        description: 'High-priority maintenance needed',
        value: '5',
        trend: '-2',
        positive: true
      },
      {
        id: 'average-response',
        type: 'metric',
        title: 'Average Response Time',
        description: 'Time to address maintenance requests',
        value: '4.2 hours',
        trend: '-0.5 hours',
        positive: true
      }
    ]
  },
  {
    id: 'active-maintenance',
    title: '⚡ Active Maintenance',
    description: 'Currently in-progress maintenance tasks',
    blocks: [
      {
        id: 'active-tasks',
        type: 'list',
        title: 'In-Progress Tasks',
        description: 'Maintenance currently being worked on',
        data: [
          { id: 1, title: 'Unit 204 - HVAC Repair', value: 'In Progress', trend: '2 days' },
          { id: 2, title: 'Building A - Plumbing', value: 'In Progress', trend: '1 day' },
          { id: 3, title: 'Parking Lot - Lighting', value: 'In Progress', trend: '3 hours' },
          { id: 4, title: 'Unit 112 - Electrical', value: 'In Progress', trend: '5 hours' }
        ]
      },
      {
        id: 'completion-chart',
        type: 'chart',
        title: 'Task Completion Rate',
        description: 'Maintenance task completion over time',
        data: {
          chartType: 'line',
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          values: [85, 92, 78, 95, 88, 90],
          color: '#F59E0B'
        }
      }
    ]
  },
  {
    id: 'maintenance-calendar',
    title: '📅 Maintenance Calendar',
    description: 'Scheduled maintenance and upcoming tasks',
    blocks: [
      {
        id: 'scheduled-tasks',
        type: 'list',
        title: 'This Week\'s Schedule',
        description: 'Planned maintenance activities',
        data: [
          { id: 1, title: 'Building B - Fire Safety Inspection', value: 'Monday', trend: '9:00 AM' },
          { id: 2, title: 'Unit 305 - AC Maintenance', value: 'Tuesday', trend: '2:00 PM' },
          { id: 3, title: 'Common Areas - Deep Cleaning', value: 'Wednesday', trend: '10:00 AM' },
          { id: 4, title: 'Elevator Inspection', value: 'Thursday', trend: '11:00 AM' }
        ]
      },
      {
        id: 'availability-chart',
        type: 'chart',
        title: 'Maintenance Availability',
        description: 'Staff availability for maintenance',
        data: {
          chartType: 'bar',
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [8, 7, 6, 8, 7, 4, 2],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'vendor-management',
    title: '👷 Vendor Management',
    description: 'External contractors and service providers',
    blocks: [
      {
        id: 'active-vendors',
        type: 'list',
        title: 'Active Vendors',
        description: 'Currently contracted service providers',
        data: [
          { id: 1, title: 'ABC Plumbing Services', value: '12 tasks completed', trend: '4.8/5.0' },
          { id: 2, title: 'XYZ Electrical Co', value: '8 tasks completed', trend: '4.5/5.0' },
          { id: 3, title: 'Metro HVAC Specialists', value: '15 tasks completed', trend: '4.9/5.0' },
          { id: 4, title: 'City Clean Services', value: '20 tasks completed', trend: '4.7/5.0' }
        ]
      },
      {
        id: 'vendor-rating',
        type: 'metric',
        title: 'Average Vendor Rating',
        description: 'Overall satisfaction with external vendors',
        value: '4.7/5.0',
        trend: '+0.2',
        positive: true
      }
    ]
  },
  {
    id: 'maintenance-budget',
    title: '💰 Maintenance Budget',
    description: 'Budget tracking and cost analysis',
    blocks: [
      {
        id: 'budget-spent',
        type: 'metric',
        title: 'Monthly Budget Spent',
        description: 'Amount used from maintenance budget',
        value: '$8,450',
        trend: '+$1,200',
        positive: false
      },
      {
        id: 'budget-remaining',
        type: 'metric',
        title: 'Budget Remaining',
        description: 'Available maintenance budget',
        value: '$11,550',
        trend: '-$1,200',
        positive: true
      },
      {
        id: 'cost-chart',
        type: 'chart',
        title: 'Maintenance Cost Breakdown',
        description: 'Spending by maintenance category',
        data: {
          chartType: 'pie',
          labels: ['Repairs', 'Preventive', 'Emergency', 'Supplies'],
          values: [4500, 2800, 1150, 2000],
          colors: ['#EF4444', '#10B981', '#F59E0B', '#3B82F6']
        }
      }
    ]
  },
  {
    id: 'maintenance-history',
    title: '� Maintenance History',
    description: 'Past maintenance records and analytics',
    blocks: [
      {
        id: 'completed-tasks',
        type: 'list',
        title: 'Recently Completed',
        description: 'Maintenance finished in the last 30 days',
        data: [
          { id: 1, title: 'Unit 108 - Window Repair', value: 'Completed', trend: '2 days ago' },
          { id: 2, title: 'Building C - Roof Patch', value: 'Completed', trend: '5 days ago' },
          { id: 3, title: 'Unit 210 - Lock Replacement', value: 'Completed', trend: '1 week ago' },
          { id: 4, title: 'Common Area - Carpet Cleaning', value: 'Completed', trend: '2 weeks ago' }
        ]
      },
      {
        id: 'trend-chart',
        type: 'chart',
        title: 'Maintenance Trends',
        description: '6-month maintenance activity',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [45, 52, 38, 61, 55, 49],
          color: '#8B5CF6'
        }
      }
    ]
  }
];

/**
 * Maintenance Page Component
 */
const MaintenancePage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for maintenance
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'maintenance-overview',
      title: 'Maintenance Overview',
      description: 'Complete maintenance dashboard',
      icon: '�',
      route: '/maintenance/overview',
    },
    {
      id: 'active-maintenance',
      title: 'Active Maintenance',
      description: 'Currently in-progress tasks',
      icon: '⚡',
      route: '/maintenance/active',
      badge: '23',
    },
    {
      id: 'maintenance-calendar',
      title: 'Maintenance Calendar',
      description: 'Scheduled maintenance activities',
      icon: '📅',
      route: '/maintenance/calendar',
    },
    {
      id: 'vendor-management',
      title: 'Vendor Management',
      description: 'External service providers',
      icon: '👷',
      route: '/maintenance/vendors',
    },
    {
      id: 'maintenance-budget',
      title: 'Maintenance Budget',
      description: 'Budget tracking and costs',
      icon: '💰',
      route: '/maintenance/budget',
    },
    {
      id: 'maintenance-history',
      title: 'Maintenance History',
      description: 'Past maintenance records',
      icon: '📋',
      route: '/maintenance/history',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Maintenance sub-navigation:', item.route);
    const routeMap: Record<string, string> = {
      '/maintenance/overview': 'MaintenanceOverview',
      '/maintenance/active': 'MaintenanceActive',
      '/maintenance/calendar': 'MaintenanceCalendar',
      '/maintenance/vendors': 'MaintenanceVendors',
      '/maintenance/budget': 'MaintenanceBudget',
      '/maintenance/history': 'MaintenanceHistory',
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
    console.log('Maintenance block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Maintenance</Text>
          <Text style={styles.headerSubtitle}>23 open maintenance requests</Text>
        </View>

        {/* Sub-navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Maintenance Tools</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
            />
          ))}
        </View>

        {/* Maintenance Sections */}
        <View style={styles.contentSection}>
          {maintenanceSections.map((section) => (
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
          <Text style={styles.footerText}>Maintenance data updated in real-time</Text>
          <Text style={styles.footerSubtext}>Last sync: Just now</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const MaintenanceIndex: React.FC<{ navigation: any }> = ({ navigation }) => {
  return <MaintenancePage navigation={navigation} />;
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

export default MaintenanceIndex;