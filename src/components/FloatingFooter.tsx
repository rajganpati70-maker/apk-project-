/**
 * Floating Footer Component
 * Expandable/collapsible floating footer with premium animations and context-aware navigation
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '../context/NavigationContext';

const { width } = Dimensions.get('window');

interface FloatingFooterProps {
  context?: string;
  onActionPress?: (action: string) => void;
}

const FloatingFooter: React.FC<FloatingFooterProps> = ({ context = 'default', onActionPress }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));
  const { currentRoute } = useNavigation();

  const toggleExpand = useCallback(() => {
    const toValue = expanded ? 0 : 1;
    Animated.parallel([
      Animated.spring(animation, {
        toValue,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: expanded ? 1 : 1.02,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
    setExpanded(!expanded);
  }, [expanded, animation, scaleAnim]);

  const handleActionPress = useCallback((action: string) => {
    if (onActionPress) {
      onActionPress(action);
    }
    console.log('Footer action pressed:', action);
    toggleExpand();
  }, [onActionPress, toggleExpand]);

  // Context-aware actions based on current route
  const getContextActions = () => {
    if (currentRoute.includes('/properties')) {
      return [
        { id: 'add-property', label: 'Add Property', icon: '➕' },
        { id: 'schedule-inspection', label: 'Schedule Inspection', icon: '🔍' },
        { id: 'view-map', label: 'View Map', icon: '🗺️' },
        { id: 'generate-report', label: 'Generate Report', icon: '📊' },
      ];
    } else if (currentRoute.includes('/leads')) {
      return [
        { id: 'add-lead', label: 'Add Lead', icon: '➕' },
        { id: 'call-lead', label: 'Call Lead', icon: '📞' },
        { id: 'schedule-visit', label: 'Schedule Visit', icon: '📅' },
        { id: 'send-reminder', label: 'Send Reminder', icon: '📧' },
      ];
    } else if (currentRoute.includes('/rent')) {
      return [
        { id: 'send-reminder', label: 'Send Reminder', icon: '📧' },
        { id: 'record-payment', label: 'Record Payment', icon: '💳' },
        { id: 'generate-invoice', label: 'Generate Invoice', icon: '📄' },
        { id: 'view-history', label: 'View History', icon: '📊' },
      ];
    } else if (currentRoute.includes('/accounting')) {
      return [
        { id: 'add-expense', label: 'Add Expense', icon: '➕' },
        { id: 'record-income', label: 'Record Income', icon: '💰' },
        { id: 'run-report', label: 'Run Report', icon: '📊' },
        { id: 'export-data', label: 'Export Data', icon: '📥' },
      ];
    } else {
      return [
        { id: 'quick-add', label: 'Quick Add', icon: '➕' },
        { id: 'search', label: 'Search', icon: '🔍' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
      ];
    }
  };

  const contextActions = getContextActions();

  const footerHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [64, 220],
  });

  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: footerHeight,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {/* Expanded Actions */}
      <Animated.View
        style={[
          styles.expandedContent,
          {
            opacity: animation,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.actionsGrid}>
          {contextActions.map((action, index) => (
            <Animated.View
              key={action.id}
              style={[
                styles.actionButton,
                {
                  opacity: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  transform: [
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.actionTouch}
                onPress={() => handleActionPress(action.id)}
                activeOpacity={0.7}
              >
                <View style={styles.actionIconContainer}>
                  <Text style={styles.actionIcon}>{action.icon}</Text>
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      {/* Collapsed Footer */}
      <View style={styles.collapsedFooter}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleExpand}
          activeOpacity={0.8}
        >
          <Animated.Text
            style={[
              styles.toggleIcon,
              {
                transform: [{ rotate: rotateIcon }],
              },
            ]}
          >
            +
          </Animated.Text>
        </TouchableOpacity>

        <View style={styles.footerContent}>
          <Text style={styles.footerTitle}>Quick Actions</Text>
          <Text style={styles.footerSubtitle}>
            {expanded ? 'Tap to collapse' : 'Tap to expand'}
          </Text>
        </View>

        <View style={styles.contextIndicator}>
          <Text style={styles.contextText}>{context}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60, // Above tab bar
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  expandedContent: {
    flex: 1,
    padding: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - 64) / 4,
    alignItems: 'center',
  },
  actionTouch: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 22,
  },
  actionLabel: {
    fontSize: 11,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  collapsedFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  toggleIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '200',
    lineHeight: 28,
  },
  footerContent: {
    flex: 1,
  },
  footerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  footerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  contextIndicator: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  contextText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default FloatingFooter;