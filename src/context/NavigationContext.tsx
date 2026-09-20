/**
 * Navigation Context
 * Global navigation state management for multi-level navigation system
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContextType,
  NavigationState,
  BreadcrumbItem,
} from '../types/navigation';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const STORAGE_KEY = '@anyrenting_navigation_state';
const BREADCRUMB_KEY = '@anyrenting_breadcrumbs';

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['/']);
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  // Load navigation state from storage on mount
  useEffect(() => {
    loadNavigationState();
  }, []);

  // Save navigation state to storage when it changes
  useEffect(() => {
    saveNavigationState();
  }, [currentRoute, navigationHistory, scrollPositions, breadcrumbs]);

  const loadNavigationState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(STORAGE_KEY);
      const savedBreadcrumbs = await AsyncStorage.getItem(BREADCRUMB_KEY);
      
      if (savedState) {
        const state: NavigationState = JSON.parse(savedState);
        setCurrentRoute(state.currentRoute);
        setNavigationHistory(state.navigationHistory);
        setScrollPositions(state.scrollPositions);
      }
      
      if (savedBreadcrumbs) {
        setBreadcrumbs(JSON.parse(savedBreadcrumbs));
      }
    } catch (error) {
      console.error('Error loading navigation state:', error);
    }
  };

  const saveNavigationState = async () => {
    try {
      const state: NavigationState = {
        currentRoute,
        navigationHistory,
        scrollPositions,
        breadcrumbs,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      await AsyncStorage.setItem(BREADCRUMB_KEY, JSON.stringify(breadcrumbs));
    } catch (error) {
      console.error('Error saving navigation state:', error);
    }
  };

  const navigate = useCallback((route: string, params?: any) => {
    // Update navigation history
    setNavigationHistory(prev => [...prev, route]);
    
    // Update current route
    setCurrentRoute(route);
    
    // Add breadcrumb if provided
    if (params?.breadcrumb) {
      addBreadcrumb(params.breadcrumb);
    }
    
    console.log('Navigating to:', route, 'with params:', params);
  }, []);

  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current route
      const previousRoute = newHistory[newHistory.length - 1];
      
      setNavigationHistory(newHistory);
      setCurrentRoute(previousRoute);
      
      // Remove last breadcrumb
      if (breadcrumbs.length > 0) {
        setBreadcrumbs(prev => prev.slice(0, -1));
      }
      
      console.log('Going back to:', previousRoute);
    }
  }, [navigationHistory, breadcrumbs]);

  const addBreadcrumb = useCallback((item: BreadcrumbItem) => {
    setBreadcrumbs(prev => [...prev, item]);
  }, []);

  const clearHistory = useCallback(() => {
    setNavigationHistory(['/']);
    setCurrentRoute('/');
    setScrollPositions({});
    setBreadcrumbs([]);
  }, []);

  const value: NavigationContextType = {
    navigate,
    goBack,
    currentRoute,
    navigationHistory,
    addBreadcrumb,
    breadcrumbs,
    clearHistory,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};