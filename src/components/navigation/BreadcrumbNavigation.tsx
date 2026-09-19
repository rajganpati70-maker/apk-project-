/**
 * Breadcrumb Navigation Component
 * Provides breadcrumb navigation trail for user orientation
 * Maintains navigation context and allows quick navigation to previous levels
 */

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BreadcrumbItem } from '../../types';

/**
 * Breadcrumb Navigation Props
 */
interface BreadcrumbNavigationProps {
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbPress: (breadcrumb: BreadcrumbItem) => void;
  maxVisible?: number;
  showHome?: boolean;
  homeIcon?: string;
  testID?: string;
}

/**
 * Breadcrumb Navigation Component
 */
export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  breadcrumbs,
  onBreadcrumbPress,
  maxVisible = 5,
  showHome = true,
  homeIcon = '🏠',
  testID,
}) => {
  /**
   * Get visible breadcrumbs
   */
  const getVisibleBreadcrumbs = (): BreadcrumbItem[] => {
    if (breadcrumbs.length <= maxVisible) {
      return breadcrumbs;
    }

    // Show first, last, and some in between
    const first = breadcrumbs.slice(0, 1);
    const last = breadcrumbs.slice(-2);

    return [
      ...first,
      { id: 'ellipsis', title: '...', route: '', clickable: false },
      ...last,
    ];
  };

  const visibleBreadcrumbs = getVisibleBreadcrumbs();

  return (
    <View style={styles.container} testID={testID}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {showHome && (
          <TouchableOpacity
            style={styles.breadcrumbItem}
            onPress={() => onBreadcrumbPress({
              id: 'home',
              title: 'Home',
              route: '/',
              clickable: true,
            })}
          >
            <Text style={styles.homeIcon}>{homeIcon}</Text>
          </TouchableOpacity>
        )}

        {visibleBreadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.id}>
            {index > 0 || showHome ? (
              <Text style={styles.separator}>›</Text>
            ) : null}

            {breadcrumb.clickable !== false ? (
              <TouchableOpacity
                style={styles.breadcrumbItem}
                onPress={() => onBreadcrumbPress(breadcrumb)}
              >
                <Text
                  style={[
                    styles.breadcrumbText,
                    index === visibleBreadcrumbs.length - 1 && styles.activeBreadcrumb,
                  ]}
                  numberOfLines={1}
                >
                  {breadcrumb.title}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.breadcrumbItem}>
                <Text style={styles.ellipsisText}>{breadcrumb.title}</Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

/**
 * Default styles
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    alignItems: 'center',
  },
  breadcrumbItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  activeBreadcrumb: {
    color: '#111827',
    fontWeight: '600',
  },
  separator: {
    fontSize: 18,
    color: '#9CA3AF',
    marginHorizontal: 4,
    fontWeight: '300',
  },
  homeIcon: {
    fontSize: 18,
  },
  ellipsisText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

/**
 * Breadcrumb navigation hook
 */
export const useBreadcrumbNavigation = () => {
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItem[]>([]);

  const addBreadcrumb = (breadcrumb: BreadcrumbItem) => {
    setBreadcrumbs(prev => {
      // Remove duplicates and add new breadcrumb
      const filtered = prev.filter(b => b.id !== breadcrumb.id);
      return [...filtered, breadcrumb];
    });
  };

  const removeBreadcrumb = (id: string) => {
    setBreadcrumbs(prev => prev.filter(b => b.id !== id));
  };

  const updateBreadcrumb = (id: string, updates: Partial<BreadcrumbItem>) => {
    setBreadcrumbs(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const clearBreadcrumbs = () => {
    setBreadcrumbs([]);
  };

  const navigateToBreadcrumb = (breadcrumb: BreadcrumbItem) => {
    // Remove all breadcrumbs after the selected one
    setBreadcrumbs(prev => {
      const index = prev.findIndex(b => b.id === breadcrumb.id);
      if (index !== -1) {
        return prev.slice(0, index + 1);
      }
      return prev;
    });
  };

  return {
    breadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    updateBreadcrumb,
    clearBreadcrumbs,
    navigateToBreadcrumb,
  };
};

export default BreadcrumbNavigation;