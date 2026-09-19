/**
 * Property Documents Page
 * Completely different page with 6 scrollable sections
 * Manage property documents
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

const documentsSections: ContentSection[] = [
  {
    id: 'document-categories',
    title: '📄 Document Categories',
    description: 'Document types',
    blocks: [
      {
        id: 'category-list',
        type: 'list',
        title: 'Document Types',
        description: 'Available document categories',
        data: [
          { id: 1, title: 'Lease Agreements', value: '142 files', trend: 'Active' },
          { id: 2, title: 'Property Titles', value: '156 files', trend: 'Active' },
          { id: 3, title: 'Insurance Policies', value: '28 files', trend: 'Active' }
        ]
      }
    ]
  },
  {
    id: 'recent-documents',
    title: '📋 Recent Documents',
    description: 'Recently uploaded files',
    blocks: [
      {
        id: 'recent-list',
        type: 'list',
        title: 'Latest Uploads',
        description: 'Recently added documents',
        data: [
          { id: 1, title: 'Lease - Unit 204', value: 'PDF', trend: '2 hours ago' },
          { id: 2, title: 'Insurance - Building A', value: 'PDF', trend: '1 day ago' },
          { id: 3, title: 'Title - Riverside', value: 'PDF', trend: '3 days ago' }
        ]
      }
    ]
  },
  {
    id: 'document-storage',
    title: '💾 Storage Usage',
    description: 'Document storage metrics',
    blocks: [
      {
        id: 'storage-metrics',
        type: 'metric',
        title: 'Storage Used',
        description: 'Document storage consumption',
        value: '4.2 GB',
        trend: '42% of limit',
        positive: true
      }
    ]
  },
  {
    id: 'shared-documents',
    title: '🔗 Shared Documents',
    description: 'Documents shared with others',
    blocks: [
      {
        id: 'shared-list',
        type: 'list',
        title: 'Shared Files',
        description: 'Documents with access',
        data: [
          { id: 1, title: 'Master Lease Template', value: 'Team access', trend: 'Shared' },
          { id: 2, title: 'Property Insurance', value: 'Admin access', trend: 'Shared' },
          { id: 3, title: 'Financial Reports', value: 'Manager access', trend: 'Shared' }
        ]
      }
    ]
  },
  {
    id: 'document-search',
    title: '🔍 Document Search',
    description: 'Search and filter',
    blocks: [
      {
        id: 'search-options',
        type: 'list',
        title: 'Search Filters',
        description: 'Available search options',
        data: [
          { id: 1, title: 'By Property', value: 'Filter', trend: 'Select' },
          { id: 2, title: 'By Date', value: 'Filter', trend: 'Select' },
          { id: 3, title: 'By Type', value: 'Filter', trend: 'Select' }
        ]
      }
    ]
  },
  {
    id: 'document-backups',
    title: '☁️ Document Backups',
    description: 'Backup status',
    blocks: [
      {
        id: 'backup-status',
        type: 'metric',
        title: 'Backup Status',
        description: 'Cloud backup status',
        value: 'All synced',
        trend: 'Last backup: 5 min ago',
        positive: true
      }
    ]
  }
];

const PropertyDocumentsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Documents block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Property Documents</Text>
          <Text style={styles.headerSubtitle}>Manage property documents</Text>
        </View>

        <View style={styles.contentSection}>
          {documentsSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>326 documents stored</Text>
          <Text style={styles.footerSubtext}>4.2 GB used</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PropertyDocumentsIndex: React.FC = () => {
  return <PropertyDocumentsPage />;
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

export default PropertyDocumentsIndex;