/** biome-ignore-all lint/suspicious/noConsole: this is allowed in this file */

import type { ReactNode } from 'react';

import { type Logger as LogtailLogger, log as logtail } from '@logtail/next'; // For Prod
import * as Sentry from '@sentry/nextjs'; // Use Sentry namespace
import { type ConsolaInstance, consola } from 'consola'; // For Dev
import { type ExternalToast, toast as sonnerToast } from 'sonner'; // Rename to avoid conflict

import type { AnyValue } from '@repo/types';

import type { LogLevel } from './types';

// --- Configuration ---

// Determine environment (adjust if needed, e.g., checking process.browser is older)
const isProduction = process.env.NODE_ENV === 'production';
const isClient = typeof window !== 'undefined';

// --- Types ---

// Type for the object returned by log methods, enabling chaining
interface LogResult {
  toast: (message?: string | ReactNode, options?: ExternalToast) => void;
}

// --- Sentry Reporting Helper ---

function reportErrorToSentry(level: LogLevel, message: string, optionalParams: AnyValue[]): void {
  // Only proceed for error or fatal levels
  if (level !== 'error' && level !== 'fatal') return;

  // Find the first Error object in the optional parameters
  const errorInstance = optionalParams.find((param): param is Error => param instanceof Error);

  if (errorInstance) {
    try {
      // Capture the exception with additional context if available
      const sentryId = Sentry.captureException(errorInstance, {
        level: level, // Sentry understands 'error' and 'fatal'
        extra: {
          logMessage: message,
          // Add non-Error optionalParams as extra context
          optionalParams: optionalParams.filter((param) => !(param instanceof Error)),
        },
      });

      // posthog.captureException(errorInstance, {
      //   extra: {
      //     logMessage: message,
      //     // Add non-Error optionalParams as extra context
      //     optionalParams: optionalParams.filter((param) => !(param instanceof Error)),
      //   },
      // })

      // Using consola for internal logger messages seems fine
      consola.info(`Sentry Error Event ID [${level}]: ${sentryId}`);
    } catch (captureError) {
      consola.error('Failed to capture exception with Sentry:', captureError);
    }
  } else if (message) {
    // If no Error object, capture the message itself for errors/fatals
    try {
      Sentry.captureMessage(message, { level, extra: { optionalParams } });
      consola.info(`Sentry Message Event -> level: [${level}]`);
    } catch (captureError) {
      consola.error('Failed to capture message with Sentry:', captureError);
    }
  }
}

// --- Core Logging Logic ---

// Define mappings from our LogLevel to specific backend functions
// We need to bind 'this' correctly to the logger instance
type LogFunctionMap = Partial<Record<LogLevel, (...args: AnyValue[]) => void>>;

// Helper to create bound function maps
function createBoundMap(
  loggerInstance: AnyValue,
  levelMap: Partial<Record<LogLevel, keyof typeof loggerInstance>>,
): LogFunctionMap {
  const boundMap: LogFunctionMap = {};
  for (const level in levelMap) {
    if (level in levelMap) {
      const methodName = levelMap[level as LogLevel];

      if (methodName && typeof loggerInstance[methodName] === 'function') {
        boundMap[level as LogLevel] = (
          loggerInstance[methodName] as (...args: AnyValue[]) => void
        ).bind(loggerInstance);
      }
    }
  }

  // Add a default .log if possible
  if (typeof loggerInstance.log === 'function') {
    boundMap.log = loggerInstance.log.bind(loggerInstance);
  }

  return boundMap;
}

// Pre-create maps (only if instances are guaranteed available)
// Note: Logtail initialization is async in your code, handle this carefully.
// Assuming logtail instance IS available here for map creation simplicity.
// If not, map creation needs to happen *after* logtail is resolved.
const logtailMethodsMap: Partial<Record<LogLevel, keyof LogtailLogger>> = {
  trace: 'debug', // Map trace to debug for Logtail
  debug: 'debug',
  info: 'info',
  done: 'info', // Map done/success to info
  success: 'info',
  notice: 'warn', // Map notice to warn
  warn: 'warn',
  error: 'error',
  fatal: 'error', // Map fatal to error
};
const logtailMap = logtail ? createBoundMap(logtail, logtailMethodsMap) : {};

