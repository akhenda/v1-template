import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

import { Toaster } from '@repo/web-design-system/components/ui/sonner';
import { TooltipProvider } from '@repo/web-design-system/components/ui/tooltip';
import { ThemeProvider } from '@repo/web-design-system/provider/providers/theme';

import '@repo/web-design-system/globals.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    chromatic: {
      modes: {
        light: { theme: 'light', className: 'light' },
        dark: { theme: 'dark', className: 'dark' },
      },
    },
  },
  decorators: [
    withThemeByClassName({ themes: { light: 'light', dark: 'dark' }, defaultTheme: 'light' }),
    // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
    (Story: any) => (
      <div className="bg-background">
        <ThemeProvider>
          <TooltipProvider>
            <Story />
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </div>
    ),
  ],
};

export default preview;
