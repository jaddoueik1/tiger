'use client';

import Button from '@/components/ui/Button';
import Head from 'next/head';
import { useCoaches, useWhatsAppOrder } from '@/hooks/useApi';
import { usePrivateSessionBooking } from '@/hooks/useApi';
import PrivateSessionBookingModal, { BookingFormData } from '@/components/PrivateSessionBookingModal';
import { motion } from 'framer-motion';
import { Award, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CoachesPage() {
    const { data: coachesData, isLoading } = useCoaches();
    const { bookPrivateSession, isBooking } = usePrivateSessionBooking();
    const [selectedCoach, setSelectedCoach] = useState<any>(null);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);

    const handleBookPrivate = (coach: any) => {
        setSelectedCoach(coach);
        setBookingModalOpen(true);
    };

    const handleBookingSubmit = async (bookingData: BookingFormData) => {
        try {
            await bookPrivateSession({
                coachName: selectedCoach?.name || 'Coach',
                name: bookingData.name,
                email: bookingData.email,
                phone: bookingData.phone,
                preferredDate: bookingData.preferredDate,
                preferredTime: bookingData.preferredTime,
                notes: bookingData.notes,
                hourlyRate: selectedCoach?.hourlyRate,
            });
            
            setBookingModalOpen(false);
            setSelectedCoach(null);
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Booking failed. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <>
                <Head>
                    <title>Tiger Muay Thai - Our Coaches</title>
                    <meta name="description" content="Train with world-class instructors who have competed at the highest levels and are passionate about teaching." />
                </Head>
                <div className="min-h-screen bg-bg py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16 animate-pulse">
                        <div className="h-16 bg-gray-300 rounded-lg w-80 mx-auto mb-4" />
                        <div className="h-6 bg-gray-300 rounded w-96 mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="card animate-pulse">
                                <div className="w-full h-64 bg-gray-300 rounded-lg mb-6" />
                                <div className="h-6 bg-gray-300 rounded mb-4" />
                                <div className="space-y-2 mb-6">
                                    <div className="h-4 bg-gray-300 rounded" />
                                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                                </div>
                                <div className="h-10 bg-gray-300 rounded" />
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            </>
        );
    }

    const coaches = coachesData?.data || [];

    return (
        <>
            <Head>
                <title>Tiger Muay Thai - Our Coaches</title>
                <meta name="description" content="Train with world-class instructors who have competed at the highest levels and are passionate about teaching." />
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
                        Our Coaches
                    </h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        Train with world-class instructors who have competed at the highest levels and are passionate about teaching.
                    </p>
                </motion.div>

                {/* Coaches Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coaches.map((coach: any, index: number) => (
                        <motion.div
                            key={coach.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card group hover:shadow-xl transition-all duration-300"
                        >
                            {/* Coach Photo */}
                            <div className="relative mb-6 overflow-hidden rounded-lg">
                                <img
                                    src={coach.photo}
                                    alt={coach.name}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Coach Info */}
                            <div>
                                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                                    {coach.name}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {coach.specialties?.slice(0, 2).map((specialty: string) => (
                                        <span
                                            key={specialty}
                                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-text-muted mb-6 leading-relaxed line-clamp-3">
                                    {coach.bio}
                                </p>

                                {/* Accolades */}
                                {coach.accolades?.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <Award className="w-4 h-4 text-accent" />
                                            <span className="text-sm font-medium text-text">Accolades</span>
                                        </div>
                                        <ul className="text-sm text-text-muted space-y-1">
                                            {coach.accolades.slice(0, 2).map((accolade: string, i: number) => (
                                                <li key={i}>• {accolade}</li>
                                            ))}
                                            {coach.accolades.length > 2 && (
                                                <li className="text-primary font-medium">+ {coach.accolades.length - 2} more</li>
                                            )}
                                        </ul>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex space-x-3">
                                    <Link href={`/coaches/${coach._id}`} className="flex-1">
                                        <Button variant="primary" size="sm" className="w-full">
                                            View Profile
                                        </Button>
                                    </Link>
                                    <div className="flex-1">
                                        <Button variant="outline" onClick={() => handleBookPrivate(coach)} size="sm" className="w-full">
                                            Book Private
                                        </Button>
                                    </div>
                                </div>

                                {/* Social Links */}
                                {coach.socials?.length > 0 && (
                                    <div className="flex justify-center mt-4 pt-4 border-t border-gray-200">
                                        {coach.socials.map((social: any) => (
                                            <a
                                                key={social.platform}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-text-muted hover:text-primary transition-colors"
                                            >
                                                <Instagram className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
                </div>
            
                {/* Private Session Booking Modal */}
                {selectedCoach && (
                    <PrivateSessionBookingModal
                        isOpen={bookingModalOpen}
                        onClose={() => {
                            setBookingModalOpen(false);
                            setSelectedCoach(null);
                        }}
                        coach={{
                            id: selectedCoach.id,
                            name: selectedCoach.name,
                            photo: selectedCoach.photo,
                            hourlyRate: selectedCoach.hourlyRate,
                        }}
                        onBookingSubmit={handleBookingSubmit}
                        isSubmitting={isBooking}
                    />
                )}
            </div>
        </>
    );
}