# AnyRenting React Native App - Complete Build Prompt

## Overview
Build a premium, multi-page React Native rental management app with 27+ scrollable pages and advanced black theme.

## Tech Stack
- React Native 0.87.1
- React 19.2.3
- TypeScript 6.0.3
- React Navigation (Bottom Tabs, Stack)
- React Native Reanimated, Gesture Handler
- Metro Bundler

## Architecture

### Directory Structure
```
AnyRentingApp/
├── App.tsx                    # Main entry point
├── index.js                   # AppRegistry entry
├── package.json
├── metro.config.js
├── babel.config.js
├── android/                   # Android native code
├── src/
│   ├── tabs/                  # 6 main tab components
│   │   ├── PropertiesTab.tsx
│   │   ├── LeadCrmTab.tsx
│   │   ├── RentCollectionTab.tsx
│   │   ├── AccountingTab.tsx
│   │   ├── PricingTab.tsx
│   │   └── ProfileTab.tsx
│   ├── pages/                 # Inner detail pages
│   │   ├── properties/       # 4 pages
│   │   ├── leads/            # 4 pages
│   │   ├── rent/             # 3 pages
│   │   ├── accounting/       # 3 pages
│   │   ├── pricing/          # 3 pages
│   │   └── profile/          # 4 pages
│   ├── components/
│   │   ├── navigation/
│   │   └── content/
│   ├── context/
│   │   └── NavigationContext.tsx
│   ├── data/
│   │   └── demoContent.ts
│   ├── types/
│   │   └── navigation.ts
│   └── utils/
└── app_old/                   # Old code (ignored)
```

## Step-by-Step Build Instructions

### Phase 1: Initial Setup
1. Initialize React Native project: `npx react-native init AnyRentingApp`
2. Install dependencies:
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-reanimated react-native-gesture-handler react-native-screens
npm install react-native-safe-area-context @react-native-async-storage/async-storage
npm install react-native-worklets
```

### Phase 2: Main Entry Points

#### App.tsx (Main Entry)
```typescript
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationProvider } from './src/context/NavigationContext';
import PropertiesTab from './src/tabs/PropertiesTab';
import LeadCrmTab from './src/tabs/LeadCrmTab';
import RentCollectionTab from './src/tabs/RentCollectionTab';
import AccountingTab from './src/tabs/AccountingTab';
import PricingTab from './src/tabs/PricingTab';
import ProfileTab from './src/tabs/ProfileTab';

const Tab = createBottomTabNavigator();

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
                backgroundColor: '#000000',
                borderTopWidth: 1,
                borderTopColor: '#1a1a2e',
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
            <Tab.Screen name="Properties" component={PropertiesTab} options={{ tabBarLabel: 'Properties' }} />
            <Tab.Screen name="LeadCRM" component={LeadCrmTab} options={{ tabBarLabel: 'Lead CRM' }} />
            <Tab.Screen name="RentCollection" component={RentCollectionTab} options={{ tabBarLabel: 'Rent Collection' }} />
            <Tab.Screen name="Accounting" component={AccountingTab} options={{ tabBarLabel: 'Accounting' }} />
            <Tab.Screen name="Pricing" component={PricingTab} options={{ tabBarLabel: 'Pricing' }} />
            <Tab.Screen name="Profile" component={ProfileTab} options={{ tabBarLabel: 'Profile' }} />
          </Tab.Navigator>
        </NavigationContainer>
      </NavigationProvider>
    </SafeAreaProvider>
  );
};

