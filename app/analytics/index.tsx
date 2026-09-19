/**
 * Analytics & Reports Page
 * Completely different analytics page with 6 scrollable sections
 * Unique content for performance metrics, reports, and insights
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
import { NavigationItem } from '../../src/components/navigation';
import { ScrollingSectionContainer, ContentBlockRenderer } from '../../src/components/content';
import { NavigationItem as NavigationItemType, ContentBlock, ContentSection } from '../../src/types';

/**
 * Analytics Page Content - 6 Unique Scrollable Sections
 */
const analyticsSections: ContentSection[] = [
  {
    id: 'analytics-overview',
    title: '📊 Analytics Overview',
    description: 'High-level performance metrics and KPIs',
    blocks: [
      {
        id: 'revenue-trend',
        type: 'chart',
        title: 'Revenue Trend Analysis',
        description: 'Monthly revenue growth showing 15% increase',
        data: {
          chartType: 'line',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          values: [45000, 52000, 48000, 61000, 67000, 72000],
          color: '#3B82F6'
        }
      },
      {
        id: 'occupancy-rate',
        type: 'metric',
        title: 'Overall Occupancy Rate',
        description: '87% occupancy across all properties',
        value: '87%',
        trend: '+5%',
        positive: true
      },
      {
        id: 'average-rent',
        type: 'metric',
        title: 'Average Monthly Rent',
        description: 'Average rent per property',
        value: '$1,850',
        trend: '+$120',
        positive: true
      }
    ]
  },
  {
    id: 'property-performance',
    title: '🏢 Property Performance',
    description: 'Individual property analytics and rankings',
    blocks: [
      {
        id: 'top-performers',
        type: 'list',
        title: 'Top 5 Performing Properties',
        description: 'Properties with highest ROI and occupancy',
        data: [
          { id: 1, title: 'Sunset Apartments', value: '95% occupancy', trend: '+12%' },
          { id: 2, title: 'Riverside Complex', value: '92% occupancy', trend: '+8%' },
          { id: 3, title: 'Downtown Lofts', value: '89% occupancy', trend: '+15%' },
          { id: 4, title: 'Green Garden Homes', value: '88% occupancy', trend: '+6%' },
          { id: 5, title: 'Metro Heights', value: '86% occupancy', trend: '+9%' }
        ]
      },
      {
        id: 'performance-chart',
        type: 'chart',
        title: 'Property Performance Distribution',
        description: 'Performance across all 156 properties',
        data: {
          chartType: 'bar',
          labels: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
          values: [45, 68, 32, 11],
          color: '#10B981'
        }
      }
    ]
  },
  {
    id: 'financial-reports',
    title: '💰 Financial Reports',
    description: 'Detailed financial analysis and projections',
    blocks: [
      {
        id: 'revenue-breakdown',
        type: 'chart',
        title: 'Revenue Breakdown by Category',
        description: 'Monthly revenue distribution',
        data: {
          chartType: 'pie',
          labels: ['Rent', 'Fees', 'Services', 'Other'],
          values: [72, 15, 8, 5],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      },
      {
        id: 'expense-analysis',
        type: 'list',
        title: 'Major Expense Categories',
        description: 'Top expense areas requiring attention',
        data: [
          { id: 1, title: 'Maintenance Costs', value: '$12,450', trend: '+8%' },
          { id: 2, title: 'Property Taxes', value: '$8,200', trend: '+3%' },
          { id: 3, title: 'Insurance Premiums', value: '$5,800', trend: '+5%' },
          { id: 4, title: 'Utilities', value: '$4,200', trend: '-2%' }
        ]
      },
      {
        id: 'profit-margin',
        type: 'metric',
        title: 'Net Profit Margin',
        description: 'Overall profitability across portfolio',
        value: '32%',
        trend: '+4%',
        positive: true
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
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'market-intelligence',
    title: '📈 Market Intelligence',
    description: 'Real estate market trends and comparisons',
    blocks: [
      {
        id: 'market-comparison',
        type: 'chart',
        title: 'Market Rate Comparison',
        description: 'Your rates vs market average',
        data: {
          chartType: 'line',
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          values: [
            { name: 'Your Rates', data: [1800, 1850, 1900, 1950], color: '#3B82F6' },
            { name: 'Market Avg', data: [1750, 1800, 1850, 1900], color: '#EF4444' }
          ]
        }
      },
      {
        id: 'competitor-analysis',
        type: 'list',
        title: 'Competitor Analysis',
        description: 'Comparison with top 5 competitors',
        data: [
          { id: 1, title: 'Competitor A', value: 'Avg $1,820', trend: 'Similar' },
          { id: 2, title: 'Competitor B', value: 'Avg $1,780', trend: 'Lower' },
          { id: 3, title: 'Competitor C', value: 'Avg $1,900', trend: 'Higher' },
          { id: 4, title: 'Competitor D', value: 'Avg $1,850', trend: 'Similar' }
        ]
      }
    ]
  },
  {
    id: 'predictive-insights',
    title: '🔮 Predictive Insights',
    description: 'AI-powered predictions and recommendations',
    blocks: [
      {
        id: 'revenue-forecast',
        type: 'chart',
        title: '6-Month Revenue Forecast',
        description: 'Predicted revenue based on trends',
        data: {
          chartType: 'line',
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          values: [75000, 78000, 81000, 79000, 83000, 87000],
          color: '#F59E0B'
        }
      },
      {
        id: 'recommendations',
        type: 'list',
        title: 'AI Recommendations',
        description: 'Actionable insights from AI analysis',
        data: [
          { id: 1, title: 'Increase rent by 3%', value: 'Potential +$2,400/mo', trend: 'High Impact' },
          { id: 2, title: 'Renovate 5 properties', value: 'ROI 18% in 12 months', trend: 'Medium Impact' },
          { id: 3, title: 'Focus on tenant retention', value: 'Save $1,800/mo in turnover', trend: 'High Impact' }
        ]
      },
      {
        id: 'risk-assessment',
        type: 'metric',
        title: 'Portfolio Risk Score',
        description: 'Overall risk assessment (lower is better)',
        value: 'Low Risk',
        trend: '15/100',
        positive: true
      }
    ]
  }
];

/**
 * Analytics Page Component
 */
const AnalyticsPage: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  const [_refreshing, setRefreshing] = useState(false);

  /**
   * Sub-navigation items for analytics
   */
  const subNavigationItems: NavigationItemType[] = [
    {
      id: 'analytics-overview',
      title: 'Analytics Overview',
      description: 'Complete analytics dashboard',
      icon: '📊',
      route: '/analytics/overview',
    },
    {
      id: 'real-time-analytics',
      title: 'Real-Time Analytics',
      description: 'Live data streaming and instant updates',
      icon: '⚡',
      route: '/analytics/realtime',
      badge: 'LIVE',
    },
    {
      id: 'financial-reports',
      title: 'Financial Reports',
      description: 'Detailed financial analytics',
      icon: '�',
      route: '/analytics/financial',
    },
    {
      id: 'tenant-analytics',
      title: 'Tenant Analytics',
      description: 'Tenant behavior and satisfaction',
      icon: '�',
      route: '/analytics/tenants',
    },
    {
      id: 'market-intelligence',
      title: 'Market Intelligence',
      description: 'Real estate market trends',
      icon: '📈',
      route: '/analytics/market',
    },
    {
      id: 'predictive-insights',
      title: 'Predictive Insights',
      description: 'AI-powered predictions',
      icon: '�',
      route: '/analytics/predictive',
    },
  ];

  /**
   * Handle navigation item press
   */
  const handleNavigationPress = useCallback((item: NavigationItemType) => {
    console.log('Analytics sub-navigation:', item.route);
    // Navigate to sub-page
    navigateToRoute(item.route);
  }, [navigateToRoute]);

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
    console.log('Analytics block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Analytics & Reports</Text>
          <Text style={styles.headerSubtitle}>Deep insights and performance metrics</Text>
        </View>

        {/* Sub-navigation */}
        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Analytics Tools</Text>
          {subNavigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              onPress={handleNavigationPress}
              hapticFeedback={true}
            />
          ))}
        </View>

        {/* Analytics Sections */}
        <View style={styles.contentSection}>
          {analyticsSections.map((section) => (
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
 * Main Component without Navigation Provider (already in parent)
 */
const AnalyticsIndex: React.FC<{ navigateToRoute: (route: string) => void }> = ({ navigateToRoute }) => {
  return <AnalyticsPage navigateToRoute={navigateToRoute} />;
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
  navigationSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 16,
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

export default AnalyticsIndex;