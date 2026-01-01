/**
 * Date formats
 */
export const dateFormats = {
  /** 8:02 PM */
  TIME: 'LT',

  /** 8:02 PM */
  TIME_ALT: 'A h:mm',

  /** 08/16/2018 */
  SHORT_DATE: 'L',

  /** Aug 16, 2018 */
  MEDIUM_DATE: 'll',

  /** August 16, 2018 */
  LONG_DATE: 'LL',

  /** August 16, 2018 8:02 PM */
  LONG_DATE_WITH_TIME: 'LLL',

  /** Sunday-Saturday */
  DAY: 'dddd',

  /** January-December */
  MONTH: 'MMMM',

  /** 16 Aout 2018 */
  DATE_FR: 'DD MMMM YYYY',

  /** August 16th, 2018 */
  DATE_EN: 'MMM Do, YYYY',

  /** 16th August, 2018 */
  DATE_EN_KE: 'Do MMMM, YYYY',

  /** August 2018 */
  DATE_WITHOUT_DAY: 'MMMM YYYY',

  /** 2025-04-29 */
  ISO_8601_DATE: 'YYYY-MM-DD',
} as const;

export type DateFormats = keyof typeof dateFormats;
