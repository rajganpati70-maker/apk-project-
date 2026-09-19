/**
 * Property Financials Page
 * Completely different page with 6 scrollable sections
 * Financial performance per property
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

const financialsSections: ContentSection[] = [
  {
    id: 'property-revenue',
    title: '💰 Property Revenue',
    description: 'Revenue by property',
    blocks: [
      {
        id: 'revenue-list',
        type: 'list',
        title: 'Top Revenue Properties',
        description: 'Highest earning properties',
        data: [
          { id: 1, title: 'Riverside Complex', value: '$78,500/mo', trend: 'Excellent' },
          { id: 2, title: 'Sunset Apartments', value: '$45,200/mo', trend: 'Good' },
          { id: 3, title: 'Downtown Lofts', value: '$52,300/mo', trend: 'Good' }
        ]
      }
    ]
  },
  {
    id: 'property-expenses',
    title: '💸 Property Expenses',
    description: 'Expenses by property',
    blocks: [
      {
        id: 'expense-list',
        type: 'list',
        title: 'Expense Breakdown',
        description: 'Highest expense properties',
        data: [
          { id: 1, title: 'Riverside Complex', value: '$22,500/mo', trend: 'High' },
          { id: 2, title: 'Sunset Apartments', value: '$12,800/mo', trend: 'Medium' },
          { id: 3, title: 'Downtown Lofts', value: '$15,600/mo', trend: 'Medium' }
        ]
      }
    ]
  },
  {
    id: 'property-profit',
    title: '📈 Property Profit',
    description: 'Net profit by property',
    blocks: [
      {
        id: 'profit-chart',
        type: 'chart',
        title: 'Profit Distribution',
        description: 'Net profit across properties',
        data: {
          chartType: 'bar',
          labels: ['Sunset', 'Riverside', 'Downtown', 'Garden'],
          values: [32400, 56000, 36700, 18200],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'property-roi',
    title: '🎯 Property ROI',
    description: 'Return on investment',
    blocks: [
      {
        id: 'roi-list',
        type: 'list',
        title: 'ROI Rankings',
        description: 'Best performing ROI',
        data: [
          { id: 1, title: 'Downtown Lofts', value: 'ROI 15%', trend: 'Outstanding' },
          { id: 2, title: 'Sunset Apartments', value: 'ROI 12%', trend: 'Excellent' },
          { id: 3, title: 'Riverside Complex', value: 'ROI 11%', trend: 'Excellent' }
        ]
      }
    ]
  },
  {
    id: 'cost-analysis',
    title: '📊 Cost Analysis',
    description: 'Cost per property',
    blocks: [
      {
        id: 'cost-chart',
        type: 'chart',
        title: 'Cost Distribution',
        description: 'Operating costs',
        data: {
          chartType: 'pie',
          labels: ['Maintenance', 'Utilities', 'Insurance', 'Taxes'],
          values: [35, 25, 20, 20],
          colors: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981']
        }
      }
    ]
  },
  {
    id: 'financial-forecasts',
    title: '🔮 Financial Forecasts',
    description: 'Projected financial performance',
    blocks: [
      {
        id: 'forecast-list',
        type: 'list',
        title: 'Property Projections',
        description: 'Expected performance',
        data: [
          { id: 1, title: 'Downtown Lofts', value: '+15% YoY', trend: 'Growing' },
          { id: 2, title: 'Riverside Complex', value: '+12% YoY', trend: 'Growing' },
          { id: 3, title: 'Sunset Apartments', value: '+10% YoY', trend: 'Stable' }
        ]
      }
    ]
  }
];

const PropertyFinancialsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Financials block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Property Financials</Text>
          <Text style={styles.headerSubtitle}>Financial performance per property</Text>
        </View>

        <View style={styles.contentSection}>
          {financialsSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Total profit: $143,300/mo</Text>
          <Text style={styles.footerSubtext}>Average ROI: 12%</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PropertyFinancialsIndex: React.FC = () => {
  return <PropertyFinancialsPage />;
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

export default PropertyFinancialsIndex;