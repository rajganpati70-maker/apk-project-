/**
 * Active Requests Page
 * Completely different page with 6 scrollable sections
 * Current maintenance tickets
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

const activeSections: ContentSection[] = [
  {
    id: 'urgent-requests',
    title: '🚨 Urgent Requests',
    description: 'Immediate attention required',
    blocks: [
      {
        id: 'urgent-list',
        type: 'list',
        title: 'Critical Priority',
        description: 'Emergency maintenance',
        data: [
          { id: 1, title: 'Water Leak - Unit 204', value: 'Severity: Critical', trend: 'Assigned' },
          { id: 2, title: 'Power Outage - Building B', value: 'Severity: High', trend: 'In Progress' },
          { id: 3, title: 'Heating Failure - Unit 312', value: 'Severity: High', trend: 'Scheduled' }
        ]
      }
    ]
  },
  {
    id: 'high-priority',
    title: '⚠️ High Priority',
    description: 'Attention within 24 hours',
    blocks: [
      {
        id: 'high-list',
        type: 'list',
        title: 'High Priority Requests',
        description: 'Important but not critical',
        data: [
          { id: 1, title: 'AC Not Working - Unit 156', value: 'Severity: Medium', trend: 'Assigned' },
          { id: 2, title: 'Plumbing Issue - Unit 289', value: 'Severity: Medium', trend: 'In Progress' },
          { id: 3, title: 'Window Repair - Unit 301', value: 'Severity: Medium', trend: 'Scheduled' }
        ]
      }
    ]
  },
  {
    id: 'in-progress',
    title: '🔧 In Progress',
    description: 'Currently being worked on',
    blocks: [
      {
        id: 'progress-list',
        type: 'list',
        title: 'Active Work',
        description: 'Tasks in progress',
        data: [
          { id: 1, title: 'HVAC Service - Building A', value: 'Technician on site', trend: '75% complete' },
          { id: 2, title: 'Pool Maintenance', value: 'Vendor working', trend: '60% complete' },
          { id: 3, title: 'Fire Safety Check', value: 'Inspector scheduled', trend: 'Pending' }
        ]
      }
    ]
  },
  {
    id: 'scheduled',
    title: '📅 Scheduled',
    description: 'Upcoming maintenance',
    blocks: [
      {
        id: 'scheduled-list',
        type: 'list',
        title: 'Upcoming Tasks',
        description: 'Future maintenance schedule',
        data: [
          { id: 1, title: 'Annual Inspection', value: 'Tomorrow 9:00 AM', trend: 'Confirmed' },
          { id: 2, title: 'Landscaping Review', value: 'This Friday 4:00 PM', trend: 'Pending' },
          { id: 3, title: 'Elevator Service', value: 'Next Tuesday', trend: 'Scheduled' }
        ]
      }
    ]
  },
  {
    id: 'pending-approval',
    title: '✅ Pending Approval',
    description: 'Requests awaiting your approval',
    blocks: [
      {
        id: 'approval-list',
        type: 'list',
        title: 'Awaiting Action',
        description: 'Requests needing approval',
        data: [
          { id: 1, title: 'Emergency Repair', value: '$2,500 estimate', trend: 'Review needed' },
          { id: 2, title: 'Vendor Change', value: 'New vendor proposed', trend: 'Approve' },
          { id: 3, title: 'Budget Increase', value: '+$500 over budget', trend: 'Review' }
        ]
      }
    ]
  },
  {
    id: 'request-metrics',
    title: '📊 Request Metrics',
    description: 'Performance metrics',
    blocks: [
      {
        id: 'response-time',
        type: 'metric',
        title: 'Avg Response Time',
        description: 'Time to first response',
        value: '2.4 hrs',
        trend: '-0.8 hr',
        positive: true
      },
      {
        id: 'completion-rate',
        type: 'metric',
        title: 'Completion Rate',
        description: 'Tasks completed on time',
        value: '92%',
        trend: '+5%',
        positive: true
      }
    ]
  }
];

const ActiveRequestsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Active block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Active Requests</Text>
          <Text style={styles.headerSubtitle}>Current maintenance tickets</Text>
        </View>

        <View style={styles.contentSection}>
          {activeSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>23 open requests</Text>
          <Text style={styles.footerSubtext}>5 urgent - need attention</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ActiveRequestsIndex: React.FC = () => {
  return <ActiveRequestsPage />;
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

export default ActiveRequestsIndex;