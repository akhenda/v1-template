'use client';

import { motion } from 'framer-motion';
import type React from 'react';

import { cn } from '../../lib/utils';

import { BgGradient } from './bg-gradient';

interface HeroSectionProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
  };
  cta?: React.ReactNode;
  secondaryCta?: React.ReactNode;
  image?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  imageClassName?: string;
}

export function HeroSection({
  title,
  description,
  align = 'center',
  badge,
  cta,
  secondaryCta,
  image,
  className,
  contentClassName,
  imageClassName,
}: HeroSectionProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gradient-to-b from-background to-background/50',
        className,
      )}
    >
      <div className="-top-0 absolute inset-x-0 opacity-5 dark:opacity-45">
        <BgGradient />
      </div>

      <svg
        className=",white,transparent)] absolute inset-0 z-1 h-full w-full stroke-foreground/5 [mask-image:radial-gradient(100%_100%_at_top_left"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/5 dark:fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div
        className="-z-10 absolute top-10 left-[calc(50%-4rem)] transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#9c80ff] to-[#e546d5] opacity-20"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        />
      </div>

      <div className="absolute top-0 z-[0] h-screen w-screen dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-emarald-950/10" />
      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            className={cn(
              'z-10 flex flex-col justify-center',
              alignmentClasses[align],
              contentClassName,
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {badge && (
              <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary/60 text-sm">
                <span className="mr-1 flex h-2 w-2 rounded-full bg-primary/70" />
                {badge.text}
              </div>
            )}
            <h1 className="mb-6 text-left font-bold text-4xl text-foreground tracking-tight sm:text-5xl md:text-left md:text-6xl">
              {title}
            </h1>
            {description && <p className="mb-8 text-muted-foreground text-xl">{description}</p>}
            {cta && <div className="mb-8 w-full">{cta}</div>}
            {secondaryCta && <div>{secondaryCta}</div>}
          </motion.div>
          {image && (
            <motion.div
              className={cn(
                'relative z-10 flex items-center justify-center lg:justify-end',
                imageClassName,
              )}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {image}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
