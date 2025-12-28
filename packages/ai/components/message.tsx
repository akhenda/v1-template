import type { ComponentProps } from 'react';
import Markdown from 'react-markdown';

import type { CreateUIMessage, UIMessage } from 'ai';
import { twMerge } from 'tailwind-merge';

type MessageProps = {
  data: CreateUIMessage<UIMessage>;
  markdown?: ComponentProps<typeof Markdown>;
};

export const Message = ({ data, markdown }: MessageProps) => (
  <div
    className={twMerge(
      'flex max-w-[80%] flex-col gap-2 rounded-xl px-4 py-2',
      data.role === 'user' ? 'self-end bg-foreground text-background' : 'self-start bg-muted'
    )}
  >
    {data.parts.map((part, index) =>
      part.type === 'text' ? (
        <Markdown key={index} {...markdown}>
          {part.text}
        </Markdown>
      ) : null
    )}
  </div>
);
