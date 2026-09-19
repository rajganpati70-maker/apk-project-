/**
 * Deep Linking Utilities
 * Comprehensive deep linking support for the AnyRenting app
 * Implements URL parsing, parameter handling, and navigation state reconstruction
 */

/**
 * Deep link configuration
 */
export interface DeepLinkConfig {
  scheme: string;
  host?: string;
  paths: Record<string, {
    route: string;
    params?: Record<string, any>;
    requiredParams?: string[];
  }>;
  fallbackRoute?: string;
}

/**
 * Parsed deep link
 */
export interface ParsedDeepLink {
  scheme: string;
  host?: string;
  path: string;
  params: Record<string, any>;
  valid: boolean;
  matchedRoute?: string;
}

/**
 * Deep linking manager
 */
export class DeepLinkingManager {
  private config: DeepLinkConfig;
  private navigationHistory: Map<string, any>;

  constructor(config: DeepLinkConfig) {
    this.config = config;
    this.navigationHistory = new Map();
  }

  /**
   * Parse deep link URL
   */
  parseDeepLink(url: string): ParsedDeepLink {
    try {
      // Remove scheme if present
      let cleanUrl = url;
      if (url.startsWith(this.config.scheme + '://')) {
        cleanUrl = url.substring(this.config.scheme.length + 3);
      } else if (url.startsWith(this.config.scheme + ':')) {
        cleanUrl = url.substring(this.config.scheme.length + 1);
      }

      // Parse URL manually
      const [pathAndQuery] = cleanUrl.split('#');
      const [path, queryString] = pathAndQuery.split('?');
      
      const pathParts = path.split('/');
      const host = pathParts[0] || undefined;
      const finalPath = '/' + pathParts.slice(1).join('/');
      
      const params = this.parseQueryParams(queryString || '');

      // Find matching route
      const matchedRoute = this.findMatchingRoute(finalPath);

      // Validate required parameters
      const valid = this.validateRouteParams(matchedRoute, params);

      return {
        scheme: this.config.scheme,
        host,
        path: finalPath,
        params,
        valid,
        matchedRoute,
      };
    } catch (error) {
      console.error('[DeepLinking] Failed to parse URL:', error);
      return {
        scheme: this.config.scheme,
        path: '/',
        params: {},
        valid: false,
      };
    }
  }

