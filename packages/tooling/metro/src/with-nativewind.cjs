const path = require('node:path');
const { withNativeWind: withNativeWindPrimitive } = require('nativewind/metro');

const GLOBALS_CSS_PATH = '/packages/mobile/design-system/src/styles/globals.css';

/**
 * Sets up NativeWind for the project.
 *
 * @param {import('expo/metro-config').MetroConfig} config
 * @param {string} workspaceRoot  - the workspace root, used to resolve the globals.css path
 * @param {string | undefined} globalsCSSPath - a custom globals.css path if needed
 *
 * @returns {import('expo/metro-config').MetroConfig}
 */
const withNativewind = (config, workspaceRoot, globalsCSSPath = GLOBALS_CSS_PATH) =>
  withNativeWindPrimitive(config, { input: path.join(workspaceRoot, globalsCSSPath) });

module.exports = withNativewind;
