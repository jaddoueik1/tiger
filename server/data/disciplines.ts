import { ClassDiscipline } from '../types';

export const disciplines: ClassDiscipline[] = [
  {
    id: '1',
    slug: 'brazilian-jiu-jitsu',
    name: 'Brazilian Jiu-Jitsu',
    description: 'The gentle art focusing on ground fighting, submissions, and leverage over strength.',
    tags: ['grappling', 'submissions', 'ground-fighting', 'self-defense'],
    media: [
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/7045715/pexels-photo-7045715.jpeg',
        alt: 'BJJ training session'
      }
    ]
  },
  {
    id: '2',
    slug: 'muay-thai',
    name: 'Muay Thai',
    description: 'The art of eight limbs - using fists, elbows, knees, and shins in devastating combinations.',
    tags: ['striking', 'clinch', 'conditioning', 'traditional'],
    media: [
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
        alt: 'Muay Thai training'
      }
    ]
  },
  {
    id: '3',
    slug: 'boxing',
    name: 'Boxing',
    description: 'The sweet science of punching - footwork, head movement, and precision striking.',
    tags: ['punching', 'footwork', 'conditioning', 'competition'],
    media: [
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg',
        alt: 'Boxing training'
      }
    ]
  },
  {
    id: '4',
    slug: 'mma',
    name: 'Mixed Martial Arts',
    description: 'The ultimate combat sport combining striking, grappling, and ground fighting.',
    tags: ['mixed', 'competition', 'complete', 'advanced'],
    media: [
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg',
        alt: 'MMA training'
      }
    ]
  }
];