const consolaMethodsMap: Partial<Record<LogLevel, keyof ConsolaInstance>> = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  done: 'success', // Map done to success
  success: 'success',
  notice: 'warn', // Map notice to warn
  warn: 'warn',
  error: 'error',
  fatal: 'fatal',
};
const consolaMap = createBoundMap(consola, consolaMethodsMap);

const consoleMethodsMap: Partial<Record<LogLevel, keyof Console>> = {
  trace: 'debug', // Map trace to debug
  debug: 'debug',
  info: 'info',
  done: 'info', // Map done/success to info
  success: 'info',
  notice: 'warn', // Map notice to warn
  warn: 'warn',
  error: 'error',
  fatal: 'error', // Map fatal to error
};
const consoleMap = createBoundMap(console, consoleMethodsMap);

// Central function to handle actual logging and Sentry reporting
function logInternal(level: LogLevel, message: string, optionalParams: AnyValue[]): void {
  // 1. Choose Logger Backend and Map
  // Reverting Logtail initialization to synchronous example style for clarity here.
  // Adjust based on your actual async Logtail initialization if needed.
  let selectedMap: LogFunctionMap;

  if (isProduction && logtail) {
    selectedMap = logtailMap;
  } else if (isProduction) {
    selectedMap = consoleMap; // Fallback if prod but logtail failed
  } else {
    selectedMap = consolaMap;
  }

  // 2. Get the appropriate log function from the map
  // Fallback to a generic 'log' method if specific level is not in map, or default console.log
  const logFn = selectedMap[level] || selectedMap.log || console.log;

  // 3. Perform Logging
  try {
    logFn(message, ...optionalParams);
  } catch (logError) {
    // If the chosen logger fails, fallback to console.error
    consola.error('Logging backend failed:', logError);
    consola.error('Original log:', { level, message, optionalParams });
  }

  // 4. Report Errors to Sentry (using the extracted function)
  reportErrorToSentry(level, message, optionalParams);
}

// --- Public API ---

// Function to create the logger methods
function createLogMethod(level: LogLevel) {
  return (message: string, ...optionalParams: AnyValue[]): LogResult => {
    // Perform the core logging action
    logInternal(level, message, optionalParams);

    // Return object for chaining, conditionally adding .toast
    const result: LogResult = { toast: () => null };

    if (isClient) {
      // Only add the toast method if we are on the client-side
      result.toast = (toastMessage?: string | ReactNode, options?: ExternalToast): void => {
        try {
          // Use the provided toast message, or fallback to the original log message
          const displayMessage = toastMessage ?? message;

          // Map log level to sonner toast type (optional, customize as needed)
          switch (level) {
            case 'error':
            case 'fatal':
              sonnerToast.error(displayMessage, options);
              break;
            case 'warn':
            case 'notice':
              sonnerToast.warning(displayMessage, options);
              break;
            case 'info':
              sonnerToast.info(displayMessage, options);
              break;
            case 'done':
            case 'success':
              sonnerToast.success(displayMessage, options);
              break;
            default:
              sonnerToast(displayMessage, options); // Default toast
          }
        } catch (toastError) {
          consola.error('Failed to show toast:', toastError);
        }
      };
    }

    return result; // Return the object (with or without .toast)
  };
}

/**
 * Logger object with methods for different log levels
 *
 * Usage:
 *
 * ```js
 * // Server-side or Client-side (basic logging)
 * logger.info('User logged in', { userId: 123 });
 * logger.warn('API response slow', { duration: 2500 });
 * logger.error('Failed to process payment', new Error('Insufficient funds'), {
 *   transactionId: 'xyz',
 * });
 * ```
 *
 *
 * ```js
 * // Client-side (logging with toast)
 * function handleClientAction() {
 *   // This works because logger.info returns an object with .toast on the client
 *   logger.info('Settings saved successfully').toast();
 *
 *   // With custom message and options
 *   logger
 *     .error('Could not connect to server', new Error('Network Error'))
 *     .toast('Connection failed. Please try again.', { duration: 5000 });
 * }
 * ```
 */
export const logger = {
  trace: createLogMethod('trace'),
  debug: createLogMethod('debug'),
  done: createLogMethod('done'),
  success: createLogMethod('success'),
  info: createLogMethod('info'),
  notice: createLogMethod('notice'),
  warn: createLogMethod('warn'),
  error: createLogMethod('error'),
  fatal: createLogMethod('fatal'),
};
