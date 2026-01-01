const { default: path } = require('node:path');

const withStorybookPrimitive = require('@storybook/react-native/metro/withStorybook');

/**
 * Sets up Storybook for the project.
 *
 * @param {import('expo/metro-config').MetroConfig} config
 *
 * @returns {import('expo/metro-config').MetroConfig}
 */
const withStorybook = (config) => {
  /**
   * @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation#metro-config
   */
  return withStorybookPrimitive(config, {
    // Set to false to remove storybook specific options
    // you can also use a env variable to set this
    enabled: true,
    // Path to your storybook config
    configPath: path.resolve(__dirname, './.storybook'),
    // Optional websockets configuration
    // Starts a websocket server on the specified port and host on metro start
    // websockets: {
    //   port: 7007,
    //   host: 'localhost',
    // },
  });
};

module.exports = withStorybook;
