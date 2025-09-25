import Head from 'next/head';
import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Tiger Muay Thai - Home</title>
        <meta name="description" content="World-class MMA, BJJ, Muay Thai, and Boxing training in a state-of-the-art facility." />
      </Head>
      <div className="min-h-screen">
        <Hero />
        <Services />
        <Features />
        <Testimonials />
      </div>
    </>
  );
}