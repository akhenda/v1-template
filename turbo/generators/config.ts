import type { PlopTypes } from '@turbo/gen';

import example from './example';
import init from './init';
import { bunCreateExpo, bunCreateNextApp, bunInstall } from './utils/actions';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setActionType('bunInstall', bunInstall);
  plop.setActionType('bunCreateExpo', bunCreateExpo);
  plop.setActionType('bunCreateNextApp', bunCreateNextApp);

  // use the custom action
  plop.setGenerator('test', {
    description: 'Noma sana...',
    prompts: [
      { type: 'input', name: 'appName', message: 'What?' },
      { type: 'input', name: 'path', message: 'Where?' },
    ],
    actions: [{ type: 'bunCreateExpo' }],
  });

  plop.setGenerator('example', example);
  plop.setGenerator('init', init);
}
