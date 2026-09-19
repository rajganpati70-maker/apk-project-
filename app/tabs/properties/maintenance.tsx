/**
 * Property Maintenance Sub-page
 * Maintenance request handling and tracking
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NavigationProvider, useNavigation } from '../../src/context/NavigationContext';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../src/components/content';
import { ContentSection, ContentBlock, ContentBlockType, ListBlockData, ListItem } from '../../src/types';
import { saveScrollPosition } from '../../src/utils/scrollStateManager';

/**
 * Property Maintenance Content Component
 */
const PropertyMaintenanceContent: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Property maintenance sections
   */
  const [sections] = useState<ContentSection[]>([
    {
      id: 'maintenance-overview',
      title: 'Maintenance Overview',
      blocks: [
        {
          id: 'maintenance-list',
          type: ContentBlockType.LIST,
          title: 'Open Maintenance Requests',
          data: {
            items: [
              {
                id: 'maint-1',
                title: 'HVAC Repair - Unit 12A',
                description: 'Air conditioning not working properly',
                icon: '❄️',
                badge: 'High Priority',
                metadata: { property: 'Riverside Complex', reported: '2 days ago', status: 'In Progress' },
              },
              {
                id: 'maint-2',
                title: 'Plumbing Issue - Unit 4B',
                description: 'Kitchen sink leaking',
                icon: '🚰',
                badge: 'Medium',
                metadata: { property: 'Sunset Apartments', reported: '3 days ago', status: 'Pending' },
              },
              {
                id: 'maint-3',
                title: 'Electrical Problem - Studio 7',
                description: 'Light fixture not working',
                icon: '⚡',
                badge: 'Low',
                metadata: { property: 'Downtown Lofts', reported: '5 days ago', status: 'Pending' },
              },
              {
                id: 'maint-4',
                title: 'Window Replacement - Unit 8C',
                description: 'Broken window pane',
                icon: '🪟',
                badge: 'Medium',
                metadata: { property: 'Garden Townhouses', reported: '1 week ago', status: 'Scheduled' },
              },
              {
                id: 'maint-5',
                title: 'Door Lock Repair - Room 12',
                description: 'Lock mechanism malfunctioning',
                icon: '🔒',
                badge: 'High Priority',
                metadata: { property: 'Student Housing', reported: '3 days ago', status: 'In Progress' },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
            searchable: true,
            sortOptions: [
              { id: 'priority', label: 'Priority', field: 'priority', direction: 'desc' },
              { id: 'date', label: 'Reported Date', field: 'reported', direction: 'desc' },
              { id: 'property', label: 'Property', field: 'property', direction: 'asc' },
            ],
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'maintenance-stats',
      title: 'Maintenance Statistics',
      blocks: [
        {
          id: 'stats-list',
          type: ContentBlockType.LIST,
          title: 'Performance Metrics',
          data: {
            items: [
              {
                id: 'stat-1',
                title: 'Average Resolution Time',
                description: '3.2 days',
                icon: '⏱️',
                metadata: { trend: '-0.5 days from last month' },
              },
              {
                id: 'stat-2',
                title: 'Total Cost This Month',
                description: '$4,250',
                icon: '💰',
                metadata: { trend: '+$320 from last month' },
              },
              {
                id: 'stat-3',
                title: 'Contractor Utilization',
                description: '78%',
                icon: '👷',
                metadata: { trend: '+5% from last month' },
              },
              {
                id: 'stat-4',
                title: 'Satisfaction Rate',
                description: '4.2/5',
                icon: '⭐',
                metadata: { trend: '+0.3 from last month' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
  ]);

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
    console.log('Maintenance block pressed:', block.id, block.type);
    Alert.alert('Maintenance Details', `Viewing details for ${block.title}`);
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
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          saveScrollPosition(currentRoute, offsetY);
        }}
        scrollEventThrottle={100}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Maintenance Requests</Text>
          <Text style={styles.headerSubtitle}>23 open maintenance requests</Text>
        </View>

        {/* Maintenance Sections */}
        <View style={styles.contentSection}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`maintenance-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Property Maintenance Page with Navigation Provider
 */
const PropertyMaintenancePage: React.FC = () => {
  return (
    <NavigationProvider>
      <PropertyMaintenanceContent />
    </NavigationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
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
});

export default PropertyMaintenancePage;