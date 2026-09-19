/**
 * Rental Applications Page
 * Completely different page with 6 scrollable sections
 * Review and process applications
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

const applicationsSections: ContentSection[] = [
  {
    id: 'pending-applications',
    title: '⏳ Pending Applications',
    description: 'Applications awaiting review',
    blocks: [
      {
        id: 'pending-count',
        type: 'metric',
        title: 'Pending Review',
        description: 'Applications to process',
        value: '8',
        trend: '+2 this week',
        positive: false
      },
      {
        id: 'pending-list',
        type: 'list',
        title: 'Awaiting Action',
        description: 'Applications needing review',
        data: [
          { id: 1, title: 'John Doe', value: 'Unit 204', trend: 'Submitted 2 days ago' },
          { id: 2, title: 'Jane Smith', value: 'Unit 312', trend: 'Submitted 3 days ago' },
          { id: 3, title: 'Mike Johnson', value: 'Unit 456', trend: 'Submitted 5 days ago' }
        ]
      }
    ]
  },
  {
    id: 'application-stats',
    title: '📊 Application Statistics',
    description: 'Application metrics',
    blocks: [
      {
        id: 'approval-rate',
        type: 'metric',
        title: 'Approval Rate',
        description: 'Applications approved',
        value: '68%',
        trend: '+5%',
        positive: true
      }
    ]
  },
  {
    id: 'recent-decisions',
    title: '✅ Recent Decisions',
    description: 'Latest application decisions',
    blocks: [
      {
        id: 'decision-list',
        type: 'list',
        title: 'This Week',
        description: 'Recent approvals/rejections',
        data: [
          { id: 1, title: 'Sarah Wilson', value: 'Approved', trend: 'Unit 156' },
          { id: 2, title: 'Tom Brown', value: 'Approved', trend: 'Unit 289' },
          { id: 3, title: 'Lisa Davis', value: 'Rejected', trend: 'Credit score' }
        ]
      }
    ]
  },
  {
    id: 'application-criteria',
    title: '📋 Application Criteria',
    description: 'Approval requirements',
    blocks: [
      {
        id: 'criteria-list',
        type: 'list',
        title: 'Requirements',
        description: 'Minimum qualifications',
        data: [
          { id: 1, title: 'Credit Score', value: '650+', trend: 'Required' },
          { id: 2, title: 'Income Ratio', value: '3x rent', trend: 'Required' },
          { id: 3, title: 'Background Check', value: 'Clean', trend: 'Required' }
        ]
      }
    ]
  },
  {
    id: 'waiting-list',
    title: '📝 Waiting List',
    description: 'Waitlisted applications',
    blocks: [
      {
        id: 'waitlist-list',
        type: 'list',
        title: 'Waitlisted Candidates',
        description: 'Backup applications',
        data: [
          { id: 1, title: 'Alex Turner', value: 'Unit 204', trend: 'Priority 1' },
          { id: 2, title: 'Emma White', value: 'Unit 312', trend: 'Priority 2' }
        ]
      }
    ]
  },
  {
    id: 'application-templates',
    title: '📄 Application Templates',
    description: 'Application forms',
    blocks: [
      {
        id: 'template-list',
        type: 'list',
        title: 'Available Forms',
        description: 'Application templates',
        data: [
          { id: 1, title: 'Standard Form', value: 'PDF', trend: 'Download' },
          { id: 2, title: 'Corporate Form', value: 'PDF', trend: 'Download' },
          { id: 3, title: 'Student Form', value: 'PDF', trend: 'Download' }
        ]
      }
    ]
  }
];

const RentalApplicationsPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Applications block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Rental Applications</Text>
          <Text style={styles.headerSubtitle}>Review and process applications</Text>
        </View>

        <View style={styles.contentSection}>
          {applicationsSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>8 pending applications</Text>
          <Text style={styles.footerSubtext}>68% approval rate</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const RentalApplicationsIndex: React.FC = () => {
  return <RentalApplicationsPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
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

export default RentalApplicationsIndex;