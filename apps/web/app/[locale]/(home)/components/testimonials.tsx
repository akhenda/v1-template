'use client';

import { useEffect, useState } from 'react';

import { User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/design-system/components/ui/avatar';
import type { CarouselApi } from '@repo/design-system/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/design-system/components/ui/carousel';

const testimonials = [
  {
    title: 'Best decision',
    description:
      'Our goal was to streamline SMB trade, making it easier and faster than ever and we did it together.',
    author: {
      name: 'Hayden Bleasel',
      image: 'https://github.com/haydenbleasel.png',
    },
  },
  {
    title: 'Game changer',
    description:
      'This platform revolutionized how we handle our day-to-day operations. The efficiency gains have been remarkable.',
    author: {
      name: 'Lee Robinson',
      image: 'https://github.com/leerob.png',
    },
  },
  {
    title: 'Exceeded expectations',
    description:
      'Implementation was smooth and the results were immediate. Our team adapted quickly and productivity soared.',
    author: {
      name: 'shadcn',
      image: 'https://github.com/shadcn.png',
    },
  },
  {
    title: 'Outstanding support',
    description:
      'Not only is the platform powerful, but the customer support team has been exceptional in helping us maximize its potential.',
    author: {
      name: 'Pontus Abrahamsson',
      image: 'https://github.com/pontusab.png',
    },
  },
];

export const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const timeout = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);

    return () => clearTimeout(timeout);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-left font-regular text-3xl tracking-tighter md:text-5xl lg:max-w-xl">
            Hear from Our Thriving Community
          </h2>

          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {testimonials.map((item, index) => (
                <CarouselItem className="lg:basis-1/2" key={index}>
                  <div className="flex aspect-video h-full flex-col justify-between rounded-md bg-muted p-6 lg:col-span-2">
                    <User className="h-8 w-8 stroke-1" />

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <h3 className="text-xl tracking-tight">{item.title}</h3>
                        <p className="max-w-xs text-base text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <p className="flex flex-row items-center gap-2 text-sm">
                        <span className="text-muted-foreground">By</span>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={item.author.image} />
                          <AvatarFallback>??</AvatarFallback>
                        </Avatar>
                        <span>{item.author.name}</span>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
