import { ClassSession, SessionStatus } from '../types';

// Generate sessions for the next 7 days
const generateSessions = (): ClassSession[] => {
  const sessions: ClassSession[] = [];
  const now = new Date();
  
  // Session templates with times
  const sessionTemplates = [
    { templateId: '1', coachId: '1', time: '09:00', capacity: 20 }, // BJJ Fundamentals
    { templateId: '3', coachId: '2', time: '10:30', capacity: 15 }, // Muay Thai Basics
    { templateId: '5', coachId: '3', time: '18:00', capacity: 12 }, // Boxing Fundamentals
    { templateId: '2', coachId: '1', time: '19:30', capacity: 16 }, // Advanced BJJ
    { templateId: '4', coachId: '2', time: '20:00', capacity: 12 }, // Muay Thai Sparring
    { templateId: '6', coachId: '4', time: '17:00', capacity: 10 }, // MMA Fundamentals
  ];
  
  // Generate for next 7 days
  for (let day = 0; day < 7; day++) {
    const date = new Date(now);
    date.setDate(date.getDate() + day);
    
    sessionTemplates.forEach((template, index) => {
      const [hours, minutes] = template.time.split(':').map(Number);
      const startAt = new Date(date);
      startAt.setHours(hours, minutes, 0, 0);
      
      const endAt = new Date(startAt);
      endAt.setHours(startAt.getHours() + 1, startAt.getMinutes() + 30);
      
      // Skip past sessions
      if (startAt <= now) return;
      
      const sessionId = `${template.templateId}-${day}-${index}`;
      const bookedCount = Math.floor(Math.random() * (template.capacity * 0.8));
      
      sessions.push({
        id: sessionId,
        templateId: template.templateId,
        coachId: template.coachId,
        locationId: '1',
        room: `Training Room ${(index % 3) + 1}`,
        startAt,
        endAt,
        capacity: template.capacity,
        bookedCount,
        waitlist: [],
        status: SessionStatus.SCHEDULED
      });
    });
  }
  
  return sessions.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
};

export const sessions = generateSessions();