import type { DefaultValues } from 'react-hook-form';

import { isValidPhoneNumber, parsePhoneNumberWithError } from 'libphonenumber-js';
import type { z } from 'zod';

import type { AnyValue } from './types';

/**
 * Zod v4 helper: safely walk "wrappers" (defaults, effects/pipes, etc.)
 * by following commonly-used "inner schema" pointers inside `_zod.def`.
 *
 * Note: Zod v4 exposes internals via `schema._zod.def` (v3 used `schema._def`). :contentReference[oaicite:1]{index=1}
 */
function getInnerSchema(schema: z.ZodTypeAny): z.ZodTypeAny | undefined {
  const def = (schema as AnyValue)?._zod?.def as AnyValue | undefined;
  if (!def) return;

  // Different wrappers store their inner schema under different keys.
  // We probe a few common ones.
  const candidates = [def.innerType, def.schema, def.inner, def.in, def.out, def.base];

  for (const c of candidates) {
    if (!c) continue;
    if (typeof c === 'function') {
      const v = c.call(def);

      if (v && typeof v === 'object') return v as z.ZodTypeAny;

      continue;
    }
    if (typeof c === 'object') return c as z.ZodTypeAny;
  }

  return;
}

export function getDefaultValueInZodStack(schema: z.ZodTypeAny): AnyValue {
  const seen = new Set<unknown>();
  let current: z.ZodTypeAny | undefined = schema;

  while (current && !seen.has(current)) {
    seen.add(current);

    const def = (current as AnyValue)?._zod?.def as AnyValue | undefined;

    // Zod v4 defaults are accessible via `_zod.def`, not `_def`. :contentReference[oaicite:2]{index=2}
    const defaultValue = def?.defaultValue;
    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function'
        ? (defaultValue() as AnyValue)
        : (defaultValue as AnyValue);
    }

    current = getInnerSchema(current);
  }

  return undefined as unknown as AnyValue;
}

function getObjectShape(schema: z.ZodTypeAny): Record<string, z.ZodTypeAny> | undefined {
  const seen = new Set<unknown>();
  let current: z.ZodTypeAny | undefined = schema;

  while (current && !seen.has(current)) {
    seen.add(current);

    const def = (current as AnyValue)?._zod?.def as AnyValue | undefined;

    // In v4, object shape is available under `_zod.def.shape`. :contentReference[oaicite:3]{index=3}
    const shape = def?.shape;
    if (shape) {
      return typeof shape === 'function' ? (shape() as AnyValue) : (shape as AnyValue);
    }

    current = getInnerSchema(current);
  }

  return;
}

export function getDefaultValues<Schema extends z.ZodObject, Inputs = z.infer<Schema>>(
  schema: Schema,
): DefaultValues<Inputs> {
  // In v3, people often had to unwrap transforms/effects to get `.shape`. :contentReference[oaicite:4]{index=4}
  // In v4, we walk wrappers until we find `_zod.def.shape`. :contentReference[oaicite:5]{index=5}
  const shape = getObjectShape(schema as unknown as z.ZodTypeAny) ?? {};
  const defaultValues = {} as DefaultValues<Inputs>;

  for (const [key, field] of Object.entries(shape)) {
    const defaultValue = getDefaultValueInZodStack(field);

    // IMPORTANT: keep falsy defaults (0, false, "", null) — only skip `undefined`.
    if (defaultValue !== undefined) {
      (defaultValues as AnyValue)[key] = defaultValue;
    }
  }

  return defaultValues;
}

export function phoneNumberSchema(schema: z.ZodString) {
  return schema
    .refine(
      isValidPhoneNumber,
      'Please specify a valid phone number (include the international prefix).',
    )
    .transform((value) => parsePhoneNumberWithError(value).number.toString());
}
