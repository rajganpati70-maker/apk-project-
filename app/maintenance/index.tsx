/**
 * Maintenance Page
 * Completely different maintenance page with 6 scrollable sections
 * Unique content for maintenance requests, schedules, and vendor management
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
    description: 'Current status and quick stats',
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
        description: 'Requires immediate attention',
        value: '5',
        trend: 'HIGH',
        positive: false
      },
      {
        id: 'completed-today',
        type: 'metric',
        title: 'Completed Today',
        description: 'Maintenance tasks finished today',
        value: '8',
        trend: '+2',
        positive: true
      },
      {
        id: 'pending-approval',
        type: 'metric',
        title: 'Pending Approval',
        description: 'Requests awaiting your approval',
        value: '4',
        trend: 'ACTIONS',
        positive: false
      }
    ]
  },
  {
    id: 'active-requests',
    title: '📋 Active Maintenance Requests',
    description: 'Detailed list of current maintenance tickets',
    blocks: [
      {
        id: 'urgent-priority',
        type: 'list',
        title: 'Urgent Priority Requests',
        description: 'Immediate attention required',
        data: [
          { id: 1, title: 'Water Leak - Unit 204', value: 'Severity: Critical', trend: 'Assigned' },
          { id: 2, title: 'Power Outage - Building B', value: 'Severity: High', trend: 'In Progress' },
          { id: 3, title: 'Heating Failure - Unit 312', value: 'Severity: High', trend: 'Scheduled' },
          { id: 4, title: 'Elevator Malfunction', value: 'Severity: High', trend: 'Vendor Called' },
          { id: 5, title: 'Gas Leak - Unit 445', value: 'Severity: Critical', trend: 'Emergency' }
        ]
      },
      {
        id: 'high-priority',
        type: 'list',
        title: 'High Priority Requests',
        description: 'Attention required within 24 hours',
        data: [
          { id: 1, title: 'AC Not Working - Unit 156', value: 'Severity: Medium', trend: 'Assigned' },
          { id: 2, title: 'Plumbing Issue - Unit 289', value: 'Severity: Medium', trend: 'In Progress' },
          { id: 3, title: 'Window Repair - Unit 301', value: 'Severity: Medium', trend: 'Scheduled' },
          { id: 4, title: 'Door Lock Malfunction', value: 'Severity: Medium', trend: 'Assigned' }
        ]
      }
    ]
  },
  {
    id: 'maintenance-calendar',
    title: '📅 Maintenance Calendar',
    description: 'Scheduled maintenance and recurring tasks',
    blocks: [
      {
        id: 'today-schedule',
        type: 'list',
        title: 'Today\'s Schedule',
        description: 'Maintenance tasks for today',
        data: [
          { id: 1, title: 'HVAC Inspection - Building A', value: '9:00 AM', trend: 'Scheduled' },
          { id: 2, title: 'Pool Maintenance', value: '11:00 AM', trend: 'In Progress' },
          { id: 3, title: 'Fire Safety Check', value: '2:00 PM', trend: 'Scheduled' },
          { id: 4, title: 'Landscaping Review', value: '4:00 PM', trend: 'Pending' }
        ]
      },
      {
        id: 'upcoming-week',
        type: 'chart',
        title: 'Upcoming Week Workload',
        description: 'Maintenance tasks distribution',
        data: {
          chartType: 'bar',
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [12, 15, 8, 10, 14, 6, 4],
          color: '#F59E0B'
        }
      }
    ]
  },
  {
    id: 'vendor-management',
    title: '👷 Vendor Management',
    description: 'Manage maintenance vendors and contractors',
    blocks: [
      {
        id: 'active-vendors',
        type: 'list',
        title: 'Active Vendors',
        description: 'Currently contracted service providers',
        data: [
          { id: 1, title: 'Plumbing Pro Services', value: '12 active tasks', trend: 'Excellent' },
          { id: 2, title: 'Electric Masters', value: '8 active tasks', trend: 'Good' },
          { id: 3, title: 'HVAC Specialists Inc', value: '15 active tasks', trend: 'Excellent' },
          { id: 4, title: 'General Repairs Co', value: '6 active tasks', trend: 'Good' },
          { id: 5, title: 'Landscaping Pros', value: '4 active tasks', trend: 'Excellent' }
        ]
      },
      {
        id: 'vendor-performance',
        type: 'chart',
        title: 'Vendor Performance Ratings',
        description: 'Average performance scores',
        data: {
          chartType: 'bar',
          labels: ['Plumbing', 'Electrical', 'HVAC', 'General', 'Landscaping'],
          values: [4.8, 4.5, 4.7, 4.3, 4.9],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'budget-tracking',
    title: '💰 Maintenance Budget',
    description: 'Track maintenance expenses and budget utilization',
    blocks: [
      {
        id: 'budget-overview',
        type: 'metric',
        title: 'Monthly Budget Used',
        description: 'Budget utilization for current month',
        value: '$12,450',
        trend: '67%',
        positive: true
      },
      {
        id: 'budget-breakdown',
        type: 'chart',
        title: 'Budget Breakdown by Category',
        description: 'Expense distribution',
        data: {
          chartType: 'pie',
          labels: ['Repairs', 'Preventive', 'Emergency', 'Upgrades'],
          values: [45, 25, 20, 10],
          colors: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6']
        }
      },
      {
        id: 'cost-comparison',
        type: 'chart',
        title: 'Monthly Cost Comparison',
        description: 'This month vs last month',
        data: {
          chartType: 'bar',
          labels: ['Last Month', 'This Month'],
          values: [11500, 12450],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'maintenance-history',
    title: '📜 Maintenance History',
    description: 'Completed maintenance records and analytics',
    blocks: [
      {
        id: 'recent-completions',
        type: 'list',
        title: 'Recently Completed',
        description: 'Maintenance tasks finished in last 7 days',
        data: [
          { id: 1, title: 'Kitchen Sink Repair - Unit 102', value: 'Completed yesterday', trend: '✓' },
          { id: 2, title: 'Light Fixture Replacement - Unit 215', value: 'Completed 2 days ago', trend: '✓' },
          { id: 3, title: 'Door Handle Fix - Unit 334', value: 'Completed 3 days ago', trend: '✓' },
          { id: 4, title: 'Thermostat Calibration - Unit 456', value: 'Completed 4 days ago', trend: '✓' },
          { id: 5, title: 'Pipe Leak Repair - Unit 567', value: 'Completed 5 days ago', trend: '✓' }
        ]
      },
      {
        id: 'monthly-trends',
        type: 'chart',
        title: 'Monthly Maintenance Trends',
        description: 'Requests vs completions over 6 months',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [
            { name: 'Requests', data: [45, 52, 48, 61, 67, 72], color: '#EF4444' },
            { name: 'Completed', data: [42, 50, 46, 58, 64, 69], color: '#10B981' }
          ]
        }
      },
      {
        id: 'common-issues',
        type: 'list',
        title: 'Most Common Issues',
        description: 'Frequently reported maintenance problems',
        data: [
          { id: 1, title: 'Plumbing Issues', value: '32% of requests', trend: 'High' },
          { id: 2, title: 'Electrical Problems', value: '24% of requests', trend: 'Medium' },
          { id: 3, title: 'HVAC Malfunctions', value: '18% of requests', trend: 'Medium' },
          { id: 4, title: 'Appliance Failures', value: '14% of requests', trend: 'Low' },
          { id: 5, title: 'Structural Issues', value: '12% of requests', trend: 'Low' }
        ]
      }
    ]
  }
];

/**
 * Maintenance Page Component
 */
