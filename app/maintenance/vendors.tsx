/**
 * Vendor Management Page
 * Completely different page with 6 scrollable sections
 * Manage service providers
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

const vendorSections: ContentSection[] = [
  {
    id: 'active-vendors',
    title: '👷 Active Vendors',
    description: 'Currently contracted service providers',
    blocks: [
      {
        id: 'vendor-list',
        type: 'list',
        title: 'Service Providers',
        description: 'Active vendor contracts',
        data: [
          { id: 1, title: 'Plumbing Pro Services', value: '12 active tasks', trend: 'Excellent' },
          { id: 2, title: 'Electric Masters', value: '8 active tasks', trend: 'Good' },
          { id: 3, title: 'HVAC Specialists Inc', value: '15 active tasks', trend: 'Excellent' },
          { id: 4, title: 'General Repairs Co', value: '6 active tasks', trend: 'Good' }
        ]
      }
    ]
  },
  {
    id: 'vendor-performance',
    title: '⭐ Vendor Performance',
    description: 'Performance ratings and metrics',
    blocks: [
      {
        id: 'performance-chart',
        type: 'chart',
        title: 'Vendor Ratings',
        description: 'Average performance scores',
        data: {
          chartType: 'bar',
          labels: ['Plumbing', 'Electrical', 'HVAC', 'General'],
          values: [4.8, 4.5, 4.7, 4.3],
          color: '#F59E0B'
        }
      }
    ]
  },
  {
    id: 'vendor-directory',
    title: '📋 Vendor Directory',
    description: 'Browse all available vendors',
    blocks: [
      {
        id: 'directory-list',
        type: 'list',
        title: 'Available Vendors',
        description: 'Service providers available',
        data: [
          { id: 1, title: 'Emergency Plumbing', value: '24/7 service', trend: 'Available' },
          { id: 2, title: 'Quick Electric', value: 'Same day service', trend: 'Available' },
          { id: 3, title: 'Comfort HVAC', value: 'Seasonal contracts', trend: 'Available' }
        ]
      }
    ]
  },
  {
    id: 'contract-management',
    title: '📄 Contract Management',
    description: 'Vendor contracts and agreements',
    blocks: [
      {
        id: 'contract-list',
        type: 'list',
        title: 'Active Contracts',
        description: 'Current vendor agreements',
        data: [
          { id: 1, title: 'Plumbing Pro Services', value: 'Expires: Dec 2024', trend: 'Active' },
          { id: 2, title: 'Electric Masters', value: 'Expires: Jan 2025', trend: 'Active' },
          { id: 3, title: 'HVAC Specialists', value: 'Expires: Mar 2025', trend: 'Active' }
        ]
      }
    ]
  },
  {
    id: 'vendor-costs',
    title: '💰 Vendor Costs',
    description: 'Vendor pricing and costs',
    blocks: [
      {
        id: 'cost-metrics',
        type: 'metric',
        title: 'Monthly Vendor Costs',
        description: 'Total monthly vendor expenses',
        value: '$8,500',
        trend: '+$500',
        positive: false
      },
      {
        id: 'cost-chart',
        type: 'chart',
        title: 'Cost by Vendor',
        description: 'Expense distribution',
        data: {
          chartType: 'pie',
          labels: ['Plumbing', 'Electrical', 'HVAC', 'General'],
          values: [3200, 2800, 1500, 1000],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        }
      }
    ]
  },
  {
    id: 'vendor-feedback',
    title: '💬 Vendor Feedback',
    description: 'Vendor performance feedback',
    blocks: [
      {
        id: 'feedback-list',
        type: 'list',
        title: 'Recent Feedback',
        description: 'Latest vendor reviews',
        data: [
          { id: 1, title: 'Plumbing Pro Services', value: '4.8/5.0', trend: 'Excellent work' },
          { id: 2, title: 'Electric Masters', value: '4.5/5.0', trend: 'Good response time' },
          { id: 3, title: 'HVAC Specialists', value: '4.7/5.0', trend: 'Professional service' }
        ]
      }
    ]
  }
];

const VendorManagementPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Vendor block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Vendor Management</Text>
          <Text style={styles.headerSubtitle}>Manage service providers</Text>
        </View>

        <View style={styles.contentSection}>
          {vendorSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>5 active vendors</Text>
          <Text style={styles.footerSubtext}>Average rating: 4.6/5.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const VendorManagementIndex: React.FC = () => {
  return <VendorManagementPage />;
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

export default VendorManagementIndex;