export default App;
```

#### index.js (Registry Entry)
```javascript
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('AnyRentingApp', () => App);
```

### Phase 3: Context & Types

#### src/context/NavigationContext.tsx
```typescript
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  currentRoute: string;
  navigate: (route: string, params?: any) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState('/');

  const navigate = (route: string, params?: any) => {
    setCurrentRoute(route);
  };

  const goBack = () => {
    setCurrentRoute('/');
  };

  return (
    <NavigationContext.Provider value={{ currentRoute, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within NavigationProvider');
  return context;
};
```

#### src/types/navigation.ts
```typescript
export interface NavigationItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  badge?: number;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export interface ContentBlock {
  id: string;
  type: 'metric' | 'chart' | 'list' | 'card' | 'text' | 'image';
  title: string;
  content: any;
}
```

### Phase 4: Main Tabs (6 Premium Pages)

Each tab must be 1000+ lines with:
- Premium black theme (#0a0a0a background)
- Gradient cards with LinearGradient
- Animated ScrollView with scroll events
- Hero sections with badges
- Summary metrics
- Charts/progress indicators
- Lists of realistic data
- CTA buttons
- 5-6 screenfuls of scrollable content

#### Pattern for All Tabs:
```typescript
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar, Animated, Dimensions, LinearGradient, Platform } from 'react-native';
import { useNavigation } from '../context/NavigationContext';

const { width } = Dimensions.get('window');

const PropertiesTab: React.FC = () => {
  const { navigate } = useNavigation();
  const scrollY = useRef(new Animated.Value(0));
  const headerOpacity = useRef(new Animated.Value(1));

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
    [
      {
        nativeEvent: ({ contentOffset: { y } }) => {
          scrollY.current.setValue(y);
          const headerOpacityValue = Math.max(0, 1 - y / 200);
          headerOpacity.current.setValue(headerOpacityValue);
        },
      },
    ],
    { useNativeDriver: true }
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.heroSection, { opacity: headerOpacity.current }]}>
          <LinearGradient
            colors={['#0a0a0a', '#1a1a2e', '#16213e', '#0f3460']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroBadge}>🏢 PROPERTIES</Text>
              <Text style={styles.heroTitle}>Property{'\n'}Management</Text>
              <Text style={styles.heroSubtitle}>Manage your 156 rental properties with advanced analytics</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>156</Text>
                  <Text style={styles.heroStatLabel}>Properties</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>94%</Text>
                  <Text style={styles.heroStatLabel}>Occupancy</Text>
                </View>
                <View style={styles.heroStatDivider} />
                <View style={styles.heroStatItem}>
                  <Text style={styles.heroStatValue}>23</Text>
                  <Text style={styles.heroStatLabel}>Pending</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Add 5-6 scrollable sections with cards, lists, metrics */}
        {/* Each section should be substantial with realistic data */}
        
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  heroSection: { paddingTop: Platform.OS === 'ios' ? 50 : 20 },
  heroGradient: { paddingVertical: 40, paddingHorizontal: 24 },
  heroContent: { alignItems: 'flex-start' },
  heroBadge: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    color: '#667eea',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 50,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: width * 0.7,
  },
  heroStats: { flexDirection: 'row', alignItems: 'center' },
  heroStatItem: { alignItems: 'center' },
  heroStatValue: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  heroStatLabel: { fontSize: 14, color: '#888888', textTransform: 'uppercase', letterSpacing: 0.5 },
  heroStatDivider: { width: 1, height: 40, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginHorizontal: 24 },
});

