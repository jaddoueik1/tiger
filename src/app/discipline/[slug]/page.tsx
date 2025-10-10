'use client';

import Button from '@/components/ui/Button';
import Head from 'next/head';
import { useClassTemplate, useDisciplines } from '@/hooks/useApi';
import { motion } from 'framer-motion';
import {
    Award,
    ChevronLeft,
    Clock,
    Heart,
    Shield,
    Star,
    Target,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const benefitIcons = {
  'cardiovascular fitness': Heart,
  'strength building': Target,
  'flexibility': Zap,
  'self-defense': Shield,
  'mental discipline': Award,
  'coordination': TrendingUp,
  'confidence': Star,
  'stress relief': Heart,
  'weight loss': TrendingUp,
  'muscle toning': Target,
};

const getIcon = (benefit: string) => {
  const key = benefit.toLowerCase();
  return benefitIcons[key as keyof typeof benefitIcons] || Target;
};

export default function DisciplineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data: disciplinesData, isLoading: disciplinesLoading } = useDisciplines();
  const disciplines = disciplinesData?.data || [];
  const discipline = disciplines.find((d: any) => d.slug === slug);

  const { data: classesData, isLoading: classesLoading } = useClassTemplate(discipline?._id);
  const classes = classesData?.data || [];

  if (disciplinesLoading) {
    return (
      <>
        <Head>
          <title>Tiger Muay Thai - Discipline</title>
          <meta name="description" content="Learn more about our martial arts disciplines." />
        </Head>
        <div className="min-h-screen bg-bg py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-300 rounded w-32" />
            <div className="h-16 bg-gray-300 rounded" />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="h-64 bg-gray-300 rounded-xl" />
                <div className="h-32 bg-gray-300 rounded-xl" />
              </div>
              <div className="space-y-4">
                <div className="h-48 bg-gray-300 rounded-xl" />
                <div className="h-32 bg-gray-300 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  if (!discipline) {
    return (
      <>
        <Head>
          <title>Tiger Muay Thai - Discipline Not Found</title>
          <meta name="description" content="The discipline you're looking for doesn't exist." />
        </Head>
        <div className="min-h-screen bg-bg py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-text mb-4">Discipline Not Found</h1>
          <p className="text-text-muted mb-8">The discipline you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/discipline')}>
            Back to Disciplines
          </Button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Tiger Muay Thai - {discipline.name}</title>
        <meta name="description" content={discipline.description} />
      </Head>
      <div className="min-h-screen bg-bg py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-text-muted hover:text-text mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Disciplines</span>
          </motion.button>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              {/* Discipline Image */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
                <img
                  src={discipline.media?.[0]?.src || 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg'}
                  alt={discipline.media?.[0]?.alt || discipline.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {discipline.tags?.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {discipline.name}
                  </h1>
                  <p className="text-white/90 text-lg">
                    Master the art of {discipline.name.toLowerCase()}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-text mb-4">About {discipline.name}</h2>
              <p className="text-text-muted leading-relaxed mb-6">
                {discipline.description}
              </p>
              
              {discipline.history && (
                <div>
                  <h3 className="text-lg font-semibold text-text mb-3">History & Origins</h3>
                  <p className="text-text-muted leading-relaxed">
                    {discipline.history}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Benefits */}
            {discipline.benefits && discipline.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <h2 className="text-2xl font-bold text-text mb-6">Benefits of {discipline.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {discipline.benefits.map((benefit: string, index: number) => {
                    const IconComponent = getIcon(benefit);
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-surface rounded-lg border">
                        <IconComponent className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-text font-medium">{benefit}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Techniques */}
            {discipline.techniques && discipline.techniques.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card"
              >
                <h2 className="text-2xl font-bold text-text mb-6">Key Techniques</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {discipline.techniques.map((technique: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-surface rounded-lg border">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-text">{technique}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Available Classes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-text mb-6">{discipline.name} Classes</h2>
              
              {classesLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-300 rounded-lg" />
                    </div>
                  ))}
                </div>
              ) : classes.length > 0 ? (
                <div className="space-y-4">
                  {classes.map((classTemplate: any) => (
                    <div
                      key={classTemplate.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-text">{classTemplate.title}</h4>
                          <p className="text-sm text-text-muted">{classTemplate.description}</p>
                        </div>
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                          {classTemplate.level?.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-text-muted">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{classTemplate.durationMin} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{classTemplate.coaches?.length || 0} instructor{classTemplate.coaches?.length !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        
                        <Link href={`/classes/${classTemplate._id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted">No classes available for this discipline at the moment.</p>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-text mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-muted">Difficulty Level</span>
                  <span className="font-medium text-text">
                    {discipline.tags?.includes('beginner-friendly') ? 'Beginner Friendly' : 
                     discipline.tags?.includes('advanced') ? 'Advanced' : 'All Levels'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Intensity</span>
                  <span className="font-medium text-text">
                    {discipline.tags?.includes('high-intensity') ? 'High' : 
                     discipline.tags?.includes('moderate') ? 'Moderate' : 'Variable'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Focus</span>
                  <span className="font-medium text-text">
                    {discipline.tags?.includes('striking') ? 'Striking' : 
                     discipline.tags?.includes('grappling') ? 'Grappling' : 'Mixed'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Available Classes</span>
                  <span className="font-medium text-text">{classes.length}</span>
                </div>
              </div>
            </motion.div>

            {/* Equipment Needed */}
            {discipline.equipment && discipline.equipment.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-text mb-4">Equipment Needed</h3>
                <ul className="space-y-2">
                  {discipline.equipment.map((item: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-text mb-4">Ready to Start?</h3>
              <p className="text-text-muted mb-4">
                Join our {discipline.name} classes and begin your martial arts journey today.
              </p>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  <Link href="/pricing">View Membership Plans</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Link href={`/classes`}>Browse Classes</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}