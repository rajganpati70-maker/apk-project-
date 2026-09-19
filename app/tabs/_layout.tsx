/**
 * Tabs Layout
 * Main tab navigation layout for the app
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

/**
 * Placeholder screens for tabs
 */
const HomeScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Home Screen</Text>
  </View>
);

const PropertiesScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Properties Screen</Text>
  </View>
);

const FinancialScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Financial Screen</Text>
  </View>
);

const TenantsScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Tenants Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Profile Screen</Text>
  </View>
);

const iconStyles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
});

/**
 * Tabs Layout Component
 */
export default function TabsLayout() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Text style={[iconStyles.icon, { color }]}>🏠</Text>
            ),
          }}
        />
        <Tab.Screen
          name="properties"
          component={PropertiesScreen}
          options={{
            tabBarLabel: 'Properties',
            tabBarIcon: ({ color }) => (
              <Text style={[iconStyles.icon, { color }]}>🏢</Text>
            ),
          }}
        />
        <Tab.Screen
          name="financial"
          component={FinancialScreen}
          options={{
            tabBarLabel: 'Financial',
            tabBarIcon: ({ color }) => (
              <Text style={[iconStyles.icon, { color }]}>💰</Text>
            ),
          }}
        />
        <Tab.Screen
          name="tenants"
          component={TenantsScreen}
          options={{
            tabBarLabel: 'Tenants',
            tabBarIcon: ({ color }) => (
              <Text style={[iconStyles.icon, { color }]}>👥</Text>
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <Text style={[iconStyles.icon, { color }]}>👤</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  placeholderText: {
    fontSize: 18,
    color: '#6B7280',
  },
});