import { AnimatePresence, motion } from 'framer-motion';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, X, User, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';

interface CoachCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  coachId: string;
  coachName: string;
  bookedSessions: any[];
}

export default function CoachCalendarModal({ 
  isOpen, 
  onClose, 
  coachId, 
  coachName, 
  bookedSessions 
}: CoachCalendarModalProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getSessionsForDay = (date: Date) => {
    return bookedSessions.filter((session: any) =>
      isSameDay(parseISO(session.sessionDate), date)
    );
  };

  const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const selectedDaySessions = selectedDate ? getSessionsForDay(selectedDate) : [];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-surface rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-text">{coachName}'s Schedule</h2>
              <p className="text-text-muted">View all sessions and availability</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex h-[600px]">
            {/* Calendar */}
            <div className="flex-1 p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={goToPrevMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <h3 className="text-xl font-semibold">
                  {format(currentDate, 'MMMM yyyy')}
                </h3>
                
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-text-muted">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {calendarDays.map((day) => {
                  const daySessions = getSessionsForDay(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const hasPrivate = daySessions.some((s: any) => s.isPrivate);
                  const hasPublic = daySessions.some((s: any) => !s.isPrivate);

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`
                        p-2 min-h-[60px] text-left rounded-lg transition-colors relative
                        ${!isCurrentMonth ? 'text-gray-400' : 'text-text'}
                        ${isSelected ? 'bg-primary text-white' : 'hover:bg-gray-100'}
                        ${daySession.length > 0 ? 'font-medium' : ''}
                      `}
                    >
                      <div className="text-sm">{format(day, 'd')}</div>
                      
                      {/* Session indicators */}
                      <div className="mt-1 space-y-1">
                        {hasPublic && (
                          <div className={`text-xs px-1 py-0.5 rounded ${
                            isSelected ? 'bg-white/20' : 'bg-accent/20 text-accent'
                          }`}>
                            Class
                          </div>
                        )}
                        {hasPrivate && (
                          <div className={`text-xs px-1 py-0.5 rounded ${
                            isSelected ? 'bg-white/20' : 'bg-primary/20 text-primary'
                          }`}>
                            Private
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Session Details Sidebar */}
            <div className="w-80 border-l border-gray-200 p-6 bg-gray-50">
              {selectedDate ? (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-text">
                      {format(selectedDate, 'EEEE, MMMM d')}
                    </h4>
                  </div>

                  {selectedDaySessions.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDaySessions.map((session: any, index: number) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-text">
                              {session.isPrivate ? 'Private Session' : session.name || 'Group Class'}
                            </h5>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              session.isPrivate 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-accent/10 text-accent'
                            }`}>
                              {session.isPrivate ? 'Private' : 'Group'}
                            </span>
                          </div>

                          <div className="space-y-1 text-sm text-text-muted">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>
                                {format(parseISO(session.sessionDate), 'h:mm a')}
                              </span>
                            </div>
                            
                            {session.repetition && (
                              <div className="flex items-center space-x-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span className="capitalize">{session.repetition}</span>
                              </div>
                            )}

                            {!session.isPrivate && session.templateId && (
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>Group Class</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-text-muted">No sessions scheduled</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-text-muted">Select a date to view sessions</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}