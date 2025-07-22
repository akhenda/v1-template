'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

import { cn } from '../../lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Testimonial = {
  name: string;
  title?: string;
  testimonial: string;
  avatar?: string;
  avatarSrc?: string;
  rating?: number;
};

type TestimonialCardsProps = {
  title?: string;
  description?: string;
  testimonials: Testimonial[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  cardClassName?: string;
  avatarClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function TestimonialCards({
  title,
  description,
  testimonials,
  columns = 3,
  className,
  cardClassName,
  avatarClassName,
  titleClassName,
  descriptionClassName,
}: TestimonialCardsProps) {
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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={cn(
                'rounded-xl border-primary/20 bg-primary/10 p-6 dark:border-background/50 dark:bg-background',
                cardClassName,
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {testimonial.rating && (
                <div className="mb-4 flex">
                  {[...new Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating!
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
              <blockquote className="mb-6 text-muted-foreground">
                "{testimonial.testimonial}"
              </blockquote>
              <div className="flex items-center">
                <Avatar className={cn('mr-4 h-12 w-12', avatarClassName)}>
                  {testimonial.avatarSrc && (
                    <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                  )}
                  <AvatarFallback className="bg-transparent">
                    {testimonial.avatar || testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{testimonial.name}</div>
                  {testimonial.title && (
                    <div className="text-muted-foreground text-sm">{testimonial.title}</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
