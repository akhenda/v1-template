/**
 * @typedef {import('metro-config').MetroConfig} MetroConfig
 */

/**
 * @typedef {(config: MetroConfig) => MetroConfig} MetroPlugin
 */

/**
 * composePlugins – composes an array of plugins into a single plugin
 *
 * @param  {...MetroPlugin[]} plugins - the plugins to compose into a single plugin
 *
 * @returns {MetroConfig} the composed plugin
 */

const composePlugins = (...plugins) => {
  /**
   * @param {MetroConfig} config - the metro config to apply the plugins to
   *
   * @returns {MetroConfig} the composed metro config
   */
  return (config) => plugins.reduce((composedConfig, plugin) => plugin(composedConfig), config);
};

module.exports = composePlugins;
