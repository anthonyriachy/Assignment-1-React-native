module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native' +
        '|@react-native' +
        '|react-native-linear-gradient' +
        '|react-native-shimmer-placeholder' +
        '|react-native-fast-image' +
        '|react-native-image-picker' +
        '|react-native-config' +       
        ')/)',
    ],
    setupFiles: ['<rootDir>/jest/setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  