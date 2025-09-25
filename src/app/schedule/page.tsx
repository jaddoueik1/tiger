'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, Users, MapPin } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import { useClassSessions, useCoaches } from '@/hooks/useApi';
import Button from '@/components/ui/Button';

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get coaches for selection
  const { data: coachesData } = useCoaches();
  const coaches = coachesData?.data || [];

  // Get class sessions (non-private booked sessions)
  const { data: sessionsData, isLoading } = useClassSessions({
    date: selectedDate,
  });
  const sessions = sessionsData?.data || [];

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const getSessionsForDay = (date: Date) => {
    return sessions.filter((session: any) =>
      isSameDay(parseISO(session.sessionDate), date)
    );
  };

  const goToPrevWeek = () => setCurrentWeek(addDays(currentWeek, -7));
  const goToNextWeek = () => setCurrentWeek(addDays(currentWeek, 7));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-300 rounded-lg mb-8" />
            <div className="grid grid-cols-7 gap-4 mb-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded-lg" />
              ))}
            </div>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-300 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-text mb-4">
            Class Schedule
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Book your spot in upcoming classes. Real-time availability and instant confirmation.
          </p>
        </motion.div>

        {/* Week Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface rounded-xl p-6 mb-8 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevWeek}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </Button>
            
            <h2 className="text-xl font-semibold text-text">
              Week of {format(currentWeek, 'MMMM d, yyyy')}
            </h2>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextWeek}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day) => (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`p-3 rounded-lg text-center transition-colors ${
                  isSameDay(day, selectedDate)
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 text-text'
                }`}
              >
                <div className="text-sm font-medium">
                  {format(day, 'EEE')}
                </div>
                <div className="text-lg font-bold">
                  {format(day, 'd')}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sessions for Selected Day */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-text mb-6">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h3>

          {getSessionsForDay(selectedDate).length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getSessionsForDay(selectedDate).map((session: any, index: number) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card group hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                        {session.name || 'Group Class'}
                      </h4>
                      <p className="text-primary font-medium">Group Session</p>
                    </div>
                    {session.repetition && (
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {session.repetition}
                      </span>
                    )}
                  </div>

                  {session.templateId && (
                    <p className="text-text-muted mb-6 leading-relaxed">
                      Regular group training session
                    </p>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-text-muted" />
                      <span className="text-text">
                        {format(parseISO(session.sessionDate), 'h:mm a')}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-text-muted" />
                      <span className="text-text">
                        {session.coach?.name || 'Instructor'}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="primary"
                    className="w-full"
                  >
                    Book Now
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <p className="text-text-muted text-lg">
                No classes scheduled for this day.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}