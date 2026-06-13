const { LogBox } = require('react-native');

LogBox.ignoreLogs([
  '[Reanimated] Reduced motion setting is enabled on this device.',
]);

require('expo-router/entry');
