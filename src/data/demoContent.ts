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
  ListItem,
  ChartDataPoint,
} from '../types/navigation';

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
  ],
  metadata: {
    category: 'dashboard',
    tags: ['overview', 'analytics', 'performance'],
    featured: true,
    priority: 1,
  },
  version: '1.0.0',
  lastUpdated: '2024-09-20',
};

/**
 * Property Management Detail Page Content (COMPLETELY DIFFERENT)
 */
export const propertyDetailContent: DemoContent = {
  id: 'property-detail',
  title: 'Property Management',
  description: 'Detailed property operations and management',
  sections: [
    {
      id: 'property-operations',
      title: '🏢 Property Operations',
      description: 'Manage day-to-day property activities',
      blocks: [
        {
          id: 'property-metrics',
          type: ContentBlockType.METRIC,
          title: 'Properties Under Management',
          data: {
            value: 156,
            label: 'Total Portfolio',
            change: 8,
            changeType: 'increase',
            unit: 'properties',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'vacancy-rate',
          type: ContentBlockType.METRIC,
          title: 'Vacancy Rate',
          data: {
            value: 5.8,
            label: 'Current Vacancies',
            change: -1.2,
            changeType: 'decrease',
            unit: '%',
            suffix: '%',
            format: 'percentage',
          } as MetricBlockData,
        },
      ],
    },
    {
      id: 'property-types',
      title: '📊 Property Types Distribution',
      blocks: [
        {
          id: 'property-type-chart',
          type: ContentBlockType.CHART,
          title: 'Properties by Type',
          data: {
            type: 'bar',
            data: [
              { label: 'Apartments', value: 89 },
              { label: 'Houses', value: 34 },
              { label: 'Commercial', value: 21 },
              { label: 'PG/Hostel', value: 12 },
            ] as ChartDataPoint[],
            colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
            showLegend: true,
            showGrid: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'property-tasks',
      title: '📋 Property Tasks',
      description: 'Current property management tasks',
      blocks: [
        {
          id: 'task-list',
          type: ContentBlockType.LIST,
          title: 'Active Tasks',
          data: {
            items: [
              {
                id: 'task-1',
                title: 'Lease renewal processing',
                description: '15 leases expiring this month',
                icon: '📄',
                badge: 'Urgent',
                metadata: { priority: 'high', due: 'This week' },
              },
              {
                id: 'task-2',
                title: 'Property inspections',
                description: 'Quarterly inspections due',
                icon: '🔍',
                badge: 'In Progress',
                metadata: { priority: 'medium', due: 'This month' },
              },
              {
                id: 'task-3',
                title: 'Rent increase notifications',
                description: 'Annual rent adjustment letters',
                icon: '📧',
                badge: 'Pending',
                metadata: { priority: 'medium', due: 'Next week' },
              },
              {
                id: 'task-4',
                title: 'Insurance policy renewals',
                description: '3 properties need coverage update',
                icon: '🛡️',
                badge: 'Urgent',
                metadata: { priority: 'high', due: 'Tomorrow' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'property-performance',
      title: '📈 Property Performance',
      blocks: [
        {
          id: 'performance-chart',
          type: ContentBlockType.CHART,
          title: 'Monthly Property Performance',
          data: {
            type: 'line',
            data: [
              { label: 'Jan', value: 92 },
              { label: 'Feb', value: 94 },
              { label: 'Mar', value: 91 },
              { label: 'Apr', value: 95 },
              { label: 'May', value: 93 },
              { label: 'Jun', value: 96 },
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
    category: 'properties',
    tags: ['management', 'operations', 'performance'],
    featured: true,
    priority: 2,
  },
  version: '1.0.0',
  lastUpdated: '2024-09-20',
};

/**
 * Financial Management Detail Page Content (COMPLETELY DIFFERENT)
 */
export const financialDetailContent: DemoContent = {
  id: 'financial-detail',
  title: 'Financial Management',
  description: 'Detailed financial operations and reporting',
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
      ],
    },
    {
      id: 'payment-tracking',
      title: '💳 Payment Tracking',
      description: 'Monitor rent payments and collections',
      blocks: [
        {
          id: 'payment-metrics',
          type: ContentBlockType.METRIC,
          title: 'Collection Rate',
          data: {
            value: 94.7,
            label: 'On-time Payments',
            change: 2.3,
            changeType: 'increase',
            unit: '%',
            suffix: '%',
            format: 'percentage',
          } as MetricBlockData,
        },
        {
          id: 'pending-payments',
          type: ContentBlockType.METRIC,
          title: 'Pending Collections',
          data: {
            value: 18500,
            label: 'Outstanding Amount',
            change: -5.8,
            changeType: 'decrease',
            prefix: '$',
            format: 'currency',
          } as MetricBlockData,
        },
      ],
    },
    {
      id: 'recent-transactions',
      title: '📊 Recent Transactions',
      blocks: [
        {
          id: 'transaction-list',
          type: ContentBlockType.LIST,
          title: 'Latest Financial Transactions',
          data: {
            items: [
              {
                id: 'txn-1',
                title: 'Rent Payment - Unit 4B',
                description: '$1,850 received via bank transfer',
                icon: '💰',
                badge: 'Completed',
                metadata: { date: 'Sep 19, 2024', method: 'Bank Transfer' },
              },
              {
                id: 'txn-2',
                title: 'Maintenance Payment',
                description: '$450 paid to ABC Plumbing',
                icon: '🔧',
                badge: 'Completed',
                metadata: { date: 'Sep 18, 2024', method: 'Check' },
              },
              {
                id: 'txn-3',
                title: 'Utility Bill Payment',
                description: '$820 paid to City Electric',
                icon: '⚡',
                badge: 'Completed',
                metadata: { date: 'Sep 17, 2024', method: 'Auto-pay' },
              },
              {
                id: 'txn-4',
                title: 'Late Fee Payment',
                description: '$75 received from Unit 12A',
                icon: '⚠️',
                badge: 'Completed',
                metadata: { date: 'Sep 16, 2024', method: 'Cash' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'expense-breakdown',
      title: '📈 Expense Analysis',
      blocks: [
        {
          id: 'expense-chart',
          type: ContentBlockType.CHART,
          title: 'Monthly Expenses by Category',
          data: {
            type: 'bar',
            data: [
              { label: 'Maintenance', value: 15000 },
              { label: 'Utilities', value: 8200 },
              { label: 'Insurance', value: 5800 },
              { label: 'Taxes', value: 9500 },
              { label: 'Marketing', value: 3200 },
            ] as ChartDataPoint[],
            colors: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
            showLegend: true,
            showGrid: true,
          } as ChartBlockData,
        },
      ],
    },
  ],
  metadata: {
    category: 'financial',
    tags: ['revenue', 'expenses', 'payments'],
    featured: true,
    priority: 3,
  },
  version: '1.0.0',
  lastUpdated: '2024-09-20',
};

/**
 * Tenant Management Detail Page Content (COMPLETELY DIFFERENT)
 */
export const tenantDetailContent: DemoContent = {
  id: 'tenant-detail',
  title: 'Tenant Management',
  description: 'Detailed tenant operations and communications',
  sections: [
    {
      id: 'tenant-overview',
      title: '👥 Tenant Overview',
      description: 'Complete tenant management dashboard',
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
          id: 'new-applications',
          type: ContentBlockType.METRIC,
          title: 'Pending Applications',
          data: {
            value: 23,
            label: 'Applications to Review',
            change: 8,
            changeType: 'increase',
            unit: 'applications',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'lease-expiry',
          type: ContentBlockType.METRIC,
          title: 'Leases Expiring',
          data: {
            value: 12,
            label: 'This Month',
            change: -3,
            changeType: 'decrease',
            unit: 'leases',
            format: 'number',
          } as MetricBlockData,
        },
      ],
    },
    {
      id: 'tenant-activities',
      title: '📋 Tenant Activities',
      description: 'Recent tenant interactions and activities',
      blocks: [
        {
          id: 'activity-list',
          type: ContentBlockType.LIST,
          title: 'Recent Tenant Activities',
          data: {
            items: [
              {
                id: 'act-1',
                title: 'Maintenance request submitted',
                description: 'John Smith - Unit 204 (Plumbing issue)',
                icon: '🔧',
                badge: 'New',
                metadata: { time: '1 hour ago', priority: 'medium' },
              },
              {
                id: 'act-2',
                title: 'Rent payment received',
                description: 'Sarah Johnson - Unit 312 ($1,200)',
                icon: '💳',
                badge: 'Completed',
                metadata: { time: '3 hours ago', amount: '$1,200' },
              },
              {
                id: 'act-3',
                title: 'Lease renewal request',
                description: 'Michael Chen - Unit 456',
                icon: '📄',
                badge: 'Pending',
                metadata: { time: '1 day ago', expiry: 'Oct 15, 2024' },
              },
              {
                id: 'act-4',
                title: 'Complaint registered',
                description: 'Emily Davis - Unit 567 (Noise issue)',
                icon: '⚠️',
                badge: 'In Progress',
                metadata: { time: '2 days ago', category: 'Quality of Life' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'tenant-demographics',
      title: '📊 Tenant Demographics',
      blocks: [
        {
          id: 'demographics-chart',
          type: ContentBlockType.CHART,
          title: 'Tenants by Lease Type',
          data: {
            type: 'bar',
            data: [
              { label: 'Annual', value: 68 },
              { label: 'Monthly', value: 52 },
              { label: 'Weekly', value: 22 },
            ] as ChartDataPoint[],
            colors: ['#3B82F6', '#10B981', '#F59E0B'],
            showLegend: true,
            showGrid: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'communication-center',
      title: '💬 Communication Center',
      description: 'Tenant communications and notifications',
      blocks: [
        {
          id: 'communication-metrics',
          type: ContentBlockType.METRIC,
          title: 'Messages Sent',
          data: {
            value: 234,
            label: 'This Month',
            change: 18,
            changeType: 'increase',
            unit: 'messages',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'response-rate',
          type: ContentBlockType.METRIC,
          title: 'Response Rate',
          data: {
            value: 87.3,
            label: 'Tenant Engagement',
            change: 5.2,
            changeType: 'increase',
            unit: '%',
            suffix: '%',
            format: 'percentage',
          } as MetricBlockData,
        },
      ],
    },
  ],
  metadata: {
    category: 'tenants',
    tags: ['management', 'communications', 'applications'],
    featured: true,
    priority: 4,
  },
  version: '1.0.0',
  lastUpdated: '2024-09-20',
};

/**
 * Analytics Detail Page Content (COMPLETELY DIFFERENT)
 */
export const analyticsDetailContent: DemoContent = {
  id: 'analytics-detail',
  title: 'Analytics & Reports',
  description: 'Detailed analytics and business intelligence',
  sections: [
    {
      id: 'analytics-overview',
      title: '📊 Analytics Overview',
      description: 'Comprehensive business analytics dashboard',
      blocks: [
        {
          id: 'growth-rate',
          type: ContentBlockType.METRIC,
          title: 'Business Growth',
          data: {
            value: 18.4,
            label: 'YoY Growth Rate',
            change: 3.2,
            changeType: 'increase',
            unit: '%',
            suffix: '%',
            format: 'percentage',
          } as MetricBlockData,
        },
        {
          id: 'market-share',
          type: ContentBlockType.METRIC,
          title: 'Market Share',
          data: {
            value: 12.8,
            label: 'Local Market',
            change: 1.5,
            changeType: 'increase',
            unit: '%',
            suffix: '%',
            format: 'percentage',
          } as MetricBlockData,
        },
      ],
    },
    {
      id: 'performance-trends',
      title: '📈 Performance Trends',
      blocks: [
        {
          id: 'trend-chart',
          type: ContentBlockType.CHART,
          title: '12-Month Performance Trend',
          data: {
            type: 'line',
            data: [
              { label: 'Jul', value: 245000 },
              { label: 'Aug', value: 252000 },
              { label: 'Sep', value: 261000 },
              { label: 'Oct', value: 268000 },
              { label: 'Nov', value: 275000 },
              { label: 'Dec', value: 284500 },
              { label: 'Jan', value: 290000 },
              { label: 'Feb', value: 298000 },
              { label: 'Mar', value: 305000 },
              { label: 'Apr', value: 312000 },
              { label: 'May', value: 318000 },
              { label: 'Jun', value: 325000 },
            ] as ChartDataPoint[],
            colors: ['#8B5CF6'],
            showLegend: true,
            showGrid: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'analytics-reports',
      title: '📋 Analytics Reports',
      description: 'Generated reports and insights',
      blocks: [
        {
          id: 'report-list',
          type: ContentBlockType.LIST,
          title: 'Available Reports',
          data: {
            items: [
              {
                id: 'report-1',
                title: 'Monthly Performance Report',
                description: 'Comprehensive monthly analysis',
                icon: '📊',
                badge: 'Ready',
                metadata: { generated: 'Sep 19, 2024', type: 'Performance' },
              },
              {
                id: 'report-2',
                title: 'Market Analysis Report',
                description: 'Competitor and market trends',
                icon: '📈',
                badge: 'Ready',
                metadata: { generated: 'Sep 18, 2024', type: 'Market' },
              },
              {
                id: 'report-3',
                title: 'Financial Forecast Report',
                description: 'Q4 financial projections',
                icon: '💰',
                badge: 'Generating',
                metadata: { generated: 'Sep 17, 2024', type: 'Financial' },
              },
              {
                id: 'report-4',
                title: 'Tenant Satisfaction Report',
                description: 'Survey results and feedback',
                icon: '⭐',
                badge: 'Ready',
                metadata: { generated: 'Sep 15, 2024', type: 'Satisfaction' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'predictive-analytics',
      title: '🔮 Predictive Analytics',
      blocks: [
        {
          id: 'prediction-metrics',
          type: ContentBlockType.METRIC,
          title: 'Predicted Q4 Revenue',
          data: {
            value: 875000,
            label: 'Forecast',
            change: 12.5,
            changeType: 'increase',
            prefix: '$',
            format: 'currency',
          } as MetricBlockData,
        },
        {
          id: 'confidence-score',
          type: ContentBlockType.METRIC,
          title: 'Prediction Confidence',
          data: {
            value: 94.2,
            label: 'Model Accuracy',
            change: 2.1,
            changeType: 'increase',
            unit: '%',
            suffix: '%',
            format: 'percentage',
          } as MetricBlockData,
        },
      ],
    },
  ],
  metadata: {
    category: 'analytics',
    tags: ['reports', 'trends', 'predictions'],
    featured: true,
    priority: 5,
  },
  version: '1.0.0',
  lastUpdated: '2024-09-20',
};

/**
 * Maintenance Detail Page Content (COMPLETELY DIFFERENT)
 */
export const maintenanceDetailContent: DemoContent = {
  id: 'maintenance-detail',
  title: 'Maintenance Management',
  description: 'Detailed maintenance operations and tracking',
  sections: [
    {
      id: 'maintenance-overview',
      title: '🔧 Maintenance Overview',
      description: 'Complete maintenance management dashboard',
      blocks: [
        {
          id: 'open-requests',
          type: ContentBlockType.METRIC,
          title: 'Open Requests',
          data: {
            value: 23,
            label: 'Active Maintenance',
            change: 3,
            changeType: 'increase',
            unit: 'requests',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'completed-today',
          type: ContentBlockType.METRIC,
          title: 'Completed Today',
          data: {
            value: 8,
            label: 'Tasks Finished',
            change: 2,
            changeType: 'increase',
            unit: 'tasks',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'avg-response-time',
          type: ContentBlockType.METRIC,
          title: 'Avg Response Time',
          data: {
            value: 4.2,
            label: 'Hours to Respond',
            change: -0.8,
            changeType: 'decrease',
            unit: 'hours',
            format: 'number',
          } as MetricBlockData,
        },
      ],
    },
    {
      id: 'maintenance-requests',
      title: '📋 Maintenance Requests',
      description: 'Current maintenance requests and status',
      blocks: [
        {
          id: 'request-list',
          type: ContentBlockType.LIST,
          title: 'Active Requests',
          data: {
            items: [
              {
                id: 'req-1',
                title: 'Water Leak - Unit 204',
                description: 'Critical - Immediate attention required',
                icon: '🚨',
                badge: 'Critical',
                metadata: { priority: 'critical', submitted: '2 hours ago' },
              },
              {
                id: 'req-2',
                title: 'Power Outage - Building B',
                description: 'High priority - Affecting multiple units',
                icon: '⚡',
                badge: 'High',
                metadata: { priority: 'high', submitted: '4 hours ago' },
              },
              {
                id: 'req-3',
                title: 'Heating Failure - Unit 312',
                description: 'High priority - Winter season',
                icon: '❄️',
                badge: 'High',
                metadata: { priority: 'high', submitted: '6 hours ago' },
              },
              {
                id: 'req-4',
                title: 'AC Not Working - Unit 456',
                description: 'Medium priority - Summer season',
                icon: '🌡️',
                badge: 'Medium',
                metadata: { priority: 'medium', submitted: '1 day ago' },
              },
            ] as ListItem[],
            showIcon: true,
          } as ListBlockData,
        },
      ],
    },
    {
      id: 'maintenance-analytics',
      title: '📊 Maintenance Analytics',
      blocks: [
        {
          id: 'category-chart',
          type: ContentBlockType.CHART,
          title: 'Requests by Category',
          data: {
            type: 'bar',
            data: [
              { label: 'Plumbing', value: 8 },
              { label: 'Electrical', value: 6 },
              { label: 'HVAC', value: 5 },
              { label: 'Structural', value: 4 },
            ] as ChartDataPoint[],
            colors: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'],
            showLegend: true,
            showGrid: true,
          } as ChartBlockData,
        },
      ],
    },
    {
      id: 'vendor-management',
      title: '👷 Vendor Management',
      description: 'Maintenance vendors and contractors',
      blocks: [
        {
          id: 'vendor-metrics',
          type: ContentBlockType.METRIC,
          title: 'Active Vendors',
          data: {
            value: 12,
            label: 'Service Providers',
            change: 2,
            changeType: 'increase',
            unit: 'vendors',
            format: 'number',
          } as MetricBlockData,
        },
        {
          id: 'vendor-rating',
          type: ContentBlockType.METRIC,
          title: 'Avg Vendor Rating',
          data: {
            value: 4.6,
            label: 'Customer Satisfaction',
            change: 0.2,
            changeType: 'increase',
            unit: '/5',
            format: 'number',
          } as MetricBlockData,
        },
      ],
    },
  ],
  metadata: {
    category: 'maintenance',
    tags: ['requests', 'vendors', 'analytics'],
    featured: true,
    priority: 6,
  },
  version: '1.0.0',
  lastUpdated: '2024-09-20',
};