'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Image from 'next/image';
import Link from 'next/link';

import { Menu, MoveRight, X } from 'lucide-react';

import { ModeToggle } from '@repo/web-design-system/components/layout/mode-toggle';
import { Button } from '@repo/web-design-system/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@repo/web-design-system/components/ui/navigation-menu';

import { env } from '@/env';

import { LanguageSwitcher } from './language-switcher';

const DOCS_URL = env.NEXT_PUBLIC_DOCS_URL;

export const Header = () => {
  const { t } = useTranslation();

  const navigationItems = [
    { title: t('Home'), href: '/', description: '' },
    {
      title: t('Product'),
      description: t('Managing a small business today is already tough.'),
      items: [{ title: t('Pricing'), href: '/pricing' }],
    },
    { title: t('Blog'), href: '/blog', description: '' },
  ];

  if (DOCS_URL) navigationItems.push({ title: t('Docs'), href: DOCS_URL, description: '' });

  const [isOpen, setOpen] = useState(false);
  return (
    <header className="sticky top-0 left-0 z-40 w-full border-b bg-background">
      <div className="container relative mx-auto flex min-h-20 flex-row items-center gap-4 lg:grid lg:grid-cols-3">
        <div className="hidden flex-row items-center justify-start gap-4 lg:flex">
          <NavigationMenu className="flex items-start justify-start">
            <NavigationMenuList className="flex flex-row justify-start gap-4">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <NavigationMenuLink asChild>
                      <Button asChild variant="ghost">
                        <Link href={item.href}>{item.title}</Link>
                      </Button>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="w-112.5! p-4">
                        <div className="flex grid-cols-2 flex-col gap-4 lg:grid">
                          <div className="flex h-full flex-col justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">{item.description}</p>
                            </div>
                            <Button asChild className="mt-10" size="sm">
                              <Link href="/contact">{t('Book a call')}</Link>
                            </Button>
                          </div>
                          <div className="flex h-full flex-col justify-end text-sm">
                            {item.items?.map((subItem, idx) => (
                              <NavigationMenuLink
                                className="flex flex-row items-center justify-between rounded px-4 py-2 hover:bg-muted"
                                href={subItem.href}
                                key={idx}
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="h-4 w-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2 lg:justify-center">
          <Image alt="Logo" className="dark:invert" height={24} src="./logo.svg" width={24} />
          <p className="whitespace-nowrap font-semibold">next-forge</p>
        </div>
        <div className="flex w-full justify-end gap-4">
          <Button asChild className="hidden md:inline" variant="ghost">
            <Link href="/contact">{t('Contact')}</Link>
          </Button>
          <div className="hidden border-r md:inline" />
          <div className="hidden md:inline">
            <LanguageSwitcher />
          </div>
          <div className="hidden md:inline">
            <ModeToggle />
          </div>
          <Button asChild className="hidden md:inline" variant="outline">
            <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-in`}>{t('Sign in')}</Link>
          </Button>
          <Button asChild>
            <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-up`}>{t('Get started')}</Link>
          </Button>
        </div>
        <div className="flex w-12 shrink items-end justify-end lg:hidden">
          <Button onClick={() => setOpen(!isOpen)} variant="ghost">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          {isOpen && (
            <div className="container absolute top-20 right-0 flex w-full flex-col gap-8 border-t bg-background py-4 shadow-lg">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        className="flex items-center justify-between"
                        href={item.href}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="h-4 w-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items?.map((subItem) => (
                      <Link
                        className="flex items-center justify-between"
                        href={subItem.href}
                        key={subItem.title}
                      >
                        <span className="text-muted-foreground">{subItem.title}</span>
                        <MoveRight className="h-4 w-4 stroke-1" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
