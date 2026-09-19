/**
 * Team Management Page
 * Completely different page with 6 scrollable sections
 * Manage team members and permissions
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

const teamSections: ContentSection[] = [
  {
    id: 'team-overview',
    title: '👥 Team Overview',
    description: 'Your team summary',
    blocks: [
      {
        id: 'total-members',
        type: 'metric',
        title: 'Team Members',
        description: 'Total team size',
        value: '8',
        trend: '+2 this month',
        positive: true
      },
      {
        id: 'active-users',
        type: 'metric',
        title: 'Active Users',
        description: 'Currently active',
        value: '6',
        trend: '75% active',
        positive: true
      }
    ]
  },
  {
    id: 'team-members',
    title: '👤 Team Members',
    description: 'List of team members',
    blocks: [
      {
        id: 'member-list',
        type: 'list',
        title: 'All Members',
        description: 'Team member directory',
        data: [
          { id: 1, title: 'John Smith', value: 'Admin', trend: 'Active' },
          { id: 2, title: 'Sarah Johnson', value: 'Manager', trend: 'Active' },
          { id: 3, title: 'Michael Chen', value: 'Staff', trend: 'Active' },
          { id: 4, title: 'Emily Davis', value: 'Staff', trend: 'Away' }
        ]
      }
    ]
  },
  {
    id: 'roles-permissions',
    title: '🔐 Roles & Permissions',
    description: 'Role-based access control',
    blocks: [
      {
        id: 'role-list',
        type: 'list',
        title: 'Available Roles',
        description: 'Team role definitions',
        data: [
          { id: 1, title: 'Admin', value: 'Full access', trend: '2 members' },
          { id: 2, title: 'Manager', value: 'Management access', trend: '3 members' },
          { id: 3, title: 'Staff', value: 'Limited access', trend: '3 members' }
        ]
      }
    ]
  },
  {
    id: 'pending-invites',
    title: '📧 Pending Invites',
    description: 'Pending team invitations',
    blocks: [
      {
        id: 'invite-list',
        type: 'list',
        title: 'Invitations',
        description: 'Awaiting acceptance',
        data: [
          { id: 1, title: 'robert@example.com', value: 'Sent 2 days ago', trend: 'Pending' },
          { id: 2, title: 'lisa@example.com', value: 'Sent 5 days ago', trend: 'Pending' }
        ]
      }
    ]
  },
  {
    id: 'team-activity',
    title: '📊 Team Activity',
    description: 'Team performance metrics',
    blocks: [
      {
        id: 'activity-chart',
        type: 'chart',
        title: 'Weekly Activity',
        description: 'Team engagement',
        data: {
          chartType: 'bar',
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          values: [6, 7, 6, 8, 7, 2, 1],
          color: '#8B5CF6'
        }
      }
    ]
  },
  {
    id: 'team-settings',
    title: '⚙️ Team Settings',
    description: 'Team configuration',
    blocks: [
      {
        id: 'setting-list',
        type: 'list',
        title: 'Team Configuration',
        description: 'Team-wide settings',
        data: [
          { id: 1, title: 'Team Name', value: 'AnyRenting Team', trend: 'Edit' },
          { id: 2, title: 'Default Role', value: 'Staff', trend: 'Change' },
          { id: 3, title: 'Notification Settings', value: 'Team-wide', trend: 'Configure' }
        ]
      }
    ]
  }
];

const TeamManagementPage: React.FC = () => {
  const [_refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleBlockPress = useCallback((block: ContentBlock) => {
    console.log('Team block pressed:', block.id);
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
          <Text style={styles.headerTitle}>Team Management</Text>
          <Text style={styles.headerSubtitle}>Manage team members and permissions</Text>
        </View>

        <View style={styles.contentSection}>
          {teamSections.map((section) => (
            <ScrollingSectionContainer
              key={section.id}
              section={section}
              renderBlock={renderContentBlock}
              onRefresh={handleRefresh}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>8 team members</Text>
          <Text style={styles.footerSubtext}>2 pending invitations</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TeamManagementIndex: React.FC = () => {
  return <TeamManagementPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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

export default TeamManagementIndex;