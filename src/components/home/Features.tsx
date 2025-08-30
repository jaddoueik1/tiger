'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Trophy, Clock, DivideIcon as LucideIcon } from 'lucide-react';
import { useContent } from '@/hooks/useApi';

const iconMap: { [key: string]: LucideIcon } = {
  target: Target,
  users: Users,
  trophy: Trophy,
  clock: Clock,
};

export default function Features() {
  const { data: featuresContent, isLoading } = useContent('home.features');

  if (isLoading) {
    return (
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 bg-gray-300 rounded-lg w-64 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-6" />
                <div className="h-6 bg-gray-300 rounded mb-4" />
                <div className="h-16 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const content = featuresContent?.data || {};
  const features = content.items || [];

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-text mb-4">
            {content.title || 'Why Train With Us'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature: any, index: number) => {
            const IconComponent = iconMap[feature.icon] || Target;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-4">
                  {feature.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}