'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

type LegalPageLayoutProps = { title: string; lastUpdated: string; content: React.ReactNode };

export function LegalPageLayout({ title, lastUpdated, content }: LegalPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="bg-gradient-to-b from-white to-gray-50 py-8 pt-20 md:py-12 md:pt-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/legal"
              className="mb-6 inline-flex items-center font-medium text-emerald-600 text-sm hover:text-emerald-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to legal
            </Link>
            <motion.h1
              className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="mt-4 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Last Updated: {lastUpdated}
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
              <div className="prose prose-emerald max-w-none">{content}</div>
            </div>

            <div className="mt-8 flex justify-between border-gray-200 border-t pt-8 text-muted-foreground text-sm">
              <div>© {new Date().getFullYear()} ResumeMoto. All rights reserved.</div>
              <div className="flex space-x-4">
                <Link href="/legal/privacy-policy" className="hover:text-emerald-600">
                  Privacy Policy
                </Link>
                <Link href="/legal/terms-of-service" className="hover:text-emerald-600">
                  Terms of Service
                </Link>
                <Link href="/legal/cookie-policy" className="hover:text-emerald-600">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
