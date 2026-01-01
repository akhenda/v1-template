const path = require('node:path');

/**
 * Add the monorepo root to the metro resolver,
 * this is required to resolve packages from the monorepo root such as packages
 *
 * @param config {import('expo/metro-config').MetroConfig}
 *
 * @param  {string} monorepoRoot - the root of the monorepo
 * @param  {string} projectRoot - the __dirname of the metro config file, the project root
 *
 * @returns {import('expo/metro-config').MetroConfig}
 */
const withWorkspace = (config, monorepoRoot, projectRoot) => {
  // 1. Watch all files within the monorepo
  config.watchFolders = [monorepoRoot];

  // 2. Let Metro know where to resolve packages, and in what order
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules'),
  ];
  /**
   * @see https://www.better-auth.com/docs/integrations/expo#configure-metro-bundler
   */
  config.resolver.unstable_enablePackageExports = true;
  config.resolver.unstable_conditionNames = [
    ...config.resolver.unstable_conditionNames,
    'browser',
    'require',
    'default',
    'react-native',
  ];

  // 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
  config.resolver.disableHierarchicalLookup = true;

  return config;
};

module.exports = withWorkspace;
