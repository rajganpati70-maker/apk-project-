/**
 * Central type exports for the AnyRenting app
 * Provides unified access to all type definitions
 */

export * from './navigation';
export * from './content';

// Re-export NavigationItemType as NavigationItem for backward compatibility
export type { NavigationItemType as NavigationItem } from './navigation';