const MaintenancePage: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for maintenance
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'maintenance-overview',
      title: 'Maintenance Overview',
      description: 'Complete maintenance dashboard',
      icon: '📊',
      route: '/maintenance/overview',
    },
    {
      id: 'active-requests',
      title: 'Active Requests',
      description: 'Current maintenance tickets',
      icon: '🔧',
      route: '/maintenance/active',
      badge: 23,
    },
    {
      id: 'maintenance-calendar',
      title: 'Maintenance Calendar',
      description: 'Scheduled maintenance tasks',
      icon: '📅',
      route: '/maintenance/calendar',
    },
    {
      id: 'vendor-management',
      title: 'Vendor Management',
      description: 'Manage service providers',
      icon: '👷',
      route: '/maintenance/vendors',
    },
    {
      id: 'budget-tracking',
      title: 'Budget Tracking',
      description: 'Track maintenance expenses',
      icon: '💰',
      route: '/maintenance/budget',
    },
    {
      id: 'maintenance-history',
      title: 'Maintenance History',
      description: 'Completed maintenance records',
      icon: '�',
      route: '/maintenance/history',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Maintenance sub-navigation:', item.route);
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
          <Text style={styles.headerSubtitle}>Manage all maintenance requests and schedules</Text>
        </View>

        {/* Sub-navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Maintenance Actions</Text>
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
          <Text style={styles.footerText}>Maintenance data synced in real-time</Text>
          <Text style={styles.footerSubtext}>Average response time: 4.2 hours</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component without Navigation Provider (already in parent)
 */
const MaintenanceIndex: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  return <MaintenancePage navigateToRoute={navigateToRoute} />;
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3C7',
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

export default MaintenanceIndex;