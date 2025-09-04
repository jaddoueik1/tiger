import { ContentBlock } from '../types';

export const contentBlocks: ContentBlock[] = [
  {
    id: '1',
    key: 'home.hero',
    locale: 'en',
    json: {
      title: 'Train Hard. Evolve Faster.',
      subtitle: 'World-class MMA, BJJ, Muay Thai, and Boxing training in a state-of-the-art facility.',
      media: {
        type: 'image',
        src: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
        alt: 'MMA training session'
      },
      ctas: [
        { label: 'Start Training', href: '/pricing', variant: 'primary' },
        { label: 'View Schedule', href: '/schedule', variant: 'outline' }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    key: 'home.services',
    locale: 'en',
    json: {
      title: 'Train in Multiple Disciplines',
      subtitle: 'Master the arts that have shaped modern combat sports',
      items: [
        {
          id: 'bjj',
          title: 'Brazilian Jiu-Jitsu',
          subtitle: 'The Gentle Art',
          description: 'Master ground fighting, submissions, and leverage-based techniques.',
          icon: 'swords',
          features: ['Fundamentals', 'Competition', 'Self-Defense'],
          href: '/classes?discipline=brazilian-jiu-jitsu',
          ctaLabel: 'Learn BJJ',
          badge: 'Most Popular'
        },
        {
          id: 'muay-thai',
          title: 'Muay Thai',
          subtitle: 'Art of Eight Limbs',
          description: 'Traditional Thai boxing using fists, elbows, knees, and shins.',
          icon: 'shieldcheck',
          features: ['Traditional', 'Conditioning', 'Sparring'],
          href: '/classes?discipline=muay-thai',
          ctaLabel: 'Train Muay Thai'
        },
        {
          id: 'boxing',
          title: 'Boxing',
          subtitle: 'Sweet Science',
          description: 'Pure punching art focusing on technique, timing, and strategy.',
          icon: 'users',
          features: ['Technique', 'Fitness', 'Competition'],
          href: '/classes?discipline=boxing',
          ctaLabel: 'Start Boxing'
        },
        {
          id: 'mma',
          title: 'Mixed Martial Arts',
          subtitle: 'Complete Fighting',
          description: 'Integrate all martial arts for the ultimate combat experience.',
          icon: 'sparkles',
          features: ['Complete System', 'Competition', 'Advanced'],
          href: '/classes?discipline=mma',
          ctaLabel: 'Train MMA'
        },
        {
          id: 'fitness',
          title: 'Fitness Classes',
          subtitle: 'Strength & Conditioning',
          description: 'Build the physical foundation for martial arts excellence.',
          icon: 'heartpulse',
          features: ['Strength', 'Cardio', 'Flexibility'],
          href: '/classes?category=fitness',
          ctaLabel: 'Get Fit'
        },
        {
          id: 'private',
          title: 'Private Training',
          subtitle: 'One-on-One',
          description: 'Personalized instruction tailored to your specific goals.',
          icon: 'badgecheck',
          features: ['Personalized', 'Flexible', 'Accelerated'],
          href: '/private-training',
          ctaLabel: 'Book Session'
        }
      ],
      cta: {
        label: 'View All Classes',
        href: '/classes'
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    key: 'home.features',
    locale: 'en',
    json: {
      title: 'Why Train With Us',
      items: [
        {
          title: 'Expert Instruction',
          description: 'Learn from world-class coaches with professional fighting and teaching experience.',
          icon: 'target'
        },
        {
          title: 'Small Class Sizes',
          description: 'Personalized attention with maximum 20 students per class for optimal learning.',
          icon: 'users'
        },
        {
          title: 'Competition Ready',
          description: 'Prepare for tournaments and fights with our competition-focused training programs.',
          icon: 'trophy'
        },
        {
          title: 'Flexible Schedule',
          description: 'Classes throughout the day to fit your busy lifestyle and training goals.',
          icon: 'clock'
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    key: 'home.testimonials',
    locale: 'en',
    json: {
      title: 'What Our Students Say',
      items: [
        {
          name: 'Sarah Chen',
          role: 'BJJ Blue Belt',
          content: 'The instruction here is incredible. I went from complete beginner to blue belt in 18 months.',
          avatar: 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg'
        },
        {
          name: 'Marcus Johnson',
          role: 'Amateur Fighter',
          content: 'Training here prepared me for my first amateur fight. The coaches really care about your progress.',
          avatar: 'https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg'
        },
        {
          name: 'Lisa Rodriguez',
          role: 'Fitness Enthusiast',
          content: 'Best workout of my life! Lost 30 pounds and gained so much confidence.',
          avatar: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg'
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    key: 'navigation.main',
    locale: 'en',
    json: {
      brand: 'Tiger Muay Thai',
      items: [
        { label: 'Home', href: '/' },
        { label: 'Classes', href: '/classes' },
        { label: 'Schedule', href: '/schedule' },
        { label: 'Coaches', href: '/coaches' },
        { label: 'Shop', href: '/shop' },
        { label: 'About', href: '/about' },
        { label: 'Pricing', href: '/pricing' }
      ],
      cta: {
        label: 'Book Trial',
        href: '/pricing'
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    key: 'footer.main',
    locale: 'en',
    json: {
      sections: [
        {
          title: 'Classes',
          links: [
            { label: 'Brazilian Jiu-Jitsu', href: '/classes?discipline=bjj' },
            { label: 'Muay Thai', href: '/classes?discipline=muay-thai' },
            { label: 'Boxing', href: '/classes?discipline=boxing' },
            { label: 'MMA', href: '/classes?discipline=mma' }
          ]
        },
        {
          title: 'Training',
          links: [
            { label: 'Class Schedule', href: '/schedule' },
            { label: 'Private Training', href: '/private-training' },
            { label: 'Our Coaches', href: '/coaches' },
            { label: 'Membership', href: '/pricing' }
          ]
        },
        {
          title: 'Support',
          links: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Policies', href: '/policies' },
            { label: 'Account', href: '/account' }
          ]
        }
      ],
      contact: {
        address: 'Beirut, Lebanon',
        phone: '+961 71 234-567',
        email: 'info@tigermuaythailb.com'
      },
      socials: [
        { platform: 'instagram', url: 'https://instagram.com/tigermuaythailb' },
        { platform: 'facebook', url: 'https://facebook.com/tigermuaythailb' },
        { platform: 'youtube', url: 'https://youtube.com/tigermuaythailb' }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    key: 'about.hero',
    locale: 'en',
    json: {
      kicker: 'Our Story',
      title: 'Dedicated to Martial Arts Excellence',
      subtitle: 'Tiger Muay Thai has been Lebanon\'s premier martial arts destination since 2015, fostering a community of dedicated athletes and martial artists.',
      media: {
        src: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
        alt: 'Tiger Muay Thai gym interior'
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    key: 'about.mission',
    locale: 'en',
    json: {
      title: 'Our Mission',
      body: [
        'At Tiger Muay Thai, we believe martial arts is more than just fighting - it\'s a way of life that builds character, discipline, and confidence.',
        'Our mission is to provide authentic, high-quality martial arts instruction in a supportive environment where students of all levels can grow and achieve their goals.'
      ],
      media: {
        src: 'https://images.pexels.com/photos/7045715/pexels-photo-7045715.jpeg',
        alt: 'Training session at Tiger Muay Thai'
      },
      cta: {
        label: 'Start Your Journey',
        href: '/pricing'
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '9',
    key: 'about.values',
    locale: 'en',
    json: {
      title: 'Our Values',
      items: [
        {
          id: 'respect',
          title: 'Respect',
          description: 'We honor the traditions of martial arts and treat everyone with dignity.',
          icon: 'shieldcheck'
        },
        {
          id: 'excellence',
          title: 'Excellence',
          description: 'We strive for the highest standards in instruction and facility management.',
          icon: 'target'
        },
        {
          id: 'community',
          title: 'Community',
          description: 'We build lasting relationships and support each other\'s growth.',
          icon: 'users'
        },
        {
          id: 'growth',
          title: 'Growth',
          description: 'We believe in continuous improvement, both physical and mental.',
          icon: 'sparkles'
        },
        {
          id: 'safety',
          title: 'Safety',
          description: 'We prioritize safe training practices and injury prevention.',
          icon: 'heartpulse'
        },
        {
          id: 'tradition',
          title: 'Tradition',
          description: 'We preserve and pass on the authentic techniques and philosophies.',
          icon: 'award'
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '10',
    key: 'about.stats',
    locale: 'en',
    json: {
      items: [
        { value: '500+', label: 'Active Members' },
        { value: '8', label: 'Expert Coaches' },
        { value: '50+', label: 'Classes per Week' },
        { value: '9', label: 'Years of Excellence' }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '11',
    key: 'about.team',
    locale: 'en',
    json: {
      title: 'Meet Our Team',
      items: [
        {
          id: 'founder',
          name: 'Ahmad Khalil',
          role: 'Founder & Head Coach',
          photo: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
          specialties: ['Muay Thai', 'Leadership', 'Business'],
          socials: [
            { platform: 'instagram', url: 'https://instagram.com/ahmadkhalil' },
            { platform: 'linkedin', url: 'https://linkedin.com/in/ahmadkhalil' }
          ]
        },
        {
          id: 'manager',
          name: 'Fatima Nassar',
          role: 'Operations Manager',
          photo: 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg',
          specialties: ['Operations', 'Customer Service', 'Events'],
          socials: [
            { platform: 'instagram', url: 'https://instagram.com/fatimanassar' }
          ]
        },
        {
          id: 'trainer',
          name: 'Omar Fares',
          role: 'Senior Trainer',
          photo: 'https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg',
          specialties: ['Boxing', 'Conditioning', 'Youth Programs'],
          socials: [
            { platform: 'instagram', url: 'https://instagram.com/omarfares' }
          ]
        }
      ],
      cta: {
        label: 'Join Our Team',
        href: '/careers'
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '12',
    key: 'about.timeline',
    locale: 'en',
    json: {
      title: 'Our Journey',
      items: [
        {
          id: '2015',
          date: '2015',
          title: 'Tiger Muay Thai Founded',
          description: 'Started with a small gym and big dreams to bring authentic martial arts to Lebanon.'
        },
        {
          id: '2017',
          date: '2017',
          title: 'Expanded Facilities',
          description: 'Moved to our current location with dedicated areas for different disciplines.'
        },
        {
          id: '2019',
          date: '2019',
          title: 'Competition Team',
          description: 'Launched our competition team with fighters competing nationally and internationally.'
        },
        {
          id: '2021',
          date: '2021',
          title: 'Digital Innovation',
          description: 'Introduced online booking, virtual classes, and modern training technology.'
        },
        {
          id: '2023',
          date: '2023',
          title: 'Community Outreach',
          description: 'Started youth programs and community self-defense workshops.'
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '13',
    key: 'about.cta',
    locale: 'en',
    json: {
      title: 'Ready to Start Your Journey?',
      subtitle: 'Join hundreds of students who have transformed their lives through martial arts.',
      cta: {
        label: 'Book Your Trial Class',
        href: '/pricing'
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '14',
    key: 'checkout.page',
    locale: 'en',
    json: {
      title: 'Complete Your Order',
      subtitle: 'Fill in your details to place your order via WhatsApp',
      fields: {
        name: 'Full name',
        email: 'Email address',
        phone: 'Phone number',
        address: 'Delivery address',
        note: 'Special instructions (optional)'
      },
      summary: {
        title: 'Order Summary',
        empty: 'Your cart is empty',
        total: 'Total'
      },
      actions: {
        placeOrder: 'Place Order via WhatsApp'
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];