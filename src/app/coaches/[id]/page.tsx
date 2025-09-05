'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft,
  Calendar,
  Clock,
  Star,
  Award,
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Users,
  Target,
  Shield,
  Zap
} from 'lucide-react';
import { useCoach, useCoachAvailability, useClassSessions } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import { format, addDays, parseISO, isSameDay, startOfWeek } from 'date-fns';

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

const specialtyIcons = {
  'muay thai': Target,
  'boxing': Shield,
  'bjj': Zap,
  'mma': Award,
  'kickboxing': Target,
  'wrestling': Shield,
};

export default function CoachProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [selectedWeek, setSelectedWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  const coachId = params.id as string;
  
  // Get coach details
  const { data: coachData, isLoading: coachLoading } = useCoach(coachId);
  const coach = coachData?.data;
  
  // Get coach availability for the selected week
  const fromDate = format(selectedWeek, 'yyyy-MM-dd');
  const toDate = format(addDays(selectedWeek, 6), 'yyyy-MM-dd');
  
  const { data: availabilityData, isLoading: availabilityLoading } = useCoachAvailability(
    coachId,
    fromDate,
    toDate
  );
  
  // Get upcoming classes taught by this coach
  const { data: sessionsData, isLoading: sessionsLoading } = useClassSessions({
    coachId,
    from: format(new Date(), 'yyyy-MM-dd'),
    to: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
  });
  
  const availability = availabilityData?.data || [];
  const upcomingSessions = sessionsData?.data || [];
  
  if (coachLoading) {
    return (
      <div className="min-h-screen bg-bg py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-300 rounded w-32" />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="h-80 bg-gray-300 rounded-xl" />
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
    );
  }

  if (!coach) {
    return (
      <div className="min-h-screen bg-bg py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-text mb-4">Coach Not Found</h1>
          <p className="text-text-muted mb-8">The coach you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/coaches')}>
            Back to Coaches
          </Button>
        </div>
      </div>
    );
  }

  const handleBookPrivate = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    router.push(`/private-training?coach=${coachId}`);
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(selectedWeek, i));

  return (
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
          <span>Back to Coaches</span>
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
              {/* Coach Photo */}
              <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                <img
                  src={coach.photo}
                  alt={coach.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {coach.specialties?.slice(0, 3).map((specialty: string) => (
                      <span
                        key={specialty}
                        className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {coach.name}
                  </h1>
                  <p className="text-white/90 text-lg">
                    Professional Martial Arts Instructor
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="card text-center">
                  <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-text-muted">Experience</div>
                  <div className="font-semibold">10+ Years</div>
                </div>
                <div className="card text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-text-muted">Students</div>
                  <div className="font-semibold">500+</div>
                </div>
                <div className="card text-center">
                  <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-text-muted">Rating</div>
                  <div className="font-semibold">4.9/5</div>
                </div>
                <div className="card text-center">
                  <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-text-muted">Classes</div>
                  <div className="font-semibold">{upcomingSessions.length} upcoming</div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-text mb-4">About {coach.name}</h2>
              <p className="text-text-muted leading-relaxed mb-6">
                {coach.bio}
              </p>
              
              {/* Specialties */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text mb-4">Specialties</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {coach.specialties?.map((specialty: string, index: number) => {
                    const IconComponent = specialtyIcons[specialty.toLowerCase() as keyof typeof specialtyIcons] || Target;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-surface rounded-lg border">
                        <IconComponent className="w-5 h-5 text-accent" />
                        <span className="text-text font-medium">{specialty}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              {coach.socials && coach.socials.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-text mb-4">Follow {coach.name}</h3>
                  <div className="flex space-x-4">
                    {coach.socials.map((social: any) => {
                      const IconComponent = socialIcons[social.platform as keyof typeof socialIcons];
                      if (!IconComponent) return null;

                      return (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-colors border"
                        >
                          <IconComponent className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Accolades */}
            {coach.accolades && coach.accolades.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <h2 className="text-2xl font-bold text-text mb-6">Achievements & Accolades</h2>
                <div className="space-y-4">
                  {coach.accolades.map((accolade: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span className="text-text-muted">{accolade}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Upcoming Classes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-text mb-6">Upcoming Classes</h2>
              
              {sessionsLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-300 rounded-lg" />
                    </div>
                  ))}
                </div>
              ) : upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.slice(0, 5).map((session: any) => (
                    <div
                      key={session.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-text">{session.template?.title}</h4>
                          <p className="text-sm text-primary">{session.discipline?.name}</p>
                        </div>
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                          {session.template?.level?.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-text-muted">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{format(parseISO(session.startAt), 'EEE, MMM d')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>
                            {format(parseISO(session.startAt), 'h:mm a')} - {format(parseISO(session.endAt), 'h:mm a')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{session.room}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted">No upcoming classes scheduled.</p>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Private Session */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-text mb-4">Private Training</h3>
              <p className="text-text-muted mb-4">
                Get personalized one-on-one training with {coach.name} to accelerate your progress.
              </p>
              
              {coach.hourlyRate && (
                <div className="mb-4 p-3 bg-surface rounded-lg border">
                  <div className="text-sm text-text-muted">Hourly Rate</div>
                  <div className="text-xl font-bold text-text">${coach.hourlyRate}</div>
                </div>
              )}
              
              <Button
                variant="primary"
                className="w-full"
                onClick={handleBookPrivate}
              >
                Book Private Session
              </Button>
            </motion.div>

            {/* Availability This Week */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-text mb-4">
                Availability - Week of {format(selectedWeek, 'MMM d')}
              </h3>
              
              {availabilityLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-8 bg-gray-300 rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {weekDays.map((day) => {
                    const dayAvailability = availability.filter((slot: any) =>
                      isSameDay(parseISO(slot.startAt), day)
                    );
                    
                    return (
                      <div key={day.toISOString()} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-sm font-medium">
                          {format(day, 'EEE, MMM d')}
                        </span>
                        <span className="text-xs text-text-muted">
                          {dayAvailability.length > 0 
                            ? `${dayAvailability.length} slots`
                            : 'Unavailable'
                          }
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <Button variant="outline" className="w-full mt-4">
                View Full Calendar
              </Button>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-text mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-muted">Available through gym</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-muted">Book through our system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-muted">Tiger Muay Thai Gym</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}