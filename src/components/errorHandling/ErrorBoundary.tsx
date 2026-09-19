/**
 * Error Boundary Component
 * Catches JavaScript errors in component trees and displays fallback UI
 * Provides navigation error recovery and graceful degradation
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';

/**
 * Error Boundary Props
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  enableReset?: boolean;
  resetButtonText?: string;
  resetButtonAction?: () => void;
}

/**
 * Error Boundary State
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      errorInfo,
    });

    // Log error for debugging
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Store error for analytics
    this.logErrorToAnalytics(error, errorInfo);
  }

  /**
   * Log error to analytics
   */
  private logErrorToAnalytics(error: Error, errorInfo: ErrorInfo): void {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    };

    // Store error locally
    try {
      // In production, this would send to analytics service
      console.log('Error logged:', errorData);
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  }

  /**
   * Reset error boundary
   */
  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Call custom reset action if provided
    if (this.props.resetButtonAction) {
      this.props.resetButtonAction();
    }
  };

  /**
   * Render fallback UI
   */
  renderFallback = () => {
    if (this.props.fallback) {
      return this.props.fallback;
    }

    const { error, errorInfo } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            {error?.message || 'An unexpected error occurred'}
          </Text>

          {errorInfo && (
            <ScrollView style={styles.errorDetails}>
              <Text style={styles.errorDetailsText}>
                {errorInfo.componentStack}
              </Text>
            </ScrollView>
          )}

          {this.props.enableReset !== false && (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={this.resetError}
            >
              <Text style={styles.resetButtonText}>
                {this.props.resetButtonText || 'Try Again'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  render() {
    if (this.state.hasError) {
      return this.renderFallback();
    }

    return this.props.children;
  }
}

/**
 * Default styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    maxWidth: 400,
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorDetails: {
    maxHeight: 200,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorDetailsText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  resetButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 150,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  navigationErrorContainer: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  navigationErrorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  navigationErrorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  navigationErrorMessage: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  navigationErrorSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  contentErrorContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
  contentErrorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  contentErrorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  contentErrorMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

/**
 * Navigation Error Boundary
 * Specialized error boundary for navigation errors
 */
export interface NavigationErrorBoundaryProps {
  children: ReactNode;
  fallbackRoute?: string;
  onNavigationError?: (error: Error) => void;
}

export class NavigationErrorBoundary extends Component<NavigationErrorBoundaryProps> {
  state = {
    hasError: false,
    error: null as Error | null,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Navigation Error:', error, errorInfo);

    if (this.props.onNavigationError) {
      this.props.onNavigationError(error);
    }

    // Auto-navigate to fallback route after delay
    if (this.props.fallbackRoute) {
      setTimeout(() => {
        this.handleNavigationRecovery();
      }, 2000);
    }
  }

  handleNavigationRecovery = () => {
    // In production, this would use navigation to go to fallback route
    console.log('Navigating to fallback route:', this.props.fallbackRoute);
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.navigationErrorContainer}>
          <Text style={styles.navigationErrorIcon}>🧭</Text>
          <Text style={styles.navigationErrorTitle}>Navigation Error</Text>
          <Text style={styles.navigationErrorMessage}>
            {this.state.error?.message || 'Failed to navigate'}
          </Text>
          {this.props.fallbackRoute && (
            <Text style={styles.navigationErrorSubtext}>
              Redirecting to {this.props.fallbackRoute}...
            </Text>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

/**
 * Content Loading Error Boundary
 * Specialized error boundary for content loading errors
 */
export interface ContentErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error) => void;
  retryAction?: () => void;
  fallbackContent?: ReactNode;
}

export class ContentErrorBoundary extends Component<ContentErrorBoundaryProps> {
  state = {
    hasError: false,
    error: null as Error | null,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Content Loading Error:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    
    if (this.props.retryAction) {
      this.props.retryAction();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallbackContent) {
        return this.props.fallbackContent;
      }

      return (
        <View style={styles.contentErrorContainer}>
          <Text style={styles.contentErrorIcon}>📦</Text>
          <Text style={styles.contentErrorTitle}>Content Unavailable</Text>
          <Text style={styles.contentErrorMessage}>
            {this.state.error?.message || 'Failed to load content'}
          </Text>
          {this.props.retryAction && (
            <TouchableOpacity
              style={styles.retryButton}
              onPress={this.handleRetry}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;