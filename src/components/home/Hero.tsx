'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useContent } from '@/hooks/useApi';
import Button from '@/components/ui/Button';

export default function Hero() {
  const { data: heroContent, isLoading } = useContent('home.hero');

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative container mx-auto px-4 lg:px-8 h-screen flex items-center">
          <div className="max-w-2xl space-y-6">
            <div className="h-16 bg-gray-700 rounded-lg" />
            <div className="h-6 bg-gray-700 rounded" />
            <div className="flex space-x-4">
              <div className="h-12 w-32 bg-gray-700 rounded-lg" />
              <div className="h-12 w-40 bg-gray-700 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const content = heroContent?.data || {};

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={content.media?.src || 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg'}
          alt={content.media?.alt || 'MMA training session'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            {content.title || 'Train Hard. Evolve Faster.'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed"
          >
            {content.subtitle || 'World-class MMA, BJJ, Muay Thai, and Boxing training in a state-of-the-art facility.'}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            {content.ctas?.map((cta: any, index: number) => (
              <Link key={index} href={cta.href}>
                <Button
                  variant={cta.variant || (index === 0 ? 'primary' : 'outline')}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {cta.label}
                </Button>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}