import 'react-native';
import 'react-native/Libraries/Components/StatusBar/StatusBar';

declare module 'react-native' {
  interface StatusBarProps {
    backgroundColor?: string;
  }
}

declare module 'react-native/Libraries/Components/StatusBar/StatusBar' {
  interface StatusBarProps {
    backgroundColor?: string;
  }
}