import { ClassTemplate, ClassLevel } from '../types';

export const templates: ClassTemplate[] = [
  {
    id: '1',
    disciplineId: '1', // BJJ
    title: 'BJJ Fundamentals',
    level: ClassLevel.BEGINNER,
    durationMin: 60,
    description: 'Learn the basic positions, escapes, and submissions of Brazilian Jiu-Jitsu in a supportive environment.',
    gearNeeded: ['Gi', 'Belt'],
    coachIds: ['1'],
    price: 25,
    prerequisites: []
  },
  {
    id: '2',
    disciplineId: '1', // BJJ
    title: 'Advanced BJJ',
    level: ClassLevel.ADVANCED,
    durationMin: 90,
    description: 'High-level techniques, competition preparation, and advanced sparring for experienced practitioners.',
    gearNeeded: ['Gi', 'Belt'],
    coachIds: ['1'],
    price: 35,
    prerequisites: ['Blue belt or equivalent experience']
  },
  {
    id: '3',
    disciplineId: '2', // Muay Thai
    title: 'Muay Thai Basics',
    level: ClassLevel.BEGINNER,
    durationMin: 60,
    description: 'Introduction to the art of eight limbs - basic strikes, stance, and pad work.',
    gearNeeded: ['Hand wraps', 'Gloves'],
    coachIds: ['2'],
    price: 25,
    prerequisites: []
  },
  {
    id: '4',
    disciplineId: '2', // Muay Thai
    title: 'Muay Thai Sparring',
    level: ClassLevel.INTERMEDIATE,
    durationMin: 75,
    description: 'Controlled sparring sessions to apply techniques in a safe, supervised environment.',
    gearNeeded: ['Hand wraps', 'Gloves', 'Shin guards', 'Mouthguard'],
    coachIds: ['2'],
    price: 30,
    prerequisites: ['3+ months Muay Thai experience']
  },
  {
    id: '5',
    disciplineId: '3', // Boxing
    title: 'Boxing Fundamentals',
    level: ClassLevel.BEGINNER,
    durationMin: 60,
    description: 'Master the sweet science - proper stance, footwork, and the fundamental punches.',
    gearNeeded: ['Hand wraps', 'Boxing gloves'],
    coachIds: ['3'],
    price: 25,
    prerequisites: []
  },
  {
    id: '6',
    disciplineId: '4', // MMA
    title: 'MMA Fundamentals',
    level: ClassLevel.INTERMEDIATE,
    durationMin: 90,
    description: 'Integrate striking and grappling techniques for mixed martial arts competition.',
    gearNeeded: ['MMA gloves', 'Mouthguard', 'Shin guards'],
    coachIds: ['4'],
    price: 40,
    prerequisites: ['Basic striking and grappling experience']
  }
];