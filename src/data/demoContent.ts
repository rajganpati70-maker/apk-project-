/**
 * Demo Content Data
 * Comprehensive rental industry demo data for the AnyRenting app
 * Provides realistic data for properties, tenants, financials, and analytics
 */

import {
  DemoContent,
  ContentBlockType,
  MetricBlockData,
  ChartBlockData,
  ListBlockData,
  CardBlockData,
  ListItem,
  ChartDataPoint,
} from '../types';

/**
 * Main Dashboard Demo Content
 */
export const mainDashboardContent: DemoContent = {
  id: 'main-dashboard',
  title: 'Dashboard',
  description: 'Overview of your rental business performance',
  sections: [
    {
      id: 'key-metrics',
      title: 'Key Performance Metrics',
      blocks: [
        {
          id: 'total-properties',
          type: ContentBlockType.METRIC,
          title: 'Total Properties',
          data: {
            value: 156,
            label: 'Active Properties',
            change: 12,
            changeType: 'increase',
            unit: 'properties',
            format: 'number',
            trend: [140, 145, 148, 150, 152, 156],
          } as MetricBlockData,
        },
        {
          id: 'occupancy-rate',
          type: ContentBlockType.METRIC,
          title: 'Occupancy Rate',
          data: {
            value: 94.2,
            label: 'Current Occupancy',
            change: 2.8,
            changeType: 'increase',
            unit: '%',
            suffix: '%',
            format: 'percentage',
            trend: [88, 90, 91, 92, 93, 94.2],
          } as MetricBlockData,
        },
        {
          id: 'monthly-revenue',
          type: ContentBlockType.METRIC,
          title: 'Monthly Revenue',
          data: {
            value: 284500,
            label: 'Total Monthly Income',
            change: 8.5,
            changeType: 'increase',
            prefix: '$',
            format: 'currency',
            trend: [250000, 260000, 265000, 270000, 275000, 284500],
          } as MetricBlockData,
        },
        {
          id: 'active-tenants',
          type: ContentBlockType.METRIC,
          title: 'Active Tenants',
          data: {
            value: 142,
            label: 'Current Tenants',
            change: 5,
            changeType: 'increase',
            unit: 'tenants',
            format: 'number',
            trend: [130, 135, 138, 140, 141, 142],
          } as MetricBlockData,
        },
      ],
    },
    {
      id: 'revenue-analytics',
      title: 'Revenue Analytics',
      blocks: [
        {
          id: 'revenue-chart',
          type: ContentBlockType.CHART,
          title: 'Revenue Trend (6 Months)',
          data: {
            type: 'line',
            data: [
              { label: 'Jan', value: 245000 },
              { label: 'Feb', value: 252000 },
              { label: 'Mar', value: 261000 },
              { label: 'Apr', value: 268000 },
              { label: 'May', value: 275000 },
              { label: 'Jun', value: 284500 },
            ] as ChartDataPoint[],
            colors: ['#3B82F6'],
            showLegend: true,
            showGrid: true,
            interactive: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'recent-activities',
      title: '📋 Recent Activities',
      description: 'Latest activities and updates',
      blocks: [
        {
          id: 'activity-list',
          type: ContentBlockType.LIST,
          title: 'Latest Activities',
          data: {
            items: [
              {
                id: '1',
                title: 'New lease signed',
                description: 'Apartment 4B - Johnson Family',
                icon: '📝',
                metadata: { time: '2 hours ago', type: 'lease' },
              },
              {
                id: '2',
                title: 'Payment received',
                description: '$1,850 from Smith Inc.',
                icon: '💳',
                metadata: { time: '4 hours ago', type: 'payment' },
              },
              {
                id: '3',
                title: 'Maintenance request',
                description: 'HVAC repair needed - Unit 12A',
                icon: '🔧',
                metadata: { time: '6 hours ago', type: 'maintenance' },
              },
              {
                id: '4',
                title: 'Application approved',
                description: 'New tenant for Studio 7',
                icon: '✅',
                metadata: { time: '1 day ago', type: 'application' },
              },
              {
                id: '5',
                title: 'Property inspection',
                description: 'Annual inspection completed',
                icon: '🔍',
                metadata: { time: '2 days ago', type: 'inspection' },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'property-overview',
      title: '🏢 Property Overview',
      description: 'Featured properties and their status',
      blocks: [
        {
          id: 'property-cards',
          type: ContentBlockType.CARD,
          title: 'Featured Properties',
          data: {
            size: 'medium',
            layout: 'vertical',
          } as CardBlockData,
        },
      ],
    },
    {
      id: 'financial-summary',
      title: '💰 Financial Summary',
      description: 'Revenue and expense overview',
      blocks: [
        {
          id: 'revenue-chart',
          type: ContentBlockType.CHART,
          title: 'Monthly Revenue',
          data: {
            type: 'bar',
            data: [
              { label: 'Jan', value: 245000 },
              { label: 'Feb', value: 252000 },
              { label: 'Mar', value: 261000 },
              { label: 'Apr', value: 268000 },
              { label: 'May', value: 275000 },
              { label: 'Jun', value: 284500 },
            ] as ChartDataPoint[],
            colors: ['#10B981'],
            showLegend: true,
            showGrid: true,
            interactive: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'tenant-activity',
      title: '👥 Tenant Activity',
      description: 'Recent tenant activities and communications',
      blocks: [
        {
          id: 'tenant-list',
          type: ContentBlockType.LIST,
          title: 'Active Tenants',
          data: {
            items: [
              {
                id: '1',
                title: 'John Smith',
                description: 'Unit 204 - Active since Jan 2024',
                icon: '👤',
                metadata: { status: 'active', leaseExpiry: 'Dec 2024' },
              },
              {
                id: '2',
                title: 'Sarah Johnson',
                description: 'Unit 312 - Active since Mar 2024',
                icon: '👤',
                metadata: { status: 'active', leaseExpiry: 'Mar 2025' },
              },
              {
                id: '3',
                title: 'Michael Chen',
                description: 'Unit 456 - Active since Feb 2024',
                icon: '👤',
                metadata: { status: 'active', leaseExpiry: 'Feb 2025' },
              },
              {
                id: '4',
                title: 'Emily Davis',
                description: 'Unit 567 - Active since Apr 2024',
                icon: '👤',
                metadata: { status: 'active', leaseExpiry: 'Apr 2025' },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'maintenance-status',
      title: '🔧 Maintenance Status',
      description: 'Current maintenance requests and status',
      blocks: [
        {
          id: 'maintenance-metrics',
          type: ContentBlockType.METRIC,
          title: 'Open Requests',
          data: {
            value: 23,
            label: 'Active Maintenance Requests',
            change: 3,
            changeType: 'increase',
            unit: 'requests',
            format: 'number',
            trend: [18, 20, 19, 21, 22, 23],
          } as MetricBlockData,
        },
        {
          id: 'maintenance-list',
          type: ContentBlockType.LIST,
          title: 'Urgent Requests',
          data: {
            items: [
              {
                id: '1',
                title: 'Water Leak - Unit 204',
                description: 'Critical - Immediate attention required',
                icon: '🚨',
                metadata: { priority: 'critical', status: 'pending' },
              },
              {
                id: '2',
                title: 'Power Outage - Building B',
                description: 'High priority - Affecting multiple units',
                icon: '⚡',
                metadata: { priority: 'high', status: 'in-progress' },
              },
              {
                id: '3',
                title: 'Heating Failure - Unit 312',
                description: 'High priority - Winter season',
                icon: '❄️',
                metadata: { priority: 'high', status: 'scheduled' },
              },
            ] as ListItem[],
            showAvatar: false,
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
  ],
  metadata: {
    category: 'dashboard',
    tags: ['overview', 'analytics', 'performance'],
    featured: true,
    priority: 1,
  },
  version: '1.0.0',
  lastUpdated: '2024-09-18',
};

/**
 * Property Management Demo Content
 */
export const propertyManagementContent: DemoContent = {
  id: 'property-management',
  title: 'Property Management',
  description: 'Manage your rental properties efficiently',
  sections: [
    {
      id: 'property-summary',
      title: '📊 Property Summary',
      description: 'Overview of all rental properties',
      blocks: [
        {
          id: 'property-metrics',
          type: ContentBlockType.METRIC,
          title: 'Property Statistics',
          data: {
            value: 156,
            label: 'Total Properties',
            change: 12,
            changeType: 'increase',
            unit: 'properties',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'maintenance-metrics',
          type: ContentBlockType.METRIC,
          title: 'Maintenance Requests',
          data: {
            value: 23,
            label: 'Open Requests',
            change: -5,
            changeType: 'decrease',
            unit: 'requests',
            format: 'number',
          } as MetricBlockData,
        },
      ],
    },
    {
      id: 'property-listings',
      title: '🏢 Property Listings',
      description: 'Complete list of all rental properties',
      blocks: [
        {
          id: 'property-list',
          type: ContentBlockType.LIST,
          title: 'All Properties',
          data: {
            items: [
              {
                id: 'prop-1',
                title: 'Sunset Apartments',
                description: '24 units • Mixed residential',
                icon: '🏢',
                badge: 'Active',
                metadata: { occupancy: '92%', revenue: '$45,200/month' },
              },
              {
                id: 'prop-2',
                title: 'Riverside Complex',
                description: '36 units • Luxury apartments',
                icon: '🌊',
                badge: 'Active',
                metadata: { occupancy: '95%', revenue: '$78,500/month' },
              },
              {
                id: 'prop-3',
                title: 'Downtown Lofts',
                description: '18 units • Commercial spaces',
                icon: '🏙️',
                badge: 'Active',
                metadata: { occupancy: '88%', revenue: '$52,300/month' },
              },
              {
                id: 'prop-4',
                title: 'Garden Townhouses',
                description: '12 units • Family townhouses',
                icon: '🏡',
                badge: 'Active',
                metadata: { occupancy: '100%', revenue: '$28,800/month' },
              },
              {
                id: 'prop-5',
                title: 'Student Housing Block',
                description: '48 units • Student accommodation',
                icon: '🎓',
                badge: 'Active',
                metadata: { occupancy: '97%', revenue: '$38,400/month' },
              },
              {
                id: 'prop-6',
                title: 'Industrial Park Units',
                description: '8 units • Warehouse spaces',
                icon: '🏭',
                badge: 'Maintenance',
                metadata: { occupancy: '75%', revenue: '$22,100/month' },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
            searchable: true,
            sortOptions: [
              { id: 'name', label: 'Name', field: 'title', direction: 'asc' },
              { id: 'occupancy', label: 'Occupancy', field: 'occupancy', direction: 'desc' },
              { id: 'revenue', label: 'Revenue', field: 'revenue', direction: 'desc' },
            ],
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'property-analytics',
      title: '📈 Property Analytics',
      description: 'Performance metrics and analytics',
      blocks: [
        {
          id: 'occupancy-chart',
          type: ContentBlockType.CHART,
          title: 'Occupancy by Property Type',
          data: {
            type: 'bar',
            data: [
              { label: 'Apartments', value: 92 },
              { label: 'Houses', value: 88 },
              { label: 'Commercial', value: 85 },
              { label: 'Industrial', value: 75 },
            ] as ChartDataPoint[],
            colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
            showLegend: true,
            showGrid: true,
          } as ChartBlockData,
        },
      ],
    },
  ],
  metadata: {
    category: 'properties',
    tags: ['management', 'listings', 'analytics'],
    featured: true,
    priority: 2,
  },
  version: '1.0.0',
  lastUpdated: '2024-09-18',
};

/**
 * Financial Management Demo Content
 */
export const financialManagementContent: DemoContent = {
  id: 'financial-management',
  title: 'Financial Management',
  description: 'Track revenue, expenses, and financial performance',
  sections: [
    {
      id: 'financial-overview',
      title: '💰 Financial Overview',
      description: 'Complete financial performance dashboard',
      blocks: [
        {
          id: 'total-revenue',
          type: ContentBlockType.METRIC,
          title: 'Total Revenue',
          data: {
            value: 284500,
            label: 'Monthly Revenue',
            change: 8.5,
            changeType: 'increase',
            prefix: '$',
            format: 'currency',
          } as MetricBlockData,
        },
        {
          id: 'total-expenses',
          type: ContentBlockType.METRIC,
          title: 'Total Expenses',
          data: {
            value: 125800,
            label: 'Monthly Expenses',
            change: 3.2,
            changeType: 'decrease',
            prefix: '$',
            format: 'currency',
          } as MetricBlockData,
        },
        {
          id: 'net-profit',
          type: ContentBlockType.METRIC,
          title: 'Net Profit',
          data: {
            value: 158700,
            label: 'Monthly Net Profit',
            change: 15.2,
            changeType: 'increase',
            prefix: '$',
            format: 'currency',
          } as MetricBlockData,
        },
        {
          id: 'profit-margin',
          type: ContentBlockType.METRIC,
          title: 'Profit Margin',
          data: {
            value: 55.7,
            label: 'Profit Percentage',
            change: 4.1,
            changeType: 'increase',
            suffix: '%',
            format: 'percentage',
          } as MetricBlockData,
        },
      ],
    },
    {
      id: 'revenue-breakdown',
      title: '📊 Revenue Breakdown',
      description: 'Detailed revenue analysis by category',
      blocks: [
        {
          id: 'revenue-by-property',
          type: ContentBlockType.CHART,
          title: 'Revenue by Property Type',
          data: {
            type: 'donut',
            data: [
              { label: 'Apartments', value: 145000 },
              { label: 'Houses', value: 68000 },
              { label: 'Commercial', value: 52000 },
              { label: 'Industrial', value: 19500 },
            ] as ChartDataPoint[],
            colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
            showLegend: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'recent-transactions',
      title: '💳 Recent Transactions',
      description: 'Latest financial transactions',
      blocks: [
        {
          id: 'transaction-list',
          type: ContentBlockType.LIST,
          title: 'Latest Transactions',
          data: {
            items: [
              {
                id: 'txn-1',
                title: 'Rent Payment - Unit 4B',
                description: '$1,850 received',
                icon: '💰',
                metadata: { date: 'Sep 15, 2024', status: 'completed' },
              },
              {
                id: 'txn-2',
                title: 'Maintenance Cost - HVAC',
                description: '$450 paid',
                icon: '🔧',
                metadata: { date: 'Sep 14, 2024', status: 'completed' },
              },
              {
                id: 'txn-3',
                title: 'Utility Payment - Water',
                description: '$820 paid',
                icon: '💧',
                metadata: { date: 'Sep 13, 2024', status: 'completed' },
              },
              {
                id: 'txn-4',
                title: 'Rent Payment - Unit 12A',
                description: '$2,100 received',
                icon: '💰',
                metadata: { date: 'Sep 12, 2024', status: 'completed' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'expense-tracking',
      title: '💸 Expense Tracking',
      description: 'Monitor and categorize all expenses',
      blocks: [
        {
          id: 'expense-categories',
          type: ContentBlockType.CHART,
          title: 'Expenses by Category',
          data: {
            type: 'bar',
            data: [
              { label: 'Maintenance', value: 12500 },
              { label: 'Utilities', value: 8200 },
              { label: 'Insurance', value: 5800 },
              { label: 'Taxes', value: 9500 },
              { label: 'Other', value: 9200 },
            ] as ChartDataPoint[],
            colors: ['#EF4444'],
            showLegend: true,
            showGrid: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'budget-management',
      title: '📊 Budget Management',
      description: 'Track budgets and financial goals',
      blocks: [
        {
          id: 'budget-metrics',
          type: ContentBlockType.METRIC,
          title: 'Budget Utilization',
          data: {
            value: 67,
            label: 'Monthly Budget Used',
            change: 5,
            changeType: 'increase',
            unit: '%',
            format: 'percentage',
          } as MetricBlockData,
        },
        {
          id: 'budget-list',
          type: ContentBlockType.LIST,
          title: 'Budget vs Actual',
          data: {
            items: [
              {
                id: 'budget-1',
                title: 'Maintenance Budget',
                description: '$15,000 / $12,500 used',
                icon: '🔧',
                metadata: { percentage: '83%', status: 'on-track' },
              },
              {
                id: 'budget-2',
                title: 'Marketing Budget',
                description: '$5,000 / $3,200 used',
                icon: '📢',
                metadata: { percentage: '64%', status: 'on-track' },
              },
              {
                id: 'budget-3',
                title: 'Utilities Budget',
                description: '$10,000 / $8,200 used',
                icon: '💡',
                metadata: { percentage: '82%', status: 'on-track' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'lease-management',
      title: '📄 Lease Management',
      description: 'Track and manage all lease agreements',
      blocks: [
        {
          id: 'lease-metrics',
          type: ContentBlockType.METRIC,
          title: 'Active Leases',
          data: {
            value: 142,
            label: 'Currently Active',
            change: 8,
            changeType: 'increase',
            unit: 'leases',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'lease-list',
          type: ContentBlockType.LIST,
          title: 'Expiring Soon',
          data: {
            items: [
              {
                id: 'lease-1',
                title: 'Unit 204 - John Smith',
                description: 'Expires in 30 days',
                icon: '⚠️',
                metadata: { status: 'expiring-soon', action: 'contact' },
              },
              {
                id: 'lease-2',
                title: 'Unit 312 - Sarah Johnson',
                description: 'Expires in 45 days',
                icon: '⚠️',
                metadata: { status: 'expiring-soon', action: 'prepare' },
              },
              {
                id: 'lease-3',
                title: 'Unit 456 - Michael Chen',
                description: 'Expires in 60 days',
                icon: '⚠️',
                metadata: { status: 'expiring-soon', action: 'monitor' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'tenant-communications',
      title: '💬 Tenant Communications',
      description: 'Manage tenant messages and notifications',
      blocks: [
        {
          id: 'communication-metrics',
          type: ContentBlockType.METRIC,
          title: 'Unread Messages',
          data: {
            value: 23,
            label: 'Messages Requiring Attention',
            change: 5,
            changeType: 'increase',
            unit: 'messages',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'communication-list',
          type: ContentBlockType.LIST,
          title: 'Recent Messages',
          data: {
            items: [
              {
                id: 'msg-1',
                title: 'Maintenance Request',
                description: 'Unit 204 - Water leak reported',
                icon: '�',
                metadata: { time: '2 hours ago', priority: 'high' },
              },
              {
                id: 'msg-2',
                title: 'Payment Inquiry',
                description: 'Unit 312 - Asking about invoice',
                icon: '💳',
                metadata: { time: '5 hours ago', priority: 'medium' },
              },
              {
                id: 'msg-3',
                title: 'Lease Question',
                description: 'Unit 456 - Early termination inquiry',
                icon: '�',
                metadata: { time: '1 day ago', priority: 'low' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'tenant-satisfaction',
      title: '⭐ Tenant Satisfaction',
      description: 'Monitor tenant satisfaction and feedback',
      blocks: [
        {
          id: 'satisfaction-metrics',
          type: ContentBlockType.METRIC,
          title: 'Average Rating',
          data: {
            value: 4.2,
            label: 'Out of 5.0 Stars',
            change: 0.3,
            changeType: 'increase',
            unit: 'stars',
            format: 'decimal',
          } as MetricBlockData,
        },
        {
          id: 'satisfaction-chart',
          type: ContentBlockType.CHART,
          title: 'Rating Distribution',
          data: {
            type: 'bar',
            data: [
              { label: '5 Stars', value: 65 },
              { label: '4 Stars', value: 25 },
              { label: '3 Stars', value: 8 },
              { label: '2 Stars', value: 2 },
              { label: '1 Star', value: 0 },
            ] as ChartDataPoint[],
            colors: ['#10B981'],
            showLegend: true,
            showGrid: true,
          } as ChartBlockData,
        },
      ],
    },
  ],
  metadata: {
    category: 'financial',
    tags: ['revenue', 'expenses', 'analytics'],
    featured: true,
    priority: 3,
  },
  version: '1.0.0',
  lastUpdated: '2024-09-18',
};

/**
 * Tenant Management Demo Content
 */
export const tenantManagementContent: DemoContent = {
  id: 'tenant-management',
  title: 'Tenant Management',
  description: 'Manage tenant relationships and communications',
  sections: [
    {
      id: 'tenant-overview',
      title: '👥 Tenant Overview',
      description: 'Complete tenant portfolio statistics',
      blocks: [
        {
          id: 'total-tenants',
          type: ContentBlockType.METRIC,
          title: 'Total Tenants',
          data: {
            value: 142,
            label: 'Active Tenants',
            change: 5,
            changeType: 'increase',
            unit: 'tenants',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'pending-applications',
          type: ContentBlockType.METRIC,
          title: 'Pending Applications',
          data: {
            value: 8,
            label: 'Applications to Review',
            change: 2,
            changeType: 'increase',
            unit: 'applications',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'expiring-leases',
          type: ContentBlockType.METRIC,
          title: 'Expiring Leases',
          data: {
            value: 12,
            label: 'Leases Expiring Soon',
            change: -3,
            changeType: 'decrease',
            unit: 'leases',
            format: 'number',
          } as MetricBlockData,
        },
      ],
    },
    {
      id: 'tenant-directory',
      title: 'Tenant Directory',
      blocks: [
        {
          id: 'tenant-list',
          type: ContentBlockType.LIST,
          title: 'All Tenants',
          data: {
            items: [
              {
                id: 'tenant-1',
                title: 'Johnson Family',
                description: 'Unit 4B • Lease ends Dec 2024',
                icon: '👨‍👩‍👧‍👦',
                badge: 'Active',
                metadata: { payment: 'Current', rent: '$1,850/month' },
              },
              {
                id: 'tenant-2',
                title: 'Smith Inc.',
                description: 'Unit 12A • Commercial lease',
                icon: '🏢',
                badge: 'Active',
                metadata: { payment: 'Current', rent: '$3,200/month' },
              },
              {
                id: 'tenant-3',
                title: 'Emily Chen',
                description: 'Studio 7 • Student housing',
                icon: '👩',
                badge: 'Active',
                metadata: { payment: 'Current', rent: '$950/month' },
              },
              {
                id: 'tenant-4',
                title: 'Michael Brown',
                description: 'Unit 8C • Luxury apartment',
                icon: '👨',
                badge: 'Active',
                metadata: { payment: 'Late', rent: '$2,400/month' },
              },
              {
                id: 'tenant-5',
                title: 'Garcia Family',
                description: 'Townhouse 3 • Family unit',
                icon: '👨‍👩‍👧',
                badge: 'Active',
                metadata: { payment: 'Current', rent: '$2,100/month' },
              },
            ] as ListItem[],
            showAvatar: true,
            showIcon: true,
            searchable: true,
            sortOptions: [
              { id: 'name', label: 'Name', field: 'title', direction: 'asc' },
              { id: 'rent', label: 'Rent', field: 'rent', direction: 'desc' },
              { id: 'lease', label: 'Lease End', field: 'lease', direction: 'asc' },
            ],
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'communication-center',
      title: 'Communication Center',
      blocks: [
        {
          id: 'message-list',
          type: ContentBlockType.LIST,
          title: 'Recent Messages',
          data: {
            items: [
              {
                id: 'msg-1',
                title: 'Johnson Family',
                description: 'Requesting maintenance for kitchen sink',
                icon: '💬',
                metadata: { time: '1 hour ago', unread: true },
              },
              {
                id: 'msg-2',
                title: 'Smith Inc.',
                description: 'Question about parking allocation',
                icon: '💬',
                metadata: { time: '3 hours ago', unread: false },
              },
              {
                id: 'msg-3',
                title: 'Emily Chen',
                description: 'Package delivery notification',
                icon: '📦',
                metadata: { time: '1 day ago', unread: false },
              },
              {
                id: 'msg-4',
                title: 'System Notification',
                description: 'Rent payment reminder sent to 5 tenants',
                icon: '🔔',
                metadata: { time: '2 days ago', unread: false },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
  ],
  metadata: {
    category: 'tenants',
    tags: ['directory', 'communications', 'applications'],
    featured: true,
    priority: 4,
  },
  version: '1.0.0',
  lastUpdated: '2024-09-18',
};

/**
 * Get demo content by ID
 */
export const getDemoContent = (id: string): DemoContent | null => {
  switch (id) {
    case 'main-dashboard':
      return mainDashboardContent;
    case 'property-management':
      return propertyManagementContent;
    case 'financial-management':
      return financialManagementContent;
    case 'tenant-management':
      return tenantManagementContent;
    default:
      return null;
  }
};

/**
 * Get all demo content
 */
export const getAllDemoContent = (): DemoContent[] => {
  return [
    mainDashboardContent,
    propertyManagementContent,
    financialManagementContent,
    tenantManagementContent,
  ];
};