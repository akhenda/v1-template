const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Sets up Reanimated for the project.
 *
 * @param {import('expo/metro-config').MetroConfig} config
 *
 * @returns {import('expo/metro-config').MetroConfig}
 */
const withReanimated = (config) => {
  // Expo 49 issue: default metro config needs to include "mjs"
  // https://github.com/expo/expo/issues/23180
  // config.resolver.sourceExts.push('mjs');

  /**
   * @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation#metro-config
   */
  return wrapWithReanimatedMetroConfig(config);
};

module.exports = withReanimated;
