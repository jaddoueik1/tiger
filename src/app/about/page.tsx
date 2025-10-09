'use client';

import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, Target, ShieldCheck, Sparkles, Award, HeartPulse, Swords,
  Linkedin, Instagram, Facebook, Youtube, type LucideIcon
} from 'lucide-react';
import { useContent } from '@/hooks/useApi';


type AnyRec = Record<string, any>;

// simple icon mapper so CMS can pass names like "target", "shieldCheck", etc.
const iconMap: Record<string, LucideIcon> = {
  users: Users,
  target: Target,
  shieldcheck: ShieldCheck,
  sparkles: Sparkles,
  award: Award,
  heartpulse: HeartPulse,
  swords: Swords,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
};
const getIcon = (name?: string): LucideIcon => iconMap[(name ?? '').replace(/[\s_-]/g, '').toLowerCase()] ?? Sparkles;

function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      <div className="h-10 bg-gray-300/70 rounded w-64 mx-auto animate-pulse" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-300/60 rounded mx-auto animate-pulse w-10/12" />
      ))}
    </div>
  );
}

export default function AboutPage() {
  const { data: hero, isLoading: lHero } = useContent('about.hero');
  const { data: mission, isLoading: lMission } = useContent('about.mission');
  const { data: values, isLoading: lValues } = useContent('about.values');
  const { data: stats, isLoading: lStats } = useContent('about.stats');
  const { data: team, isLoading: lTeam } = useContent('about.team');
  const { data: timeline, isLoading: lTimeline } = useContent('about.timeline');
  const { data: cta, isLoading: lCta } = useContent('about.cta');

  const heroJson: AnyRec = hero?.data ?? {};
  const missionJson: AnyRec = mission?.data ?? {};
  const valuesJson: AnyRec = values?.data ?? {};
  const statsJson: AnyRec = stats?.data ?? {};
  const teamJson: AnyRec = team?.data ?? {};
  const timelineJson: AnyRec = timeline?.data ?? {};
  const ctaJson: AnyRec = cta?.data ?? {};

  return (
    <>
      <Head>
        <title>Tiger Muay Thai - About Us</title>
        <meta name="description" content="Learn about our world-class martial arts instructors and training philosophy." />
      </Head>
      <main className="bg-bg text-text">
        {/* HERO */}
        <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          {lHero ? (
            <SectionSkeleton rows={2} />
          ) : heroJson?.title ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              {heroJson.kicker && (
                <div className="mb-3 inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                  {heroJson.kicker}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold">{heroJson.title}</h1>
              {heroJson.subtitle && (
                <p className="mt-4 text-text-muted">{heroJson.subtitle}</p>
              )}
            </motion.div>
          ) : null}
        </div>
        {heroJson?.media?.src && (
          <div className="container mx-auto px-4 lg:px-8 mt-10">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img
                src={heroJson.media.src}
                alt={heroJson.media.alt ?? 'About hero image'}
                className="w-full h-[320px] md:h-[440px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </section>

      {/* MISSION / STORY */}
      {(lMission && <section className="py-16"><div className="container mx-auto px-4 lg:px-8"><SectionSkeleton rows={4} /></div></section>) ||
        (missionJson?.title && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-semibold">{missionJson.title}</h2>
                {missionJson.body && (
                  <div className="prose prose-invert mt-4 max-w-none">
                    {/* body can be a string or array of paragraphs */}
                    {Array.isArray(missionJson.body)
                      ? missionJson.body.map((p: string, i: number) => <p key={i} className="text-text-muted">{p}</p>)
                      : <p className="text-text-muted">{missionJson.body}</p>
                    }
                  </div>
                )}
                {missionJson?.cta?.href && missionJson?.cta?.label && (
                  <Link href={missionJson.cta.href} className="inline-flex mt-6 px-5 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90">
                    {missionJson.cta.label}
                  </Link>
                )}
              </motion.div>

              {missionJson?.media?.src && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
                  className="overflow-hidden rounded-2xl ring-1 ring-white/10"
                >
                  <img
                    src={missionJson.media.src}
                    alt={missionJson.media.alt ?? 'Mission image'}
                    className="w-full h-[300px] md:h-[420px] object-cover"
                    loading="lazy"
                  />
                </motion.div>
              )}
            </div>
          </section>
        ))
      }

      {/* VALUES */}
      {(lValues && <section className="py-16"><div className="container mx-auto px-4 lg:px-8"><SectionSkeleton rows={3} /></div></section>) ||
        (Array.isArray(valuesJson?.items) && valuesJson.items.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              {valuesJson?.title && <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">{valuesJson.title}</h3>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {valuesJson.items.map((v: AnyRec, i: number) => {
                  const Icon = getIcon(v.icon);
                  return (
                    <motion.div
                      key={v.id ?? i}
                      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.04 }} viewport={{ once: true }}
                      className="card p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-surface p-3 ring-1 ring-white/5">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          {v.title && <h4 className="text-lg font-semibold">{v.title}</h4>}
                          {v.description && <p className="text-text-muted mt-1">{v.description}</p>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        ))
      }

      {/* STATS */}
      {(lStats && <section className="py-12"><div className="container mx-auto px-4 lg:px-8"><SectionSkeleton rows={2} /></div></section>) ||
        (Array.isArray(statsJson?.items) && statsJson.items.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statsJson.items.map((s: AnyRec, i: number) => (
                  <motion.div
                    key={s.id ?? i}
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}
                    className="card p-6 text-center"
                  >
                    {s.value && <div className="text-3xl font-bold">{s.value}</div>}
                    {s.label && <div className="text-text-muted mt-1">{s.label}</div>}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))
      }

      {/* TEAM */}
      {(lTeam && <section className="py-16"><div className="container mx-auto px-4 lg:px-8"><SectionSkeleton rows={3} /></div></section>) ||
        (Array.isArray(teamJson?.items) && teamJson.items.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              {teamJson?.title && <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">{teamJson.title}</h3>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamJson.items.map((m: AnyRec, i: number) => (
                  <motion.article
                    key={m.id ?? i}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.05 }} viewport={{ once: true }}
                    className="card overflow-hidden"
                  >
                    {m.photo && (
                      <img src={m.photo} alt={m.name ?? 'Coach'} className="w-full h-56 object-cover" loading="lazy" />
                    )}
                    <div className="p-6">
                      {m.name && <h4 className="text-lg font-semibold">{m.name}</h4>}
                      {m.role && <p className="text-sm text-text-muted">{m.role}</p>}
                      {Array.isArray(m.specialties) && m.specialties.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {m.specialties.map((s: string, idx: number) => (
                            <li key={idx} className="text-xs px-2.5 py-1 rounded-full bg-surface ring-1 ring-white/5 text-text-muted">{s}</li>
                          ))}
                        </ul>
                      )}
                      {Array.isArray(m.socials) && m.socials.length > 0 && (
                        <div className="mt-4 flex gap-3">
                          {m.socials.map((soc: AnyRec, k: number) => {
                            const SocIcon = getIcon(soc.platform);
                            return (
                              <Link key={k} href={soc.url} target="_blank" className="p-2 rounded-xl bg-surface ring-1 ring-white/5 hover:bg-surface/80">
                                <SocIcon className="w-4 h-4" />
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
              {teamJson?.cta?.href && teamJson?.cta?.label && (
                <div className="text-center mt-8">
                  <Link href={teamJson.cta.href} className="inline-flex px-5 py-3 rounded-xl bg-surface ring-1 ring-white/5 hover:bg-surface/80">
                    {teamJson.cta.label}
                  </Link>
                </div>
              )}
            </div>
          </section>
        ))
      }

      {/* TIMELINE */}
      {(lTimeline && <section className="py-16"><div className="container mx-auto px-4 lg:px-8"><SectionSkeleton rows={4} /></div></section>) ||
        (Array.isArray(timelineJson?.items) && timelineJson.items.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              {timelineJson?.title && <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">{timelineJson.title}</h3>}
              <ol className="relative border-l border-white/10 ml-3">
                {timelineJson.items.map((t: AnyRec, i: number) => (
                  <motion.li
                    key={t.id ?? i}
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }} viewport={{ once: true }}
                    className="mb-10 ml-6"
                  >
                    <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 ring-2 ring-primary/40">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <div className="card p-5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        {t.date && <time className="text-xs text-text-muted">{t.date}</time>}
                        {t.title && <h4 className="text-base md:text-lg font-semibold">{t.title}</h4>}
                      </div>
                      {t.description && <p className="text-text-muted mt-2">{t.description}</p>}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </section>
        ))
      }

      {/* CTA */}
      {(lCta && <section className="py-16"><div className="container mx-auto px-4 lg:px-8"><SectionSkeleton rows={1} /></div></section>) ||
        (ctaJson?.title && ctaJson?.cta?.href && ctaJson?.cta?.label && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="card p-8 md:p-10 text-center">
                <h3 className="text-2xl md:text-3xl font-semibold">{ctaJson.title}</h3>
                {ctaJson.subtitle && <p className="text-text-muted mt-2">{ctaJson.subtitle}</p>}
                <Link href={ctaJson.cta.href} className="inline-flex mt-6 px-5 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90">
                  {ctaJson.cta.label}
                </Link>
              </div>
            </div>
          </section>
        ))
      }
      </main>
    </>
  );
}
