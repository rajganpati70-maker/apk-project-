/**
 * Property Tenants Sub-page
 * Tenant management within property context
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
 * Property Tenants Content Component
 */
const PropertyTenantsContent: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Property tenants sections
   */
  const [sections] = useState<ContentSection[]>([
    {
      id: 'tenant-overview',
      title: 'Tenant Overview',
      blocks: [
        {
          id: 'tenant-list',
          type: ContentBlockType.LIST,
          title: 'Tenants by Property',
          data: {
            items: [
              {
                id: 'tenant-1',
                title: 'Johnson Family',
                description: 'Sunset Apartments - Unit 4B',
                icon: '👨‍👩‍👧‍👦',
                badge: 'Active',
                metadata: { rent: '$1,850/month', leaseEnd: 'Dec 2024', payment: 'Current' },
              },
              {
                id: 'tenant-2',
                title: 'Smith Inc.',
                description: 'Riverside Complex - Unit 12A',
                icon: '🏢',
                badge: 'Active',
                metadata: { rent: '$3,200/month', leaseEnd: 'Mar 2025', payment: 'Current' },
              },
              {
                id: 'tenant-3',
                title: 'Emily Chen',
                description: 'Downtown Lofts - Studio 7',
                icon: '👩',
                badge: 'Active',
                metadata: { rent: '$950/month', leaseEnd: 'Nov 2024', payment: 'Current' },
              },
              {
                id: 'tenant-4',
                title: 'Michael Brown',
                description: 'Garden Townhouses - Unit 3',
                icon: '👨',
                badge: 'Active',
                metadata: { rent: '$2,400/month', leaseEnd: 'Jan 2025', payment: 'Late' },
              },
              {
                id: 'tenant-5',
                title: 'Garcia Family',
                description: 'Student Housing - Room 12',
                icon: '👨‍👩‍👧',
                badge: 'Active',
                metadata: { rent: '$800/month', leaseEnd: 'Aug 2025', payment: 'Current' },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
            searchable: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'tenant-performance',
      title: 'Tenant Performance',
      blocks: [
        {
          id: 'performance-metrics',
          type: ContentBlockType.LIST,
          title: 'Payment Performance',
          data: {
            items: [
              {
                id: 'perf-1',
                title: 'On-time Payments',
                description: '94% of tenants pay on time',
                icon: '✅',
                metadata: { trend: '+2% from last month' },
              },
              {
                id: 'perf-2',
                title: 'Late Payments',
                description: '6% of tenants have late payments',
                icon: '⚠️',
                metadata: { trend: '-1% from last month' },
              },
              {
                id: 'perf-3',
                title: 'Payment Issues',
                description: '3 tenants with payment issues',
                icon: '❌',
                metadata: { action: 'Requires attention' },
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
    console.log('Property tenants block pressed:', block.id, block.type);
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
          <Text style={styles.headerTitle}>Property Tenants</Text>
          <Text style={styles.headerSubtitle}>Manage tenants across properties</Text>
        </View>

        {/* Tenant Sections */}
        <View style={styles.contentSection}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`property-tenants-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Property Tenants Page with Navigation Provider
 */
const PropertyTenantsPage: React.FC = () => {
  return (
    <NavigationProvider>
      <PropertyTenantsContent />
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

export default PropertyTenantsPage;