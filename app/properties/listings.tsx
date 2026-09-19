/**
 * Property Listings Page
 * Completely different page with 6 scrollable sections
 * View all properties
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

const listingsSections: ContentSection[] = [
  {
    id: 'all-properties',
    title: '🏢 All Properties',
    description: 'Complete property directory',
    blocks: [
      {
        id: 'property-list',
        type: 'list',
        title: 'Property Directory',
        description: 'All properties in portfolio',
        data: [
          { id: 1, title: 'Sunset Apartments', value: '24 units', trend: 'Active' },
          { id: 2, title: 'Riverside Complex', value: '36 units', trend: 'Active' },
          { id: 3, title: 'Downtown Lofts', value: '18 units', trend: 'Active' },
          { id: 4, title: 'Garden Townhouses', value: '12 units', trend: 'Active' }
        ]
      }
    ]
  },
  {
    id: 'property-filters',
    title: '🔍 Property Filters',
    description: 'Filter and search options',
    blocks: [
      {
        id: 'filter-list',
        type: 'list',
        title: 'Active Filters',
        description: 'Current search criteria',
        data: [
          { id: 1, title: 'Property Type', value: 'Apartments', trend: 'Applied' },
          { id: 2, title: 'Occupancy', value: 'Above 80%', trend: 'Applied' },
          { id: 3, title: 'Location', value: 'Downtown', trend: 'Applied' }
        ]
      }
    ]
  },
  {
    id: 'property-sorting',
    title: '📊 Property Sorting',
    description: 'Sort options',
    blocks: [
      {
        id: 'sort-list',
        type: 'list',
        title: 'Sort By',
        description: 'Available sorting options',
        data: [
          { id: 1, title: 'Name', value: 'Alphabetical', trend: 'A-Z' },
          { id: 2, title: 'Occupancy', value: 'Percentage', trend: 'High to Low' },
          { id: 3, title: 'Revenue', value: 'Monthly', trend: 'High to Low' }
        ]
      }
    ]
  },
  {
    id: 'quick-actions',
    title: '⚡ Quick Actions',
    description: 'Bulk operations',
    blocks: [
      {
        id: 'action-list',
        type: 'list',
        title: 'Available Actions',
        description: 'Bulk property operations',
        data: [
          { id: 1, title: 'Export List', value: 'CSV/PDF', trend: 'Export' },
          { id: 2, title: 'Bulk Update', value: 'Multiple properties', trend: 'Update' },
          { id: 3, title: 'Add Property', value: 'New listing', trend: 'Add' }
        ]
      }
    ]
  },
  {
    id: 'property-stats',
    title: '📈 Listing Statistics',
    description: 'Directory metrics',
    blocks: [
      {
        id: 'stats-metrics',
        type: 'metric',
        title: 'Total Listed',
        description: 'Properties in directory',
        value: '156',
        trend: 'All visible',
        positive: true
      }
    ]
  },
  {
    id: 'saved-searches',
    title: '💾 Saved Searches',
    description: 'Your saved filters',
    blocks: [
      {
        id: 'saved-list',
        type: 'list',
        title: 'Saved Filters',
        description: 'Your custom searches',
        data: [
          { id: 1, title: 'High Occupancy', value: '90%+', trend: 'Save' },
          { id: 2, title: 'Downtown Properties', value: 'Location based', trend: 'Save' },
          { id: 3, title: 'High Revenue', value: '$10K+/month', trend: 'Save' }
        ]
      }
    ]
  }
];

const PropertyListingsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Listings block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Property Listings</Text>
          <Text style={styles.headerSubtitle}>View all properties</Text>
        </View>

        <View style={styles.contentSection}>
          {listingsSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>156 properties listed</Text>
          <Text style={styles.footerSubtext}>3 filters applied</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PropertyListingsIndex: React.FC = () => {
  return <PropertyListingsPage />;
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

export default PropertyListingsIndex;