/**
 * Predictive Insights Page
 * Completely different page with 6 scrollable sections
 * AI-powered predictions and forecasts
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

const predictiveSections: ContentSection[] = [
  {
    id: 'revenue-forecast',
    title: '💰 Revenue Forecast',
    description: 'AI-powered revenue predictions',
    blocks: [
      {
        id: '6-month-forecast',
        type: 'metric',
        title: '6-Month Forecast',
        description: 'Predicted total revenue',
        value: '$1.8M',
        trend: '+$120K',
        positive: true
      },
      {
        id: 'forecast-chart',
        type: 'chart',
        title: 'Revenue Prediction',
        description: 'AI forecast vs actual',
        data: {
          chartType: 'line',
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          values: [
            { name: 'Predicted', data: [295000, 305000, 315000, 325000, 335000, 345000], color: '#3B82F6' },
            { name: 'Actual', data: [290000, 298000, 310000, 320000, 330000, 340000], color: '#10B981' }
          ]
        }
      }
    ]
  },
  {
    id: 'occupancy-prediction',
    title: '🏢 Occupancy Prediction',
    description: 'Predicted occupancy rates',
    blocks: [
      {
        id: 'predicted-occupancy',
        type: 'metric',
        title: 'Predicted Occupancy',
        description: 'AI-predicted occupancy rate',
        value: '91%',
        trend: '+4%',
        positive: true
      },
      {
        id: 'occupancy-chart',
        type: 'chart',
        title: 'Occupancy Trend Prediction',
        description: 'Future occupancy forecast',
        data: {
          chartType: 'line',
          labels: ['Now', '+1M', '+2M', '+3M', '+4M', '+5M'],
          values: [87, 88, 89, 90, 91, 91],
          color: '#F59E0B'
        }
      }
    ]
  },
  {
    id: 'maintenance-prediction',
    title: '🔧 Maintenance Prediction',
    description: 'Predictive maintenance needs',
    blocks: [
      {
        id: 'predicted-issues',
        type: 'metric',
        title: 'Predicted Issues',
        description: 'AI-predicted maintenance needs',
        value: '15',
        trend: 'Next 30 days',
        positive: false
      },
      {
        id: 'maintenance-chart',
        type: 'chart',
        title: 'Issue Type Prediction',
        description: 'Predicted maintenance categories',
        data: {
          chartType: 'bar',
          labels: ['HVAC', 'Plumbing', 'Electrical', 'Structural'],
          values: [5, 4, 3, 3],
          color: '#EF4444'
        }
      }
    ]
  },
  {
    id: 'tenant-churn-prediction',
    title: '👥 Tenant Churn Prediction',
    description: 'Predict tenant turnover',
    blocks: [
      {
        id: 'churn-risk',
        type: 'metric',
        title: 'Churn Risk',
        description: 'Predicted tenant turnover rate',
        value: '8%',
        trend: '-2%',
        positive: true
      },
      {
        id: 'at-risk-tenants',
        type: 'list',
        title: 'At-Risk Tenants',
        description: 'Tenants likely to leave',
        data: [
          { id: 1, title: 'Unit 204 - John Smith', value: 'High Risk', trend: 'Contact' },
          { id: 2, title: 'Unit 312 - Sarah Johnson', value: 'Medium Risk', trend: 'Monitor' },
          { id: 3, title: 'Unit 456 - Michael Chen', value: 'Low Risk', trend: 'Keep' }
        ]
      }
    ]
  },
  {
    id: 'market-prediction',
    title: '📈 Market Prediction',
    description: 'Market trend forecasts',
    blocks: [
      {
        id: 'market-growth',
        type: 'metric',
        title: 'Market Growth',
        description: 'Predicted market expansion',
        value: '12%',
        trend: 'Next 12 months',
        positive: true
      },
      {
        id: 'market-chart',
        type: 'chart',
        title: 'Market Trend Forecast',
        description: 'Future market direction',
        data: {
          chartType: 'line',
          labels: ['2024', '2025', '2026', '2027'],
          values: [100, 112, 125, 140],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'ai-recommendations',
    title: '🤖 AI Recommendations',
    description: 'AI-powered action recommendations',
    blocks: [
      {
        id: 'priority-actions',
        type: 'list',
        title: 'Priority Actions',
        description: 'AI-recommended next steps',
        data: [
          { id: 1, title: 'Increase Rent by 3%', value: 'Impact: High', trend: 'Recommended' },
          { id: 2, title: 'Renovate 5 Properties', value: 'ROI: 18%', trend: 'Recommended' },
          { id: 3, title: 'Focus on Retention', value: 'Save: $1,800/mo', trend: 'Recommended' }
        ]
      },
      {
        id: 'confidence-score',
        type: 'metric',
        title: 'AI Confidence',
        description: 'AI prediction accuracy',
        value: '94%',
        trend: 'High Confidence',
        positive: true
      }
    ]
  }
];

const PredictiveInsightsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Predictive block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Predictive Insights</Text>
          <Text style={styles.headerSubtitle}>AI-powered predictions and forecasts</Text>
        </View>

        <View style={styles.contentSection}>
          {predictiveSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>AI predictions updated daily</Text>
          <Text style={styles.footerSubtext}>Confidence: 94%</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PredictiveInsightsIndex: React.FC = () => {
  return <PredictiveInsightsPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E7FF',
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

export default PredictiveInsightsIndex;