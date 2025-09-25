import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';

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