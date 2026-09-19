/**
 * Tenant Communications Sub-page
 * Message center and announcements
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
import { NavigationProvider, useNavigation } from '../../../src/context/NavigationContext';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../../src/components/content';
import { ContentSection, ContentBlock, ContentBlockType, ListBlockData, ListItem } from '../../../src/types';
import { saveScrollPosition } from '../../../src/utils/scrollStateManager';

/**
 * Tenant Communications Content Component
 */
const TenantCommunicationsContent: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Tenant communications sections
   */
  const [sections] = useState<ContentSection[]>([
    {
      id: 'message-center',
      title: 'Message Center',
      blocks: [
        {
          id: 'message-list',
          type: ContentBlockType.LIST,
          title: 'Recent Messages',
          data: {
            items: [
              {
                id: 'msg-1',
                title: 'Johnson Family',
                description: 'Requesting maintenance for kitchen sink',
                icon: '💬',
                badge: 'Unread',
                metadata: { time: '1 hour ago', type: 'Maintenance Request', priority: 'Medium' },
              },
              {
                id: 'msg-2',
                title: 'Smith Inc.',
                description: 'Question about parking allocation',
                icon: '💬',
                badge: 'Unread',
                metadata: { time: '3 hours ago', type: 'General Inquiry', priority: 'Low' },
              },
              {
                id: 'msg-3',
                title: 'Emily Chen',
                description: 'Package delivery notification',
                icon: '📦',
                badge: 'Read',
                metadata: { time: '1 day ago', type: 'Package', priority: 'Low' },
              },
              {
                id: 'msg-4',
                title: 'Michael Brown',
                description: 'Rent payment confirmation',
                icon: '💰',
                badge: 'Read',
                metadata: { time: '2 days ago', type: 'Payment', priority: 'Low' },
              },
              {
                id: 'msg-5',
                title: 'Garcia Family',
                description: 'Noise complaint from neighbors',
                icon: '⚠️',
                badge: 'Unread',
                metadata: { time: '2 days ago', type: 'Complaint', priority: 'High' },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
            searchable: true,
            sortOptions: [
              { id: 'time', label: 'Time', field: 'time', direction: 'desc' },
              { id: 'priority', label: 'Priority', field: 'priority', direction: 'desc' },
              { id: 'type', label: 'Type', field: 'type', direction: 'asc' },
            ],
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'announcements',
      title: 'Announcements',
      blocks: [
        {
          id: 'announcement-list',
          type: ContentBlockType.LIST,
          title: 'Recent Announcements',
          data: {
            items: [
              {
                id: 'ann-1',
                title: 'Building Maintenance Schedule',
                description: 'Scheduled maintenance for common areas next week',
                icon: '🔧',
                badge: 'Important',
                metadata: { date: 'Sep 15, 2024', type: 'Maintenance', recipients: 'All Tenants' },
              },
              {
                id: 'ann-2',
                title: 'Rent Payment Reminder',
                description: 'Monthly rent payments due by the 5th',
                icon: '💰',
                badge: 'Reminder',
                metadata: { date: 'Sep 10, 2024', type: 'Payment', recipients: 'All Tenants' },
              },
              {
                id: 'ann-3',
                title: 'Holiday Schedule Notice',
                description: 'Office hours during upcoming holidays',
                icon: '📅',
                badge: 'Info',
                metadata: { date: 'Sep 5, 2024', type: 'General', recipients: 'All Tenants' },
              },
              {
                id: 'ann-4',
                title: 'New Amenities Available',
                description: 'Gym and pool facilities now open 24/7',
                icon: '🏊',
                badge: 'Update',
                metadata: { date: 'Sep 1, 2024', type: 'Amenities', recipients: 'Select Properties' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'communication-stats',
      title: 'Communication Statistics',
      blocks: [
        {
          id: 'stats-list',
          type: ContentBlockType.LIST,
          title: 'Communication Metrics',
          data: {
            items: [
              {
                id: 'stat-1',
                title: 'Average Response Time',
                description: '2.4 hours',
                icon: '⏱️',
                metadata: { trend: '-0.6 hours from last month' },
              },
              {
                id: 'stat-2',
                title: 'Messages This Month',
                description: '156 messages',
                icon: '💬',
                metadata: { trend: '+12% from last month' },
              },
              {
                id: 'stat-3',
                title: 'Announcement Read Rate',
                description: '87%',
                icon: '📊',
                metadata: { trend: '+5% from last month' },
              },
              {
                id: 'stat-4',
                title: 'Tenant Satisfaction',
                description: '4.5/5',
                icon: '⭐',
                metadata: { trend: '+0.2 from last month' },
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
    console.log('Communication block pressed:', block.id, block.type);
    Alert.alert('Communication Details', `Viewing details for ${block.title}`);
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
          <Text style={styles.headerTitle}>Communications</Text>
          <Text style={styles.headerSubtitle}>Message center and announcements</Text>
        </View>

        {/* Communication Sections */}
        <View style={styles.contentSection}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`communications-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Tenant Communications Page with Navigation Provider
 */
const TenantCommunicationsPage: React.FC = () => {
  return (
    <NavigationProvider>
      <TenantCommunicationsContent />
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

export default TenantCommunicationsPage;