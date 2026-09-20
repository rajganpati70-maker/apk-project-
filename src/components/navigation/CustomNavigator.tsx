/**
 * Custom Navigator Component
 * Handles multi-level navigation routing based on custom navigation context
 */

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '../../context/NavigationContext';
import MainDashboard from '../../pages/MainDashboard';
import PropertyDetailPage from '../../pages/PropertyDetailPage';
import FinancialDetailPage from '../../pages/FinancialDetailPage';
import TenantDetailPage from '../../pages/TenantDetailPage';
import AnalyticsDetailPage from '../../pages/AnalyticsDetailPage';
import MaintenanceDetailPage from '../../pages/MaintenanceDetailPage';

const CustomNavigator: React.FC = () => {
  const { currentRoute } = useNavigation();
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  useEffect(() => {
    console.log('Current route changed:', currentRoute);
    // Map routes to page components
    if (currentRoute === '/' || currentRoute === '/dashboard') {
      setCurrentPage('dashboard');
    } else if (currentRoute === '/properties') {
      setCurrentPage('property-detail');
    } else if (currentRoute === '/financial') {
      setCurrentPage('financial-detail');
    } else if (currentRoute === '/tenants') {
      setCurrentPage('tenant-detail');
    } else if (currentRoute === '/analytics') {
      setCurrentPage('analytics-detail');
    } else if (currentRoute === '/maintenance') {
      setCurrentPage('maintenance-detail');
    } else {
      setCurrentPage('dashboard');
    }
  }, [currentRoute]);

  const renderPage = () => {
    console.log('Rendering page:', currentPage);
    switch (currentPage) {
      case 'dashboard':
        return <MainDashboard />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'financial-detail':
        return <FinancialDetailPage />;
      case 'tenant-detail':
        return <TenantDetailPage />;
      case 'analytics-detail':
        return <AnalyticsDetailPage />;
      case 'maintenance-detail':
        return <MaintenanceDetailPage />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderPage()}
    </View>
  );
};

export default CustomNavigator;