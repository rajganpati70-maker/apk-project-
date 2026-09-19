/**
 * New Maintenance Request Page
 * Completely different sub-page with 6 scrollable sections
 * Submit and manage new maintenance requests
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../src/components/content';
import { ContentBlock, ContentSection } from '../../src/types';

/**
 * New Maintenance Request Content - 6 Unique Scrollable Sections
 */
const newRequestSections: ContentSection[] = [
  {
    id: 'request-form',
    title: '📝 Request Form',
    description: 'Fill out maintenance request details',
    blocks: [
      {
        id: 'property-selection',
        type: 'list',
        title: 'Select Property',
        description: 'Choose the property requiring maintenance',
        data: [
          { id: 1, title: 'Sunset Apartments - Unit 204', value: 'Available', trend: 'Select' },
          { id: 2, title: 'Riverside Complex - Unit 312', value: 'Available', trend: 'Select' },
          { id: 3, title: 'Downtown Lofts - Unit 456', value: 'Available', trend: 'Select' },
          { id: 4, title: 'Green Garden Homes - Unit 567', value: 'Available', trend: 'Select' }
        ]
      },
      {
        id: 'request-type',
        type: 'list',
        title: 'Request Type',
        description: 'Category of maintenance needed',
        data: [
          { id: 1, title: 'Plumbing', value: 'Water, drains, fixtures', trend: 'Common' },
          { id: 2, title: 'Electrical', value: 'Power, lighting, outlets', trend: 'Common' },
          { id: 3, title: 'HVAC', value: 'Heating, cooling, ventilation', trend: 'Medium' },
          { id: 4, title: 'Structural', value: 'Walls, floors, ceilings', trend: 'Complex' },
          { id: 5, title: 'Appliances', value: 'Kitchen, laundry appliances', trend: 'Common' }
        ]
      }
    ]
  },
  {
    id: 'priority-selection',
    title: '🚨 Priority Level',
    description: 'Select urgency of maintenance request',
    blocks: [
      {
        id: 'priority-levels',
        type: 'list',
        title: 'Priority Options',
        description: 'Choose appropriate urgency level',
        data: [
          { id: 1, title: 'Emergency', value: 'Immediate attention', trend: 'Critical' },
          { id: 2, title: 'High', value: 'Within 24 hours', trend: 'Urgent' },
          { id: 3, title: 'Medium', value: 'Within 3-5 days', trend: 'Standard' },
          { id: 4, title: 'Low', value: 'Within 1-2 weeks', trend: 'Routine' }
        ]
      },
      {
        id: 'priority-stats',
        type: 'metric',
        title: 'Current Priority Distribution',
        description: 'Active requests by priority',
        value: '23 Total',
        trend: '5 Emergency',
        positive: false
      }
    ]
  },
  {
    id: 'description-upload',
    title: '📷 Description & Upload',
    description: 'Describe the issue and upload photos',
    blocks: [
      {
        id: 'description-templates',
        type: 'list',
        title: 'Quick Description Templates',
        description: 'Common issue descriptions',
        data: [
          { id: 1, title: 'Water Leak', value: 'Kitchen sink dripping', trend: 'Use Template' },
          { id: 2, title: 'AC Not Working', value: 'No cold air coming out', trend: 'Use Template' },
          { id: 3, title: 'Light Broken', value: 'Bathroom light not turning on', trend: 'Use Template' },
          { id: 4, title: 'Door Stuck', value: 'Bedroom door hard to open', trend: 'Use Template' }
        ]
      },
      {
        id: 'upload-options',
        type: 'list',
        title: 'Upload Options',
        description: 'Add photos and documents',
        data: [
          { id: 1, title: 'Take Photo', value: 'Camera access', trend: 'Open Camera' },
          { id: 2, title: 'Upload from Gallery', value: 'Select existing photos', trend: 'Open Gallery' },
          { id: 3, title: 'Voice Note', value: 'Record audio description', trend: 'Record' },
          { id: 4, title: 'Scan Document', value: 'Scan paperwork', trend: 'Scan' }
        ]
      }
    ]
  },
  {
    id: 'availability-scheduling',
    title: '📅 Availability & Scheduling',
    description: 'Set preferred maintenance times',
    blocks: [
      {
        id: 'time-slots',
        type: 'list',
        title: 'Available Time Slots',
        description: 'Choose preferred maintenance time',
        data: [
          { id: 1, title: 'Morning', value: '8:00 AM - 12:00 PM', trend: 'Available' },
          { id: 2, title: 'Afternoon', value: '12:00 PM - 5:00 PM', trend: 'Available' },
          { id: 3, title: 'Evening', value: '5:00 PM - 8:00 PM', trend: 'Limited' },
          { id: 4, title: 'Weekend', value: 'Saturday - Sunday', trend: 'Available' }
        ]
      },
      {
        id: 'specific-date',
        type: 'list',
        title: 'Specific Date Request',
        description: 'Request specific date if needed',
        data: [
          { id: 1, title: 'Today', value: 'Same day service', trend: 'Emergency only' },
          { id: 2, title: 'Tomorrow', value: 'Next day service', trend: 'Available' },
          { id: 3, title: 'This Week', value: 'Within 7 days', trend: 'Available' },
          { id: 4, title: 'Flexible', value: 'Any available time', trend: 'Recommended' }
        ]
      }
    ]
  },
  {
    id: 'vendor-preference',
    title: '👷 Vendor Preference',
    description: 'Choose preferred service provider',
    blocks: [
      {
        id: 'available-vendors',
        type: 'list',
        title: 'Available Vendors',
        description: 'Select preferred maintenance vendor',
        data: [
          { id: 1, title: 'Plumbing Pro Services', value: '⭐ 4.8 rating', trend: '12 active tasks' },
          { id: 2, title: 'Electric Masters', value: '⭐ 4.5 rating', trend: '8 active tasks' },
          { id: 3, title: 'HVAC Specialists Inc', value: '⭐ 4.7 rating', trend: '15 active tasks' },
          { id: 4, title: 'Any Available', value: 'Assign automatically', trend: 'Recommended' }
        ]
      },
      {
        id: 'vendor-performance',
        type: 'chart',
        title: 'Vendor Performance Comparison',
        description: 'Recent performance ratings',
        data: {
          chartType: 'bar',
          labels: ['Plumbing', 'Electrical', 'HVAC', 'General'],
          values: [4.8, 4.5, 4.7, 4.3],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'review-submit',
    title: '✅ Review & Submit',
    description: 'Review request details and submit',
    blocks: [
      {
        id: 'request-summary',
        type: 'list',
        title: 'Request Summary',
        description: 'Review all details before submission',
        data: [
          { id: 1, title: 'Property', value: 'Sunset Apartments - Unit 204', trend: 'Selected' },
          { id: 2, title: 'Type', value: 'Plumbing', trend: 'Selected' },
          { id: 3, title: 'Priority', value: 'High', trend: 'Selected' },
          { id: 4, title: 'Preferred Time', value: 'Tomorrow Morning', trend: 'Selected' }
        ]
      },
      {
        id: 'estimated-cost',
        type: 'metric',
        title: 'Estimated Cost',
        description: 'Approximate cost for this repair',
        value: '$150-300',
        trend: 'Based on similar repairs',
        positive: true
      },
      {
        id: 'estimated-time',
        type: 'metric',
        title: 'Estimated Completion Time',
        description: 'Expected time to complete',
        value: '2-4 hours',
        trend: 'Standard plumbing repair',
        positive: true
      }
    ]
  }
];

/**
 * New Maintenance Request Page Component
 */
const NewMaintenancePage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

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
    console.log('New request block pressed:', block.id);
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
          <Text style={styles.headerTitle}>New Maintenance Request</Text>
          <Text style={styles.headerSubtitle}>Submit a new maintenance ticket</Text>
        </View>

        {/* Request Sections */}
        <View style={styles.contentSection}>
          {newRequestSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Average response time: 4.2 hours</Text>
          <Text style={styles.footerSubtext}>Emergency requests handled immediately</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const NewMaintenanceIndex: React.FC = () => {
  return <NewMaintenancePage />;
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
  contentSection: {
    marginTop: 16,
  },
  submitSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 16,
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

export default NewMaintenanceIndex;