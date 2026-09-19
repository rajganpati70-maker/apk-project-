/**
 * Content types and interfaces for the AnyRenting app
 * Provides comprehensive content management system with type safety
 */

import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

/**
 * Content block type enumeration
 * Defines all available content block types in the system
 */
export const ContentBlockType = {
  METRIC: 'metric',
  CHART: 'chart',
  LIST: 'list',
  CARD: 'card',
  TEXT: 'text',
  IMAGE: 'image',
  TABLE: 'table',
  PROGRESS: 'progress',
  ALERT: 'alert',
  DIVIDER: 'divider',
} as const;

export type ContentBlockType = (typeof ContentBlockType)[keyof typeof ContentBlockType];

/**
 * Content block interface
 * Base interface for all content blocks
 */
export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title?: string;
  description?: string;
  data: any;
  styles?: ContentBlockStyles;
  actions?: ContentBlockAction[];
  loading?: boolean;
  error?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
}

/**
 * Content block styles
 * Comprehensive styling configuration for content blocks
 */
export interface ContentBlockStyles {
  container?: ViewStyle;
  title?: TextStyle;
  description?: TextStyle;
  content?: ViewStyle;
  image?: ImageStyle;
  badge?: ViewStyle;
  badgeText?: TextStyle;
  actionButton?: ViewStyle;
  actionButtonText?: TextStyle;
}

/**
 * Content block action
 * Defines interactive actions within content blocks
 */
export interface ContentBlockAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'destructive' | 'link';
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

/**
 * Metric content block data
 * Data structure for metric blocks
 */
export interface MetricBlockData {
  value: number | string;
  label: string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  unit?: string;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'currency' | 'percentage' | 'duration';
  trend?: number[];
}

/**
 * Chart content block data
 * Data structure for chart blocks
 */
export interface ChartBlockData {
  type: 'line' | 'bar' | 'pie' | 'area' | 'donut';
  data: ChartDataPoint[];
  xAxis?: string[];
  yAxis?: {
    min?: number;
    max?: number;
    label?: string;
  };
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  interactive?: boolean;
}

/**
 * Chart data point
 * Single data point for charts
 */
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

/**
 * List content block data
 * Data structure for list blocks
 */
export interface ListBlockData {
  items: ListItem[];
  showAvatar?: boolean;
  showIcon?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  searchable?: boolean;
  sortOptions?: SortOption[];
}

/**
 * List item
 * Single item in a list block
 */
export interface ListItem {
  id: string;
  title: string;
  description?: string;
  avatar?: string;
  icon?: string;
  badge?: string | number;
  metadata?: Record<string, any>;
  disabled?: boolean;
  selected?: boolean;
  onPress?: () => void;
}

/**
 * Sort option
 * Sorting configuration for lists
 */
export interface SortOption {
  id: string;
  label: string;
  field: string;
  direction: 'asc' | 'desc';
}

/**
 * Card content block data
 * Data structure for card blocks
 */
export interface CardBlockData {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  metadata?: CardMetadata[];
  actions?: CardAction[];
  size?: 'small' | 'medium' | 'large';
  layout?: 'vertical' | 'horizontal';
}

/**
 * Card metadata
 * Key-value pairs displayed in cards
 */
export interface CardMetadata {
  label: string;
  value: string | number;
  icon?: string;
  format?: string;
}

/**
 * Card action
 * Actions available on cards
 */
export interface CardAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'icon';
  icon?: string;
  onPress: () => void;
}

/**
 * Text content block data
 * Data structure for text blocks
 */
export interface TextBlockData {
  content: string;
  format?: 'plain' | 'markdown' | 'html';
  size?: 'small' | 'medium' | 'large';
  weight?: 'normal' | 'medium' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Image content block data
 * Data structure for image blocks
 */
export interface ImageBlockData {
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'stretch' | 'center';
  aspectRatio?: number;
}

/**
 * Table content block data
 * Data structure for table blocks
 */
export interface TableBlockData {
  columns: TableColumn[];
  rows: TableRow[];
  sortable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  pageSize?: number;
}

/**
 * Table column
 * Column definition for tables
 */
export interface TableColumn {
  id: string;
  title: string;
  type?: 'text' | 'number' | 'date' | 'currency' | 'boolean';
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  format?: string;
}

/**
 * Table row
 * Row data for tables
 */
export interface TableRow {
  id: string;
  cells: Record<string, any>;
  selected?: boolean;
  expanded?: boolean;
  children?: TableRow[];
}

/**
 * Progress content block data
 * Data structure for progress blocks
 */
export interface ProgressBlockData {
  value: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  showCount?: boolean;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

/**
 * Alert content block data
 * Data structure for alert blocks
 */
export interface AlertBlockData {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  dismissible?: boolean;
  actions?: AlertAction[];
  icon?: string;
}

/**
 * Alert action
 * Actions available on alerts
 */
export interface AlertAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'destructive';
  onPress: () => void;
}

/**
 * Content section interface
 * Groups related content blocks into sections
 */
export interface ContentSection {
  id: string;
  title?: string;
  description?: string;
  blocks: ContentBlock[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  loading?: boolean;
  error?: string;
  refreshable?: boolean;
  onRefresh?: () => void;
}

/**
 * Demo content interface
 * Complete demo content structure for pages
 */
export interface DemoContent {
  id: string;
  title: string;
  description?: string;
  sections: ContentSection[];
  metadata?: DemoContentMetadata;
  version: string;
  lastUpdated: string;
}

/**
 * Demo content metadata
 * Additional metadata for demo content
 */
export interface DemoContentMetadata {
  category: string;
  tags: string[];
  author?: string;
  featured?: boolean;
  priority?: number;
}

/**
 * Content template interface
 * Reusable template for content creation
 */
export interface ContentTemplate {
  id: string;
  name: string;
  description?: string;
  structure: ContentSection[];
  variables: TemplateVariable[];
  styles?: ContentBlockStyles;
}

/**
 * Template variable
 * Variable placeholders in templates
 */
export interface TemplateVariable {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  defaultValue?: any;
  required?: boolean;
  description?: string;
}

/**
 * Content rendering context
 * Context for rendering content blocks
 */
export interface ContentRenderingContext {
  theme: 'light' | 'dark';
  screenSize: 'small' | 'medium' | 'large';
  orientation: 'portrait' | 'landscape';
  accessibilityMode: boolean;
  reducedMotion: boolean;
}