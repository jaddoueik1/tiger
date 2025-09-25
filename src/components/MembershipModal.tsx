import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, DollarSign, Loader2, Mail, Phone, User, X } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    id: string;
    name: string;
    price: number;
    period: string;
    benefits: string[];
  };
  onSubmit: (data: MembershipFormData) => void;
  isSubmitting?: boolean;
}

export interface MembershipFormData {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'cash' | 'card';
}

export default function MembershipModal({
  isOpen,
  onClose,
  plan,
  onSubmit,
  isSubmitting = false,
}: MembershipModalProps) {
  const [formData, setFormData] = useState<MembershipFormData>({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'cash',
  });

  const [errors, setErrors] = useState<Partial<MembershipFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<MembershipFormData> = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof MembershipFormData, value: string) => {
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
            <div>
              <h2 className="text-xl font-bold text-text">Start {plan.name} Membership</h2>
              <p className="text-text-muted">${plan.price}/{plan.period}</p>
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
          <form id="membership-form" onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            {/* Plan Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-text mb-2">{plan.name} Plan</h3>
              <div className="text-2xl font-bold text-primary mb-3">
                ${plan.price}<span className="text-sm text-text-muted">/{plan.period}</span>
              </div>
              <ul className="text-sm text-text-muted space-y-1">
                {plan.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
                {plan.benefits.length > 3 && (
                  <li className="text-primary font-medium">+ {plan.benefits.length - 3} more benefits</li>
                )}
              </ul>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </h3>
              
              <div className="space-y-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
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
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Payment Method
              </h3>
              
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
                    <div className="text-sm text-text-muted">Pay at the gym when you visit</div>
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
              form="membership-form"
              disabled={isSubmitting}
              className="min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Start Membership'
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}