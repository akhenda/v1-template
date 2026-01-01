import { useTheme } from 'next-themes';

/**
 * Custom hook to handle color scheme logic.
 * Provides the current color scheme, a boolean indicating if the scheme is dark,
 * a function to set the color scheme, and a toggle function to switch between dark and light modes.
 *
 * @returns {Object} An object with the following properties:
 * - colorScheme: The current theme, defaulting to 'dark' if undefined.
 * - isDarkColorScheme: Boolean indicating if the current theme is 'dark'.
 * - setColorScheme: Function to change the theme.
 * - toggleColorScheme: Function to toggle between 'dark' and 'light' themes.
 */
export function useColorScheme() {
  const { theme, setTheme } = useTheme();

  return {
    colorScheme: theme ?? 'dark',
    isDarkColorScheme: theme === 'dark',
    setColorScheme: setTheme,
    toggleColorScheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}
