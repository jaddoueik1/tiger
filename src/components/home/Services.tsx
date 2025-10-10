'use client';

import { useContent } from '@/hooks/useApi';
import { motion } from 'framer-motion';
import {
    BadgeCheck,
    CalendarClock,
    Dumbbell,
    HeartPulse,
    ShieldCheck,
    Sparkles,
    Swords,
    Users,
    type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

// Map string keys from CMS to Lucide icons
const iconMap: Record<string, LucideIcon> = {
    dumbbell: Dumbbell,
    swords: Swords,
    shieldcheck: ShieldCheck,
    users: Users,
    calendarclock: CalendarClock,
    heartpulse: HeartPulse,
    sparkles: Sparkles,
    badgecheck: BadgeCheck,
};

function getIcon(name?: string): LucideIcon {
    if (!name) return Swords;
    const key = name.replace(/[\s_-]/g, '').toLowerCase();
    return iconMap[key] ?? Swords;
}

export default function Services() {
    const { data, isLoading } = useContent('home.services'); // expects { title, subtitle?, items[], cta? }

    if (isLoading) {
        return (
            <section className="py-20 bg-bg">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="h-10 bg-gray-300 rounded-lg w-80 mx-auto animate-pulse" />
                        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mt-4 animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="card p-6 animate-pulse">
                                <div className="w-12 h-12 bg-gray-300 rounded-lg mb-4" />
                                <div className="h-5 bg-gray-300 rounded w-1/2 mb-3" />
                                <div className="h-4 bg-gray-300 rounded w-full mb-2" />
                                <div className="h-4 bg-gray-300 rounded w-5/6 mb-6" />
                                <div className="flex gap-2">
                                    <div className="h-6 w-16 bg-gray-300 rounded" />
                                    <div className="h-6 w-20 bg-gray-300 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const content = data?.data || {};
    const title: string | undefined = content.title;
    const subtitle: string | undefined = content.subtitle;
    const items: any[] = Array.isArray(content.items) ? content.items.sort((a, b) => a.order - b.order) : [];
    const sectionCta = content.cta as { label?: string; href?: string } | undefined;

    if (!items.length) return null;

    return (
        <section className="py-20 bg-bg">
            <div className="container mx-auto px-4 lg:px-8">
                {(title || subtitle) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        {title && <h2 className="text-4xl lg:text-5xl font-bold text-text mb-4">{title}</h2>}
                        {subtitle && <p className="text-text-muted max-w-3xl mx-auto">{subtitle}</p>}
                    </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((svc, index) => {
                        const Icon = getIcon(svc.icon || svc.iconName);
                        const hasMedia = svc?.media?.src;
                        const features: string[] = Array.isArray(svc.features) ? svc.features : [];
                        const href: string | undefined = svc.href;
                        const ctaLabel: string | undefined = svc.ctaLabel;
                        const badge: string | undefined = svc.badge;

                        return (
                            <motion.article
                                key={svc.id ?? index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.06 }}
                                viewport={{ once: true }}
                                className="card group overflow-hidden"
                            >
                                {/* Optional media header */}
                                {hasMedia && (
                                    <div className="relative h-40 w-full overflow-hidden">
                                        <img
                                            src={svc.media.src}
                                            alt={svc.media.alt || svc.title || 'Service image'}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {badge && (
                                            <div className="absolute top-3 left-3 rounded-full bg-primary/90 text-white text-xs font-semibold px-3 py-1">
                                                {badge}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="p-6">
                                    {!hasMedia && badge && (
                                        <div className="mb-3 inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1">
                                            {badge}
                                        </div>
                                    )}

                                    <div className="flex items-start gap-4">
                                        <div className="rounded-2xl bg-surface p-3 ring-1 ring-white/5 shadow-sm">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            {svc.title && (
                                                <h3 className="text-xl font-semibold text-text leading-tight">
                                                    {svc.title}
                                                </h3>
                                            )}
                                            {svc.subtitle && (
                                                <p className="text-sm text-text-muted mt-1">{svc.subtitle}</p>
                                            )}
                                        </div>
                                    </div>

                                    {svc.description && (
                                        <p className="text-text-muted mt-4 leading-relaxed">{svc.description}</p>
                                    )}

                                    {features.length > 0 && (
                                        <ul className="mt-4 flex flex-wrap gap-2">
                                            {features.map((f: string, i: number) => (
                                                <li
                                                    key={i}
                                                    className="text-xs px-2.5 py-1 rounded-full bg-surface ring-1 ring-white/5 text-text-muted"
                                                >
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {(href && ctaLabel) && (
                                        <div>
                                            <div className="mt-6">
                                                <Link
                                                    href={href as any}
                                                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition-opacity"
                                                >
                                                    {ctaLabel}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {sectionCta?.href && sectionCta?.label && (
                    <div className="text-center mt-12">
                        <Link
                            href={sectionCta.href as any}
                            className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-surface ring-1 ring-white/5 text-text hover:bg-surface/80 transition-colors"
                        >
                            {sectionCta.label}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
