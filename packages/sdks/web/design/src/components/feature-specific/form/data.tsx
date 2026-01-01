import type { RadioGroupItemOptions } from './auto/fields/radio-group-field';

type Quality = 'average' | 'bad' | 'good';

export const quality: RadioGroupItemOptions<Quality> = [
  { label: 'Average', value: 'average' },
  { label: 'Bad', value: 'bad' },
  { label: 'Good', value: 'good' },
];
