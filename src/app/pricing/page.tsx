'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useMembershipPlans, useWhatsAppOrder } from '@/hooks/useApi';
import Button from '@/components/ui/Button';
import MembershipModal, { MembershipFormData } from '@/components/MembershipModal';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const { data: plansData, isLoading } = useMembershipPlans();
  const { placeOrder, isPlacing, config, isConfigLoading } = useWhatsAppOrder();

  const handleStartMembership = (plan: any) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleMembershipSubmit = async (formData: MembershipFormData) => {
    if (!config?.phoneE164) {
      alert('WhatsApp contact number is not configured.');
      return;
    }

    if (formData.paymentMethod === 'cash') {
      const message = `Hello! I'd like to start a membership.

💪 *Membership Details:*
Plan: ${selectedPlan.name}
Price: $${selectedPlan.price}/${selectedPlan.period}

👤 *Contact Information:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

💰 *Payment Method:* Cash (pay at gym)

📋 *Plan Benefits:*
${selectedPlan.benefits.map((benefit: string) => `• ${benefit}`).join('\n')}

Please let me know the next steps to get started with my membership!`;

      const phoneDigits = config.phoneE164.replace(/[^\d]/g, '');
      const whatsappUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      setModalOpen(false);
      setSelectedPlan(null);
    } else {
      alert('Card payment coming soon!');
    }
  };
  
  if (isLoading) {
    return (
      <>
        <Head>
          <title>Tiger Muay Thai - Membership Plans</title>
          <meta name="description" content="Choose the perfect membership plan for your training goals. All plans include access to our world-class facilities." />
        </Head>
        <div className="min-h-screen bg-bg py-20">
          <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-16 bg-gray-300 rounded-lg w-80 mx-auto mb-4" />
            <div className="h-6 bg-gray-300 rounded w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-64 bg-gray-300 rounded mb-4" />
              </div>
            ))}
          </div>
          </div>
        </div>
      </>
    );
  }

  const membershipPlans = plansData?.data || [];

  return (
    <>
      <Head>
        <title>Tiger Muay Thai - Membership Plans</title>
        <meta name="description" content="Choose the perfect membership plan for your training goals. All plans include access to our world-class facilities." />
      </Head>
      <div className="min-h-screen bg-bg py-20">
        <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-text mb-4">
            Membership Plans
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Choose the perfect plan for your training goals. All plans include access to our world-class facilities.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative card group hover:shadow-2xl transition-all duration-300 ${
                plan.isPopular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-text mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">${plan.price}</span>
                  <span className="text-text-muted">/{plan.period}</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {plan.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-muted">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                variant={plan.isPopular ? 'primary' : 'outline'}
                className="w-full"
                size="lg"
                onClick={() => handleStartMembership(plan)}
              >
                {plan.name === 'Drop-In' ? 'Inquire About Drop-In' : 'Start Membership'}
              </Button>

              {/* Terms */}
              <p className="text-xs text-text-muted mt-4 leading-relaxed">
                {plan.terms}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-text text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'Can I freeze my membership?',
                a: 'Yes, you can freeze your membership for up to 3 months per year with 48 hours notice.'
              },
              {
                q: 'What equipment is provided?',
                a: 'We provide all mats, bags, and basic equipment. You just need to bring workout clothes and water.'
              },
              {
                q: 'Are there beginner-friendly classes?',
                a: 'Absolutely! We offer fundamentals classes in all disciplines specifically designed for beginners.'
              }
            ].map((faq, index) => (
              <div key={index} className="card">
                <h4 className="text-lg font-semibold text-text mb-2">{faq.q}</h4>
                <p className="text-text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
        </div>
        
        {/* Membership Modal */}
        {selectedPlan && (
          <MembershipModal
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setSelectedPlan(null);
            }}
            plan={selectedPlan}
            onSubmit={handleMembershipSubmit}
            isSubmitting={isPlacing}
          />
        )}
      </div>
    </>
  );
}