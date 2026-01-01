import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { streamText } from 'ai';
import { chromeai } from 'chrome-ai';
import { ArrowUp, X } from 'lucide-react';
import { marked } from 'marked';
import { z } from 'zod';

import { Button } from '@repo/web-design-system/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/web-design-system/components/ui/form';
import { ScrollArea } from '@repo/web-design-system/components/ui/scroll-area';
import { Textarea } from '@repo/web-design-system/components/ui/textarea';

import { cn } from '~/lib/utils';

const promptSchema = z.object({ prompt: z.string() });

type Message = { role: 'system' | 'user' | 'assistant' | 'data'; content: string };

const Chat = () => {
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { mutate, isPending } = useMutation({
    mutationFn: async (_messages: Message[]) => {
      // @ts-expect-error FIXME: later because chrome-ai doesn't seem to be in development
      const { textStream } = await streamText({ model: chromeai(), messages: _messages });
      return textStream;
    },
    onMutate: () => setIsThinking(true),
    onSuccess: async (data) => {
      for await (const chunk of data) {
        setMessages((prev) => {
          if (prev.at(-1)?.role === 'user') return [...prev, { role: 'assistant', content: chunk }];

          return [
            ...prev.slice(0, -1),
            { role: 'assistant', content: (prev.at(-1)?.content ?? '') + chunk },
          ];
        });

        setIsThinking(false);
      }
    },
    onError: (e) => {
      setError(e.message);
      setIsThinking(false);
    },
  });

  const form = useForm<z.infer<typeof promptSchema>>({ resolver: zodResolver(promptSchema) });
  const messagesToDisplay = messages.filter((message) =>
    ['assistant', 'user'].includes(message.role),
  );

  const onSubmit = (values: z.infer<typeof promptSchema>) => {
    const message = { role: 'user', content: values.prompt } as const;

    form.reset({ prompt: '' });

    mutate([...messages, message]);
    setMessages((prev) => [...prev, message]);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="flex w-full max-w-2xl grow flex-col items-center justify-between gap-6 self-center">
      <ScrollArea className="w-full grow">
        <div className="prose dark:prose-invert flex flex-col gap-2">
          {messagesToDisplay.map((message) => (
            <article
              className={cn('max-w-full', {
                'max-w-4/5 self-end rounded-lg bg-muted px-5 py-2.5': message.role === 'user',
              })}
              key={message.content}
            >
              {message.role === 'assistant' ? (
                <div
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Using marked library to parse markdown content from AI responses
                  dangerouslySetInnerHTML={{ __html: marked.parse(message.content) as string }}
                />
              ) : (
                message.content
              )}
            </article>
          ))}
          {isThinking && <span className="block py-5">Thinking...</span>}
          {error && (
            <span className="mt-4 block w-fit rounded-lg bg-destructive/30 px-5 py-2.5 text-destructive">
              {error}
            </span>
          )}
        </div>
      </ScrollArea>

      <Form {...form}>
        <form
          className="sticky bottom-0 w-full bg-background pb-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="resize-none text-base"
                    disabled={isPending}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="absolute right-2 bottom-6 size-8 rounded-full"
            disabled={isPending}
            size="icon"
            type="submit"
          >
            <ArrowUp />
          </Button>
        </form>
      </Form>
    </div>
  );
};

const AIDisclaimer = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="prose dark:prose-invert relative max-w-2xl rounded-lg border px-8 py-4 pt-6">
      <Button
        className="absolute top-4 right-4"
        onClick={() => setIsOpen(false)}
        size="icon"
        type="button"
        variant="ghost"
      >
        <X />
      </Button>
      <p className="mt-0">To use Chrome built-in AI, you need to turn on these flags:</p>
      <ul>
        <li>
          <a
            className="text-primary hover:no-underline"
            href="chrome://flags/#prompt-api-for-gemini-nano"
          >
            chrome://flags/#prompt-api-for-gemini-nano
          </a>
          : <code>Enabled</code>
        </li>
        <li>
          <a
            className="text-primary hover:no-underline"
            href="chrome://flags/#optimization-guide-on-device-model"
          >
            chrome://flags/#optimization-guide-on-device-model
          </a>
          : <code>Enabled</code>
        </li>
        <li>
          <a className="text-primary hover:no-underline" href="chrome://components">
            chrome://components
          </a>
          : Click
          <code>Optimization Guide On Device Model</code>
          to download the model.
        </li>
      </ul>
    </div>
  );
};

export const AI = () => (
  <>
    <AIDisclaimer />
    <Chat />
  </>
);
