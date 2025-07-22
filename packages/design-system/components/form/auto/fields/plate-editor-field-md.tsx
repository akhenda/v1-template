import React, { useCallback } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { debounce } from '../../../../lib/debounce';

import { cn } from '../../../../lib/utils';
import { PlateEditorMinimalMD } from '../../../editor/plate-editor-minimal-md';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../ui/form';
import { FormLabel } from '../field-label';

export type PlateEditorProps = Omit<
  React.ComponentProps<typeof PlateEditorMinimalMD>,
  'value' | 'onChange'
>;

export type PlateEditorFieldMDProps<Schema extends FieldValues> = PlateEditorProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  editorClassName?: string;
  className?: string;
  description?: React.ReactNode;
  placeholder?: string;
  resizable?: boolean;
  markAsRequired?: boolean;
  tooltip?: string;
};

export function PlateEditorFieldMDComponent<Schema extends FieldValues>({
  name,
  label,
  control,
  tooltip,
  className,
  description,
  placeholder,
  markAsRequired,
  editorClassName,
  resizable = false,
  aiAction,
  aiActionCredits,
  aiActionCost,
  aiActionTitle,
  aiActionText,
  aiActionButtonText,
  aiActionTooltipText,
  aiActionClassName,
  onAIAction,
  ...rest
}: PlateEditorFieldMDProps<Schema>) {
  const memoizedOnAIAction = useCallback(() => {
    onAIAction?.();
  }, [onAIAction]);

  const memoizedAIActionProps = React.useMemo(
    () => ({
      aiAction,
      aiActionCredits,
      aiActionCost,
      aiActionTitle,
      aiActionText,
      aiActionButtonText,
      aiActionTooltipText: aiActionTooltipText ?? 'Rewrite with AI',
      aiActionClassName,
    }),
    [
      aiAction,
      aiActionCredits,
      aiActionCost,
      aiActionTitle,
      aiActionText,
      aiActionButtonText,
      aiActionTooltipText,
      aiActionClassName,
    ],
  );

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        // Debounce the onChange handler for the Plate editor
        const debouncedOnChange = debounce((value: string) => {
          field.onChange(value);
        }, 300);

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel markAsRequired={markAsRequired} tooltip={tooltip}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <PlateEditorMinimalMD
                id={name}
                placeholder={placeholder}
                className={cn(
                  'mmax-h-80 min-h-[10rem] resize-none bg-muted text-sm',
                  'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                  { 'resize-y': resizable },
                  editorClassName,
                )}
                value={field.value} // Explicitly pass value
                onChange={debouncedOnChange} // Use debounced onChange
                onAIAction={memoizedOnAIAction} // Pass memoized onAIAction
                {...memoizedAIActionProps} // Pass memoized AI action props
                {...rest} // Spread remaining props
              />
            </FormControl>
            <FormMessage className="font-normal text-xs" />
            {description && <FormDescription className="text-xs">{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
}

const _areEqual = <Schema extends FieldValues>(
  prevProps: PlateEditorFieldMDProps<Schema>,
  nextProps: PlateEditorFieldMDProps<Schema>,
) => {
  return (
    prevProps.name === nextProps.name &&
    prevProps.label === nextProps.label &&
    prevProps.control === nextProps.control &&
    prevProps.tooltip === nextProps.tooltip &&
    prevProps.className === nextProps.className &&
    prevProps.description === nextProps.description &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.markAsRequired === nextProps.markAsRequired &&
    prevProps.editorClassName === nextProps.editorClassName &&
    prevProps.resizable === nextProps.resizable &&
    // Compare rest props if necessary, or ensure they are stable from parent
    // For now, assuming rest props are stable or handled by PlateEditorMinimalMD's memoization
    true
  );
};

export const PlateEditorFieldMD = PlateEditorFieldMDComponent;
// export const PlateEditorFieldMD = React.memo(PlateEditorFieldMDComponent, _areEqual);
