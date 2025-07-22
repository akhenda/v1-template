'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import type React from 'react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

interface TimelineEntry {
  title: string;
  content: ReactNode;
}

export const Timeline = ({ header, data }: { header: ReactNode; data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 20%', 'end 80%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      {header}

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-32">
            <div className="sticky top-40 z-20 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-6 w-6 items-center justify-center rounded-full bg-background md:left-3">
                <motion.div
                  className="h-3 w-3 rounded-full border border-primary/70 bg-primary/60 p-1 dark:border-primary/40 dark:bg-primary/50"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3 className="hidden font-bold text-base text-primary/70 md:block md:pl-14 md:text-2xl dark:text-primary/50">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pr-4 pl-20 md:pl-4">
              <h3 className="mb-4 block text-left font-bold text-2xl text-primary/70 md:hidden dark:text-primary/50">
                {item.title}
              </h3>
              {item.content}{' '}
            </div>
          </div>
        ))}
        <div
          style={{ height: `${height}px` }}
          className="absolute top-0 left-6 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-[0%] from-transparent via-neutral-200 to-[99%] to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-6 dark:via-neutral-700 "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-secondary/90 to-primary/70"
          />
        </div>
      </div>
    </div>
  );
};
