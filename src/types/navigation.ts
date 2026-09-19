/**
 * Navigation types and interfaces for the AnyRenting app
 * Provides type-safe navigation with comprehensive support for all navigation levels
 */

import { TextStyle, ViewStyle } from 'react-native';

/**
 * Base navigation item interface
 * Defines the core structure for all navigation items across the app
 */
export interface NavigationItemType {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  route: string;
  params?: Record<string, any>;
  badge?: number | string;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

/**
 * Navigation item press state
 * Tracks the visual and functional state of navigation items
 */
export interface NavigationItemState {
  isPressed: boolean;
  isFocused: boolean;
  isDisabled: boolean;
  isLoading: boolean;
}

/**
 * Navigation item styles
 * Comprehensive styling configuration for navigation items
 */
export interface NavigationItemStyles {
  container?: ViewStyle;
  pressedContainer?: ViewStyle;
  focusedContainer?: ViewStyle;
  disabledContainer?: ViewStyle;
  title?: TextStyle;
  description?: TextStyle;
  icon?: ViewStyle;
  badge?: ViewStyle;
  badgeText?: TextStyle;
}

/**
 * Navigation item props
 * Complete props interface for the NavigationItem component
 */
export interface NavigationItemProps {
  item: NavigationItemType;
  onPress?: (item: NavigationItemType) => void;
  onLongPress?: (item: NavigationItemType) => void;
  style?: NavigationItemStyles;
  showBadge?: boolean;
  hapticFeedback?: boolean;
  testID?: string;
}

/**
 * Navigation section interface
 * Groups related navigation items into logical sections
 */
export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItemType[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

/**
 * Navigation route configuration
 * Defines the structure for navigation routes with parameters
 */
export interface NavigationRoute {
  path: string;
  component: React.ComponentType<any>;
  title: string;
  params?: Record<string, any>;
  options?: {
    headerShown?: boolean;
    headerTitle?: string;
    headerStyle?: any;
    headerTintColor?: string;
    tabBarVisible?: boolean;
    tabBarLabel?: string;
    tabBarIcon?: any;
  };
}

/**
 * Navigation stack configuration
 * Defines the structure for stack navigation hierarchies
 */
export interface NavigationStack {
  id: string;
  initialRoute: string;
  routes: NavigationRoute[];
  mode?: 'card' | 'modal' | 'stack';
  headerMode?: 'float' | 'screen' | 'none';
}

/**
 * Navigation tab configuration
 * Defines the structure for bottom tab navigation
 */
export interface NavigationTab {
  id: string;
  title: string;
  icon: any;
  route: string;
  badge?: number | string;
  notification?: boolean;
}

/**
 * Navigation context interface
 * Provides global navigation state and methods
 */
export interface NavigationContextType {
  currentRoute: string;
  navigationHistory: string[];
  params: Record<string, any>;
  navigate: (route: string, params?: Record<string, any>) => void;
  goBack: () => void;
  canGoBack: () => boolean;
  reset: (route?: string) => void;
}

/**
 * Navigation state manager interface
 * Manages navigation state persistence and restoration
 */
export interface NavigationStateManager {
  saveState: (state: NavigationState) => Promise<void>;
  restoreState: () => Promise<NavigationState | null>;
  clearState: () => Promise<void>;
  getCurrentRoute: () => string;
  getNavigationHistory: () => string[];
  addToHistory: (route: string) => void;
  removeFromHistory: (route: string) => void;
}

/**
 * Navigation state interface
 * Complete navigation state structure for persistence
 */
export interface NavigationState {
  currentRoute: string;
  navigationHistory: string[];
  params?: Record<string, any>;
  scrollPositions: Record<string, number>;
  timestamp: number;
  version: string;
}

/**
 * Breadcrumb navigation item
 * Represents a single breadcrumb in the navigation trail
 */
export interface BreadcrumbItem {
  id: string;
  title: string;
  route: string;
  params?: Record<string, any>;
  clickable?: boolean;
}

/**
 * Deep link configuration
 * Defines deep linking support for navigation
 */
export interface DeepLinkConfig {
  scheme: string;
  paths: Record<string, {
    route: string;
    params?: Record<string, any>;
  }>;
  fallbackRoute?: string;
}

/**
 * Navigation analytics event
 * Tracks navigation events for analytics
 */
export interface NavigationAnalyticsEvent {
  eventType: 'navigate' | 'back' | 'tab_change' | 'deep_link';
  route: string;
  params?: Record<string, any>;
  timestamp: number;
  duration?: number;
  source?: 'user' | 'system' | 'deep_link';
}

/**
 * Navigation performance metrics
 * Tracks navigation performance for optimization
 */
export interface NavigationPerformanceMetrics {
  route: string;
  renderTime: number;
  transitionTime: number;
  memoryUsage: number;
  timestamp: number;
}