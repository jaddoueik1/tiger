import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, DollarSign, Loader2, User, X } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';

interface PrivateSessionBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  coach: {
    id: string;
    name: string;
    photo: string;
    hourlyRate?: number;
  };
  onBookingSubmit: (bookingData: BookingFormData) => void;
  isSubmitting?: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'cash' | 'card';
  preferredDate: string;
  preferredTime: string;
  notes: string;
  mainInterest?: string;
  goal?: string;
  medicalInformation?: string;
  dailyRoutine?: string;
  physicalActivity?: string;
  nutrition?: string;
}

export default function PrivateSessionBookingModal({
  isOpen,
  onClose,
  coach,
  onBookingSubmit,
  isSubmitting = false,
}: PrivateSessionBookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'cash',
    preferredDate: '',
    preferredTime: '',
    notes: '',
    mainInterest: '',
    goal: '',
    medicalInformation: '',
    dailyRoutine: '',
    physicalActivity: '',
    nutrition: '',
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Preferred time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onBookingSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-surface">
            <div className="flex items-center space-x-4">
              <img
                src={coach.photo}
                alt={coach.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-text">Book Private Session</h2>
                <p className="text-text-muted">with {coach.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form id="booking-form" onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1 (555) 123-4567"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-text mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Session Details */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Session Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.preferredDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.preferredTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.preferredTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-text mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Any specific goals, experience level, or special requests..."
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Training Details */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-4">Training Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Main Interest
                  </label>
                  <select
                    value={formData.mainInterest}
                    onChange={(e) => handleInputChange('mainInterest', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={isSubmitting}
                  >
                    <option value="">Select your main interest</option>
                    <option value="MMA">MMA</option>
                    <option value="Muay Thai">Muay Thai</option>
                    <option value="Boxing">Boxing</option>
                    <option value="Brazilian Jiu Jitsu">Brazilian Jiu Jitsu</option>
                    <option value="Strength & Conditioning">Strength & Conditioning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Main Goal
                  </label>
                  <select
                    value={formData.goal}
                    onChange={(e) => handleInputChange('goal', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={isSubmitting}
                  >
                    <option value="">Select your main goal</option>
                    <option value="Lose weight">Lose weight</option>
                    <option value="Tone body">Tone body</option>
                    <option value="Amateur fighter">Amateur fighter</option>
                    <option value="Professional fighter">Professional fighter</option>
                    <option value="Learn new skills">Learn new skills</option>
                    <option value="Self-Defense">Self-Defense</option>
                    <option value="Stress relief">Stress relief</option>
                    <option value="Have fun">Have fun</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Medical Information
                  </label>
                  <textarea
                    value={formData.medicalInformation}
                    onChange={(e) => handleInputChange('medicalInformation', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Any medications, previous surgeries, current illness/injury, or other medical information..."
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Your Daily Routine
                  </label>
                  <textarea
                    value={formData.dailyRoutine}
                    onChange={(e) => handleInputChange('dailyRoutine', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your typical daily routine..."
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Physical Activity
                  </label>
                  <textarea
                    value={formData.physicalActivity}
                    onChange={(e) => handleInputChange('physicalActivity', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Do you exercise? If yes, what kind of activity (e.g., Body Building, Bike riding, Swimming, Jogging, Football, Basketball, Yoga, Other)..."
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Diet Habits / Nutrition
                  </label>
                  <textarea
                    value={formData.nutrition}
                    onChange={(e) => handleInputChange('nutrition', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your diet habits and nutrition..."
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Payment Method
              </h3>
              
              {coach.hourlyRate && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Hourly Rate:</span>
                    <span className="text-xl font-bold text-text">${coach.hourlyRate}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="mr-3"
                    disabled={isSubmitting}
                  />
                  <DollarSign className="w-5 h-5 mr-3 text-green-600" />
                  <div>
                    <div className="font-medium text-text">Pay in Cash</div>
                    <div className="text-sm text-text-muted">Pay at the gym during your session</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-not-allowed opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    disabled
                    className="mr-3"
                  />
                  <CreditCard className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-400">Pay by Card</div>
                    <div className="text-sm text-gray-400">Coming soon</div>
                  </div>
                </label>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-surface">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="booking-form"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                'Book Session'
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}