const { withSentryConfig } = require('@sentry/react-native/metro');

/**
 * Sets up Sentry for the project.
 *
 * @param {import('expo/metro-config').MetroConfig} config
 *
 * @returns {import('expo/metro-config').MetroConfig}
 */
const withSentry = (config) => withSentryConfig(config);

module.exports = withSentry;
