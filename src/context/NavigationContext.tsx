/**
 * Navigation Context
 * Provides global navigation state management with persistence
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContextType,
  NavigationState,
  NavigationAnalyticsEvent,
  BreadcrumbItem,
} from '../types';
import { deepLinkingManager } from '../utils/deepLinking';

const NavigationStateContext = createContext<ExtendedNavigationContextType | null>(null);
const STORAGE_KEY = '@anyrenting_navigation_state';
const STORAGE_VERSION = '1.0.0';

/**
 * Extended navigation context with breadcrumbs and deep linking
 */
export interface ExtendedNavigationContextType extends NavigationContextType {
  breadcrumbs: BreadcrumbItem[];
  addBreadcrumb: (breadcrumb: BreadcrumbItem) => void;
  removeBreadcrumb: (id: string) => void;
  clearBreadcrumbs: () => void;
  handleDeepLink: (url: string) => Promise<boolean>;
  generateDeepLink: (route: string, params?: Record<string, any>) => string;
}

/**
 * Navigation Context Provider
 */
export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['/']);
  const [params, setParams] = useState<Record<string, any>>({});
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [_isLoading, setIsLoading] = useState(true);

  /**
   * Load navigation state from storage
   */
  const loadState = useCallback(async () => {
    try {
      const storedState = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedState) {
        const state: NavigationState = JSON.parse(storedState);
        
        // Check version compatibility
        if (state.version === STORAGE_VERSION) {
          setCurrentRoute(state.currentRoute);
          setNavigationHistory(state.navigationHistory);
          setParams(state.params || {});
        }
      }
    } catch (error) {
      console.error('Error loading navigation state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Save navigation state to storage
   */
  const saveState = useCallback(async (state: NavigationState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving navigation state:', error);
    }
  }, []);

  /**
   * Navigate to a route
   */
  const navigate = useCallback((route: string, newParams?: Record<string, any>) => {
    const timestamp = Date.now();
    
    setCurrentRoute(route);
    setParams(newParams || {});
    
    setNavigationHistory(prev => {
      const newHistory = [...prev, route];
      // Keep history manageable (max 50 entries)
      if (newHistory.length > 50) {
        return newHistory.slice(-50);
      }
      return newHistory;
    });

    // Add breadcrumb
    setBreadcrumbs(prev => {
      const breadcrumb: BreadcrumbItem = {
        id: route,
        title: route.split('/').pop() || 'Home',
        route,
        params: newParams,
        clickable: true,
      };
      
      // Remove duplicates and add new breadcrumb
      const filtered = prev.filter(b => b.id !== route);
      return [...filtered, breadcrumb];
    });

    // Save state
    const state: NavigationState = {
      currentRoute: route,
      navigationHistory: [...navigationHistory, route].slice(-50),
      scrollPositions: {},
      timestamp,
      version: STORAGE_VERSION,
    };
    saveState(state);

    // Track analytics
    trackNavigationEvent({
      eventType: 'navigate',
      route,
      params: newParams,
      timestamp,
      source: 'user',
    });
  }, [navigationHistory, saveState, trackNavigationEvent]);

  /**
   * Go back to previous route
   */
  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      const previousRoute = newHistory[newHistory.length - 1];
      
      setCurrentRoute(previousRoute);
      setNavigationHistory(newHistory);

      // Save state
      const state: NavigationState = {
        currentRoute: previousRoute,
        navigationHistory: newHistory,
        scrollPositions: {},
        timestamp: Date.now(),
        version: STORAGE_VERSION,
      };
      saveState(state);

      // Track analytics
      trackNavigationEvent({
        eventType: 'back',
        route: previousRoute,
        timestamp: Date.now(),
        source: 'user',
      });
    }
  }, [navigationHistory, saveState, trackNavigationEvent]);

  /**
   * Check if can go back
   */
  const canGoBack = useCallback(() => {
    return navigationHistory.length > 1;
  }, [navigationHistory]);

  /**
   * Reset navigation
   */
  const reset = useCallback((route?: string) => {
    const targetRoute = route || '/';
    const timestamp = Date.now();
    
    setCurrentRoute(targetRoute);
    setNavigationHistory([targetRoute]);
    setParams({});
    setBreadcrumbs([]);

    // Save state
    const state: NavigationState = {
      currentRoute: targetRoute,
      navigationHistory: [targetRoute],
      scrollPositions: {},
      timestamp,
      version: STORAGE_VERSION,
    };
    saveState(state);
  }, [saveState]);

  /**
   * Add breadcrumb
   */
  const addBreadcrumb = useCallback((breadcrumb: BreadcrumbItem) => {
    setBreadcrumbs(prev => {
      const filtered = prev.filter(b => b.id !== breadcrumb.id);
      return [...filtered, breadcrumb];
    });
  }, []);

  /**
   * Remove breadcrumb
   */
  const removeBreadcrumb = useCallback((id: string) => {
    setBreadcrumbs(prev => prev.filter(b => b.id !== id));
  }, []);

  /**
   * Clear breadcrumbs
   */
  const clearBreadcrumbs = useCallback(() => {
    setBreadcrumbs([]);
  }, []);

  /**
   * Handle deep link
   */
  const handleDeepLink = useCallback(async (url: string) => {
    return await deepLinkingManager.handleDeepLink(url, navigate);
  }, [navigate]);

  /**
   * Generate deep link
   */
  const generateDeepLink = useCallback((route: string, linkParams?: Record<string, any>) => {
    return deepLinkingManager.generateDeepLink(route, linkParams);
  }, []);

  /**
   * Track navigation analytics event
   */
  const trackNavigationEvent = useCallback((event: NavigationAnalyticsEvent) => {
    // In production, this would send to analytics service
    console.log('Navigation Event:', event);
    
    // Store events locally for batch sending
    const eventKey = `@anyrenting_nav_event_${Date.now()}`;
    AsyncStorage.setItem(eventKey, JSON.stringify(event))
      .catch(_error => console.error('Error storing navigation event'));
  }, []);

  // Load state on mount
  useEffect(() => {
    loadState();
  }, [loadState]);

  const contextValue: ExtendedNavigationContextType = {
    currentRoute,
    navigationHistory,
    params,
    navigate,
    goBack,
    canGoBack,
    reset,
    breadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    clearBreadcrumbs,
    handleDeepLink,
    generateDeepLink,
  };

  return (
    <NavigationStateContext.Provider value={contextValue}>
      {children}
    </NavigationStateContext.Provider>
  );
};

/**
 * Use navigation context hook
 */
export const useNavigation = (): ExtendedNavigationContextType => {
  const context = useContext(NavigationStateContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context as ExtendedNavigationContextType;
};

/**
 * Use navigation state hook (for performance tracking)
 */
export const useNavigationState = () => {
  const { currentRoute, navigationHistory, params } = useNavigation();
  
  return {
    currentRoute,
    navigationHistory,
    params,
  };
};

export default NavigationProvider;