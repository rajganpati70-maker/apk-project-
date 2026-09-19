/**
 * Property Analytics Sub-page
 * Detailed property analytics with interactive charts and trends
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
import { ContentSection, ContentBlock, ContentBlockType, ChartBlockData, ChartDataPoint } from '../../../src/types';
import { saveScrollPosition } from '../../../src/utils/scrollStateManager';

/**
 * Property Analytics Content Component
 */
const PropertyAnalyticsContent: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Property analytics sections
   */
  const [sections] = useState<ContentSection[]>([
    {
      id: 'occupancy-trends',
      title: 'Occupancy Trends',
      blocks: [
        {
          id: 'occupancy-chart',
          type: ContentBlockType.CHART,
          title: 'Occupancy Rate Over Time',
          data: {
            type: 'line',
            data: [
              { label: 'Jan', value: 88 },
              { label: 'Feb', value: 89 },
              { label: 'Mar', value: 90 },
              { label: 'Apr', value: 91 },
              { label: 'May', value: 92 },
              { label: 'Jun', value: 94.2 },
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
      id: 'revenue-by-property',
      title: 'Revenue by Property',
      blocks: [
        {
          id: 'revenue-distribution',
          type: ContentBlockType.CHART,
          title: 'Revenue Distribution',
          data: {
            type: 'donut',
            data: [
              { label: 'Sunset Apartments', value: 45200 },
              { label: 'Riverside Complex', value: 78500 },
              { label: 'Downtown Lofts', value: 52300 },
              { label: 'Garden Townhouses', value: 28800 },
              { label: 'Student Housing', value: 38400 },
              { label: 'Industrial Park', value: 22100 },
            ] as ChartDataPoint[],
            colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'],
            showLegend: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'maintenance-analytics',
      title: 'Maintenance Analytics',
      blocks: [
        {
          id: 'maintenance-trends',
          type: ContentBlockType.CHART,
          title: 'Maintenance Requests Trend',
          data: {
            type: 'bar',
            data: [
              { label: 'Jan', value: 28 },
              { label: 'Feb', value: 32 },
              { label: 'Mar', value: 25 },
              { label: 'Apr', value: 30 },
              { label: 'May', value: 27 },
              { label: 'Jun', value: 23 },
            ] as ChartDataPoint[],
            colors: ['#EF4444'],
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
    console.log('Analytics block pressed:', block.id, block.type);
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
          <Text style={styles.headerTitle}>Property Analytics</Text>
          <Text style={styles.headerSubtitle}>Detailed insights and trends</Text>
        </View>

        {/* Analytics Sections */}
        <View style={styles.contentSection}>
          {sections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
              testID={`analytics-section-${section.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Property Analytics Page with Navigation Provider
 */
const PropertyAnalyticsPage: React.FC = () => {
  return (
    <NavigationProvider>
      <PropertyAnalyticsContent />
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

export default PropertyAnalyticsPage;