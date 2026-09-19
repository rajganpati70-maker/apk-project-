/**
 * Tenant Applications Sub-page
 * Application processing and background checks
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
 * Tenant Applications Content Component
 */
const TenantApplicationsContent: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Tenant applications sections
   */
  const [sections] = useState<ContentSection[]>([
    {
      id: 'pending-applications',
      title: 'Pending Applications',
      blocks: [
        {
          id: 'application-list',
          type: ContentBlockType.LIST,
          title: 'Applications to Review',
          data: {
            items: [
              {
                id: 'app-1',
                title: 'Sarah Williams',
                description: 'Studio 7 - Student housing',
                icon: '👩',
                badge: 'New',
                metadata: { submitted: '2 days ago', score: '85/100', status: 'Background Check' },
              },
              {
                id: 'app-2',
                title: 'David Thompson',
                description: 'Unit 4B - Sunset Apartments',
                icon: '👨',
                badge: 'Review',
                metadata: { submitted: '3 days ago', score: '92/100', status: 'Credit Check' },
              },
              {
                id: 'app-3',
                title: 'Maria Garcia',
                description: 'Townhouse 3 - Garden Townhouses',
                icon: '👩',
                badge: 'Review',
                metadata: { submitted: '4 days ago', score: '78/100', status: 'Reference Check' },
              },
              {
                id: 'app-4',
                title: 'James Chen',
                description: 'Unit 12A - Riverside Complex',
                icon: '👨',
                badge: 'New',
                metadata: { submitted: '5 days ago', score: '88/100', status: 'Background Check' },
              },
              {
                id: 'app-5',
                title: 'Emily Brown',
                description: 'Studio 5 - Downtown Lofts',
                icon: '👩',
                badge: 'Review',
                metadata: { submitted: '1 week ago', score: '95/100', status: 'Final Review' },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
            searchable: true,
            sortOptions: [
              { id: 'date', label: 'Submitted Date', field: 'submitted', direction: 'desc' },
              { id: 'score', label: 'Application Score', field: 'score', direction: 'desc' },
              { id: 'property', label: 'Property', field: 'property', direction: 'asc' },
            ],
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'application-stats',
      title: 'Application Statistics',
      blocks: [
        {
          id: 'stats-list',
          type: ContentBlockType.LIST,
          title: 'Processing Metrics',
          data: {
            items: [
              {
                id: 'stat-1',
                title: 'Average Processing Time',
                description: '4.2 days',
                icon: '⏱️',
                metadata: { trend: '-0.8 days from last month' },
              },
              {
                id: 'stat-2',
                title: 'Approval Rate',
                description: '78%',
                icon: '✅',
                metadata: { trend: '+5% from last month' },
              },
              {
                id: 'stat-3',
                title: 'Average Credit Score',
                description: '720',
                icon: '📊',
                metadata: { trend: '+15 points from last month' },
              },
              {
                id: 'stat-4',
                title: 'Background Check Pass Rate',
                description: '92%',
                icon: '🔍',
                metadata: { trend: '+2% from last month' },
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
    console.log('Application block pressed:', block.id, block.type);
    Alert.alert('Application Details', `Viewing details for ${block.title}`);
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
          <Text style={styles.headerTitle}>Applications</Text>
          <Text style={styles.headerSubtitle}>8 pending applications to review</Text>
        </View>

        {/* Application Sections */}
        <View style={styles.contentSection}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`applications-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Tenant Applications Page with Navigation Provider
 */
const TenantApplicationsPage: React.FC = () => {
  return (
    <NavigationProvider>
      <TenantApplicationsContent />
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

export default TenantApplicationsPage;