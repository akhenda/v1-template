'use client';

import { createPlatePlugin } from '@udecode/plate/react';

import { FloatingToolbar } from '../ui/floating-toolbar';
import { FloatingToolbarButtonsRHF } from '../ui/floating-toolbar-buttons-rhf';

export const FloatingToolbarPluginRHF = createPlatePlugin({
  key: 'floating-toolbar',
  render: {
    afterEditable: () => (
      <FloatingToolbar>
        <FloatingToolbarButtonsRHF />
      </FloatingToolbar>
    ),
  },
});
