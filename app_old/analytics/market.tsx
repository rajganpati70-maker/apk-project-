/**
 * Market Intelligence Page
 * Completely different page with 6 scrollable sections
 * Real estate market trends and comparisons
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

const marketSections: ContentSection[] = [
  {
    id: 'market-overview',
    title: '📈 Market Overview',
    description: 'Current market conditions',
    blocks: [
      {
        id: 'market-trend',
        type: 'metric',
        title: 'Market Trend',
        description: 'Overall market direction',
        value: 'Growing',
        trend: '+8.5%',
        positive: true
      },
      {
        id: 'demand-index',
        type: 'metric',
        title: 'Demand Index',
        description: 'Current rental demand',
        value: 'High',
        trend: 'Rising',
        positive: true
      }
    ]
  },
  {
    id: 'rental-rates',
    title: '💰 Rental Rates',
    description: 'Market rental rate analysis',
    blocks: [
      {
        id: 'average-rent',
        type: 'metric',
        title: 'Average Market Rent',
        description: 'Current market average',
        value: '$1,850',
        trend: '+$120',
        positive: true
      },
      {
        id: 'rent-chart',
        type: 'chart',
        title: 'Rental Rate Trends',
        description: 'Market rent over time',
        data: {
          chartType: 'line',
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          values: [1700, 1750, 1800, 1850],
          color: '#3B82F6'
        }
      }
    ]
  },
  {
    id: 'competitor-analysis',
    title: '🏢 Competitor Analysis',
    description: 'Competitor comparison',
    blocks: [
      {
        id: 'competitor-count',
        type: 'metric',
        title: 'Active Competitors',
        description: 'Number of competitors',
        value: '12',
        trend: '+2',
        positive: false
      },
      {
        id: 'competitor-chart',
        type: 'chart',
        title: 'Market Share',
        description: 'Your position in market',
        data: {
          chartType: 'pie',
          labels: ['Your Properties', 'Competitor A', 'Competitor B', 'Others'],
          values: [35, 25, 20, 20],
          colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'geographic-analysis',
    title: '🗺️ Geographic Analysis',
    description: 'Location-based market data',
    blocks: [
      {
        id: 'hot-areas',
        type: 'list',
        title: 'Hot Market Areas',
        description: 'Areas with high demand',
        data: [
          { id: 1, title: 'Downtown', value: 'Very High', trend: 'Growing' },
          { id: 2, title: 'Riverside', value: 'High', trend: 'Stable' },
          { id: 3, title: 'Suburbs', value: 'Medium', trend: 'Growing' }
        ]
      }
    ]
  },
  {
    id: 'market-forecasts',
    title: '🔮 Market Forecasts',
    description: 'Future market predictions',
    blocks: [
      {
        id: 'growth-prediction',
        type: 'metric',
        title: 'Expected Growth',
        description: 'Market growth prediction',
        value: '12%',
        trend: 'Next 12 months',
        positive: true
      },
      {
        id: 'forecast-chart',
        type: 'chart',
        title: 'Market Growth Forecast',
        description: 'Predicted market expansion',
        data: {
          chartType: 'line',
          labels: ['2024', '2025', '2026', '2027'],
          values: [100, 112, 125, 140],
          color: '#F59E0B'
        }
      }
    ]
  },
  {
    id: 'investment-opportunities',
    title: '💎 Investment Opportunities',
    description: 'Market investment analysis',
    blocks: [
      {
        id: 'roi-potential',
        type: 'metric',
        title: 'Average ROI Potential',
        description: 'Expected return on investment',
        value: '8.5%',
        trend: '+1.2%',
        positive: true
      },
      {
        id: 'opportunities-list',
        type: 'list',
        title: 'Top Opportunities',
        description: 'Best investment areas',
        data: [
          { id: 1, title: 'Downtown Apartments', value: 'ROI 10%', trend: 'High' },
          { id: 2, title: 'Commercial Properties', value: 'ROI 9%', trend: 'Medium' },
          { id: 3, title: 'Student Housing', value: 'ROI 8%', trend: 'Stable' }
        ]
      }
    ]
  }
];

const MarketIntelligencePage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Market block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Market Intelligence</Text>
          <Text style={styles.headerSubtitle}>Real estate market trends and comparisons</Text>
        </View>

        <View style={styles.contentSection}>
          {marketSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Market data updated weekly</Text>
          <Text style={styles.footerSubtext}>Last update: This week</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MarketIntelligenceIndex: React.FC = () => {
  return <MarketIntelligencePage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3C7',
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

export default MarketIntelligenceIndex;