import type { Control, FieldValues, UseFormReset, UseFormReturn } from 'react-hook-form';

import type { z } from 'zod';

import type { AnyValue as TAnyValue } from '@repo/types';

export type AnyValue = TAnyValue;

/**
 * Zod v4:
 * - `ZodEffects` has been dropped; refinements/transforms are stored on the schema itself. :contentReference[oaicite:1]{index=1}
 * - Prefer the v4 import style (`import * as z from "zod"`), which the docs use consistently. :contentReference[oaicite:2]{index=2}
 */
export type ZodObjectOrWrapped = z.ZodObject<z.ZodRawShape>;

export type FormApi<Schema extends FieldValues> = {
  control: Control<Schema>;
  form: UseFormReturn<Schema>;
  isSubmitting: boolean;
  submit: ReturnType<UseFormReturn<Schema>['handleSubmit']>;
  reset: UseFormReset<Schema>;
  clearPersistedData?: () => void;
};
