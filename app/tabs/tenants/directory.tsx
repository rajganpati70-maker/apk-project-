/**
 * Tenant Directory Sub-page
 * Advanced search and filtering for tenant directory
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
  TextInput,
} from 'react-native';
import { NavigationProvider, useNavigation } from '../../../src/context/NavigationContext';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../../src/components/content';
import { ContentSection, ContentBlock, ContentBlockType, ListBlockData, ListItem } from '../../../src/types';
import { saveScrollPosition } from '../../../src/utils/scrollStateManager';

/**
 * Tenant Directory Content Component
 */
const TenantDirectoryContent: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Tenant directory sections
   */
  const [sections] = useState<ContentSection[]>([
    {
      id: 'tenant-directory',
      title: 'Tenant Directory',
      blocks: [
        {
          id: 'directory-list',
          type: ContentBlockType.LIST,
          title: 'All Tenants',
          data: {
            items: [
              {
                id: 'tenant-1',
                title: 'Johnson Family',
                description: 'Unit 4B • Lease ends Dec 2024',
                icon: '👨‍👩‍👧‍👦',
                badge: 'Active',
                metadata: { 
                  property: 'Sunset Apartments', 
                  payment: 'Current', 
                  rent: '$1,850/month',
                  phone: '(555) 123-4567',
                  email: 'johnson@email.com'
                },
              },
              {
                id: 'tenant-2',
                title: 'Smith Inc.',
                description: 'Unit 12A • Commercial lease',
                icon: '🏢',
                badge: 'Active',
                metadata: { 
                  property: 'Riverside Complex', 
                  payment: 'Current', 
                  rent: '$3,200/month',
                  phone: '(555) 234-5678',
                  email: 'smith@company.com'
                },
              },
              {
                id: 'tenant-3',
                title: 'Emily Chen',
                description: 'Studio 7 • Student housing',
                icon: '👩',
                badge: 'Active',
                metadata: { 
                  property: 'Downtown Lofts', 
                  payment: 'Current', 
                  rent: '$950/month',
                  phone: '(555) 345-6789',
                  email: 'emily@email.com'
                },
              },
              {
                id: 'tenant-4',
                title: 'Michael Brown',
                description: 'Unit 8C • Luxury apartment',
                icon: '👨',
                badge: 'Active',
                metadata: { 
                  property: 'Garden Townhouses', 
                  payment: 'Late', 
                  rent: '$2,400/month',
                  phone: '(555) 456-7890',
                  email: 'michael@email.com'
                },
              },
              {
                id: 'tenant-5',
                title: 'Garcia Family',
                description: 'Townhouse 3 • Family unit',
                icon: '👨‍👩‍👧',
                badge: 'Active',
                metadata: { 
                  property: 'Student Housing', 
                  payment: 'Current', 
                  rent: '$2,100/month',
                  phone: '(555) 567-8901',
                  email: 'garcia@email.com'
                },
              },
              {
                id: 'tenant-6',
                title: 'Williams Family',
                description: 'Unit 6A • Family apartment',
                icon: '👨‍👩‍👧‍👦',
                badge: 'Active',
                metadata: { 
                  property: 'Sunset Apartments', 
                  payment: 'Current', 
                  rent: '$1,750/month',
                  phone: '(555) 678-9012',
                  email: 'williams@email.com'
                },
              },
              {
                id: 'tenant-7',
                title: 'Davis LLC',
                description: 'Unit 15B • Commercial space',
                icon: '🏢',
                badge: 'Active',
                metadata: { 
                  property: 'Downtown Lofts', 
                  payment: 'Current', 
                  rent: '$4,500/month',
                  phone: '(555) 789-0123',
                  email: 'davis@company.com'
                },
              },
              {
                id: 'tenant-8',
                title: 'Anderson Family',
                description: 'Townhouse 5 • Family unit',
                icon: '👨‍👩‍👧',
                badge: 'Active',
                metadata: { 
                  property: 'Garden Townhouses', 
                  payment: 'Current', 
                  rent: '$2,300/month',
                  phone: '(555) 890-1234',
                  email: 'anderson@email.com'
                },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
            searchable: true,
            sortOptions: [
              { id: 'name', label: 'Name', field: 'title', direction: 'asc' },
              { id: 'property', label: 'Property', field: 'property', direction: 'asc' },
              { id: 'rent', label: 'Rent', field: 'rent', direction: 'desc' },
              { id: 'lease', label: 'Lease End', field: 'lease', direction: 'asc' },
            ],
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
    console.log('Directory block pressed:', block.id, block.type);
    Alert.alert('Tenant Details', `Viewing details for ${block.title}`);
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
          <Text style={styles.headerTitle}>Tenant Directory</Text>
          <Text style={styles.headerSubtitle}>View all 142 active tenants</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tenants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Directory Sections */}
        <View style={styles.contentSection}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`directory-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Tenant Directory Page with Navigation Provider
 */
const TenantDirectoryPage: React.FC = () => {
  return (
    <NavigationProvider>
      <TenantDirectoryContent />
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
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  contentSection: {
    marginTop: 16,
  },
});

export default TenantDirectoryPage;