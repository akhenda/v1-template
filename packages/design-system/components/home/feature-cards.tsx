'use client';

import { motion } from 'framer-motion';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useId } from 'react';

import { cn } from '../../lib/utils';

type Feature = {
  title: string;
  description: string;
  icon?: ReactNode;
  cta?: ReactNode;
  index?: number;
};

type FeatureCardsProps = {
  title?: string;
  description?: string;
  features: Feature[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  cardClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: {
  width: number;
  height: number;
  x?: number;
  y?: number;
  squares?: [number, number][];
} & ComponentPropsWithoutRef<'svg'>) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: [number, number], index) => (
            <rect
              strokeWidth="0"
              key={`${index}-${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

export const Grid = ({
  pattern,
  size,
  className,
}: {
  pattern?: [number, number][];
  size?: number;
  className?: string;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div
      className={cn(
        '-ml-20 -mt-2 pointer-events-none absolute top-0 left-1/2 h-full w-full [mask-image:linear-gradient(white,transparent)]',
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/30 to-zinc-300/30 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 dark:to-zinc-900/30">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x={-12}
          y={4}
          squares={p}
          className="absolute inset-0 h-full w-full fill-black/10 stroke-black/10 mix-blend-overlay dark:fill-white/10 dark:stroke-white/10"
        />
      </div>
    </div>
  );
};

export function FeatureCards({
  title,
  description,
  features,
  columns = 3,
  className,
  cardClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
}: FeatureCardsProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={cn('py-12', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="mx-auto max-w-3xl text-center">
            {title && (
              <motion.h2
                id="features"
                className={cn(
                  'font-bold text-3xl text-foreground tracking-tight sm:text-4xl',
                  titleClassName,
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                className={cn('mt-4 text-lg text-muted-foreground', descriptionClassName)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        <div className={cn('mt-16 grid gap-8', gridCols[columns])}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={cn(
                'relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-b from-neutral-100 to-white p-6 shadow-xs transition-all hover:shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950',
                cardClassName,
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Grid size={20} />
              {feature.icon && (
                <div
                  className={cn(
                    'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 text-primary/70 dark:bg-gradient-to-br dark:from-primary/30 dark:to-secondary/30 dark:text-primary/50',
                    iconClassName,
                  )}
                >
                  {feature.icon}
                </div>
              )}
              <h3 className={cn('mb-2 font-semibold text-foreground text-xl', titleClassName)}>
                {feature.title}
              </h3>
              <p className={cn('text-muted-foreground/80', descriptionClassName)}>
                {feature.description}
              </p>
              {feature.cta && <div className="mt-4">{feature.cta}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
