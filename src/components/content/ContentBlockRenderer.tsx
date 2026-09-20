/**
 * Content Block Renderer
 * Renders different types of content blocks (metric, chart, list, card, text, image)
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import {
  ContentBlock,
  ContentBlockType,
  MetricBlockData,
  ChartBlockData,
  ListBlockData,
  CardBlockData,
} from '../../types/navigation';

const { width } = Dimensions.get('window');

interface ContentBlockRendererProps {
  block: ContentBlock;
  onPress?: (block: ContentBlock) => void;
}

const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({
  block,
  onPress,
}) => {
  const renderMetricBlock = (data: MetricBlockData) => {
    const formatValue = (value: number, format: string) => {
      switch (format) {
        case 'currency':
          return `${data.prefix || ''}$${value.toLocaleString()}`;
        case 'percentage':
          return `${value.toFixed(1)}${data.suffix || '%'}`;
        default:
          return `${value.toLocaleString()} ${data.unit || ''}`;
      }
    };

    const changeColor = data.changeType === 'increase' ? '#10B981' : '#EF4444';
    const changeIcon = data.changeType === 'increase' ? '↑' : '↓';

    return (
      <View style={styles.metricBlock}>
        <Text style={styles.metricValue}>{formatValue(data.value, data.format)}</Text>
        <Text style={styles.metricLabel}>{data.label}</Text>
        {data.change !== undefined && (
          <View style={styles.changeContainer}>
            <Text style={[styles.changeText, { color: changeColor }]}>
              {changeIcon} {Math.abs(data.change)}%
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderChartBlock = (data: ChartBlockData) => {
    const maxValue = Math.max(...data.data.map(d => d.value));
    const barWidth = (width - 64) / data.data.length - 8;

    return (
      <View style={styles.chartBlock}>
        <View style={styles.chartBars}>
          {data.data.map((point, index) => {
            const height = (point.value / maxValue) * 150;
            return (
              <View key={index} style={styles.chartBarContainer}>
                <View
                  style={[
                    styles.chartBar,
                    {
                      height,
                      backgroundColor: data.colors?.[index % data.colors.length] || '#3B82F6',
                    },
                  ]}
                />
                <Text style={styles.chartLabel}>{point.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderListBlock = (data: ListBlockData) => {
    return (
      <View style={styles.listBlock}>
        {data.items.map((item, index) => (
          <View key={item.id} style={styles.listItem}>
            {item.icon && <Text style={styles.listIcon}>{item.icon}</Text>}
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>{item.title}</Text>
              <Text style={styles.listDescription}>{item.description}</Text>
            </View>
            {item.badge && (
              <View style={styles.listBadge}>
                <Text style={styles.listBadgeText}>{item.badge}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderCardBlock = (data: CardBlockData) => {
    return (
      <View style={styles.cardBlock}>
        <Text style={styles.cardText}>Card Content</Text>
      </View>
    );
  };

  const renderBlock = () => {
    switch (block.type) {
      case ContentBlockType.METRIC:
        return renderMetricBlock(block.data as MetricBlockData);
      case ContentBlockType.CHART:
        return renderChartBlock(block.data as ChartBlockData);
      case ContentBlockType.LIST:
        return renderListBlock(block.data as ListBlockData);
      case ContentBlockType.CARD:
        return renderCardBlock(block.data as CardBlockData);
      case ContentBlockType.TEXT:
        return <Text style={styles.textBlock}>{block.data}</Text>;
      default:
        return <Text style={styles.textBlock}>Unknown block type</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {block.title && <Text style={styles.blockTitle}>{block.title}</Text>}
      {block.description && <Text style={styles.blockDescription}>{block.description}</Text>}
      {renderBlock()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  blockDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  metricBlock: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chartBlock: {
    paddingVertical: 16,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
  },
  chartBarContainer: {
    alignItems: 'center',
    width: 40,
  },
  chartBar: {
    width: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  listBlock: {
    paddingVertical: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  listIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  listDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  listBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  listBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  cardBlock: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#6B7280',
  },
  textBlock: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

export default ContentBlockRenderer;