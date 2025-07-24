import type { Union2Tuple } from '@repo/types';

/**
 * Log levels
 */
export const LOG_LEVELS = {
  log: 0,
  trace: 0,
  debug: 1,
  done: 2,
  success: 3,
  info: 4,
  notice: 5,
  warn: 6,
  error: 7,
  fatal: 8,
  off: 100,
} as const;

/**
 * Log level
 */
export type LogLevel = keyof typeof LOG_LEVELS;

/**
 * Log levels
 */
export type LogLevels = Union2Tuple<LogLevel>;

/**
 * Log icons
 */
export type LogIcons = Record<LogLevel, string>;

/**
 * Log colors
 */
export type LogColors = Record<LogLevel, string>;

/**
 * Log colors
 */
export const LOG_COLORS = {
  bg: {
    trace: '#FEFEFE',
    debug: '#DFF2BF',
    done: '#FFFFFF',
    success: '#77C926',
    info: '#BDE5F8',
    notice: '#BBCCFF',
    warn: '#EFEFB3',
    error: '#FFBABA',
    fatal: '#FF805C',
  },
  border: {
    trace: '#AAAAAA',
    debug: '#4F8A10',
    done: '#222222',
    success: '#30740C',
    info: '#00529B',
    notice: '#1122EE',
    warn: '#9F6000',
    error: '#D8000C',
    fatal: '#7A071A',
  },
  text: {
    trace: '#AAAAAA',
    debug: '#4F8A10',
    done: '#222222',
    success: '#30740C',
    info: '#00529B',
    notice: '#1122EE',
    warn: '#9F6000',
    error: '#D8000C',
    fatal: '#7A071A',
  },
} as const;

/**
 * Log icons
 *
 * →✓ℹ⨯ 🔈📣📢✔️✅☠️❗❕ℹ️⚠️ 🕵️‍♂️🔎👀👁️👣‼️ ❌🛑⛔🆘
 */
export const LOG_ICONS = {
  trace: '👣',
  debug: '🐛',
  done: '☑️',
  success: '✅',
  info: 'ℹ️ ',
  notice: '‼️',
  warn: '⚠️',
  error: '⛔',
  fatal: '☠️',
} as const;
