'use client';

import { motion } from 'framer-motion';

import type { PropsWithClassName } from '@repo/types';

import { cn } from '../../lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

type FAQItem = { question: string; answer: string };

type FAQAccordionProps = PropsWithClassName<{
  title?: string;
  description?: string;
  items: FAQItem[];
  accordionClassName?: string;
}>;

export function FAQAccordion({
  title,
  description,
  items,
  className,
  accordionClassName,
}: FAQAccordionProps) {
  return (
    <section className={cn('py-12', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="mx-auto max-w-3xl text-center">
            {title && (
              <motion.h2
                className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl"
                id="faq"
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
                className="mt-4 text-lg text-muted-foreground"
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

        <motion.div
          className={cn('mx-auto mt-16 max-w-3xl', accordionClassName)}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Accordion className="w-full" collapsible type="single">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-foreground text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
