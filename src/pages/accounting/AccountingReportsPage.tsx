/**
 * Accounting Reports Page - Premium Black Theme
 * Advanced financial reports with deep content and premium design
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

const AccountingReportsPage: React.FC = () => {
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
        <Text style={styles.backButtonText}>← Back to Accounting</Text>
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
              <Text style={styles.heroBadge}>📊 FINANCIAL REPORTS</Text>
              <Text style={styles.heroTitle}>Complete Financial{'\n'}Analytics & Reports</Text>
              <Text style={styles.heroSubtitle}>Generate detailed financial reports with comprehensive insights and data visualization</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>45</Text>
                  <Text style={styles.heroStatLabel}>Reports</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>12</Text>
                  <Text style={styles.heroStatLabel}>Types</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>Real-time</Text>
                  <Text style={styles.heroStatLabel}>Data</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.overviewSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📊 Report Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$3.2M</Text>
                <Text style={styles.overviewLabel}>YTD Revenue</Text>
                <Text style={styles.overviewTrend}>↑ 15.6%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$1.5M</Text>
                <Text style={styles.overviewLabel}>YTD Expenses</Text>
                <Text style={styles.overviewTrend}>↓ 3.2%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>$1.7M</Text>
                <Text style={styles.overviewLabel}>Net Profit</Text>
                <Text style={styles.overviewTrend}>↑ 22.4%</Text>
              </LinearGradient>
            </View>
            <View style={styles.overviewCard}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.overviewCardGradient}>
                <Text style={styles.overviewValue}>53.1%</Text>
                <Text style={styles.overviewLabel}>Profit Margin</Text>
                <Text style={styles.overviewTrend}>↑ 8.2%</Text>
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[quickReportsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>⚡ Quick Reports</Text>
          <View style={styles.quickReportsGrid}>
            {[
              { report: 'Profit & Loss', description: 'Monthly P&L statement', icon: '📈', color: '#667eea' },
              { report: 'Cash Flow', description: 'Cash flow analysis', icon: '💰', color: '#43e97b' },
              { report: 'Balance Sheet', description: 'Assets & liabilities', icon: '📊', color: '#f093fb' },
              { report: 'Revenue', description: 'Income breakdown', icon: '💵', color: '#4facfe' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={[styles.quickReportCard, { borderColor: item.color }]}>
                <Text style={styles.quickReportIcon}>{item.icon}</Text>
                <Text style={styles.quickReportName}>{item.report}</Text>
                <Text style={styles.quickReportDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[scheduledReportsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📅 Scheduled Reports</Text>
          {[
            { report: 'Monthly P&L', frequency: 'Monthly', next: 'Oct 1, 2024', recipients: '4', color: '#667eea' },
            { report: 'Quarterly Summary', frequency: 'Quarterly', next: 'Oct 1, 2024', recipients: '6', color: '#f093fb' },
            { report: 'Cash Flow Weekly', frequency: 'Weekly', next: 'Sep 26, 2024', recipients: '3', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.scheduledReportCard}>
              <View style={[styles.scheduledReportBadge, { backgroundColor: item.color }]}>
                <Text style={styles.scheduledReportBadgeText}>📧</Text>
              </View>
              <View style={styles.scheduledReportContent}>
                <Text style={styles.scheduledReportName}>{item.report}</Text>
                <Text style={styles.scheduledReportFrequency}>{item.frequency}</Text>
                <Text style={styles.scheduledReportNext}>Next: {item.next}</Text>
              </View>
              <View style={styles.scheduledReportRecipients}>
                <Text style={styles.scheduledReportRecipientsText}>{item.recipients} recipients</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[customReportsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle">🎨 Custom Reports</Text>
          {[
            { report: 'Property Performance', created: 'Sep 15, 2024', lastRun: 'Sep 19, 2024', color: '#667eea' },
            { report: 'Tenant Analysis', created: 'Sep 10, 2024', lastRun: 'Sep 18, 2024', color: '#f093fb' },
            { report: 'Expense Breakdown', created: 'Sep 5, 2024', lastRun: 'Sep 17, 2024', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.customReportCard}>
              <View style={[styles.customReportDot, { backgroundColor: item.color }]} />
              <View style={styles.customReportContent}>
                <Text style={styles.customReportName}>{item.report}</Text>
                <Text style={styles.customReportCreated}>Created: {item.created}</Text>
                <Text style={styles.customReportLastRun}>Last run: {item.lastRun}</Text>
              </View>
              <TouchableOpacity style={styles.customReportRunButton}>
                <Text style={styles.customReportRunText}>Run</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.createCustomReportButton}>
            <Text style={styles.createCustomReportText}>+ Create Custom Report</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.exportOptionsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📤 Export Options</Text>
          <View style={styles.exportOptionsGrid}>
            {[
              { format: 'PDF', description: 'Print-ready format', icon: '📄', color: '#667eea' },
              { format: 'Excel', description: 'Spreadsheet format', icon: '📊', color: '#43e97b' },
              { format: 'CSV', description: 'Data format', icon: '📋', color: '#f093fb' },
              { format: 'Email', description: 'Send via email', icon: '📧', color: '#4facfe' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={[styles.exportOptionCard, { borderColor: item.color }]}>
                <Text style={styles.exportOptionIcon}>{item.icon}</Text>
                <Text style={styles.exportOptionFormat}>{item.format}</Text>
                <Text style={styles.exportOptionDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.recentReportsSection, { transform: [{ scale: scaleValue.current }] }]}>
          <Text style={styles.sectionTitle}>📋 Recent Reports</Text>
          {[
            { report: 'September P&L', generated: 'Sep 19, 2024', type: 'Profit & Loss', size: '2.4 MB', color: '#43e97b' },
            { report: 'Q3 Cash Flow', generated: 'Sep 18, 2024', type: 'Cash Flow', size: '1.8 MB', color: '#43e97b' },
            { report: 'August Expense Report', generated: 'Sep 15, 2024', type: 'Expenses', size: '3.1 MB', color: '#43e97b' },
          ].map((item, index) => (
            <View key={index} style={styles.recentReportCard}>
              <View style={[styles.recentReportStatusDot, { backgroundColor: item.color }]} />
              <View style={styles.recentReportContent}>
                <Text style={styles.recentReportName}>{item.report}</Text>
                <Text style={styles.recentReportType}>{item.type}</Text>
                <Text style={styles.recentReportDetails}>{item.generated} • {item.size}</Text>
              </View>
              <TouchableOpacity style={styles.recentReportDownloadButton}>
                <Text style={styles.recentReportDownloadText}>Download</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.Section>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 AnyRenting. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Advanced Financial Reporting</Text>
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
  overviewSection: {
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
  quickReportsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  quickReportsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickReportCard: {
    width: (width - 48) / 4,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
  },
  quickReportIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickReportName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickReportDescription: {
    fontSize: 10,
    color: '#888888',
    textAlign: 'center',
  },
  scheduledReportsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  scheduledReportCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  scheduledReportBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scheduledReportBadgeText: {
    fontSize: 20,
  },
  scheduledReportContent: {
    flex: 1,
  },
  scheduledReportName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  scheduledReportFrequency: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  scheduledReportNext: {
    fontSize: 12,
    color: '#667eea',
  },
  scheduledReportRecipients: {
    alignItems: 'flex-end',
  },
  scheduledReportRecipientsText: {
    fontSize: 12,
    color: '#888888',
  },
  customReportsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  customReportCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  customReportDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  customReportContent: {
    flex: 1,
  },
  customReportName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  customReportCreated: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  customReportLastRun: {
    fontSize: 12,
    color: '#667eea',
  },
  customReportRunButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  customReportRunText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
  },
  createCustomReportButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  createCustomReportText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
  exportOptionsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  exportOptionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exportOptionCard: {
    width: (width - 48) / 4,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
  },
  exportOptionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  exportOptionFormat: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  exportOptionDescription: {
    fontSize: 10,
    color: '#888888',
    textAlign: 'center',
  },
  recentReportsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  recentReportCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  recentReportStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  recentReportContent: {
    flex: 1,
  },
  recentReportName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recentReportType: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  recentReportDetails: {
    fontSize: 12,
    color: '#667eea',
  },
  recentReportDownloadButton: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  recentReportDownloadText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '600',
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

export default AccountingReportsPage;