  /**
   * Parse query parameters
   */
  private parseQueryParams(query: string): Record<string, any> {
    const params: Record<string, any> = {};
    
    if (!query) return params;

    const pairs = query.split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value) {
        // Decode and convert to appropriate type
        const decodedValue = decodeURIComponent(value);
        params[key] = this.convertParamType(decodedValue);
      }
    });

    return params;
  }

  /**
   * Convert parameter to appropriate type
   */
  private convertParamType(value: string): any {
    // Try to parse as number
    if (!isNaN(Number(value))) {
      return Number(value);
    }

    // Try to parse as boolean
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;

    // Try to parse as JSON
    if (value.startsWith('{') || value.startsWith('[')) {
      try {
        return JSON.parse(value);
      } catch {
        // Return as string if JSON parsing fails
        return value;
      }
    }

    return value;
  }

  /**
   * Find matching route
   */
  private findMatchingRoute(path: string): string | undefined {
    const pathSegments = path.split('/').filter(Boolean);
    
    for (const [pattern, routeConfig] of Object.entries(this.config.paths)) {
      const patternSegments = pattern.split('/').filter(Boolean);
      
      if (this.matchPathPattern(pathSegments, patternSegments)) {
        return routeConfig.route;
      }
    }

    return undefined;
  }

  /**
   * Match path pattern
   */
  private matchPathPattern(pathSegments: string[], patternSegments: string[]): boolean {
    if (pathSegments.length !== patternSegments.length) {
      return false;
    }

    for (let i = 0; i < pathSegments.length; i++) {
      const pathSegment = pathSegments[i];
      const patternSegment = patternSegments[i];

      // Pattern segment starting with : is a parameter
      if (patternSegment.startsWith(':')) {
        continue;
      }

      if (pathSegment !== patternSegment) {
        return false;
      }
    }

    return true;
  }

  /**
   * Validate route parameters
   */
  private validateRouteParams(route: string | undefined, params: Record<string, any>): boolean {
    if (!route) return false;

    const routeConfig = Object.values(this.config.paths).find(config => config.route === route);
    if (!routeConfig) return true; // No validation if route config not found

    if (routeConfig.requiredParams) {
      for (const requiredParam of routeConfig.requiredParams) {
        if (!(requiredParam in params) || params[requiredParam] === undefined) {
          console.warn(`[DeepLinking] Missing required parameter: ${requiredParam}`);
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Generate deep link URL
   */
  generateDeepLink(route: string, params?: Record<string, any>): string {
    // Find path pattern for route
    const pathPattern = Object.entries(this.config.paths).find(
      ([, config]) => config.route === route
    )?.[0];

    if (!pathPattern) {
      console.warn(`[DeepLinking] No path pattern found for route: ${route}`);
      return '';
    }

    // Replace parameters in path
    let path = pathPattern;
    const queryParams: string[] = [];
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (path.includes(`:${key}`)) {
          path = path.replace(`:${key}`, String(value));
        } else {
          queryParams.push(`${key}=${encodeURIComponent(String(value))}`);
        }
      });
    }

    const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    const url = `${this.config.scheme}://${this.config.host || ''}${path}${queryString}`;

    return url;
  }

  /**
   * Handle deep link navigation
   */
  async handleDeepLink(url: string, navigate: (route: string, params?: any) => void): Promise<boolean> {
    const parsed = this.parseDeepLink(url);

    if (!parsed.valid) {
      console.warn('[DeepLinking] Invalid deep link:', url);
      
      if (this.config.fallbackRoute) {
        navigate(this.config.fallbackRoute);
      }
      
      return false;
    }

    if (parsed.matchedRoute) {
      // Store navigation state for reconstruction
      this.navigationHistory.set(parsed.matchedRoute, {
        params: parsed.params,
        timestamp: Date.now(),
      });

      navigate(parsed.matchedRoute, parsed.params);
      return true;
    }

    // Fallback to home if no match
    if (this.config.fallbackRoute) {
      navigate(this.config.fallbackRoute);
    }

    return false;
  }

  /**
   * Get navigation state for route
   */
  getNavigationState(route: string): any | null {
    return this.navigationHistory.get(route) || null;
  }

  /**
   * Clear navigation history
   */
  clearNavigationHistory(): void {
    this.navigationHistory.clear();
  }

  /**
   * Set configuration
   */
  setConfig(config: Partial<DeepLinkConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get configuration
   */
  getConfig(): DeepLinkConfig {
    return { ...this.config };
  }
}

/**
 * Default deep link configuration for AnyRenting
 */
export const defaultDeepLinkConfig: DeepLinkConfig = {
  scheme: 'anyrenting',
  host: 'app',
  paths: {
    '/': { route: '/' },
    '/properties': { route: '/properties' },
    '/properties/:id': { route: '/properties', requiredParams: ['id'] },
    '/properties/analytics': { route: '/properties/analytics' },
    '/properties/tenants': { route: '/properties/tenants' },
    '/properties/maintenance': { route: '/properties/maintenance' },
    '/financial': { route: '/financial' },
    '/financial/payments': { route: '/financial/payments' },
    '/financial/expenses': { route: '/financial/expenses' },
    '/financial/analytics': { route: '/financial/analytics' },
    '/tenants': { route: '/tenants' },
    '/tenants/directory': { route: '/tenants/directory' },
    '/tenants/applications': { route: '/tenants/applications' },
    '/tenants/communications': { route: '/tenants/communications' },
  },
  fallbackRoute: '/',
};

/**
 * Global deep linking manager instance
 */
export const deepLinkingManager = new DeepLinkingManager(defaultDeepLinkConfig);

/**
 * Deep linking hook equivalent
 */
export const useDeepLinking = () => {
  const parseDeepLink = (url: string) => {
    return deepLinkingManager.parseDeepLink(url);
  };

  const generateDeepLink = (route: string, params?: Record<string, any>) => {
    return deepLinkingManager.generateDeepLink(route, params);
  };

  const handleDeepLink = async (url: string, navigate: (route: string, params?: any) => void) => {
    return await deepLinkingManager.handleDeepLink(url, navigate);
  };

  const getNavigationState = (route: string) => {
    return deepLinkingManager.getNavigationState(route);
  };

  return {
    parseDeepLink,
    generateDeepLink,
    handleDeepLink,
    getNavigationState,
  };
};