'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '../../lib/utils';
import { gradients, spacings, supportedThemes, useAppearanceContext } from '../../providers/theme';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type ColorScheme = 'light' | 'dark' | 'system';

function ColorSchemeToggle({
  justIcons = false,
  label = 'Color Scheme',
}: {
  justIcons?: boolean;
  label?: string;
}) {
  const { setTheme, theme } = useTheme();

  const isLight = theme === 'light';
  const isDark = theme === 'dark';
  const isSystem = theme === 'system';

  const changeTheme = (theme: ColorScheme) => () => setTheme(theme);

  if (justIcons) {
    return (
      <>
        <DropdownMenuLabel className="font-bold text-muted-foreground text-xs">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuGroup className="mb-1 flex flex-row justify-around gap-1">
          <DropdownMenuItem
            className={cn('border-1', isLight && 'bg-accent')}
            onClick={changeTheme('light')}
          >
            <Sun size={16} strokeWidth={2} className="opacity-80" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn('border-1', isDark && 'bg-accent')}
            onClick={changeTheme('dark')}
          >
            <Moon size={16} strokeWidth={2} className="opacity-80" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn('border-1', isSystem && 'bg-accent')}
            onClick={changeTheme('system')}
          >
            <Monitor size={16} strokeWidth={2} className="opacity-80" aria-hidden="true" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </>
    );
  }

  return (
    <>
      <DropdownMenuLabel className="font-bold text-muted-foreground text-xs">
        {label}
      </DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuGroup className="flex flex-row justify-around gap-1">
          <DropdownMenuItem
            className={cn('flex-1 items-center justify-center border-1', isLight && 'bg-accent')}
            onClick={changeTheme('light')}
          >
            <Sun size={16} strokeWidth={2} className="text-primary opacity-80" aria-hidden="true" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn('flex-1 items-center justify-center border-1', isDark && 'bg-accent')}
            onClick={changeTheme('dark')}
          >
            <Moon
              size={16}
              strokeWidth={2}
              className="text-primary opacity-80"
              aria-hidden="true"
            />
            <span>Dark</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem
          className={cn('mt-1 items-center justify-center border-1', isSystem && 'bg-accent')}
          onClick={changeTheme('system')}
        >
          <Monitor
            size={16}
            strokeWidth={2}
            className="text-primary opacity-80"
            aria-hidden="true"
          />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}

function ThemeToggle({ label = 'Theme' }: { label?: string }) {
  const { theme, setTheme } = useAppearanceContext();

  return (
    <>
      <DropdownMenuLabel className="font-bold text-muted-foreground text-xs">
        {label}
      </DropdownMenuLabel>
      <DropdownMenuGroup>
        {supportedThemes.map((supportedTheme) => {
          const isActive = supportedTheme.value === theme?.value;

          return (
            <DropdownMenuItem
              key={supportedTheme.value}
              className={cn({ 'bg-accent': isActive })}
              onClick={() => setTheme(supportedTheme.value)}
            >
              <div
                className={cn(
                  'h-4 w-4 rounded-full',
                  supportedTheme.light,
                  `dark:${supportedTheme.dark}`,
                )}
              />
              <span>{supportedTheme.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>
    </>
  );
}

function GradientToggle({ label = 'Gradient' }: { label?: string }) {
  const { gradient: activeGradient, setGradient } = useAppearanceContext();

  return (
    <>
      <DropdownMenuLabel className="font-bold text-muted-foreground text-xs">
        {label}
      </DropdownMenuLabel>
      <DropdownMenuGroup>
        {gradients.map((gradient) => {
          const isActive = gradient.value === activeGradient?.value;

          return (
            <DropdownMenuItem
              key={gradient.value}
              className={cn({ 'bg-accent': isActive })}
              onClick={() => setGradient(gradient.value)}
            >
              <div className={cn('h-4 w-4 rounded-full', gradient.color)} />
              <span>{gradient.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>
    </>
  );
}

function SpacingToggle() {
  const { spacing: activeSpacing, setSpacing } = useAppearanceContext();

  return (
    <DropdownMenuGroup className="flex flex-row justify-around gap-1">
      {spacings.map((spacing) => {
        const isActive = spacing.value === activeSpacing?.value;

        return (
          <DropdownMenuItem
            key={spacing.value}
            className={cn('border-1 text-xs', { 'bg-accent': isActive })}
            onClick={() => setSpacing(spacing.value)}
          >
            {spacing.name}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuGroup>
  );
}

export function AppearanceToggle() {
  const { theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Select theme">
          {theme === 'light' && (
            <SunIcon className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
          )}
          {theme === 'dark' && (
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          )}
          {theme === 'system' && <Monitor size={16} strokeWidth={2} aria-hidden="true" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40">
        <ColorSchemeToggle />
        <DropdownMenuSeparator />
        <ThemeToggle />
        <DropdownMenuSeparator />
        <GradientToggle />
        <DropdownMenuSeparator />
        <SpacingToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
