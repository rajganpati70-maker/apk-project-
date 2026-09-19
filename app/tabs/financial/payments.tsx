/**
 * Financial Payments Sub-page
 * Payment tracking and history
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
 * Financial Payments Content Component
 */
const FinancialPaymentsContent: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Financial payments sections
   */
  const [sections] = useState<ContentSection[]>([
    {
      id: 'payment-overview',
      title: 'Payment Overview',
      blocks: [
        {
          id: 'payment-list',
          type: ContentBlockType.LIST,
          title: 'Recent Payments',
          data: {
            items: [
              {
                id: 'payment-1',
                title: 'Rent Payment - Unit 4B',
                description: '$1,850 from Johnson Family',
                icon: '💰',
                badge: 'Completed',
                metadata: { date: 'Sep 15, 2024', method: 'Bank Transfer', property: 'Sunset Apartments' },
              },
              {
                id: 'payment-2',
                title: 'Rent Payment - Unit 12A',
                description: '$3,200 from Smith Inc.',
                icon: '💰',
                badge: 'Completed',
                metadata: { date: 'Sep 14, 2024', method: 'Credit Card', property: 'Riverside Complex' },
              },
              {
                id: 'payment-3',
                title: 'Rent Payment - Studio 7',
                description: '$950 from Emily Chen',
                icon: '💰',
                badge: 'Completed',
                metadata: { date: 'Sep 13, 2024', method: 'Bank Transfer', property: 'Downtown Lofts' },
              },
              {
                id: 'payment-4',
                title: 'Rent Payment - Unit 8C',
                description: '$2,400 from Michael Brown',
                icon: '💰',
                badge: 'Pending',
                metadata: { date: 'Sep 12, 2024', method: 'Bank Transfer', property: 'Garden Townhouses' },
              },
              {
                id: 'payment-5',
                title: 'Rent Payment - Room 12',
                description: '$800 from Garcia Family',
                icon: '💰',
                badge: 'Completed',
                metadata: { date: 'Sep 11, 2024', method: 'Cash', property: 'Student Housing' },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
            searchable: true,
            sortOptions: [
              { id: 'date', label: 'Date', field: 'date', direction: 'desc' },
              { id: 'amount', label: 'Amount', field: 'amount', direction: 'desc' },
              { id: 'property', label: 'Property', field: 'property', direction: 'asc' },
            ],
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'payment-analytics',
      title: 'Payment Analytics',
      blocks: [
        {
          id: 'payment-stats',
          type: ContentBlockType.LIST,
          title: 'Payment Statistics',
          data: {
            items: [
              {
                id: 'stat-1',
                title: 'Total Collected This Month',
                description: '$267,200',
                icon: '💵',
                metadata: { trend: '+8.5% from last month', collectionRate: '94%' },
              },
              {
                id: 'stat-2',
                title: 'Pending Payments',
                description: '$17,300',
                icon: '⏳',
                metadata: { count: '8 payments', overdue: '$3,200' },
              },
              {
                id: 'stat-3',
                title: 'Late Payments',
                description: '$4,850',
                icon: '⚠️',
                metadata: { count: '3 payments', avgDelay: '5 days' },
              },
              {
                id: 'stat-4',
                title: 'Payment Methods',
                description: 'Bank Transfer: 65%, Credit Card: 25%, Cash: 10%',
                icon: '💳',
                metadata: { mostPopular: 'Bank Transfer' },
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
    console.log('Payment block pressed:', block.id, block.type);
    Alert.alert('Payment Details', `Viewing details for ${block.title}`);
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
          <Text style={styles.headerTitle}>Payments</Text>
          <Text style={styles.headerSubtitle}>Track all rent payments and transactions</Text>
        </View>

        {/* Payment Sections */}
        <View style={styles.contentSection}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`payments-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Financial Payments Page with Navigation Provider
 */
const FinancialPaymentsPage: React.FC = () => {
  return (
    <NavigationProvider>
      <FinancialPaymentsContent />
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

export default FinancialPaymentsPage;