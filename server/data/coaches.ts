import { Coach } from '../types';

export const coaches: Coach[] = [
  {
    id: '1',
    name: 'Rafael Silva',
    bio: 'Black belt in Brazilian Jiu-Jitsu with over 15 years of experience. Former IBJJF World Champion and passionate about teaching the fundamentals.',
    accolades: [
      'IBJJF World Champion 2018',
      'Pan American Champion 2017, 2019',
      'Black Belt under Marcelo Garcia',
      '15+ years teaching experience'
    ],
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/rafaelsilvabjj' }
    ],
    photo: 'https://images.pexels.com/photos/7045715/pexels-photo-7045715.jpeg',
    specialties: ['Brazilian Jiu-Jitsu', 'Grappling', 'Self-Defense'],
    availabilityRules: [
      {
        dayOfWeek: 1, // Monday
        startTime: '09:00',
        endTime: '17:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      },
      {
        dayOfWeek: 3, // Wednesday
        startTime: '09:00',
        endTime: '17:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      },
      {
        dayOfWeek: 5, // Friday
        startTime: '09:00',
        endTime: '17:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      }
    ],
    hourlyRate: 120,
    isActive: true
  },
  {
    id: '2',
    name: 'Kru Sirisak',
    bio: 'Traditional Muay Thai master from Thailand with over 20 years of fighting and teaching experience. Brings authentic techniques and cultural knowledge.',
    accolades: [
      'Lumpinee Stadium Champion',
      'Rajadamnern Stadium Champion',
      '150+ professional fights',
      'Certified Kru (Master Teacher)'
    ],
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/krusirisak' }
    ],
    photo: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
    specialties: ['Muay Thai', 'Traditional Techniques', 'Clinch Work'],
    availabilityRules: [
      {
        dayOfWeek: 2, // Tuesday
        startTime: '10:00',
        endTime: '18:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      },
      {
        dayOfWeek: 4, // Thursday
        startTime: '10:00',
        endTime: '18:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      },
      {
        dayOfWeek: 6, // Saturday
        startTime: '08:00',
        endTime: '16:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      }
    ],
    hourlyRate: 100,
    isActive: true
  },
  {
    id: '3',
    name: 'Mike Thompson',
    bio: 'Professional boxer and certified personal trainer specializing in technique, conditioning, and mental preparation for competition.',
    accolades: [
      'Golden Gloves Champion',
      'Regional Professional Champion',
      'USA Boxing Certified Coach',
      '10+ years professional experience'
    ],
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/mikethompsonboxing' }
    ],
    photo: 'https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg',
    specialties: ['Boxing', 'Conditioning', 'Competition Prep'],
    availabilityRules: [
      {
        dayOfWeek: 1, // Monday
        startTime: '14:00',
        endTime: '20:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      },
      {
        dayOfWeek: 3, // Wednesday
        startTime: '14:00',
        endTime: '20:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      },
      {
        dayOfWeek: 5, // Friday
        startTime: '14:00',
        endTime: '20:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      }
    ],
    hourlyRate: 90,
    isActive: true
  },
  {
    id: '4',
    name: 'Amanda Rodriguez',
    bio: 'Former UFC fighter and MMA coach with expertise in all aspects of mixed martial arts. Specializes in helping fighters transition between disciplines.',
    accolades: [
      'Former UFC Fighter',
      'Invicta FC Champion',
      'Black Belt BJJ',
      'Professional MMA Record: 12-3'
    ],
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/amandarodriguezmma' }
    ],
    photo: 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg',
    specialties: ['MMA', 'Women\'s Training', 'Competition'],
    availabilityRules: [
      {
        dayOfWeek: 2, // Tuesday
        startTime: '16:00',
        endTime: '21:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      },
      {
        dayOfWeek: 4, // Thursday
        startTime: '16:00',
        endTime: '21:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      },
      {
        dayOfWeek: 0, // Sunday
        startTime: '10:00',
        endTime: '15:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      }
    ],
    hourlyRate: 150,
    isActive: true
  },
  {
    id: '5',
    name: 'Carlos Mendez',
    bio: 'Strength and conditioning specialist with a background in combat sports. Focuses on functional fitness and injury prevention.',
    accolades: [
      'CSCS Certified',
      'Former Professional Fighter',
      'Sports Medicine Background',
      'Functional Movement Specialist'
    ],
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/carlosmendezfit' }
    ],
    photo: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
    specialties: ['Strength Training', 'Conditioning', 'Injury Prevention'],
    availabilityRules: [
      {
        dayOfWeek: 1, // Monday
        startTime: '06:00',
        endTime: '12:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      },
      {
        dayOfWeek: 3, // Wednesday
        startTime: '06:00',
        endTime: '12:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      },
      {
        dayOfWeek: 5, // Friday
        startTime: '06:00',
        endTime: '12:00',
        bufferMinutes: 15,
        leadTimeHours: 24
      }
    ],
    hourlyRate: 80,
    isActive: true
  }
];