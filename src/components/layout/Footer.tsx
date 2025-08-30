'use client';

import { useContent } from '@/hooks/useApi';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const { data: footer } = useContent('footer.main');

  const sections = footer?.data?.sections || [];
  const contact = footer?.data?.contact || {};
  const socials = footer?.data?.socials || [];

  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">Tiger Muay Thai</span>
            </div>
            
            {contact.address && (
              <div className="flex items-start space-x-3 mb-3">
                <MapPin className="w-5 h-5 mt-1 text-accent flex-shrink-0" />
                <span className="text-gray-300">{contact.address}</span>
              </div>
            )}
            
            {contact.phone && (
              <div className="flex items-center space-x-3 mb-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-gray-300">{contact.phone}</span>
              </div>
            )}
            
            {contact.email && (
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-gray-300">{contact.email}</span>
              </div>
            )}

            {/* Social Links */}
            <div className="flex space-x-4">
              {socials.map((social: any) => {
                const IconComponent = socialIcons[social.platform as keyof typeof socialIcons];
                if (!IconComponent) return null;

                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Sections */}
          {sections.map((section: any) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link: any) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tiger Muay Thai. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/policies/privacy" className="text-gray-400 hover:text-accent text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/policies/terms" className="text-gray-400 hover:text-accent text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}