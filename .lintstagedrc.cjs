/**
 * This configuration is for lint-staged, which runs specified commands on staged files before committing.
 * It is used to ensure code quality and consistency by running tasks like formatting, linting,
 * and type checking on files that are about to be committed.
 *
 * NOTE: Some of the commands are disabled to allow users to commit changes that are WIP or not.
 *
 * Enable or disable commands as needed based on your project's requirements.
 */

const config = {
  i18nEtract: true,
  lintRepo: false,
  lintRepoFix: false,
  typecheck: false,

  /**
   * Format, sort imports, lint, and apply safe fixes
   * https://biomejs.dev/recipes/git-hooks/#husky
   */
  format: true,
};

function runI18nExtract() {
  return config.i18nEtract ? 'bun run i18n:extract' : 'echo "i18n:extract is disabled"';
}

function runLint() {
  return config.lintRepo ? 'biome check' : 'echo "lint:repo is disabled"';
}

function runLintRepoFix() {
  return config.lintRepoFix ? 'bun run lint:repo:fix' : 'echo "lint:repo:fix is disabled"';
}

function runTypecheck() {
  return config.typecheck ? 'bun run typecheck' : ' echo "typecheck is disabled"';
}

function runFormat() {
  return config.format ? 'biome format --write' : 'echo "format is disabled"';
}

module.exports = {
  '*': [runI18nExtract, runLint, runLintRepoFix],
  '{apps,libs,packages,tooling}/**/*.{ts,tsx}': runTypecheck(),
  '{apps,libs,packages,tooling}/**/*.{js,ts,jsx,tsx,json,md,html,css,scss}': [runFormat()],
};
