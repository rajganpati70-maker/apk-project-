/**
 * Maintenance Calendar Page
 * Completely different page with 6 scrollable sections
 * Scheduled maintenance tasks
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
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../src/components/content';
import { ContentBlock, ContentSection } from '../../src/types';

const calendarSections: ContentSection[] = [
  {
    id: 'today-schedule',
    title: '📅 Today\'s Schedule',
    description: 'Maintenance tasks for today',
    blocks: [
      {
        id: 'today-list',
        type: 'list',
        title: 'Scheduled Tasks',
        description: 'Today\'s maintenance calendar',
        data: [
          { id: 1, title: 'HVAC Inspection', value: '9:00 AM', trend: 'Scheduled' },
          { id: 2, title: 'Pool Maintenance', value: '11:00 AM', trend: 'In Progress' },
          { id: 3, title: 'Fire Safety Check', value: '2:00 PM', trend: 'Scheduled' },
          { id: 4, title: 'Landscaping Review', value: '4:00 PM', trend: 'Pending' }
        ]
      }
    ]
  },
  {
    id: 'upcoming-week',
    title: '📆 Upcoming Week',
    description: 'This week\'s maintenance plan',
    blocks: [
      {
        id: 'week-chart',
        type: 'chart',
        title: 'Weekly Workload',
        description: 'Tasks distribution by day',
        data: {
          chartType: 'bar',
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [12, 15, 8, 10, 14, 6, 4],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'preventive-maintenance',
    title: '🔧 Preventive Maintenance',
    description: 'Scheduled preventive tasks',
    blocks: [
      {
        id: 'preventive-list',
        type: 'list',
        title: 'Preventive Tasks',
        description: 'Scheduled preventive maintenance',
        data: [
          { id: 1, title: 'HVAC System Check', value: 'Monthly', trend: 'Due: Next week' },
          { id: 2, title: 'Fire System Test', value: 'Quarterly', trend: 'Due: Next month' },
          { id: 3, title: 'Elevator Inspection', value: 'Monthly', trend: 'Due: Friday' }
        ]
      }
    ]
  },
  {
    id: 'seasonal-maintenance',
    title: '🌤️ Seasonal Maintenance',
    description: 'Season-specific tasks',
    blocks: [
      {
        id: 'seasonal-list',
        type: 'list',
        title: 'Winter Preparation',
        description: 'Seasonal maintenance tasks',
        data: [
          { id: 1, title: 'Heating System Check', value: 'Priority: High', trend: 'Scheduled' },
          { id: 2, title: 'Pipe Insulation', value: 'Priority: Medium', trend: 'Pending' },
          { id: 3, title: 'Roof Inspection', value: 'Priority: Medium', trend: 'Scheduled' }
        ]
      }
    ]
  },
  {
    id: 'availability',
    title: '🕐 Availability Slots',
    description: 'Available time slots',
    blocks: [
      {
        id: 'availability-metrics',
        type: 'metric',
        title: 'Available Slots',
        description: 'Open time slots this week',
        value: '8',
        trend: 'Plenty available',
        positive: true
      }
    ]
  },
  {
    id: 'calendar-settings',
    title: '⚙️ Calendar Settings',
    description: 'Calendar configuration',
    blocks: [
      {
        id: 'notification-preferences',
        type: 'list',
        title: 'Notification Settings',
        description: 'Calendar notifications',
        data: [
          { id: 1, title: 'Email Reminders', value: 'Enabled', trend: '24 hours before' },
          { id: 2, title: 'Push Notifications', value: 'Enabled', trend: '1 hour before' },
          { id: 3, title: 'SMS Alerts', value: 'Disabled', trend: 'For urgent only' }
        ]
      }
    ]
  }
];

const MaintenanceCalendarPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Calendar block pressed:', block.id);
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
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Maintenance Calendar</Text>
          <Text style={styles.headerSubtitle}>Scheduled maintenance tasks</Text>
        </View>

        <View style={styles.contentSection}>
          {calendarSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Calendar synced automatically</Text>
          <Text style={styles.footerSubtext}>Upcoming: 15 tasks</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MaintenanceCalendarIndex: React.FC = () => {
  return <MaintenanceCalendarPage />;
};

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

export default MaintenanceCalendarIndex;