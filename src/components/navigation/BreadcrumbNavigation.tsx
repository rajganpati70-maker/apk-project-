/**
 * Breadcrumb Navigation Component
 * Shows navigation path and allows quick navigation back
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { BreadcrumbItem } from '../../types/navigation';

interface BreadcrumbNavigationProps {
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbPress: (item: BreadcrumbItem) => void;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  breadcrumbs,
  onBreadcrumbPress,
}) => {
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {breadcrumbs.map((item, index) => (
          <View key={item.id} style={styles.breadcrumbItem}>
            <TouchableOpacity
              onPress={() => onBreadcrumbPress(item)}
              style={styles.breadcrumbTouchable}
            >
              <Text
                style={[
                  styles.breadcrumbText,
                  index === breadcrumbs.length - 1 && styles.activeBreadcrumb,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
            {index < breadcrumbs.length - 1 && (
              <Text style={styles.separator}>›</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  scrollContent: {
    alignItems: 'center',
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbTouchable: {
    paddingHorizontal: 4,
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeBreadcrumb: {
    color: '#111827',
    fontWeight: '600',
  },
  separator: {
    marginHorizontal: 8,
    color: '#9CA3AF',
    fontSize: 16,
  },
});

export default BreadcrumbNavigation;