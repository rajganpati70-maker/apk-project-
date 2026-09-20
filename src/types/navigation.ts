/**
 * Navigation Type Definitions
 * TypeScript interfaces for navigation components and data structures
 */

export interface NavigationItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  badge?: number;
  accessibilityLabel: string;
  accessibilityHint: string;
  metadata?: Record<string, any>;
}

export interface NavigationState {
  currentRoute: string;
  navigationHistory: string[];
  scrollPositions: Record<string, number>;
  breadcrumbs: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  label: string;
  route: string;
  id: string;
}

export interface NavigationContextType {
  navigate: (route: string, params?: any) => void;
  goBack: () => void;
  currentRoute: string;
  navigationHistory: string[];
  addBreadcrumb: (item: BreadcrumbItem) => void;
  breadcrumbs: BreadcrumbItem[];
  clearHistory: () => void;
}

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title: string;
  description?: string;
  data: any;
  metadata?: Record<string, any>;
}

export enum ContentBlockType {
  METRIC = 'metric',
  CHART = 'chart',
  LIST = 'list',
  CARD = 'card',
  TEXT = 'text',
  IMAGE = 'image',
}

export interface ContentSection {
  id: string;
  title: string;
  description?: string;
  blocks: ContentBlock[];
  metadata?: Record<string, any>;
}

export interface DemoContent {
  id: string;
  title: string;
  description: string;
  sections: ContentSection[];
  metadata?: {
    category: string;
    tags: string[];
    featured?: boolean;
    priority?: number;
  };
  version: string;
  lastUpdated: string;
}

export interface MetricBlockData {
  value: number;
  label: string;
  change?: number;
  changeType?: 'increase' | 'decrease';
  prefix?: string;
  suffix?: string;
  unit?: string;
  format: 'number' | 'currency' | 'percentage';
  trend?: number[];
}

export interface ChartBlockData {
  type: 'line' | 'bar' | 'pie' | 'donut';
  data: ChartDataPoint[];
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  interactive?: boolean;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  metadata?: Record<string, any>;
}

export interface ListBlockData {
  items: ListItem[];
  showAvatar?: boolean;
  showIcon?: boolean;
  searchable?: boolean;
  sortOptions?: SortOption[];
}

export interface ListItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  badge?: string;
  metadata?: Record<string, any>;
}

export interface SortOption {
  id: string;
  label: string;
  field: string;
  direction: 'asc' | 'desc';
}

export interface CardBlockData {
  size: 'small' | 'medium' | 'large';
  layout: 'horizontal' | 'vertical' | 'grid';
}

export interface ScrollState {
  position: number;
  isScrolling: boolean;
  direction: 'up' | 'down' | null;
}