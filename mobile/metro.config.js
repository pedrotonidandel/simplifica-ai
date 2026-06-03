const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Força o Metro a transpilar pacotes que usam private class fields (#field)
// que o Hermes do Expo Go não suporta sem transpilação
config.resolver.unstable_enablePackageExports = true;

config.transformer.transformIgnorePatterns = [
  'node_modules/(?!(' +
    '@react-native|' +
    '@react-native-community|' +
    'react-native|' +
    'expo|' +
    '@expo|' +
    '@unimodules|' +
    'unimodules|' +
    '@react-navigation|' +
    'react-navigation|' +
    '@tanstack/react-query|' +
    '@tanstack/query-core|' +
    'zustand|' +
    'axios' +
  ')/)' +
  '|node_modules/@react-native-async-storage',
];

module.exports = config;
