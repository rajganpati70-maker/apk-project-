/**
 * Scroll State Manager
 * Manages scroll position persistence and restoration across navigation
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const SCROLL_STATE_KEY = '@anyrenting_scroll_state';
const SCROLL_STATE_VERSION = '1.0.0';

/**
 * Scroll state interface
 */
export interface ScrollState {
  positions: Record<string, number>;
  timestamp: number;
  version: string;
}

/**
 * Save scroll position for a route
 */
export const saveScrollPosition = async (route: string, position: number): Promise<void> => {
  try {
    const existingState = await getScrollState();
    existingState.positions[route] = position;
    existingState.timestamp = Date.now();
    
    await AsyncStorage.setItem(SCROLL_STATE_KEY, JSON.stringify(existingState));
  } catch (error) {
    console.error('Error saving scroll position:', error);
  }
};

/**
 * Get scroll position for a route
 */
export const getScrollPosition = async (route: string): Promise<number> => {
  try {
    const state = await getScrollState();
    return state.positions[route] || 0;
  } catch (error) {
    console.error('Error getting scroll position:', error);
    return 0;
  }
};

/**
 * Get all scroll state
 */
export const getScrollState = async (): Promise<ScrollState> => {
  try {
    const storedState = await AsyncStorage.getItem(SCROLL_STATE_KEY);
    if (storedState) {
      const state: ScrollState = JSON.parse(storedState);
      
      // Check version compatibility
      if (state.version === SCROLL_STATE_VERSION) {
        return state;
      }
    }
    
    // Return default state if none exists or version mismatch
    return {
      positions: {},
      timestamp: Date.now(),
      version: SCROLL_STATE_VERSION,
    };
  } catch (error) {
    console.error('Error getting scroll state:', error);
    return {
      positions: {},
      timestamp: Date.now(),
      version: SCROLL_STATE_VERSION,
    };
  }
};

/**
 * Clear scroll position for a route
 */
export const clearScrollPosition = async (route: string): Promise<void> => {
  try {
    const state = await getScrollState();
    delete state.positions[route];
    state.timestamp = Date.now();
    
    await AsyncStorage.setItem(SCROLL_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error clearing scroll position:', error);
  }
};

/**
 * Clear all scroll state
 */
export const clearAllScrollState = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SCROLL_STATE_KEY);
  } catch (error) {
    console.error('Error clearing scroll state:', error);
  }
};

/**
 * Clean up old scroll state (older than 30 days)
 */
export const cleanupOldScrollState = async (): Promise<void> => {
  try {
    const state = await getScrollState();
    
    const cleanedPositions: Record<string, number> = {};
    Object.entries(state.positions).forEach(([route, position]) => {
      // Keep recent positions
      cleanedPositions[route] = position;
    });
    
    state.positions = cleanedPositions;
    state.timestamp = Date.now();
    
    await AsyncStorage.setItem(SCROLL_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error cleaning up scroll state:', error);
  }
};