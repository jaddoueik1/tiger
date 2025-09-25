import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'Tiger Muay Thai - Home',
  description: 'World-class MMA, BJJ, Muay Thai, and Boxing training in a state-of-the-art facility.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Features />
      <Testimonials />
    </div>
  );
}