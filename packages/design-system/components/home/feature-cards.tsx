'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useId } from 'react';

import { motion } from 'framer-motion';

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
          height={height}
          id={patternId}
          patternUnits="userSpaceOnUse"
          width={width}
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect fill={`url(#${patternId})`} height="100%" strokeWidth={0} width="100%" />
      {squares && (
        <svg className="overflow-visible" x={x} y={y}>
          {squares.map(([_x, _y]: [number, number], index) => (
            <rect
              height={height + 1}
              key={`${index}-${_x}-${_y}`}
              strokeWidth="0"
              width={width + 1}
              x={_x * width}
              y={_y * height}
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
        '-ml-20 -mt-2 mask-[linear-gradient(white,transparent)] pointer-events-none absolute top-0 left-1/2 h-full w-full',
        className,
      )}
    >
      <div className="mask-[radial-gradient(farthest-side_at_top,white,transparent)] absolute inset-0 bg-linear-to-r from-zinc-100/30 to-zinc-300/30 opacity-100 dark:from-zinc-900/30 dark:to-zinc-900/30">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-black/10 stroke-black/10 mix-blend-overlay dark:fill-white/10 dark:stroke-white/10"
          height={size ?? 20}
          squares={p}
          width={size ?? 20}
          x={-12}
          y={4}
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
                className={cn(
                  'font-bold text-3xl text-foreground tracking-tight sm:text-4xl',
                  titleClassName,
                )}
                id="features"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                className={cn('mt-4 text-lg text-muted-foreground', descriptionClassName)}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        <div className={cn('mt-16 grid gap-8', gridCols[columns])}>
          {features.map((feature, index) => (
            <motion.div
              className={cn(
                'relative overflow-hidden rounded-3xl border border-gray-200 bg-linear-to-b from-neutral-100 to-white p-6 shadow-xs transition-all hover:shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950',
                cardClassName,
              )}
              initial={{ opacity: 0, y: 20 }}
              key={index}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Grid size={20} />
              {feature.icon && (
                <div
                  className={cn(
                    'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-primary/10 to-secondary/10 text-primary/70 dark:bg-linear-to-br dark:from-primary/30 dark:to-secondary/30 dark:text-primary/50',
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
