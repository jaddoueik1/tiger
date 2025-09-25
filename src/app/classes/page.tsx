'use client';

import Button from '@/components/ui/Button';
import Head from 'next/head';
import { useClassTemplates, useCoaches, useDisciplines, useWhatsAppOrder } from '@/hooks/useApi';
import { motion } from 'framer-motion';
import { Clock, Search, Users } from 'lucide-react';
import { useState } from 'react';

export default function ClassesPage() {
  const [filters, setFilters] = useState({
    search: '',
  });

  const { data: disciplinesData } = useDisciplines();
  const { data: coachesData } = useCoaches();
  const { data: templatesData } = useClassTemplates();
  const { config, isConfigLoading } = useWhatsAppOrder();

  const sendWhatsAppMessage = (template: any) => {
    if (!config?.phoneE164) {
      alert('WhatsApp contact number is not configured.');
      return;
    }

    // Find the coach for this template
    const templateCoach = coaches.find((coach: any) => 
      template.coachIds?.includes(coach.id)
    );

    const coachName = templateCoach?.name || 'our instructor';
    const message = `Hello! I'm interested in the "${template.title}" class.

📋 *Class Details:*
Class: ${template.title}
Level: ${template.level?.replace('_', ' ').toUpperCase()}
Duration: ${template.durationMin} minutes
Instructor: ${coachName}
${template.price ? `Price: $${template.price} per class` : ''}

Could you please provide more information about:
- Class schedule and availability
- What to bring/wear
- How to book a spot

Thank you!`;

    const phoneDigits = config.phoneE164.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const disciplines = disciplinesData?.data || [];
  const coaches = coachesData?.data || [];
  
  // Filter templates based on search
  const allTemplates = templatesData?.data || [];
  const templates = allTemplates.filter((template: any) => 
    !filters.search || 
    template.title.toLowerCase().includes(filters.search.toLowerCase()) ||
    template.description.toLowerCase().includes(filters.search.toLowerCase())
  );

  const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'all_levels', label: 'All Levels' },
  ];

  return (
    <>
      <Head>
        <title>Tiger Muay Thai - Classes</title>
        <meta name="description" content="Choose from our diverse range of martial arts and fitness classes, designed for all skill levels." />
      </Head>
      <div className="min-h-screen bg-bg py-20">
        <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-text mb-4">
            Our Classes
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Choose from our diverse range of martial arts and fitness classes, designed for all skill levels.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface rounded-xl p-6 mb-12 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search classes..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Discipline Filter */}
            <select
              value={filters.discipline}
              onChange={(e) => setFilters({ ...filters, discipline: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Disciplines</option>
              {disciplines.map((discipline: any) => (
                <option key={discipline.id} value={discipline.slug}>
                  {discipline.name}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Levels</option>
              {levels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>

            {/* Coach Filter */}
            <select
              value={filters.coachId}
              onChange={(e) => setFilters({ ...filters, coachId: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Coaches</option>
              {coaches.map((coach: any) => (
                <option key={coach.id} value={coach.id}>
                  {coach.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Classes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {templates.map((template: any, index: number) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card group hover:shadow-xl transition-all duration-300"
            >
              {/* Class Image */}
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src={template.discipline?.media?.[0]?.src || 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg'}
                  alt={template.discipline?.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {template.level?.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Class Info */}
              <div>
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {template.title}
                </h3>
                
                <p className="text-text-muted mb-4 leading-relaxed">
                  {template.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <Clock className="w-4 h-4" />
                    <span>{template.durationMin} minutes</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <Users className="w-4 h-4" />
                    <span>
                      {template.coaches?.map((coach: any) => coach.name).join(', ')}
                    </span>
                  </div>
                  
                  {template.price && (
                    <div className="flex items-center space-x-2 text-sm font-medium text-accent">
                      <span>${template.price} / class</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => sendWhatsAppMessage(template)}
                  >
                    Inquire
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {templates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">
              No classes found matching your criteria.
            </p>
          </div>
        )}
        </div>
      </div>
    </>
  );
}