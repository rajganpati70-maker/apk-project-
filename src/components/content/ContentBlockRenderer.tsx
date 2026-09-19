/**
 * Content Block Renderer
 * Renders different types of content blocks with appropriate components
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ContentBlock, ContentBlockType, MetricBlockData, ChartBlockData, ListBlockData, CardBlockData, TextBlockData, ImageBlockData } from '../../types';

/**
 * ContentBlockRenderer Props
 */
interface ContentBlockRendererProps {
  block: ContentBlock;
  onPress?: (block: ContentBlock) => void;
}

/**
 * ContentBlockRenderer Component
 */
export const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({ block, onPress }) => {
  /**
   * Render metric block
   */
  const renderMetricBlock = (data: MetricBlockData) => {
    const formatValue = (value: number | string, format?: string): string => {
      if (typeof value === 'string') return value;
      
      switch (format) {
        case 'currency':
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(value);
        case 'percentage':
          return `${value.toFixed(1)}%`;
        case 'number':
          return new Intl.NumberFormat('en-US').format(value);
        default:
          return value.toString();
      }
    };

    const changeColor = data.changeType === 'increase' ? '#10B981' : data.changeType === 'decrease' ? '#EF4444' : '#6B7280';
    const changeIcon = data.changeType === 'increase' ? '↑' : data.changeType === 'decrease' ? '↓' : '→';

    return (
      <View style={styles.metricContainer}>
        <View style={styles.metricHeader}>
          <Text style={styles.metricLabel}>{data.label}</Text>
          {data.change !== undefined && (
            <View style={styles.metricChange}>
              <Text style={[styles.metricChangeText, { color: changeColor }]}>
                {changeIcon} {Math.abs(data.change)}%
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.metricValue}>
          {data.prefix || ''}{formatValue(data.value, data.format)}{data.suffix || ''}
        </Text>
        {data.unit && (
          <Text style={styles.metricUnit}>{data.unit}</Text>
        )}
      </View>
    );
  };

  /**
   * Render chart block
   */
  const renderChartBlock = (data: ChartBlockData) => {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{block.title}</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartPlaceholderText}>
            {data.type.charAt(0).toUpperCase() + data.type.slice(1)} Chart
          </Text>
          <Text style={styles.chartPlaceholderSubtext}>
            {data.data.length} data points
          </Text>
        </View>
        {data.showLegend && (
          <View style={styles.chartLegend}>
            {data.data.slice(0, 4).map((point, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: data.colors?.[index] || '#3B82F6' }]} />
                <Text style={styles.legendText}>{point.label}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  /**
   * Render list block
   */
  const renderListBlock = (data: ListBlockData) => {
    return (
      <View style={styles.listContainer}>
        {data.items.map((item, index) => (
          <View key={item.id} style={[styles.listItem, index < data.items.length - 1 && styles.listItemBorder]}>
            {data.showIcon && item.icon && (
              <View style={styles.listItemIcon}>
                <Text style={styles.listItemIconText}>{item.icon}</Text>
              </View>
            )}
            <View style={styles.listItemContent}>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              {item.description && (
                <Text style={styles.listItemDescription}>{item.description}</Text>
              )}
              {item.metadata && Object.keys(item.metadata).length > 0 && (
                <View style={styles.listItemMetadata}>
                  {Object.entries(item.metadata).map(([key, value]) => (
                    <Text key={key} style={styles.listItemMetadataText}>
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </Text>
                  ))}
                </View>
              )}
            </View>
            {item.badge && (
              <View style={styles.listItemBadge}>
                <Text style={styles.listItemBadgeText}>{item.badge}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  /**
   * Render card block
   */
  const renderCardBlock = (data: CardBlockData) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{data.title}</Text>
        {data.subtitle && (
          <Text style={styles.cardSubtitle}>{data.subtitle}</Text>
        )}
        {data.description && (
          <Text style={styles.cardDescription}>{data.description}</Text>
        )}
        {data.metadata && data.metadata.length > 0 && (
          <View style={styles.cardMetadata}>
            {data.metadata.map((meta, index) => (
              <View key={index} style={styles.cardMetadataItem}>
                {meta.icon && <Text style={styles.cardMetadataIcon}>{meta.icon}</Text>}
                <Text style={styles.cardMetadataLabel}>{meta.label}:</Text>
                <Text style={styles.cardMetadataValue}>{meta.value}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  /**
   * Render text block
   */
  const renderTextBlock = (data: TextBlockData) => {
    return (
      <View style={styles.textContainer}>
        <Text style={[
          styles.textContent,
          data.size === 'small' && styles.textSmall,
          data.size === 'large' && styles.textLarge,
          data.weight === 'bold' && styles.textBold,
          data.align === 'center' && styles.textCenter,
          data.align === 'right' && styles.textRight,
          { color: data.color || '#111827' }
        ]}>
          {data.content}
        </Text>
      </View>
    );
  };

  /**
   * Render image block
   */
  const renderImageBlock = (data: ImageBlockData) => {
    return (
      <View style={styles.imageContainer}>
        <View style={[styles.imagePlaceholder, { aspectRatio: data.aspectRatio || 16/9 }]}>
          <Text style={styles.imagePlaceholderText}>📷</Text>
          <Text style={styles.imagePlaceholderSubtext}>{data.alt || 'Image'}</Text>
        </View>
        {data.caption && (
          <Text style={styles.imageCaption}>{data.caption}</Text>
        )}
      </View>
    );
  };

  /**
   * Render content based on type
   */
  const renderContent = () => {
    if (block.loading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    if (block.error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{block.error}</Text>
        </View>
      );
    }

    const rawData = block.data;

    switch (block.type) {
      case ContentBlockType.METRIC:
        return renderMetricBlock((rawData || {
          value: block.value ?? '—',
          label: block.title || 'Metric',
          change: typeof block.trend === 'number' ? block.trend : undefined,
          changeType: block.positive === false ? 'decrease' : 'increase',
        }) as MetricBlockData);
      case ContentBlockType.CHART:
        return renderChartBlock((rawData?.chartType
          ? {
              type: rawData.chartType,
              data: (rawData.labels || []).map((label: string, index: number) => ({
                label,
                value: rawData.values?.[index] ?? 0,
              })),
              colors: rawData.colors || (rawData.color ? [rawData.color] : undefined),
            }
          : rawData) as ChartBlockData);
      case ContentBlockType.LIST:
        return renderListBlock((Array.isArray(rawData)
          ? { items: rawData, showIcon: true }
          : rawData) as ListBlockData);
      case ContentBlockType.CARD:
        return renderCardBlock(rawData as CardBlockData);
      case ContentBlockType.TEXT:
        return renderTextBlock(rawData as TextBlockData);
      case ContentBlockType.IMAGE:
        return renderImageBlock(rawData as ImageBlockData);
      default:
        return (
          <View style={styles.unknownContainer}>
            <Text style={styles.unknownText}>Unknown content type: {block.type}</Text>
          </View>
        );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, block.styles?.container]}
      onPress={() => onPress?.(block)}
      disabled={!onPress}
      activeOpacity={0.85}
    >
      {block.title && block.type !== ContentBlockType.METRIC && block.type !== ContentBlockType.CHART && (
        <Text style={[styles.blockTitle, block.styles?.title]}>{block.title}</Text>
      )}
      {block.description && block.type !== ContentBlockType.METRIC && (
        <Text style={[styles.blockDescription, block.styles?.description]}>{block.description}</Text>
      )}
      {renderContent()}
    </TouchableOpacity>
  );
};

/**
 * Default styles
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  blockDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  loadingContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#6B7280',
    fontSize: 14,
  },
  errorContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
  },
  unknownContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unknownText: {
    color: '#6B7280',
    fontSize: 14,
  },
  // Metric styles
  metricContainer: {
    padding: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  metricChange: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  metricChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  metricUnit: {
    fontSize: 14,
    color: '#6B7280',
  },
  // Chart styles
  chartContainer: {
    padding: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartPlaceholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  chartPlaceholderSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  chartLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  // List styles
  listContainer: {
    padding: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  listItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  listItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listItemIconText: {
    fontSize: 18,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  listItemDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  listItemMetadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  listItemMetadataText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  listItemBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  // Card styles
  cardContainer: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardMetadata: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  cardMetadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardMetadataIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  cardMetadataLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  cardMetadataValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  // Text styles
  textContainer: {
    padding: 16,
  },
  textContent: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  textSmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  textLarge: {
    fontSize: 20,
    lineHeight: 28,
  },
  textBold: {
    fontWeight: '700',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  // Image styles
  imageContainer: {
    padding: 16,
  },
  imagePlaceholder: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  imagePlaceholderText: {
    fontSize: 32,
    marginBottom: 8,
  },
  imagePlaceholderSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  imageCaption: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ContentBlockRenderer;