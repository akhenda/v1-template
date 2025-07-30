'use client';

import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import type { Prettify } from '@repo/types';

import { createCtx } from '../../hooks/utils';

const THEME_STORAGE_KEY = 'resume-moto-storage@theme';
const GRADIENT_STORAGE_KEY = 'resume-moto-storage@gradient';
const SPACING_STORAGE_KEY = 'resume-moto-storage@spacing';
const THEME_THEME_PREFIX = 'theme';
const GRADIENT_THEME_PREFIX = 'theme-gradient';
const SPACING_THEME_PREFIX = 'theme-spacing';

export const supportedThemes = [
  {
    name: 'Default',
    value: 'default',
    hex: '#6E56CF',
    light: 'bg-fuchsia-600',
    dark: 'bg-fuchsia-500',
  },
  {
    name: 'Pastel Dreams',
    value: 'pastel-dreams',
    hex: '#A78BFA',
    light: 'bg-violet-400',
    dark: 'bg-violet-300',
  },
  {
    name: 'Perpetuity',
    value: 'perpetuity',
    hex: '#06858E',
    light: 'bg-gray-500',
    dark: 'bg-gray-400',
  },
  {
    name: 'Tangerine',
    value: 'tangerine',
    hex: '#E05D38',
    light: 'bg-green-700',
    dark: 'bg-green-600',
  },
] as const;

export const gradients = [
  { name: 'Top Left', value: 'top-left', color: 'bg-gradient-to-tl from-primary to-transparent' },
  { name: 'Top Right', value: 'top-right', color: 'bg-gradient-to-tr from-primary to-transparent' },
  { name: 'Right', value: 'right', color: 'bg-gradient-to-r from-primary to-transparent' },
  { name: 'Left', value: 'left', color: 'bg-gradient-to-l from-primary to-transparent' },
] as const;

export const spacings = [
  { name: 'Default', value: 'default' },
  { name: 'Compact', value: 'compact' },
  { name: 'Comfortable', value: 'comfortable' },
] as const;

type SupportedThemes = typeof supportedThemes;
type SupportedTheme = SupportedThemes[number]['value'];
type Gradients = typeof gradients;
type Gradient = Gradients[number]['value'];
type Spacings = typeof spacings;
type Spacing = Spacings[number]['value'];
type AppTheme = Prettify<{
  theme?: SupportedThemes[number];
  spacing?: Spacings[number];
  gradient?: Gradients[number];
  themeClass?: string;
  gradientClass?: string;
  spacingClass?: string;
  setTheme: Dispatch<SetStateAction<SupportedTheme>>;
  setGradient: Dispatch<SetStateAction<Gradient>>;
  setSpacing: Dispatch<SetStateAction<Spacing>>;
}>;

const DEFAULT_SPACING: Spacing = 'compact';
const DEFAULT_GRADIENT: Gradient = 'right';
const DEFAULT_THEME: SupportedTheme = 'perpetuity';

const [useAppearanceContext, AppearanceContextProvider] = createCtx<AppTheme>('AppearanceContext');

function getSavedTheme(): SupportedTheme {
  try {
    return (localStorage.getItem(THEME_STORAGE_KEY) as SupportedTheme) ?? DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function getSavedGradient(): Gradient {
  try {
    return (localStorage.getItem(GRADIENT_STORAGE_KEY) as Gradient) ?? DEFAULT_GRADIENT;
  } catch {
    return DEFAULT_GRADIENT;
  }
}

function getSavedSpacing(): Spacing {
  try {
    return (localStorage.getItem(SPACING_STORAGE_KEY) as Spacing) ?? DEFAULT_SPACING;
  } catch {
    return DEFAULT_SPACING;
  }
}

function handleThemeChange(newTheme: SupportedTheme) {
  const prefix = THEME_THEME_PREFIX;
  const root = window.document.documentElement;

  // Remove existing theme classes
  root.classList.remove(...supportedThemes.map((color) => `${prefix}-${color.value}`));

  // Changing to the new theme
  if (supportedThemes.map((theme) => theme.value).includes(newTheme)) {
    root.classList.add(`${prefix}-${newTheme}`);
  }

  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
}

function handleGradientChange(newGradient: Gradient) {
  const prefix = GRADIENT_THEME_PREFIX;
  const root = window.document.documentElement;

  // Remove existing gradient theme classes
  root.classList.remove(...gradients.map((gradient) => `${prefix}-${gradient.value}`));

  // Applying the new gradient theme class
  if (gradients.map((gradient) => gradient.value).includes(newGradient)) {
    root.classList.add(`${prefix}-${newGradient}`);
  }

  localStorage.setItem(GRADIENT_STORAGE_KEY, newGradient);
}

function handleSpacingChange(newSpacing: Spacing) {
  const prefix = SPACING_THEME_PREFIX;
  const root = window.document.documentElement;

  // Remove existing spacing theme classes
  root.classList.remove(...spacings.map((spacing) => `${prefix}-${spacing.value}`));

  // Applying the new spacing theme class
  if (spacings.map((spacing) => spacing.value).includes(newSpacing)) {
    root.classList.add(`${prefix}-${newSpacing}`);
  }

  localStorage.setItem(SPACING_STORAGE_KEY, newSpacing);
}

function AppearanceProvider({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<SupportedTheme>(getSavedTheme);
  const [gradient, setGradient] = useState<Gradient>(getSavedGradient);
  const [spacing, setSpacing] = useState<Spacing>(getSavedSpacing);

  const value = useMemo(() => {
    const valueTheme = supportedThemes.find((t) => t.value === theme);
    const valueGradient = gradients.find((g) => g.value === gradient);
    const valueSpacing = spacings.find((s) => s.value === spacing);
    const themeClass = `${THEME_THEME_PREFIX}-${valueTheme?.value}`;
    const gradientClass = `${GRADIENT_THEME_PREFIX}-${valueGradient?.value}`;
    const spacingClass = `${SPACING_THEME_PREFIX}-${valueSpacing?.value}`;

    return {
      theme: valueTheme,
      gradient: valueGradient,
      spacing: valueSpacing,
      themeClass,
      gradientClass,
      spacingClass,
      setTheme,
      setGradient,
      setSpacing,
    };
  }, [theme, gradient, spacing]);

  useEffect(() => {
    handleThemeChange(theme);

    if (!isMounted) setIsMounted(true);
  }, [theme]);

  useEffect(() => {
    handleGradientChange(gradient);

    if (!isMounted) setIsMounted(true);
  }, [gradient]);

  useEffect(() => {
    handleSpacingChange(spacing);

    if (!isMounted) setIsMounted(true);
  }, [spacing]);

  if (!isMounted) return null;

  return <AppearanceContextProvider value={value}>{children}</AppearanceContextProvider>;
}

export const ThemeProvider = ({ children, ...properties }: ThemeProviderProps) => {
  // const themes = supportedThemes.map((theme) => `theme-${theme.value}` as const);
  // const themesToRemove = ['light', 'dark', ...themes] as const;

  // useEffect(() => {
  //   return () => {
  //     document.documentElement.classList.remove(...themesToRemove);
  //   };
  // }, []);

  return (
    <NextThemeProvider
      enableSystem
      enableColorScheme
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      {...properties}
    >
      <AppearanceProvider>{children}</AppearanceProvider>
    </NextThemeProvider>
  );
};

export { useAppearanceContext };
