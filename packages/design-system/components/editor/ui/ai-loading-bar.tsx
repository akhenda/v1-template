'use client';

import { AIChatPlugin } from '@udecode/plate-ai/react';
import { useEditorPlugin, usePluginOption } from '@udecode/plate/react';
import { Pause } from 'lucide-react';

import { cn } from '@repo/design-system/lib/utils';

import { Button } from '@repo/design-system/components/ui/button';

export const AILoadingBar = () => {
  const chat = usePluginOption(AIChatPlugin, 'chat');
  const mode = usePluginOption(AIChatPlugin, 'mode');

  const { status } = chat;

  const { api } = useEditorPlugin(AIChatPlugin);

  const isLoading = status === 'streaming' || status === 'submitted';
  const visible = isLoading && mode === 'insert';

  if (!visible) return null;

  return (
    <div
      className={cn(
        '-translate-x-1/2 absolute bottom-4 left-1/2 z-10 flex items-center gap-3 rounded-md border border-border bg-muted px-3 py-1.5 text-muted-foreground text-sm shadow-md transition-all duration-300',
      )}
    >
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      <span>{status === 'submitted' ? 'Thinking...' : 'Writing...'}</span>
      <Button
        size="sm"
        variant="ghost"
        className="flex items-center gap-1 text-xs"
        onClick={() => api.aiChat.stop()}
      >
        <Pause className="h-4 w-4" />
        Stop
        <kbd className="ml-1 rounded bg-border px-1 font-mono text-[10px] text-muted-foreground shadow-sm">
          Esc
        </kbd>
      </Button>
    </div>
  );
};
