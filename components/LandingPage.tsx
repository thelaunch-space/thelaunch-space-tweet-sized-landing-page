"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Modal from '@/components/Modal';
import { SparklesCore } from "@/components/ui/sparkles";

export default function LandingPage() {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWhatWeDo, setShowWhatWeDo] = useState(false);

  useEffect(() => {
    if (searchParams.get('cta') === 'open') setIsModalOpen(true);
  }, [searchParams]);

  const clients = [
    { src: "/bolt.png", name: "Bolt" },
    { src: "/beacon-house.png", name: "Beacon House" },
    { src: "/directshelf.png", name: "DirectShelf" },
    { src: "/dreamvid.png", name: "DreamVid" },
    { src: "/fractalhive.png", name: "Fractal Hive" },
    { src: "/tripture.png", name: "Tripture" },
    { src: "/poai.png", name: "Po AI" },
    { src: "/vitalyf.png", name: "Vitalyf" },
    { name: "Classroots", textLogo: ["Classroots", "Learning"] },
  ];

  if (showWhatWeDo) {
    return (
      <div className="min-h-screen bg-background overflow-hidden text-text-primary">
        <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-4 md:px-6 lg:px-8 pt-3">
          <div className="max-w-[700px] mx-auto rounded-xl sm:rounded-2xl border border-border-color/40 shadow-slab bg-surface/80 backdrop-blur-sm px-5 md:px-10 py-3 md:py-4 flex items-center justify-between">
            <button
              onClick={() => setShowWhatWeDo(false)}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary font-medium text-sm transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <img
              src="/logo.png"
              alt="Agency Logo"
              className="h-10 md:h-14 w-auto"
            />
            <div className="w-12" />
          </div>
        </header>

        <main className="max-w-[700px] mx-auto px-6 md:px-12 pt-24 md:pt-28 pb-8 md:pb-12 min-h-screen flex flex-col justify-center">
          <p className="meta-label text-text-secondary mb-4 hero-entrance-1">Services & Pricing</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-14 md:mb-16 hero-entrance-1">
            What We Do
          </h2>

          <div className="space-y-10 md:space-y-14">
            <div className="space-y-3 hero-entrance-2">
              <div className="text-4xl md:text-5xl font-semibold text-accent-blue">$500</div>
              <h3 className="font-semibold text-xl md:text-2xl">Landing Pages</h3>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-[560px]">
                High-converting pages that turn visitors into customers. Minimal friction, maximum clarity.
              </p>
            </div>

            <div className="w-full h-px bg-border-color/60" />

            <div className="space-y-3 hero-entrance-3">
              <div className="text-4xl md:text-5xl font-semibold text-accent-blue">$1.5k–4k</div>
              <h3 className="font-semibold text-xl md:text-2xl">MVPs</h3>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-[560px]">
                Ship fast, validate ideas. We build the core features you need to get to market.
              </p>
            </div>

            <div className="w-full h-px bg-border-color/60" />

            <div className="space-y-3 hero-entrance-4">
              <div className="text-4xl md:text-5xl font-semibold text-accent-blue">$2k+/mo</div>
              <h3 className="font-semibold text-xl md:text-2xl">Retainers</h3>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-[560px]">
                Ongoing support. We scale your product, improve performance, and own the roadmap.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowWhatWeDo(false)}
            className="mt-14 md:mt-16 bg-accent-blue text-white font-medium text-base py-4 px-10 rounded-full hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-cta hover:shadow-cta-hover hero-entrance-5"
          >
            Back to Landing
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 text-text-primary relative flex flex-col overflow-hidden">
      <SparklesCore className="absolute inset-0 z-[-1]" />

      {/* Ambient gradient orbs — atmospheric light that gives the white background life */}
      <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
        {/* Primary blue orb — upper left, slowly drifting */}
        <div
          className="absolute animate-orb-drift-1"
          style={{
            width: '60vw',
            height: '60vw',
            maxWidth: '700px',
            maxHeight: '700px',
            top: '-10%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(0,61,165,0.045) 0%, rgba(0,61,165,0.015) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Secondary purple orb — right side, slower drift */}
        <div
          className="absolute animate-orb-drift-2"
          style={{
            width: '50vw',
            height: '50vw',
            maxWidth: '600px',
            maxHeight: '600px',
            top: '10%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(109,40,217,0.035) 0%, rgba(109,40,217,0.01) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Warm accent — bottom center, very subtle */}
        <div
          className="absolute"
          style={{
            width: '80vw',
            height: '30vw',
            maxWidth: '900px',
            maxHeight: '400px',
            bottom: '0%',
            left: '10%',
            background: 'radial-gradient(ellipse, rgba(0,61,165,0.02) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="mx-auto flex flex-1 w-full max-w-[1200px] flex-col px-6 pt-4 pb-10 md:pt-6 md:pb-14 md:px-10 lg:px-16">
        <main className="flex flex-1 flex-col">
          <section className="flex flex-1 flex-col items-center justify-center">
            <div className="flex flex-col items-center text-center gap-5 md:gap-7">

              {/* Headline — the monumental promise */}
              <div className="max-w-[820px] hero-entrance-1">
                <h1 className="font-display text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[1.05] tracking-display">
                  21 days.
                </h1>
                <p className="font-display text-[clamp(1.9rem,4vw,3.25rem)] font-normal text-text-secondary italic leading-[1.2] mt-2">
                  idea to revenue
                </p>
              </div>

              {/* Decorative diamond separator — echoes the logo, creates visual rhythm */}
              <div className="flex items-center gap-4 hero-entrance-2 w-full max-w-[200px]">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border-color" />
                <div className="w-2 h-2 rotate-45 bg-accent-blue/30" />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border-color" />
              </div>

              {/* Subheadline — the positioning statement */}
              <div className="flex w-full flex-col items-center hero-entrance-3">
                <h2 className="text-[clamp(1.35rem,2.8vw,1.875rem)] font-normal leading-snug text-text-secondary font-sans text-center">
                  We think like your{' '}
                  <span className="text-text-primary font-medium keyword-underline">cofounder</span>
                  <br />
                  and build like your{' '}
                  <span className="text-text-primary font-medium keyword-underline">CTO</span>
                </h2>
              </div>

              {/* Credential pills */}
              <div className="flex flex-wrap justify-center gap-3 hero-entrance-4">
                <span className="rounded-full border border-border-color/80 bg-surface px-5 py-2 text-sm text-text-secondary shadow-card">
                  <span className="font-medium text-text-primary">60+</span> projects built
                </span>
                <span className="rounded-full border border-border-color/80 bg-surface px-5 py-2 text-sm text-text-secondary shadow-card">
                  MVPs &middot; Landing Pages &middot; AI Tools
                </span>
                <span className="rounded-full border border-border-color/80 bg-surface px-5 py-2 text-sm text-text-secondary shadow-card">
                  Human-led, <span className="font-medium text-text-primary">AI-assisted</span>
                </span>
              </div>

              {/* CTA — the conversion point */}
              <div className="flex flex-col items-center gap-4 mt-2 hero-entrance-5">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-gradient-to-b from-accent-blue to-[#002d7a] px-8 py-3.5 md:px-12 md:py-5 text-base md:text-lg font-semibold text-white shadow-cta transition-all hover:-translate-y-1 hover:shadow-cta-hover active:translate-y-0 active:scale-[0.98]"
                >
                  <span>Get Your Launch Roadmap</span>
                  <span className="inline-block ml-2.5 transition-transform group-hover:translate-x-1">&rarr;</span>
                </button>
                <p className="max-w-[420px] text-sm text-text-secondary leading-relaxed">
                  You get a voice note in 24h — what you need, timeline, and fit.
                </p>
              </div>
            </div>
          </section>

          {/* Trusted by — inline grayscale logos, horizontal scroll on mobile */}
          <section className="shrink-0 pt-6 md:pt-8 flex w-full flex-col items-center gap-3 hero-entrance-5">
            <p className="meta-label text-text-secondary">Trusted by founders at</p>
            <div className="w-full overflow-x-auto md:overflow-x-visible scrollbar-hide">
              <div className="flex gap-2.5 md:gap-3 px-1 pb-8 w-max mx-auto">
                {clients.map((client) => (
                  <div
                    key={client.name}
                    className="group relative w-[56px] h-[56px] md:w-[68px] md:h-[68px] shrink-0 rounded-xl bg-white border border-border-color/40 shadow-card flex items-center justify-center p-2 md:p-2.5 transition-all duration-300 hover:shadow-card-hover hover:border-border-color/70 hover:-translate-y-0.5"
                  >
                    {client.src ? (
                      <img
                        src={client.src}
                        alt={client.name}
                        className="w-full h-full object-contain rounded-lg grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                    ) : client.textLogo ? (
                      <div className="flex flex-col items-center justify-center leading-none opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        {client.textLogo.map((line) => (
                          <span key={line} className="text-[9px] md:text-[11px] font-bold text-text-primary tracking-tight">{line}</span>
                        ))}
                      </div>
                    ) : null}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface border border-border-color/60 px-2 py-0.5 text-[11px] font-medium text-text-primary shadow-card opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
