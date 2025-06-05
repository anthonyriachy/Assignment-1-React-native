// jest/setup.js

// 1) Required by react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// 2) Silence useNativeDriver warnings by mocking NativeAnimatedHelper.
const pathsToTry = [
  'react-native/Libraries/Animated/NativeAnimatedHelper',
  'react-native/Libraries/Animated/src/NativeAnimatedHelper',
];
for (const p of pathsToTry) {
  try {
    jest.mock(p);
    break;
  } catch {}
}

// 3) Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// 4) Mock FastImage
jest.mock('react-native-fast-image', () => ({
  __esModule: true,
  default: 'FastImage',
  priority: {
    low: 'low',
    normal: 'normal',
    high: 'high',
  },
  resizeMode: {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
  },
}));

// 5) Mock AsyncStorage
jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// 6) **Mock react-native-config** so tests don't read your actual .env
jest.mock('react-native-config', () => ({
  // Put any keys your code expects, e.g.:
  BASE_URL: 'https://example.com',
  // …other environment variables if needed
}));
