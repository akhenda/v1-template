'use client';

import { createPlatePlugin } from '@udecode/plate/react';

import { FixedToolbarButtonsRHF } from '../ui/fixed-toolbar-buttons-rhf';
import { FixedToolbarRHF } from '../ui/fixed-toolbar-rhf';

export const FixedToolbarPluginRHF = createPlatePlugin({
  key: 'fixed-toolbar',
  render: {
    beforeEditable: () => (
      <FixedToolbarRHF>
        <FixedToolbarButtonsRHF />
      </FixedToolbarRHF>
    ),
  },
});
