import Link from 'next/link';
import type React from 'react';

import { cn } from '../../lib/utils';

type FooterLink = { label: string; href: string };
type LinkGroup = { title: string; links: FooterLink[] };
type SocialLink = { icon: React.ReactNode; href: string; label: string };

type FooterProps = {
  logo: React.ReactNode;
  description?: string;
  socialLinks?: SocialLink[];
  linkGroups?: LinkGroup[];
  newsletter?: { title: string; description?: string; inputSlot: React.ReactNode };
  bottomLinks?: FooterLink[];
  copyrightText: string;
  className?: string;
};

export function Footer({
  logo,
  description,
  socialLinks,
  linkGroups,
  newsletter,
  bottomLinks,
  copyrightText,
  className,
}: FooterProps) {
  return (
    <footer className={cn('py-12', className)}>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold text-lg text-white">{logo}</h3>
            {description && <p className="mb-4">{description}</p>}
            {socialLinks && (
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <Link key={index} href={link.href} className="hover:text-white">
                    {link.icon}
                    <span className="sr-only">{link.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {linkGroups?.map((group, index) => (
            <div key={index}>
              <h3 className="mb-4 font-semibold text-lg text-white">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {newsletter && (
            <div>
              <h3 className="mb-4 font-semibold text-lg text-white">{newsletter.title}</h3>
              {newsletter.description && <p className="mb-4">{newsletter.description}</p>}
              {newsletter.inputSlot}
            </div>
          )}
        </div>

        <div className="mt-12 border-gray-800 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p>{copyrightText}</p>
            {bottomLinks && (
              <div className="flex space-x-6">
                {bottomLinks.map((link, index) => (
                  <Link key={index} href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
