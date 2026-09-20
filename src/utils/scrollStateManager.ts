/**
 * Scroll State Manager
 * Manages scroll position persistence and restoration across navigation
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const SCROLL_POSITIONS_KEY = '@anyrenting_scroll_positions';

/**
 * Save scroll position for a specific route
 */
export const saveScrollPosition = async (route: string, position: number): Promise<void> => {
  try {
    const existingData = await AsyncStorage.getItem(SCROLL_POSITIONS_KEY);
    const positions = existingData ? JSON.parse(existingData) : {};
    
    positions[route] = position;
    
    await AsyncStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
    console.log(`Saved scroll position for ${route}: ${position}`);
  } catch (error) {
    console.error('Error saving scroll position:', error);
  }
};

/**
 * Get scroll position for a specific route
 */
export const getScrollPosition = async (route: string): Promise<number> => {
  try {
    const existingData = await AsyncStorage.getItem(SCROLL_POSITIONS_KEY);
    const positions = existingData ? JSON.parse(existingData) : {};
    
    const position = positions[route] || 0;
    console.log(`Retrieved scroll position for ${route}: ${position}`);
    
    return position;
  } catch (error) {
    console.error('Error getting scroll position:', error);
    return 0;
  }
};

/**
 * Clear all scroll positions
 */
export const clearScrollPositions = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SCROLL_POSITIONS_KEY);
    console.log('Cleared all scroll positions');
  } catch (error) {
    console.error('Error clearing scroll positions:', error);
  }
};

/**
 * Clear scroll position for a specific route
 */
export const clearScrollPosition = async (route: string): Promise<void> => {
  try {
    const existingData = await AsyncStorage.getItem(SCROLL_POSITIONS_KEY);
    const positions = existingData ? JSON.parse(existingData) : {};
    
    delete positions[route];
    
    await AsyncStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
    console.log(`Cleared scroll position for ${route}`);
  } catch (error) {
    console.error('Error clearing scroll position:', error);
  }
};