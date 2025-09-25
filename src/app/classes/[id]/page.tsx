'use client';

import Button from '@/components/ui/Button';
import { useClassSessions, useClassTemplate, useCoach } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import {
    Award,
    Calendar,
    ChevronLeft,
    Clock,
    Heart,
    Shield,
    Star,
    Target,
    Users,
    Zap
} from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800', 
  advanced: 'bg-red-100 text-red-800',
  all_levels: 'bg-blue-100 text-blue-800',
};

const benefitIcons = {
  strength: Target,
  cardio: Heart,
  flexibility: Zap,
  technique: Award,
  defense: Shield,
};

export default function ClassDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const classId = params.id as string;
  
  // Get class template details
  const { data: classData, isLoading: classLoading } = useClassTemplate(classId);
  const classTemplate = classData?.data;
  
  // Get coach details if available
  const coachId = classTemplate?.coachIds?.[0];
  const { data: coachData } = useCoach(coachId || '');
  const coach = coachData?.data;
  
  // Get class sessions for this template
  const { data: sessionsData, isLoading: sessionsLoading } = useClassSessions();
  const allSessions = sessionsData?.data || [];
  
  // Filter sessions for this specific template and coach
  const sessions = allSessions.filter((session: any) => 
    session.templateId === classId || 
    (session.coach?.id === coachId && !session.isPrivate)
  );
  
  if (classLoading) {
    return (
      <>
        <Head>
          <title>Tiger Muay Thai - Class Details</title>
          <meta name="description" content="View class details, schedule, and book your spot." />
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

  if (!classTemplate) {
    return (
      <>
        <Head>
          <title>Tiger Muay Thai - Class Not Found</title>
          <meta name="description" content="The class you're looking for doesn't exist." />
        </Head>
        <div className="min-h-screen bg-bg py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-text mb-4">Class Not Found</h1>
          <p className="text-text-muted mb-8">The class you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/classes')}>
            Back to Classes
          </Button>
          </div>
        </div>
      </>
    );
  }

  const handleBookClass = (sessionId: string) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    // Handle booking logic here
    console.log('Booking session:', sessionId);
  };

  const className = classTemplate.title || 'Class';

  return (
    <>
      <Head>
        <title>Tiger Muay Thai - {className}</title>
        <meta name="description" content={`${className} details, schedule, and booking information at Tiger Muay Thai.`} />
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
          <span>Back to Classes</span>
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
              {/* Class Image */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
                <img
                  src={classTemplate.discipline?.media?.[0]?.src || 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg'}
                  alt={classTemplate.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      difficultyColors[classTemplate.level as keyof typeof difficultyColors] || difficultyColors.all_levels
                    }`}>
                      {classTemplate.level?.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {classTemplate.discipline?.name}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {classTemplate.title}
                  </h1>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="card text-center">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-text-muted">Duration</div>
                  <div className="font-semibold">{classTemplate.durationMin} min</div>
                </div>
                <div className="card text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-text-muted">Class Size</div>
                  <div className="font-semibold">Max 20</div>
                </div>
                <div className="card text-center">
                  <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-text-muted">Rating</div>
                  <div className="font-semibold">4.8/5</div>
                </div>
                <div className="card text-center">
                  <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-text-muted">Sessions</div>
                  <div className="font-semibold">{sessions.length} upcoming</div>
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
              <h2 className="text-2xl font-bold text-text mb-4">About This Class</h2>
              <p className="text-text-muted leading-relaxed mb-6">
                {classTemplate.description}
              </p>
              
              {/* Benefits */}
              {classTemplate.benefits && (
                <div>
                  <h3 className="text-lg font-semibold text-text mb-4">What You'll Gain</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {classTemplate.benefits.map((benefit: string, index: number) => {
                      const IconComponent = benefitIcons[benefit.toLowerCase() as keyof typeof benefitIcons] || Target;
                      return (
                        <div key={index} className="flex items-center space-x-3">
                          <IconComponent className="w-5 h-5 text-accent" />
                          <span className="text-text capitalize">{benefit}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Prerequisites & Gear */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Prerequisites */}
              {classTemplate.prerequisites && classTemplate.prerequisites.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {classTemplate.prerequisites.map((prereq: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-text-muted">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gear Needed */}
              {classTemplate.gearNeeded && classTemplate.gearNeeded.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-text mb-4">What to Bring</h3>
                  <ul className="space-y-2">
                    {classTemplate.gearNeeded.map((gear: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span className="text-text-muted">{gear}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coach Info */}
            {coach && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-text mb-4">Your Instructor</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={coach.photo}
                    alt={coach.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-text">{coach.name}</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {coach.specialties?.slice(0, 2).map((specialty: string) => (
                        <span
                          key={specialty}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-muted mb-4 line-clamp-3">
                  {coach.bio}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Link href={`/coaches/${coach.id}`}>
                    View Coach Profile
                  </Link>
                </Button>
              </motion.div>
            )}

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-text mb-4">Pricing</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Drop-in</span>
                  <span className="font-semibold text-text">$25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Class Pack (10)</span>
                  <span className="font-semibold text-text">$200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Monthly Unlimited</span>
                  <span className="font-semibold text-text">$150</span>
                </div>
              </div>
            </motion.div>
              
          </div>
        </div>
        </div>
      </div>
    </>
  );
}