'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type React from 'react';

import { cn } from '../../lib/utils';

import { Button } from '../ui/button';

type Plan = {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: string[];
  cta: { text: string; href: string };
  popular?: boolean;
  disabled?: boolean;
};

type PricingCardsProps = {
  title?: string;
  description?: string;
  plans: Plan[];
  className?: string;
  cardClassName?: (plan: Plan) => string | string;
  ctaClassName?: (plan: Plan) => string | string;
  featureIcon?: React.ReactNode;
  featureIconClassName?: string;
  popularBadgeClassName?: string;
};

export function PricingCards({
  title,
  description,
  plans,
  className,
  cardClassName,
  ctaClassName,
  featureIcon,
  featureIconClassName,
  popularBadgeClassName,
}: PricingCardsProps) {
  return (
    <section className={cn('py-12', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="mx-auto max-w-3xl text-center">
            {title && (
              <motion.h2
                id="pricing"
                className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl"
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
                className="mt-4 text-lg text-muted-foreground"
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

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={cn(
                'relative flex flex-col rounded-xl border border-gray-200 p-6',
                typeof cardClassName === 'function' ? cardClassName(plan) : cardClassName,
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div
                  className={cn(
                    '-top-4 -translate-x-1/2 absolute left-1/2 rounded-full bg-primary px-4 py-1 font-medium text-primary-foreground text-sm',
                    popularBadgeClassName,
                  )}
                >
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground text-xl">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="font-bold text-4xl text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                {plan.description && (
                  <p className="mt-2 text-muted-foreground">{plan.description}</p>
                )}
              </div>
              <ul className="mb-6 flex-1 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className={cn('mr-2', featureIconClassName)}>{featureIcon}</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.cta.href} className={cn({ 'cursor-not-allowed': plan.disabled })}>
                <Button
                  disabled={plan.disabled}
                  variant={plan.popular ? 'default' : 'outline'}
                  className={cn(
                    'w-full',
                    typeof ctaClassName === 'function' ? ctaClassName(plan) : ctaClassName,
                    { 'cursor-not-allowed': plan.disabled },
                  )}
                >
                  {plan.cta.text}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
