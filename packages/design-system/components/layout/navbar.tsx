'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Menu, X } from 'lucide-react';

import { cn } from '../../lib/utils';

import { Banner } from './banner';

type NavLink = { label: string; href: string };
type NavbarProps = {
  logo: React.ReactNode;
  links?: NavLink[];
  actions?: React.ReactNode;
  className?: string;
  showBanner?: boolean;
};

export function Navbar({ logo, links, actions, className, showBanner }: NavbarProps) {
  const [top, setTop] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 10) setTop(false);
      else setTop(true);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <header
      className={cn(
        'fixed z-30 w-full transition duration-100 ease-in-out',
        { 'bg-background/70 shadow-lg backdrop-blur-sm': !top && !mobileNavOpen },
        className,
      )}
    >
      <nav
        aria-label="Global"
        className="container mx-auto flex items-center justify-between p-4 lg:px-6"
      >
        <div className="flex lg:flex-1">
          <Link className="-m-1.5 p-1.5" href="/">
            <span className="sr-only">Logo</span>
            {logo}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
            onClick={() => setMobileNavOpen(true)}
            type="button"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        {links && (
          <div className="hidden lg:flex lg:gap-x-12">
            {links.map((link, index) => (
              <Link
                className="text-foreground text-sm leading-6 hover:text-emerald-600"
                href={link.href}
                key={index}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
        {actions && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">{actions}</div>
        )}
      </nav>

      {/* Mobile menu */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="fixed inset-0 flex w-full">
            <div className="container relative mx-auto flex w-full flex-1 flex-col bg-background pt-0 pb-4">
              <div className="flex items-center justify-between p-4 lg:p-6">
                <div className="flex">
                  <Link className="-m-1.5 p-1.5" href="/">
                    <span className="sr-only">Logo</span>
                    {logo}
                  </Link>
                </div>
                <div className="flex">
                  <button
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
                    onClick={() => setMobileNavOpen(false)}
                    type="button"
                  >
                    <span className="sr-only">Close menu</span>
                    <X aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </div>
              {links && (
                <div className="mt-6 flow-root px-6">
                  <div className="-my-6 divide-y divide-gray-200">
                    <div className="space-y-2 py-6">
                      {links.map((link, index) => (
                        <Link
                          className="-mx-3 block rounded-lg px-3 py-2 text-base text-foreground leading-7 hover:bg-gray-50"
                          href={link.href}
                          key={index}
                          onClick={() => setMobileNavOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                    {actions && <div className="flex justify-between gap-4 py-6">{actions}</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {top && showBanner && <Banner className="hidden md:block" />}
    </header>
  );
}
