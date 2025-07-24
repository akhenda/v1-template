'use client';

import { motion } from 'framer-motion';
import type React from 'react';

import { cn } from '../../lib/utils';

type CTASectionProps = {
  title: string;
  description?: string;
  cta?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function CTASection({
  title,
  description,
  cta,
  className,
  titleClassName,
  descriptionClassName,
}: CTASectionProps) {
  return (
    <section className={cn('py-12', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className={cn('font-bold text-3xl tracking-tight sm:text-4xl', titleClassName)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              className={cn('mt-4 text-lg', descriptionClassName)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {description}
            </motion.p>
          )}
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {cta}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
