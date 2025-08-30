'use client';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from 'next/font/google';
import React from 'react';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <Providers>
            <QueryClientProvider client={queryClient}>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 pt-16">
                {children}
                </main>
                <Footer />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}