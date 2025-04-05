const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure JSON files are included in the asset extensions
config.resolver.assetExts.push('json');

module.exports = config;