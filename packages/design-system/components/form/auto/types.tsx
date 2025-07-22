import type { AnyValue as TAnyValue } from '@repo/types';
import type { Control, FieldValues, UseFormReset, UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

export type AnyValue = TAnyValue;

export type ZodObjectOrWrapped =
  | z.ZodObject<AnyValue, AnyValue>
  | z.ZodEffects<z.ZodObject<AnyValue, AnyValue>>;

export type FormApi<Schema extends FieldValues> = {
  control: Control<Schema>;
  form: UseFormReturn<Schema>;
  isSubmitting: boolean;
  submit: ReturnType<UseFormReturn<Schema>['handleSubmit']>;
  reset: UseFormReset<Schema>;
};
