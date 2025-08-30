'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useContent } from '@/hooks/useApi';

export default function Testimonials() {
  const { data: testimonialsContent, isLoading } = useContent('home.testimonials');

  if (isLoading) {
    return (
      <section className="py-20 bg-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 bg-gray-300 rounded-lg w-80 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-6" />
                <div className="h-24 bg-gray-300 rounded mb-4" />
                <div className="h-4 bg-gray-300 rounded mb-2" />
                <div className="h-4 bg-gray-300 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const content = testimonialsContent?.data || {};
  const testimonials = content.items || [];

  return (
    <section className="py-20 bg-bg">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-text mb-4">
            {content.title || 'What Our Students Say'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-6 object-cover"
                />
                
                <Quote className="w-8 h-8 text-primary mx-auto mb-4 opacity-50" />
                
                <p className="text-text-muted mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-text">{testimonial.name}</p>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}