export default PropertiesTab;
```

### Phase 5: Inner Pages (21 Pages)

Create pages in src/pages/ with this structure:

#### Properties (4 pages)
- PropertyOverviewPage.tsx (1000+ lines)
- PropertyAnalyticsPage.tsx (800+ lines)
- PropertyTasksPage.tsx (820+ lines)
- PropertyMaintenancePage.tsx (931+ lines)

#### Lead CRM (4 pages)
- LeadOverviewPage.tsx (747+ lines)
- LeadNewPage.tsx (761+ lines)
- LeadFollowupsPage.tsx (698+ lines)
- LeadConversionsPage.tsx (708+ lines)

#### Rent Collection (3 pages)
- RentPendingPage.tsx (814+ lines)
- RentHistoryPage.tsx (615+ lines)
- RentRemindersPage.tsx (628+ lines)

#### Accounting (3 pages)
- AccountingExpensesPage.tsx (838+ lines)
- AccountingTransactionsPage.tsx (671+ lines)
- AccountingReportsPage.tsx (615+ lines)

#### Pricing (3 pages)
- PricingUpgradePage.tsx (811+ lines)
- PricingBillingPage.tsx (694+ lines)
- PricingFeaturesPage.tsx (536+ lines)

#### Profile (4 pages)
- ProfileSettingsPage.tsx (779+ lines)
- ProfileSecurityPage.tsx (692+ lines)
- ProfileNotificationsPage.tsx (589+ lines)
- ProfileHelpPage.tsx (471+ lines)

### Phase 6: Page Design Requirements

Each page MUST include:
1. **Premium Black Theme** - #0a0a0a background, #1a1a2e cards
2. **Animated ScrollView** - Scroll events, opacity transitions
3. **Hero Section** - Gradient background, badge, title, subtitle, stats
4. **5-6 Sections** - Each with substantial content
5. **Gradient Cards** - LinearGradient with 4-color gradients
6. **Realistic Data** - Rental industry specific data
7. **Metrics & Charts** - Progress bars, status indicators
8. **Lists & Tables** - Scrollable data lists
9. **CTA Buttons** - Interactive buttons with gradients
10. **500-1000+ Lines** - Deep, scrollable content

### Phase 7: Android Build (Windows)

#### Path Length Issue Solution
```bash
# Use UNC path to bypass 260 character limit
subst R: "C:\path\to\AnyRentingApp"
cd R:\
npm run android
```

#### Build Commands
```bash
# Start Metro
npm start

# Run Android
npm run android

# With UNC path (if path too long)
subst R: "C:\Users\ganpa\Downloads\anyrenting world\AnyRentingApp"
cd R:\
npm run android
```

### Phase 8: Metro Configuration

#### metro.config.js
```javascript
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = mergeConfig(config, {
  resolver: {
    sourceExts: ['ts', 'tsx', 'js', 'jsx', 'json', 'wasm'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
});
```

#### babel.config.js
```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [],
};
```

### Phase 9: Validation

#### Type Check
```bash
npm run typecheck
```

#### Lint
```bash
npm run lint
```

#### Manual Testing Checklist
- [ ] All 6 tabs load correctly
- [ ] Navigation between tabs works
- [ ] Inner pages open from tabs
- [ ] Scroll is smooth on all pages
- [ ] Animations work correctly
- [ ] No console errors
- [ ] App doesn't crash
- [ ] All data displays correctly

## Critical Success Factors

1. **CONSISTENT BLACK THEME** - All pages must use #0a0a0a background
2. **DEEP CONTENT** - Each page 500-1000+ lines, not placeholders
3. **REALISTIC DATA** - Rental industry specific, not generic
4. **SCROLLABLE** - 5-6 screenfuls per page minimum
5. **ANIMATED** - Scroll events, transitions, opacity changes
6. **NAVIGATION** - Back buttons, breadcrumb-style navigation
7. **TYPE SAFE** - TypeScript throughout
8. **METRO COMPATIBLE** - Proper metro.config.js setup

## Expected Final Result

- **27 Total Pages** (6 main tabs + 21 inner pages)
- **Premium Black UI** throughout
- **Deep scrollable content** on every page
- **Real rental management data**
- **Smooth animations and transitions**
- **Working navigation system**
- **Type-safe TypeScript code**
- **Android APK successfully built**

## Troubleshooting

### Default React Native Screen
- Check index.js is correctly importing App.tsx
- Verify AppRegistry.registerComponent matches MainActivity
- Clear Metro cache: `npx react-native start --reset-cache`

### Path Length Issues (Windows)
- Use UNC path: `subst R: "path\to\project"`
- Keep folder names short, no spaces
- Move project to shorter path like C:\AnyRentingApp

### Navigation Issues
- Verify NavigationProvider wraps NavigationContainer
- Check all tab components are properly imported
- Ensure navigation context is exported and used correctly

### Build Errors
- Delete node_modules and reinstall
- Clear gradle cache: `cd android && ./gradlew clean`
- Check Java and Android SDK are installed

## Deliverables

1. **Complete Source Code** - All 27 pages with 500-1000+ lines each
2. **Working Android APK** - Installable on any Android device
3. **Metro Configuration** - Proper bundler setup
4. **Type Safety** - No TypeScript errors
5. **Documentation** - This build guide
