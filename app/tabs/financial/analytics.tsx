/**
 * Financial Analytics Sub-page
 * Visual spending reports and financial insights
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
import { ContentSection, ContentBlock, ContentBlockType, ChartBlockData, ChartDataPoint } from '../../src/types';
import { saveScrollPosition } from '../../src/utils/scrollStateManager';

/**
 * Financial Analytics Content Component
 */
const FinancialAnalyticsContent: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Financial analytics sections
   */
  const [sections] = useState<ContentSection[]>([
    {
      id: 'revenue-trends',
      title: 'Revenue Trends',
      blocks: [
        {
          id: 'revenue-chart',
          type: ContentBlockType.CHART,
          title: 'Monthly Revenue (6 Months)',
          data: {
            type: 'line',
            data: [
              { label: 'Jan', value: 245000 },
              { label: 'Feb', value: 252000 },
              { label: 'Mar', value: 261000 },
              { label: 'Apr', value: 268000 },
              { label: 'May', value: 275000 },
              { label: 'Jun', value: 284500 },
            ] as ChartDataPoint[],
            colors: ['#10B981'],
            showLegend: true,
            showGrid: true,
            interactive: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'expense-trends',
      title: 'Expense Trends',
      blocks: [
        {
          id: 'expense-chart',
          type: ContentBlockType.CHART,
          title: 'Monthly Expenses (6 Months)',
          data: {
            type: 'line',
            data: [
              { label: 'Jan', value: 118000 },
              { label: 'Feb', value: 122000 },
              { label: 'Mar', value: 128000 },
              { label: 'Apr', value: 125000 },
              { label: 'May', value: 127000 },
              { label: 'Jun', value: 125800 },
            ] as ChartDataPoint[],
            colors: ['#EF4444'],
            showLegend: true,
            showGrid: true,
            interactive: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'profit-analysis',
      title: 'Profit Analysis',
      blocks: [
        {
          id: 'profit-chart',
          type: ContentBlockType.CHART,
          title: 'Net Profit Trend',
          data: {
            type: 'area',
            data: [
              { label: 'Jan', value: 127000 },
              { label: 'Feb', value: 130000 },
              { label: 'Mar', value: 133000 },
              { label: 'Apr', value: 143000 },
              { label: 'May', value: 148000 },
              { label: 'Jun', value: 158700 },
            ] as ChartDataPoint[],
            colors: ['#3B82F6'],
            showLegend: true,
            showGrid: true,
            interactive: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'financial-ratios',
      title: 'Financial Ratios',
      blocks: [
        {
          id: 'ratio-chart',
          type: ContentBlockType.CHART,
          title: 'Key Financial Ratios',
          data: {
            type: 'bar',
            data: [
              { label: 'Profit Margin', value: 55.7 },
              { label: 'Occupancy Rate', value: 94.2 },
              { label: 'Collection Rate', value: 94.0 },
              { label: 'Expense Ratio', value: 44.3 },
            ] as ChartDataPoint[],
            colors: ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444'],
            showLegend: true,
            showGrid: true,
          } as ChartBlockData,
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
    console.log('Financial analytics block pressed:', block.id, block.type);
    Alert.alert('Analytics Details', `Viewing detailed analytics for ${block.title}`);
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
          <Text style={styles.headerTitle}>Financial Analytics</Text>
          <Text style={styles.headerSubtitle}>Deep financial insights and reports</Text>
        </View>

        {/* Analytics Sections */}
        <View style={styles.contentSection}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`financial-analytics-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Financial Analytics Page with Navigation Provider
 */
const FinancialAnalyticsPage: React.FC = () => {
  return (
    <NavigationProvider>
      <FinancialAnalyticsContent />
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

export default FinancialAnalyticsPage;