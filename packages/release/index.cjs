/**
 * Generates a base configuration for semantic-release.
 *
 * Ref:
 *  - https://www.pixelmatters.com/blog/how-to-manage-multiple-front-end-projects-with-a-monorepo
 *
 * @param project - The name of the project. Used to determine the name of the
 *   release branch.
 * @returns A configuration for semantic-release.
 */
function getBaseConfig(project) {
  const projectName = project.trim().replace('@repo/', '').trim();

  /**
   * @type {import('semantic-release').GlobalConfig}
   */
  return {
    debug: true,
    dryRun: false,
    extends: 'semantic-release-monorepo',
    branches: ['main', { name: 'dev', channel: 'beta', prerelease: 'rc' }],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      ['@semantic-release/changelog', { changelogFile: 'docs/CHANGELOG.md' }],
      ['@semantic-release/npm', { npmPublish: false }],
      [
        '@semantic-release/git',
        {
          assets: ['package.json', 'docs/CHANGELOG.md'],
          message: `chore(release): ${projectName} v\${nextRelease.version} [skip ci]\n\n\${nextRelease.notes}`,
        },
      ],
      '@semantic-release/github',
    ],
    tagFormat: `${projectName}-v\${version}`,
  };
}

module.exports = getBaseConfig;
