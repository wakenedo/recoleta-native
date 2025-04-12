const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Modify asset extensions BEFORE passing to NativeWind
config.resolver.assetExts.push('json');

module.exports = withNativeWind(config, { input: './global.css' });