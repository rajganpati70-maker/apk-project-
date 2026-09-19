/**
 * NavigationItem Component
 * Advanced navigation item with press states, animations, and haptic feedback
 * Provides comprehensive accessibility support and visual feedback
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AccessibilityInfo,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { NavigationItemProps } from '../../types';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// Haptic feedback helpers (conditional support)
const Haptics = {
  impactAsync: async () => {
    // No-op when haptics not available
  },
  notificationAsync: async () => {
    // No-op when haptics not available
  },
  ImpactFeedbackStyle: {
    Light: 'light',
    Heavy: 'heavy',
  },
  NotificationFeedbackType: {
    Success: 'success',
  },
};

/**
 * NavigationItem Component
 * 
 * @param {NavigationItemProps} props - Component props
 * @returns {JSX.Element} Rendered navigation item
 */
export const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  onPress,
  onLongPress,
  style,
  showBadge = true,
  hapticFeedback = true,
  testID,
}: NavigationItemProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  /**
   * Handle press in event
   */
  const handlePressIn = () => {
    setIsPressed(true);
    
    // Scale down animation
    scale.value = withSpring(0.96, {
      damping: 15,
      stiffness: 400,
    });

    // Haptic feedback
    if (hapticFeedback && !item.disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  /**
   * Handle press out event
   */
  const handlePressOut = () => {
    setIsPressed(false);
    
    // Scale back animation
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 400,
    });
  };

  /**
   * Handle press event
   */
  const handlePress = () => {
    if (item.disabled) return;

    // Success haptic feedback
    if (hapticFeedback) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    // Scale animation sequence
    scale.value = withSequence(
      withTiming(1.1, { duration: 100, easing: Easing.out(Easing.ease) }),
      withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) })
    );

    // Opacity flash
    opacity.value = withSequence(
      withTiming(0.7, { duration: 100 }),
      withTiming(1, { duration: 200 })
    );

    // Call press handler
    if (onPress) {
      onPress(item);
    }

    // Announce to screen readers
    if (item.accessibilityLabel) {
      AccessibilityInfo.announceForAccessibility(item.accessibilityLabel);
    }
  };

  /**
   * Handle long press event
   */
  const handleLongPress = () => {
    if (item.disabled) return;

    // Heavy haptic feedback
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }

    // Translate animation
    translateX.value = withSequence(
      withTiming(10, { duration: 100 }),
      withTiming(0, { duration: 200 })
    );

    // Call long press handler
    if (onLongPress) {
      onLongPress(item);
    }
  };

  /**
   * Handle focus event
   */
  const handleFocus = () => {
    setIsFocused(true);
    
    // Subtle scale animation
    scale.value = withSpring(1.02, {
      damping: 20,
      stiffness: 300,
    });
  };

  /**
   * Handle blur event
   */
  const handleBlur = () => {
    setIsFocused(false);
    
    // Reset scale
    scale.value = withSpring(1, {
      damping: 20,
      stiffness: 300,
    });
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
    ],
    opacity: opacity.value,
  }));

  // Determine container style based on state
  const getContainerStyle = (): any => {
    const baseStyle = [styles.container, style?.container];
    
    if (item.disabled) {
      return [...baseStyle, styles.disabledContainer, style?.disabledContainer];
    }
    
    if (isPressed) {
      return [...baseStyle, styles.pressedContainer, style?.pressedContainer];
    }
    
    if (isFocused) {
      return [...baseStyle, styles.focusedContainer, style?.focusedContainer];
    }
    
    return baseStyle;
  };

  // Determine title style
  const getTitleStyle = (): any => {
    const baseStyle = [styles.title, style?.title];
    
    if (item.disabled) {
      return [...baseStyle, styles.disabledTitle];
    }
    
    return baseStyle;
  };

  // Determine description style
  const getDescriptionStyle = (): any => {
    const baseStyle = [styles.description, style?.description];
    
    if (item.disabled) {
      return [...baseStyle, styles.disabledDescription];
    }
    
    return baseStyle;
  };

  return (
    <AnimatedTouchableOpacity
      testID={testID || `navigation-item-${item.id}`}
      style={getContainerStyle()}
      onPress={handlePress}
      onLongPress={handleLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      activeOpacity={1}
      disabled={item.disabled}
      accessible={true}
      accessibilityLabel={item.accessibilityLabel || item.title}
      accessibilityHint={item.accessibilityHint || `Navigate to ${item.title}`}
      accessibilityRole="button"
      accessibilityState={{
        disabled: item.disabled,
        selected: isFocused,
      }}
    >
      <Animated.View style={[styles.contentContainer, animatedStyle]}>
        {/* Icon */}
        {item.icon && (
          <View style={[styles.iconContainer, style?.icon]}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
        )}

        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={getTitleStyle()} numberOfLines={1}>
            {item.title}
          </Text>
          
          {item.description && (
            <Text style={getDescriptionStyle()} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>

        {/* Badge */}
        {showBadge && item.badge && (
          <View style={[styles.badgeContainer, style?.badge]}>
            <Text style={[styles.badgeText, style?.badgeText]}>
              {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
            </Text>
          </View>
        )}

        {/* Chevron indicator */}
        {!item.disabled && (
          <View style={styles.chevronContainer}>
            <Text style={styles.chevron}>›</Text>
          </View>
        )}
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
};

/**
 * Default styles for NavigationItem
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pressedContainer: {
    backgroundColor: '#F3F4F6',
    transform: [{ scale: 0.98 }],
  },
  focusedContainer: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  disabledContainer: {
    backgroundColor: '#F9FAFB',
    opacity: 0.6,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
    color: '#3B82F6',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  disabledTitle: {
    color: '#9CA3AF',
  },
  disabledDescription: {
    color: '#D1D5DB',
  },
  badgeContainer: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  chevronContainer: {
    marginLeft: 8,
  },
  chevron: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
  },
});

export default NavigationItem;