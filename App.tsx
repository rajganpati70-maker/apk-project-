/**
 * AnyRenting App - Comprehensive Multi-Level Navigation System
 * Task 1-4: Enhanced navigation with clickable items, detail pages, and sub-pages
 * Task 2: Bottom tab navigation structure with 6 tabs
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import navigation context and components
import { NavigationProvider } from './src/context/NavigationContext';
import CustomNavigator from './src/components/navigation/CustomNavigator';

// Import tab screens
import PropertiesTab from './src/tabs/PropertiesTab';
import LeadCrmTab from './src/tabs/LeadCrmTab';
import RentCollectionTab from './src/tabs/RentCollectionTab';
import AccountingTab from './src/tabs/AccountingTab';
import PricingTab from './src/tabs/PricingTab';
import ProfileTab from './src/tabs/ProfileTab';

const Tab = createBottomTabNavigator();

/**
 * Main App Component with Bottom Tab Navigation
 */
const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationProvider>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#667eea',
              tabBarInactiveTintColor: '#9ca3af',
              tabBarStyle: {
                backgroundColor: '#ffffff',
                borderTopWidth: 1,
                borderTopColor: '#e5e7eb',
                paddingBottom: 5,
                paddingTop: 5,
                height: 60,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
              },
              headerShown: false,
            }}
          >
            <Tab.Screen 
              name="Properties" 
              component={PropertiesTab}
              options={{ 
                tabBarLabel: 'Properties',
                tabBarIcon: () => null // Will add icons later
              }} 
            />
            <Tab.Screen 
              name="LeadCRM" 
              component={LeadCrmTab}
              options={{ 
                tabBarLabel: 'Lead CRM',
                tabBarIcon: () => null
              }} 
            />
            <Tab.Screen 
              name="RentCollection" 
              component={RentCollectionTab}
              options={{ 
                tabBarLabel: 'Rent Collection',
                tabBarIcon: () => null
              }} 
            />
            <Tab.Screen 
              name="Accounting" 
              component={AccountingTab}
              options={{ 
                tabBarLabel: 'Accounting',
                tabBarIcon: () => null
              }} 
            />
            <Tab.Screen 
              name="Pricing" 
              component={PricingTab}
              options={{ 
                tabBarLabel: 'Pricing',
                tabBarIcon: () => null
              }} 
            />
            <Tab.Screen 
              name="Profile" 
              component={ProfileTab}
              options={{ 
                tabBarLabel: 'Profile',
                tabBarIcon: () => null
              }} 
            />
          </Tab.Navigator>
        </NavigationContainer>
      </NavigationProvider>
    </SafeAreaProvider>
  );
};

export default App;