'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Amazon,
  Apple,
  Google,
  Lenovo,
  LinkedIn,
  Meta,
  Microsoft,
  Netflix,
  PayPal,
  Samsung,
  Spotify,
  Tesla,
  Uber,
  Vercel,
} from './logos';

const brands = [
  Amazon,
  Apple,
  Google,
  Lenovo,
  LinkedIn,
  Meta,
  Microsoft,
  Netflix,
  PayPal,
  Samsung,
  Spotify,
  Tesla,
  Uber,
  Vercel,
];

const AnimatedLogoCloud = () => {
  return (
    <div className="w-full py-2">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group -ml-5 relative mt-4 flex gap-6 overflow-hidden p-4"
          style={{
            maskImage:
              'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
          }}
        >
          {new Array(5).fill(null).map((_, index) => (
            <div
              key={index}
              className="flex shrink-0 animate-x-slider flex-row justify-around gap-6"
            >
              {brands.map((Brand, key) => (
                <Brand
                  key={key}
                  overrideColor
                  className="h-auto w-28 flex-none px-2 text-gray-400 dark:invert"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function Brands() {
  const { t } = useTranslation();

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="mx-auto mb-1 max-w-sm text-pretty text-center font-light text-muted-foreground md:text-sm">
          {t('Trusted by job seekers eyeing leading companies')}
        </p>

        <AnimatedLogoCloud />
      </div>
    </div>
  );
}
