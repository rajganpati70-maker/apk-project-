/**
 * @format
 */

import { AppRegistry } from 'react-native';
// Use the AnyRenting app entry directly instead of the React Native template
// compatibility wrapper.
import App from './App.tsx';

// Force registration with the exact name that MainActivity expects
AppRegistry.registerComponent('AnyRentingApp', () => App);
