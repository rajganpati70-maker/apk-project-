/**
 * Tenant Directory Page
 * Completely different page with 6 scrollable sections
 * Complete tenant listing
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

const directorySections: ContentSection[] = [
  {
    id: 'all-tenants',
    title: '👥 All Tenants',
    description: 'Complete tenant directory',
    blocks: [
      {
        id: 'tenant-list',
        type: 'list',
        title: 'Tenant Directory',
        description: 'All active tenants',
        data: [
          { id: 1, title: 'John Smith', value: 'Unit 204', trend: 'Active' },
          { id: 2, title: 'Sarah Johnson', value: 'Unit 312', trend: 'Active' },
          { id: 3, title: 'Michael Chen', value: 'Unit 456', trend: 'Active' },
          { id: 4, title: 'Emily Davis', value: 'Unit 567', trend: 'Active' }
        ]
      }
    ]
  },
  {
    id: 'tenant-filters',
    title: '🔍 Tenant Filters',
    description: 'Filter and search options',
    blocks: [
      {
        id: 'filter-list',
        type: 'list',
        title: 'Active Filters',
        description: 'Current search criteria',
        data: [
          { id: 1, title: 'Property Type', value: 'Apartments', trend: 'Applied' },
          { id: 2, title: 'Lease Status', value: 'Active', trend: 'Applied' },
          { id: 3, title: 'Payment Status', value: 'Current', trend: 'Applied' }
        ]
      }
    ]
  },
  {
    id: 'tenant-search',
    title: '🔎 Tenant Search',
    description: 'Search functionality',
    blocks: [
      {
        id: 'search-options',
        type: 'list',
        title: 'Search Options',
        description: 'Available search fields',
        data: [
          { id: 1, title: 'By Name', value: 'First/Last name', trend: 'Search' },
          { id: 2, title: 'By Unit', value: 'Property unit', trend: 'Search' },
          { id: 3, title: 'By Lease', value: 'Lease ID', trend: 'Search' }
        ]
      }
    ]
  },
  {
    id: 'tenant-actions',
    title: '⚡ Quick Actions',
    description: 'Bulk operations',
    blocks: [
      {
        id: 'action-list',
        type: 'list',
        title: 'Available Actions',
        description: 'Tenant operations',
        data: [
          { id: 1, title: 'Send Notification', value: 'Mass message', trend: 'Send' },
          { id: 2, title: 'Export List', value: 'CSV/PDF', trend: 'Export' },
          { id: 3, title: 'Add Tenant', value: 'New tenant', trend: 'Add' }
        ]
      }
    ]
  },
  {
    id: 'tenant-details',
    title: '📋 Tenant Details',
    description: 'Detailed information',
    blocks: [
      {
        id: 'detail-chart',
        type: 'chart',
        title: 'Tenant Distribution',
        description: 'Tenants by property',
        data: {
          chartType: 'bar',
          labels: ['Sunset', 'Riverside', 'Downtown', 'Garden'],
          values: [45, 38, 32, 27],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'tenant-contacts',
    title: '📞 Contact Information',
    description: 'Tenant contact details',
    blocks: [
      {
        id: 'contact-list',
        type: 'list',
        title: 'Quick Contacts',
        description: 'Frequently contacted',
        data: [
          { id: 1, title: 'John Smith', value: '555-0101', trend: 'Call' },
          { id: 2, title: 'Sarah Johnson', value: '555-0102', trend: 'Call' },
          { id: 3, title: 'Michael Chen', value: '555-0103', trend: 'Call' }
        ]
      }
    ]
  }
];

const TenantDirectoryPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Directory block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Tenant Directory</Text>
          <Text style={styles.headerSubtitle}>Complete tenant listing</Text>
        </View>

        <View style={styles.contentSection}>
          {directorySections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>142 tenants listed</Text>
          <Text style={styles.footerSubtext}>3 filters applied</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TenantDirectoryIndex: React.FC = () => {
  return <TenantDirectoryPage />;
};

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

export default TenantDirectoryIndex;