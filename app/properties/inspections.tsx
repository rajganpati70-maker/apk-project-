/**
 * Property Inspections Page
 * Completely different page with 6 scrollable sections
 * Inspection schedules and reports
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

const inspectionsSections: ContentSection[] = [
  {
    id: 'upcoming-inspections',
    title: '📅 Upcoming Inspections',
    description: 'Scheduled inspections',
    blocks: [
      {
        id: 'upcoming-list',
        type: 'list',
        title: 'This Week',
        description: 'Scheduled property inspections',
        data: [
          { id: 1, title: 'Building A - Annual', value: 'Tomorrow 9 AM', trend: 'Scheduled' },
          { id: 2, title: 'Riverside - Quarterly', value: 'Wed 2 PM', trend: 'Scheduled' },
          { id: 3, title: 'Garden Townhouses - Move-out', value: 'Fri 10 AM', trend: 'Scheduled' }
        ]
      }
    ]
  },
  {
    id: 'inspection-history',
    title: '📜 Inspection History',
    description: 'Past inspection records',
    blocks: [
      {
        id: 'history-list',
        type: 'list',
        title: 'Recent Inspections',
        description: 'Completed inspections',
        data: [
          { id: 1, title: 'Sunset Apartments', value: 'Passed', trend: 'Last week' },
          { id: 2, title: 'Downtown Lofts', value: 'Passed', trend: '2 weeks ago' },
          { id: 3, title: 'Industrial Park', value: 'Needs attention', trend: '3 weeks ago' }
        ]
      }
    ]
  },
  {
    id: 'inspection-results',
    title: '✅ Inspection Results',
    description: 'Inspection outcomes',
    blocks: [
      {
        id: 'results-chart',
        type: 'chart',
        title: 'Inspection Pass Rate',
        description: 'Pass vs fail statistics',
        data: {
          chartType: 'pie',
          labels: ['Passed', 'Minor Issues', 'Major Issues'],
          values: [75, 20, 5],
          colors: ['#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'inspection-issues',
    title: '⚠️ Outstanding Issues',
    description: 'Issues requiring follow-up',
    blocks: [
      {
        id: 'issues-list',
        type: 'list',
        title: 'Pending Actions',
        description: 'Issues from inspections',
        data: [
          { id: 1, title: 'Smoke Detectors', value: 'Industrial Park', trend: 'Urgent' },
          { id: 2, title: 'Fire Extinguishers', value: 'Building B', trend: 'High' },
          { id: 3, title: 'Emergency Exits', value: 'Downtown', trend: 'Medium' }
        ]
      }
    ]
  },
  {
    id: 'inspection-schedule',
    title: '📆 Inspection Schedule',
    description: 'Calendar view',
    blocks: [
      {
        id: 'schedule-chart',
        type: 'chart',
        title: 'Monthly Inspection Load',
        description: 'Inspections by month',
        data: {
          chartType: 'bar',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [12, 15, 18, 14, 16, 15],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'inspection-compliance',
    title: '📋 Compliance Status',
    description: 'Regulatory compliance',
    blocks: [
      {
        id: 'compliance-metrics',
        type: 'metric',
        title: 'Compliance Rate',
        description: 'Regulatory compliance',
        value: '94%',
        trend: '+2%',
        positive: true
      }
    ]
  }
];

const PropertyInspectionsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Inspections block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Property Inspections</Text>
          <Text style={styles.headerSubtitle}>Inspection schedules and reports</Text>
        </View>

        <View style={styles.contentSection}>
          {inspectionsSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>3 inspections this week</Text>
          <Text style={styles.footerSubtext}>94% compliance rate</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PropertyInspectionsIndex: React.FC = () => {
  return <PropertyInspectionsPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
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

export default PropertyInspectionsIndex;