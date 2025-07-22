import type { PlopTypes } from '@turbo/gen';

export default {
  description: 'Generate a new package for the Monorepo',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the package? (You can skip the `@repo/` prefix)',
    },
  ],
  actions: [
    (answers) => {
      if (
        'name' in answers &&
        typeof answers.name === 'string' &&
        answers.name.startsWith('@repo/')
      ) {
        answers.name = answers.name.replace('@repo/', '');
      }

      return 'Config sanitized';
    },
    {
      type: 'add',
      path: 'packages/{{ name }}/package.json',
      templateFile: 'templates/init/package.json.hbs',
    },
    {
      type: 'add',
      path: 'packages/{{ name }}/tsconfig.json',
      templateFile: 'templates/init/tsconfig.json.hbs',
    },
    {
      type: 'add',
      path: 'packages/{{ name }}/keys.ts',
      templateFile: 'templates/init/keys.ts.hbs',
    },
    {
      type: 'add',
      path: 'packages/{{ name }}/src/index.ts',
      templateFile: 'templates/init/src/index.ts.hbs',
    },
  ],
} satisfies PlopTypes.PlopGeneratorConfig;
