import { createContext, useContext } from 'react';

/**
 * Creates a new context and returns a hook and provider for accessing the
 * context value.
 *
 * @template ContextType - The type of the context value.
 * @param {string} name - The name of the context.
 * @returns {Array} `[useContext, ContextProvider]` - The hook and provider for
 * accessing the context value.
 * @throws {Error} - If the hook is used outside of the provider.
 */
export function createCtx<ContextType>(name: string) {
  const newContext = createContext<ContextType | null>(null);

  /**
   * Returns the context value from the given context.
   *
   * @template T - The type of the context value.
   * @returns {T & ContextType} - The context value.
   * @throws {Error} - If the hook is used outside of the provider.
   */
  function useCtx<T>() {
    const ctx = useContext(newContext);

    if (!ctx) throw new Error(`Hook used outside of the provider: ${name}`);

    return ctx as T & ContextType;
  }

  return [useCtx, newContext.Provider] as const;
}

/**
 * Creates a context with the specified type and returns a hook to access the
 * context value.
 *
 * @param {string} name - The name of the context.
 * @return {Array} `[useContext, Context]` - The hook and provider for
 * accessing the context value.
 */
export function createCtxFull<ContextType>(name: string) {
  const newContext = createContext<ContextType | null>(null);

  /**
   * Returns the context value from the given context.
   *
   * @template T - The type of the context value.
   * @returns {T & ContextType} - The context value.
   * @throws {Error} - If the hook is used outside of the provider.
   */
  function useCtx() {
    const ctx = useContext(newContext);

    if (!ctx) throw new Error(`Hook used outside of the provider: ${name}`);

    return ctx;
  }

  return [useCtx, newContext] as const;
}
