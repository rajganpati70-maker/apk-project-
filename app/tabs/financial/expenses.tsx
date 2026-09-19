/**
 * Financial Expenses Sub-page
 * Expense categorization and analytics
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
 * Financial Expenses Content Component
 */
const FinancialExpensesContent: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Financial expenses sections
   */
  const [sections] = useState<ContentSection[]>([
    {
      id: 'expense-overview',
      title: 'Expense Overview',
      blocks: [
        {
          id: 'expense-list',
          type: ContentBlockType.LIST,
          title: 'Recent Expenses',
          data: {
            items: [
              {
                id: 'expense-1',
                title: 'Maintenance - HVAC Repair',
                description: '$450 for Unit 12A',
                icon: '🔧',
                badge: 'Completed',
                metadata: { date: 'Sep 14, 2024', category: 'Maintenance', property: 'Riverside Complex' },
              },
              {
                id: 'expense-2',
                title: 'Utilities - Water Bill',
                description: '$2,200 for all properties',
                icon: '💧',
                badge: 'Completed',
                metadata: { date: 'Sep 13, 2024', category: 'Utilities', property: 'All Properties' },
              },
              {
                id: 'expense-3',
                title: 'Insurance Premium',
                description: '$1,200 quarterly payment',
                icon: '🛡️',
                badge: 'Completed',
                metadata: { date: 'Sep 12, 2024', category: 'Insurance', property: 'All Properties' },
              },
              {
                id: 'expense-4',
                title: 'Property Tax - Q3',
                description: '$8,500 for all properties',
                icon: '📋',
                badge: 'Completed',
                metadata: { date: 'Sep 10, 2024', category: 'Taxes', property: 'All Properties' },
              },
              {
                id: 'expense-5',
                title: 'Landscaping Services',
                description: '$1,800 for garden townhouses',
                icon: '🌳',
                badge: 'Pending',
                metadata: { date: 'Sep 8, 2024', category: 'Services', property: 'Garden Townhouses' },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
            searchable: true,
            sortOptions: [
              { id: 'date', label: 'Date', field: 'date', direction: 'desc' },
              { id: 'amount', label: 'Amount', field: 'amount', direction: 'desc' },
              { id: 'category', label: 'Category', field: 'category', direction: 'asc' },
            ],
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'expense-breakdown',
      title: 'Expense Breakdown',
      blocks: [
        {
          id: 'category-stats',
          type: ContentBlockType.LIST,
          title: 'Expenses by Category',
          data: {
            items: [
              {
                id: 'cat-1',
                title: 'Maintenance',
                description: '$15,200 this month',
                icon: '🔧',
                metadata: { percentage: '12%', trend: '+2% from last month' },
              },
              {
                id: 'cat-2',
                title: 'Utilities',
                description: '$28,500 this month',
                icon: '💡',
                metadata: { percentage: '23%', trend: '-3% from last month' },
              },
              {
                id: 'cat-3',
                title: 'Insurance',
                description: '$4,800 this month',
                icon: '🛡️',
                metadata: { percentage: '4%', trend: 'Same as last month' },
              },
              {
                id: 'cat-4',
                title: 'Property Taxes',
                description: '$34,000 this month',
                icon: '📋',
                metadata: { percentage: '27%', trend: 'Same as last month' },
              },
              {
                id: 'cat-5',
                title: 'Services',
                description: '$18,300 this month',
                icon: '👷',
                metadata: { percentage: '15%', trend: '+5% from last month' },
              },
              {
                id: 'cat-6',
                title: 'Other',
                description: '$25,000 this month',
                icon: '📦',
                metadata: { percentage: '19%', trend: '-1% from last month' },
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
    console.log('Expense block pressed:', block.id, block.type);
    Alert.alert('Expense Details', `Viewing details for ${block.title}`);
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
          <Text style={styles.headerTitle}>Expenses</Text>
          <Text style={styles.headerSubtitle}>Monitor and categorize expenses</Text>
        </View>

        {/* Expense Sections */}
        <View style={styles.contentSection}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`expenses-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Financial Expenses Page with Navigation Provider
 */
const FinancialExpensesPage: React.FC = () => {
  return (
    <NavigationProvider>
      <FinancialExpensesContent />
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

export default FinancialExpensesPage;