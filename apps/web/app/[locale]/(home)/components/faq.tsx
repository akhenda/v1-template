import Link from 'next/link';

import { PhoneCall } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/design-system/components/ui/accordion';
import { Button } from '@repo/design-system/components/ui/button';

export const FAQ = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                Common Questions, Expert Answers
              </h4>
              <p className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg">
                Get quick answers to your most pressing questions about our platform. We've compiled
                everything you need to know about transforming your business operations and getting
                started with modern trading solutions.
              </p>
            </div>
            <div className="">
              <Button asChild className="gap-4" variant="outline">
                <Link href="/contact">
                  Any questions? Reach out <PhoneCall className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Accordion className="w-full" collapsible type="single">
          {[
            {
              question: 'What is the platform?',
              answer:
                'The platform is a trading platform that allows you to trade with confidence.',
            },
            {
              question: 'How secure is the platform?',
              answer:
                'Our platform employs enterprise-grade security measures, including end-to-end encryption and multi-factor authentication, to ensure your trading activities remain completely secure.',
            },
            {
              question: 'What trading features are available?',
              answer:
                'The platform offers comprehensive trading tools including real-time market data, advanced charting, automated trading strategies, and detailed analytics to support informed decision-making.',
            },
            {
              question: 'How does pricing work?',
              answer:
                'We offer flexible pricing tiers designed to scale with your business needs, from starter plans for individual traders to enterprise solutions for large organizations.',
            },
            {
              question: 'What kind of support do you provide?',
              answer:
                'Our dedicated support team is available 24/7 through multiple channels including live chat, email, and phone. We also provide extensive documentation and training resources.',
            },
          ].map((item, index) => (
            <AccordionItem key={index} value={`index-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </div>
);
