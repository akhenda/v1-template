const baseConfig = require('@repo/release');

const pkg = require('./package.json');

const config = baseConfig(pkg.name);

/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = config;
