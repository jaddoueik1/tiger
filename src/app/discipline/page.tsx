'use client';

import Button from '@/components/ui/Button';
import { useDisciplines } from '@/hooks/useApi';
import { motion } from 'framer-motion';
import { Clock, Target, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function DisciplinesPage() {
  const { data: disciplinesData, isLoading } = useDisciplines();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-16 bg-gray-300 rounded-lg w-80 mx-auto mb-4" />
            <div className="h-6 bg-gray-300 rounded w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-lg mb-6" />
                <div className="h-6 bg-gray-300 rounded mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-gray-300 rounded" />
                  <div className="h-6 w-20 bg-gray-300 rounded" />
                </div>
                <div className="h-10 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const disciplines = disciplinesData?.data || [];

  const getDifficultyColor = (tags: string[]) => {
    if (tags.includes('beginner-friendly')) return 'bg-green-100 text-green-800';
    if (tags.includes('advanced')) return 'bg-red-100 text-red-800';
    if (tags.includes('intermediate')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getIntensityIcon = (tags: string[]) => {
    if (tags.includes('high-intensity')) return <TrendingUp className="w-4 h-4" />;
    if (tags.includes('cardio')) return <Target className="w-4 h-4" />;
    if (tags.includes('strength')) return <Users className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-bg py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-text mb-4">
            Martial Arts Disciplines
          </h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Discover the art of combat through our diverse range of martial arts disciplines. 
            Each discipline offers unique techniques, philosophies, and physical benefits.
          </p>
        </motion.div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {disciplines.map((discipline: any, index: number) => (
            <motion.div
              key={discipline.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Discipline Image */}
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src={discipline.media?.[0]?.src || 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg'}
                  alt={discipline.media?.[0]?.alt || discipline.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-text px-3 py-1 rounded-full text-sm font-medium">
                    {discipline.name}
                  </span>
                </div>
              </div>

              {/* Discipline Info */}
              <div>
                <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                  {discipline.name}
                </h3>
                
                <p className="text-text-muted mb-4 leading-relaxed line-clamp-3">
                  {discipline.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {discipline.tags?.slice(0, 3).map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getDifficultyColor(discipline.tags)}`}
                    >
                      {getIntensityIcon(discipline.tags)}
                      <span>{tag.replace('-', ' ')}</span>
                    </span>
                  ))}
                  {discipline.tags?.length > 3 && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      +{discipline.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Benefits Preview */}
                {discipline.benefits && discipline.benefits.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text mb-2">Key Benefits:</h4>
                    <ul className="text-sm text-text-muted space-y-1">
                      {discipline.benefits.slice(0, 3).map((benefit: string, benefitIndex: number) => (
                        <li key={benefitIndex} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link href={`/discipline/${discipline.slug}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                  <Link href={`/classes?discipline=${discipline.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      View Classes
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {disciplines.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">
              No disciplines available at the moment.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-text mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-text-muted mb-6">
              Choose your discipline and begin training with world-class instructors. 
              All skill levels welcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                <Link href="/pricing">View Membership Plans</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/schedule">Browse Schedule</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}