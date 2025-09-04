import { MembershipPlan, BillingPeriod } from '../types';

export const membershipPlans: MembershipPlan[] = [
  {
    id: '1',
    name: 'Drop-In',
    price: 25,
    currency: 'USD',
    period: BillingPeriod.MONTHLY,
    benefits: [
      'Access to any single class',
      'Use of basic equipment',
      'Shower facilities',
      'No commitment required'
    ],
    maxClassesPerPeriod: 1,
    classAccess: ['all'],
    terms: 'Valid for one class only. Must be used within 30 days of purchase.',
    isPopular: false
  },
  {
    id: '2',
    name: 'Monthly Unlimited',
    price: 149,
    currency: 'USD',
    period: BillingPeriod.MONTHLY,
    benefits: [
      'Unlimited classes',
      'All equipment included',
      'Shower and locker facilities',
      'Guest pass (1 per month)',
      'Nutrition consultation'
    ],
    classAccess: ['all'],
    terms: 'Auto-renews monthly. Cancel anytime with 30 days notice. Freeze option available.',
    isPopular: true
  },
  {
    id: '3',
    name: 'Annual Membership',
    price: 1299,
    currency: 'USD',
    period: BillingPeriod.YEARLY,
    benefits: [
      'Unlimited classes',
      'All equipment included',
      'Priority booking',
      'Free private session (monthly)',
      'Merchandise discount (20%)',
      'Guest passes (2 per month)',
      'Nutrition and meal planning'
    ],
    classAccess: ['all'],
    terms: 'Paid annually. Best value option. Includes 2 months free compared to monthly.',
    isPopular: false
  }
];