import React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '../../../../lib/utils';
import { AIAction } from '../../../ai-action';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../ui/form';
import { Textarea } from '../../../ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';
import { FormLabel } from '../field-label';

export type TextareaProps = React.ComponentProps<typeof Textarea>;

export type TextAreaFieldProps<Schema extends FieldValues> = TextareaProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  className?: string;
  description?: React.ReactNode;
  placeholder?: string;
  resizable?: boolean;
  markAsRequired?: boolean;
  tooltip?: string;

  // AI Action
  aiAction?: boolean;
  aiActionCredits?: number;
  aiActionCost?: number;
  aiActionTitle?: string;
  aiActionText?: string;
  aiActionButtonText?: string;
  aiActionTooltipText?: string;
  aiActionClassName?: string;
  onAIAction?: () => void;
};

export function TextAreaFieldComponent<Schema extends FieldValues>({
  name,
  label,
  control,
  tooltip,
  className,
  description,
  placeholder,
  markAsRequired,
  resizable = false,

  // AI Action
  aiAction = false,
  aiActionCredits = 0,
  aiActionCost = 1,
  aiActionTitle = 'Enhance this section using AI ✨',
  aiActionText = 'Rewrite with AI',
  aiActionButtonText = 'Rewrite with AI',
  aiActionTooltipText = 'Ask AI to rewrite this section',
  aiActionClassName = '',
  onAIAction = () => console.info('Enhancing with AI...'),
  ...rest
}: TextAreaFieldProps<Schema>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('relative', className)}>
          {label && (
            <FormLabel markAsRequired={markAsRequired} tooltip={tooltip}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              {...rest}
              className={cn('resize-none bg-muted', { 'resize-y': resizable, 'pb-10': aiAction })}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {aiAction && (
            <Tooltip>
              <TooltipTrigger asChild>
                <AIAction
                  actionText={aiActionText}
                  buttonText={aiActionButtonText}
                  className={cn(
                    'absolute right-2 bottom-2 z-50 h-7 px-2 text-xs',
                    aiActionClassName
                  )}
                  cost={aiActionCost}
                  credits={aiActionCredits}
                  onAction={onAIAction}
                  size="sm"
                  title={aiActionTitle}
                />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs" side="top">
                <p>{aiActionTooltipText}</p>
              </TooltipContent>
            </Tooltip>
          )}
          <FormMessage className="font-normal text-xs" />
          {description && <FormDescription className="text-xs">{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

export const TextAreaField = React.memo(TextAreaFieldComponent);
