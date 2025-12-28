'use client';

import { useTheme } from 'next-themes';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Monitor, Moon, Sun } from 'lucide-react';

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

  const changeTheme = (t: ColorScheme) => () => setTheme(t);

  if (justIcons) {
    return (
      <>
        <DropdownMenuLabel className="font-bold text-muted-foreground text-xs">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuGroup className="mb-1 flex flex-row justify-around gap-1">
          <DropdownMenuItem
            className={cn('border', isLight && 'bg-accent')}
            onClick={changeTheme('light')}
          >
            <Sun aria-hidden="true" className="opacity-80" size={16} strokeWidth={2} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn('border', isDark && 'bg-accent')}
            onClick={changeTheme('dark')}
          >
            <Moon aria-hidden="true" className="opacity-80" size={16} strokeWidth={2} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn('border', isSystem && 'bg-accent')}
            onClick={changeTheme('system')}
          >
            <Monitor aria-hidden="true" className="opacity-80" size={16} strokeWidth={2} />
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
            className={cn('flex-1 items-center justify-center border', isLight && 'bg-accent')}
            onClick={changeTheme('light')}
          >
            <Sun aria-hidden="true" className="text-primary opacity-80" size={16} strokeWidth={2} />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn('flex-1 items-center justify-center border', isDark && 'bg-accent')}
            onClick={changeTheme('dark')}
          >
            <Moon
              aria-hidden="true"
              className="text-primary opacity-80"
              size={16}
              strokeWidth={2}
            />
            <span>Dark</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem
          className={cn('mt-1 items-center justify-center border', isSystem && 'bg-accent')}
          onClick={changeTheme('system')}
        >
          <Monitor
            aria-hidden="true"
            className="text-primary opacity-80"
            size={16}
            strokeWidth={2}
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
              className={cn({ 'bg-accent': isActive })}
              key={supportedTheme.value}
              onClick={() => setTheme(supportedTheme.value)}
            >
              <div
                className={cn(
                  'h-4 w-4 rounded-full',
                  supportedTheme.light,
                  `dark:${supportedTheme.dark}`
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
              className={cn({ 'bg-accent': isActive })}
              key={gradient.value}
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
            className={cn('border text-xs', { 'bg-accent': isActive })}
            key={spacing.value}
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
        <Button aria-label="Select theme" size="icon" variant="outline">
          {theme === 'light' && (
            <SunIcon className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
          )}
          {theme === 'dark' && (
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          )}
          {theme === 'system' && <Monitor aria-hidden="true" size={16} strokeWidth={2} />}
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
