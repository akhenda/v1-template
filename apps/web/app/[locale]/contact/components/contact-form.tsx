'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { format } from 'date-fns';
import { CalendarIcon, Check, MoveRight } from 'lucide-react';

import { Button } from '@repo/design-system/components/ui/button';
import { Calendar } from '@repo/design-system/components/ui/calendar';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/design-system/components/ui/popover';
import { cn } from '@repo/design-system/lib/utils';

const benefits = [
  {
    title: 'Personalized Consultation',
    description: 'Get tailored solutions and expert advice specific to your business needs.',
  },
  {
    title: 'Seamless Integration',
    description:
      'We seamlessly integrate with your existing systems to ensure a smooth transition and minimal disruption.',
  },
  {
    title: 'Expert Guidance',
    description:
      'Our team of experts will guide you through the process, ensuring you get the most out of our platform.',
  },
];

export const ContactForm = () => {
  const { t } = useTranslation();

  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                  {t("Let's Talk About Your Business")}
                </h4>
                <p className="max-w-sm text-left text-lg text-muted-foreground leading-relaxed tracking-tight">
                  {t(
                    'Schedule a consultation with our team to discuss how we can help streamline your operations and drive growth for your business.',
                  )}
                </p>
              </div>
            </div>
            {benefits.map((benefit, index) => (
              <div className="flex flex-row items-start gap-6 text-left" key={index}>
                <Check className="mt-2 h-4 w-4 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>{benefit.title}</p>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="flex max-w-sm flex-col gap-4 rounded-md border p-8">
              <p>{t('Book a meeting')}</p>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="picture">{t('Date')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full max-w-sm justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>{t('Date')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="firstname">{t('First name')}</Label>
                <Input id="firstname" type="text" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="lastname">{t('Last name')}</Label>
                <Input id="lastname" type="text" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="picture">{t('Upload resume')}</Label>
                <Input id="picture" type="file" />
              </div>

              <Button className="w-full gap-4">
                {t('Book the meeting')} <MoveRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
