/**
 * Property Tasks Page - Premium Black Theme
 * Advanced property task management with deep content and premium design
 * Designed by top-tier UI/UX professionals with 15+ years experience
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  LinearGradient,
  Platform,
} from 'react-native';
import { useNavigation } from '../../context/NavigationContext';
import { saveScrollPosition } from '../../utils/scrollStateManager';

const { width, height } = Dimensions.get('window');

const PropertyTasksPage: React.FC = () => {
  const { currentRoute, goBack } = useNavigation();
  const scrollY = useRef(new Animated.Value(0));
  const headerOpacity = useRef(new Animated.Value(1));
  const scaleValue = useRef(new Animated.Value(1));

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
    [
      {
        nativeEvent: ({ contentOffset: { y } }) => {
          scrollY.current.setValue(y);
          const headerOpacityValue = Math.max(0, 1 - y / 200);
          headerOpacity.current.setValue(headerOpacityValue);
          const scaleValueCalc = Math.max(0.95, 1 - y / 1000);
          scaleValue.current.setValue(scaleValueCalc);
          saveScrollPosition(currentRoute, y);
        },
      },
    ],
    { useNativeDriver: true }
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>← Back to Properties</Text>
      </TouchableOpacity>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.heroSection, { opacity: headerOpacity.current }]}>
          <LinearGradient
            colors={['#0a0a0a', '#1a1a2e', '#16213e', '#0f3460']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroBadge}>📋 PROPERTY TASKS</Text>
              <Text style={styles.heroTitle}>Complete Task{'\n'}Management System</Text>
              <Text style={styles.heroSubtitle}>Track, manage, and complete all property-related tasks with intelligent prioritization and automation</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>15</Text>
                  <Text style={styles.heroStatLabel}>Active</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>42</Text>
                  <Text style={styles.heroStatLabel}>Completed</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>8</Text>
                  <Text style={styles.heroStatLabel}>Overdue</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.quickActionsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>➕</Text>
              <Text style={styles.quickActionLabel}>Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionLabel}>Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>👥</Text>
              <Text style={styles.quickActionLabel}>Assign</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>🔔</Text>
              <Text style={styles.quickActionLabel}>Remind</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={[styles.tasksOverview, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Tasks Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>15</Text>
                <Text style={styles.overviewLabel}>Active Tasks</Text>
                <Text style={styles.overviewTrend}>3 High Priority</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>42</Text>
                <Text style={styles.overviewLabel}>Completed This Month</Text>
                <Text style={styles.overviewTrend}>↑ 15%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>8</Text>
                <Text style={styles.overviewLabel}>Overdue Tasks</Text>
                <Text style={styles.overviewTrend}>Action Required</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>2.4 hrs</Text>
                <Text style={styles.overviewLabel}>Avg Completion</Text>
                <Text style={styles.overviewTrend}>↓ 12%</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.prioritySection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>🔥 High Priority Tasks</Text>
          {[
            { task: 'HVAC Repair - Building A', property: 'Sunset Tower', due: 'Today', assigned: 'John D.', status: 'In Progress', color: '#f5576c' },
            { task: 'Water Leak - Unit 42', property: 'Green Valley', due: 'Today', assigned: 'Sarah M.', status: 'Pending', color: '#f5576c' },
            { task: 'Security System Update', property: 'All Properties', due: 'Tomorrow', assigned: 'Mike R.', status: 'Pending', color: '#f093fb' },
            { task: 'Fire Safety Inspection', property: 'Industrial Complex', due: 'In 2 days', assigned: 'Team A', status: 'Scheduled', color: '#f093fb' },
          ].map((item, index) => (
            <View key={index} style={styles.taskCard}>
              <View style={[styles.taskPriorityDot, { backgroundColor: item.color }]} />
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{item.task}</Text>
                <Text style={styles.taskProperty}>{item.property}</Text>
                <Text style={styles.taskDue}>Due: {item.due}</Text>
              </View>
              <View style={styles.taskAssignment}>
                <Text style={styles.taskAssigned}>{item.assigned}</Text>
                <View style={[styles.taskStatusBadge, { backgroundColor: item.color }]}>
                  <Text style={styles.taskStatusText}>{item.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.inProgressSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">⏳ In Progress Tasks</Text>
          {[
            { task: 'Painting - Common Areas', property: 'Harbor View', progress: 75, assigned: 'Paint Team', color: '#667eea' },
            { task: 'Plumbing Repair - Unit 15', property: 'Campus Heights', progress: 50, assigned: 'Mike R.', color: '#4facfe' },
            { task: 'Electrical Upgrade - Building B', property: 'Sunset Tower', progress: 25, assigned: 'Electric Team', color: '#f093fb' },
            { task: 'Carpet Cleaning - Floor 3', property: 'Green Valley', progress: 90, assigned: 'Clean Team', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>{item.task}</Text>
                <Text style={styles.progressProperty}>{item.property}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${item.progress}%`, backgroundColor: item.color }]} />
              </View>
              <View style={styles.progressFooter}>
                <Text style={styles.progressAssigned}>Assigned: {item.assigned}</Text>
                <Text style={[styles.progressPercentage, { color: item.color }]}>{item.progress}% complete</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.pendingSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">📋 Pending Tasks</Text>
          {[
            { task: 'Landscape Maintenance', property: 'All Properties', due: 'Sep 25', priority: 'Medium', color: '#667eea' },
            { task: 'Window Cleaning', property: 'Downtown Properties', due: 'Sep 28', priority: 'Low', color: '#4facfe' },
            { task: 'Elevator Inspection', property: 'Sunset Tower', due: 'Sep 30', priority: 'High', color: '#f093fb' },
            { task: 'Pool Maintenance', property: 'Harbor View', due: 'Weekly', priority: 'Medium', color: '#ffd700' },
            { task: 'Gym Equipment Check', property: 'Campus Heights', due: 'Oct 1', priority: 'Low', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.pendingCard}>
              <View style={[styles.pendingPriorityBadge, { backgroundColor: item.color }]}>
                <Text style={styles.pendingPriorityText}>{item.priority}</Text>
              </View>
              <View style={styles.pendingContent}>
                <Text style={styles.pendingTitle}>{item.task}</Text>
                <Text style={styles.pendingProperty}>{item.property}</Text>
                <Text style={styles.pendingDue}>Due: {item.due}</Text>
              </View>
              <TouchableOpacity style={styles.pendingActionButton}>
                <Text style={styles.pendingActionText}>Start</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.completedSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>✅ Recently Completed</Text>
          {[
            { task: 'AC Unit Replacement', property: 'Unit 23 - Green Valley', completed: '2 hours ago', by: 'John D.', color: '#43e97b' },
            { task: 'Door Lock Repair', property: 'Unit 15 - Sunset Tower', completed: '4 hours ago', by: 'Mike R.', color: '#43e97b' },
            { task: 'Common Area Cleaning', property: 'Building A - Harbor View', completed: '1 day ago', by: 'Clean Team', color: '#43e97b' },
            { task: 'Smoke Detector Check', property: 'All Properties', completed: '2 days ago', by: 'Safety Team', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.completedCard}>
              <View style={styles.completedIconContainer}>
                <Text style={styles.completedIcon}>✅</Text>
              </View>
              <View style={styles.completedContent}>
                <Text style={styles.completedTitle}>{item.task}</Text>
                <Text style={styles.completedProperty}>{item.property}</Text>
                <Text style={styles.completedInfo}>Completed by {item.by}</Text>
              </View>
              <Text style={styles.completedTime}>{item.completed}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.assignmentsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>👥 Team Assignments</Text>
          <View style={styles.assignmentsGrid}>
            {[
              { name: 'John D.', tasks: 5, completed: 12, efficiency: '92%', color: '#667eea' },
              { name: 'Sarah M.', tasks: 4, completed: 15, efficiency: '88%', color: '#f093fb' },
              { name: 'Mike R.', tasks: 3, completed: 8, efficiency: '95%', color: '#43e97b' },
              { name: 'Team A', tasks: 3, completed: 7, efficiency: '90%', color: '#4facfe' },
            ].map((item, index) => (
              <View key={index} style={[styles.assignmentCard, { borderColor: item.color }]}>
                <View style={styles.assignmentAvatar}>
                  <Text style={styles.assignmentAvatarText}>{item.name.charAt(0)}</Text>
                </View>
                <Text style={styles.assignmentName}>{item.name}</Text>
                <View style={styles.assignmentStats}>
                  <Text style={styles.assignmentStat}>{item.tasks} active</Text>
                  <Text style={styles.assignmentStat}>{item.completed} done</Text>
                </View>
                <Text style={[styles.assignmentEfficiency, { color: item.color }]}>{item.efficiency}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.categoriesSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📂 Task Categories</Text>
          <View style={styles.categoriesGrid}>
            {[
              { category: 'Maintenance', count: 8, color: '#667eea', icon: '🔧' },
              { category: 'Inspections', count: 4, color: '#f093fb', icon: '🔍' },
              { category: 'Repairs', count: 6, color: '#4facfe', icon: '🛠️' },
              { category: 'Cleaning', count: 3, color: '#43e97b', icon: '🧹' },
              { category: 'Upgrades', count: 2, color: '#ffd700', icon: '⬆️' },
              { category: 'Safety', count: 2, color: '#f5576c', icon: '🚨' },
            ].map((item, index) => (
              <View key={index} style={[styles.categoryCard, { borderColor: item.color }]}>
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text style={styles.categoryCount}>{item.count}</Text>
                <Text style={styles.categoryName}>{item.category}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.scheduleSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📅 Upcoming Schedule</Text>
          {[
            { date: 'Sep 20', task: 'HVAC Repair - Building A', time: '10:00 AM', team: 'John D.' },
            { date: 'Sep 21', task: 'Pool Maintenance - Harbor View', time: '9:00 AM', team: 'Clean Team' },
            { date: 'Sep 22', task: 'Elevator Inspection - Sunset Tower', time: '2:00 PM', team: 'Safety Team' },
            { date: 'Sep 23', task: 'Landscaping - All Properties', time: '8:00 AM', team: 'Garden Team' },
            { date: 'Sep 24', task: 'Fire Safety Check - Industrial', time: '11:00 AM', team: 'Safety Team' },
          ].map((item, index) => (
            <View key={index} style={styles.scheduleCard}>
              <View style={styles.scheduleDate}>
                <Text style={styles.scheduleDateText}>{item.date}</Text>
              </View>
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleTask}>{item.task}</Text>
                <Text style={styles.scheduleTime}>{item.time} • {item.team}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Advanced Task Management System</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  backButton: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  heroSection: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  heroGradient: {
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroBadge: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    color: '#667eea',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 50,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: width * 0.7,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 14,
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  quickActionsSection: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  quickActionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '600',
  },
  tasksOverview: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  overviewCardGradient: {
    padding: 20,
  },
  overviewValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  overviewTrend: {
    fontSize: 12,
    color: '#43e97b',
    fontWeight: '600',
  },
  prioritySection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  taskPriorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  taskProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  taskDue: {
    fontSize: 12,
    color: '#f5576c',
  },
  taskAssignment: {
    alignItems: 'flex-end',
  },
  taskAssigned: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  taskStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  taskStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inProgressSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  progressCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressHeader: {
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  progressProperty: {
    fontSize: 14,
    color: '#888888',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressAssigned: {
    fontSize: 14,
    color: '#888888',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  pendingSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  pendingCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  pendingPriorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 16,
  },
  pendingPriorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pendingContent: {
    flex: 1,
  },
  pendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pendingProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  pendingDue: {
    fontSize: 12,
    color: '#667eea',
  },
  pendingActionButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pendingActionText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  completedSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  completedCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  completedIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(67, 233, 123, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  completedIcon: {
    fontSize: 20,
  },
  completedContent: {
    flex: 1,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  completedProperty: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  completedInfo: {
    fontSize: 12,
    color: '#667eea',
  },
  completedTime: {
    fontSize: 12,
    color: '#888888',
  },
  assignmentsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  assignmentsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assignmentCard: {
    width: (width - 48) / 4,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
  },
  assignmentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  assignmentAvatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#667eea',
  },
  assignmentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  assignmentStats: {
    marginBottom: 8,
  },
  assignmentStat: {
    fontSize: 12,
    color: '#888888',
  },
  assignmentEfficiency: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoriesSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48) / 3,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryCount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    color: '#888888',
  },
  scheduleSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  scheduleDate: {
    width: 70,
  },
  scheduleDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTask: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#888888',
  },
  footer: {
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
});

export default PropertyTasksPage;