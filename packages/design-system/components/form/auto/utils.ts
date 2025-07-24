import { isValidPhoneNumber, parsePhoneNumberWithError } from 'libphonenumber-js';
import type { DefaultValues, FieldValues } from 'react-hook-form';
import { z } from 'zod';

import type { AnyValue } from './types';

export function getDefaultValueInZodStack(schema: z.ZodTypeAny): AnyValue {
  if (schema instanceof z.ZodDefault) return schema._def.defaultValue();
  if (schema instanceof z.ZodEffects) return getDefaultValueInZodStack(schema.innerType());

  return undefined;
}

export function getDefaultValues<Schema extends z.ZodObject<AnyValue>, Inputs extends FieldValues>(
  schema: Schema,
): DefaultValues<Inputs> {
  const objectSchema = schema instanceof z.ZodEffects ? schema.innerType() : schema;
  const shape = objectSchema.shape;
  const defaultValues = {} as DefaultValues<Inputs>;

  for (const [key, field] of Object.entries(shape)) {
    const defaultValue = getDefaultValueInZodStack(field as z.ZodTypeAny);

    if (defaultValue) {
      defaultValues[key as keyof DefaultValues<Inputs>] = defaultValue;
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
