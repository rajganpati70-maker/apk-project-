/**
 * Analytics Overview Page
 * Completely different page with 6 scrollable sections
 * Complete analytics dashboard with detailed metrics
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

/**
 * Analytics Overview Content - 6 Unique Scrollable Sections
 */
const overviewSections: ContentSection[] = [
  {
    id: 'performance-metrics',
    title: '📊 Performance Metrics',
    description: 'Key performance indicators and KPIs',
    blocks: [
      {
        id: 'total-revenue',
        type: 'metric',
        title: 'Total Revenue',
        description: 'Monthly revenue across all properties',
        value: '$284,500',
        trend: '+$9,500',
        positive: true
      },
      {
        id: 'occupancy-rate',
        type: 'metric',
        title: 'Occupancy Rate',
        description: 'Overall property occupancy',
        value: '87.3%',
        trend: '+2.1%',
        positive: true
      },
      {
        id: 'net-profit',
        type: 'metric',
        title: 'Net Profit',
        description: 'Monthly profit after expenses',
        value: '$158,700',
        trend: '+$12,300',
        positive: true
      },
      {
        id: 'profit-margin',
        type: 'metric',
        title: 'Profit Margin',
        description: 'Profit as percentage of revenue',
        value: '55.7%',
        trend: '+3.2%',
        positive: true
      }
    ]
  },
  {
    id: 'revenue-analytics',
    title: '💰 Revenue Analytics',
    description: 'Detailed revenue breakdown and trends',
    blocks: [
      {
        id: 'revenue-trend',
        type: 'chart',
        title: 'Revenue Trend (6 Months)',
        description: 'Monthly revenue over time',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [245000, 252000, 261000, 268000, 275000, 284500],
          color: '#10B981'
        }
      },
      {
        id: 'revenue-by-property',
        type: 'chart',
        title: 'Revenue by Property Type',
        description: 'Revenue distribution across property types',
        data: {
          chartType: 'pie',
          labels: ['Apartments', 'Houses', 'Commercial', 'Industrial'],
          values: [145000, 68000, 52000, 19500],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'property-performance',
    title: '🏢 Property Performance',
    description: 'Individual property analytics',
    blocks: [
      {
        id: 'top-performers',
        type: 'list',
        title: 'Top Performing Properties',
        description: 'Properties with highest ROI',
        data: [
          { id: 1, title: 'Sunset Apartments', value: 'ROI 12%', trend: 'Excellent' },
          { id: 2, title: 'Riverside Complex', value: 'ROI 11%', trend: 'Excellent' },
          { id: 3, title: 'Downtown Lofts', value: 'ROI 15%', trend: 'Outstanding' },
          { id: 4, title: 'Green Garden Homes', value: 'ROI 10%', trend: 'Good' }
        ]
      },
      {
        id: 'performance-chart',
        type: 'chart',
        title: 'Property Performance Distribution',
        description: 'Performance ratings across all properties',
        data: {
          chartType: 'bar',
          labels: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
          values: [45, 68, 32, 11],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'tenant-analytics',
    title: '👥 Tenant Analytics',
    description: 'Tenant behavior and satisfaction metrics',
    blocks: [
      {
        id: 'retention-rate',
        type: 'metric',
        title: 'Tenant Retention Rate',
        description: 'Percentage of tenants renewing leases',
        value: '78%',
        trend: '+6%',
        positive: true
      },
      {
        id: 'satisfaction-score',
        type: 'metric',
        title: 'Average Satisfaction Score',
        description: 'Based on tenant feedback surveys',
        value: '4.2/5.0',
        trend: '+0.3',
        positive: true
      },
      {
        id: 'lease-duration',
        type: 'chart',
        title: 'Average Lease Duration',
        description: 'Distribution of lease lengths',
        data: {
          chartType: 'bar',
          labels: ['6 months', '1 year', '2 years', '3+ years'],
          values: [12, 58, 45, 27],
          color: '#EC4899'
        }
      }
    ]
  },
  {
    id: 'financial-health',
    title: '💳 Financial Health',
    description: 'Overall financial wellness indicators',
    blocks: [
      {
        id: 'cash-flow',
        type: 'metric',
        title: 'Monthly Cash Flow',
        description: 'Net cash flow position',
        value: '+$45,200',
        trend: '+$8,100',
        positive: true
      },
      {
        id: 'debt-ratio',
        type: 'metric',
        title: 'Debt-to-Income Ratio',
        description: 'Financial leverage ratio',
        value: '0.35',
        trend: '-0.05',
        positive: true
      },
      {
        id: 'financial-chart',
        type: 'chart',
        title: 'Financial Health Score',
        description: 'Overall financial wellness over time',
        data: {
          chartType: 'line',
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          values: [75, 82, 88, 92],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'market-comparison',
    title: '📈 Market Comparison',
    description: 'Compare performance against market benchmarks',
    blocks: [
      {
        id: 'market-comparison-chart',
        type: 'chart',
        title: 'Your Performance vs Market Average',
        description: 'Comparison with industry standards',
        data: {
          chartType: 'bar',
          labels: ['Occupancy', 'Revenue', 'Profit Margin', 'Tenant Satisfaction'],
          values: [
            { name: 'Your Performance', data: [87, 100, 56, 84], color: '#3B82F6' },
            { name: 'Market Average', data: [82, 95, 48, 78], color: '#EF4444' }
          ]
        }
      },
      {
        id: 'competitive-position',
        type: 'list',
        title: 'Competitive Position',
        description: 'Your standing in the market',
        data: [
          { id: 1, title: 'Market Ranking', value: 'Top 15%', trend: 'Strong' },
          { id: 2, title: 'Revenue Growth', value: '+8.5%', trend: 'Above Average' },
          { id: 3, title: 'Occupancy Rate', value: '+5.3%', trend: 'Above Average' },
          { id: 4, title: 'Tenant Satisfaction', value: '+4.0%', trend: 'Above Average' }
        ]
      }
    ]
  }
];

/**
 * Analytics Overview Page Component
 */
const AnalyticsOverviewPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

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
    console.log('Overview block pressed:', block.id);
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
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics Overview</Text>
          <Text style={styles.headerSubtitle}>Complete analytics dashboard with detailed metrics</Text>
        </View>

        {/* Overview Sections */}
        <View style={styles.contentSection}>
          {overviewSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Analytics data updated every 5 minutes</Text>
          <Text style={styles.footerSubtext}>Last sync: Just now</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Main Component
 */
const AnalyticsOverviewIndex: React.FC = () => {
  return <AnalyticsOverviewPage />;
};

/**
 * Styles
 */
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

export default AnalyticsOverviewIndex;