/**
 * Add lottie asset support to Metro.
 *
 * @param {import('expo/metro-config').MetroConfig} config
 *
 * @returns {import('expo/metro-config').MetroConfig}
 */
const withLottieAssets = (config) => {
  config.resolver.assetExts.push('lottie');

  return config;
};

module.exports = withLottieAssets;
