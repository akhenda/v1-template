import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import type { PropsWithClassName } from '@repo/types';

import { cn } from '../../lib/utils';

type FeatureProps = PropsWithClassName<{
  title: string;
  description: string;
  icon?: ReactNode;
  iconClassName?: string;
  cta?: ReactNode;
  index: number;
}>;

type FeatureCardsProps = PropsWithClassName<{
  title?: string;
  description?: string;
  features: FeatureProps[];
  columns?: 1 | 2 | 3 | 4;
  cardClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}>;

const Feature = ({ className, title, description, icon, iconClassName, index }: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'group/feature relative flex flex-col py-10 lg:border-r dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800',
        className,
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      <div
        className={cn(
          'relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400',
          iconClassName,
        )}
      >
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent/60 to-white/50 text-primary/70">
          {icon}
        </div>
      </div>
      <div className="relative z-10 mb-2 px-10 font-bold text-lg">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary dark:bg-neutral-700" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-lg px-10 text-base text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </motion.div>
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

        <div className={cn('relative z-10 mt-16 grid ', gridCols[columns])}>
          {features.map((feature, index) => (
            <Feature
              key={feature.title}
              {...feature}
              index={index}
              className={cardClassName}
              iconClassName={iconClassName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
