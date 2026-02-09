"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Linkedin } from 'lucide-react';
import XIcon from '@/components/XIcon';
import Modal from '@/components/Modal';
import { Dock } from "@/components/ui/dock";
import { SparklesCore } from "@/components/ui/sparkles";

export default function LandingPage() {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWhatWeDo, setShowWhatWeDo] = useState(false);

  useEffect(() => {
    if (searchParams.get('cta') === 'open') setIsModalOpen(true);
  }, [searchParams]);

  const dockItems = [
    {
      src: "/bolt.png",
      name: "Bolt",
      href: "#",
      outcome: "Curriculum Design",
    },
    {
      src: "/beacon-house.png",
      name: "Beacon House",
      href: "#",
      outcome: "Retainer",
    },
    {
      src: "/directshelf.png",
      name: "DirectShelf",
      href: "#",
      outcome: "Landing Page",
    },
    {
      src: "/dreamvid.png",
      name: "DreamVid",
      href: "#",
      outcome: "Retainer",
    },
    {
      src: "/fractalhive.png",
      name: "Fractal Hive",
      href: "#",
      outcome: "School SaaS Product",
    },
    {
      src: "/tripture.png",
      name: "Tripture",
      href: "#",
      outcome: "Retainer, Growth Strategy",
    },
    {
      src: "/poai.png",
      name: "Po AI",
      href: "#",
      outcome: "Landing Page, Strategy",
    },
  ];

  if (showWhatWeDo) {
    return (
      <div className="min-h-screen bg-background overflow-hidden text-text-primary">
        <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-40">
          <div className="max-w-[700px] mx-auto px-6 md:px-12 py-3 md:py-4 flex items-center justify-between">
            <button
              onClick={() => setShowWhatWeDo(false)}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary font-medium text-sm md:text-base transition-colors"
            >
              <ArrowLeft size={20} />
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
          <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-16">
            What We Do
          </h2>

          <div className="space-y-8 md:space-y-12">
            <div className="space-y-3">
              <div className="text-4xl md:text-5xl font-bold text-accent-blue">$500</div>
              <h3 className="font-bold text-xl md:text-2xl">Landing Pages</h3>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                High-converting pages that turn visitors into customers. Minimal friction, maximum clarity.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-4xl md:text-5xl font-bold text-accent-blue">$1.5k-4k</div>
              <h3 className="font-bold text-xl md:text-2xl">MVPs</h3>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                Ship fast, validate ideas. We build the core features you need to get to market.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-4xl md:text-5xl font-bold text-accent-blue">$2k+/mo</div>
              <h3 className="font-bold text-xl md:text-2xl">Retainers</h3>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                Ongoing support. We scale your product, improve performance, and own the roadmap.
                              </p>            </div>
          </div>

          <button
            onClick={() => setShowWhatWeDo(false)}
            className="mt-12 md:mt-16 bg-accent-blue text-white font-medium text-base md:text-lg py-4 px-8 md:px-10 rounded-xl hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
          >
            Back to Landing →
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-text-primary relative">
      <SparklesCore className="absolute inset-0 z-[-1]" />
      <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-6 py-6 md:py-12 md:px-10 lg:px-16">
        <header className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <a href="https://x.com/nkgoutham" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary">
              <XIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/in/krishna-goutham/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary">
              <Linkedin size={20} />
            </a>
          </div>
          <img
            src="/logo.png"
            alt="Agency Logo"
            className="h-20 md:h-24 w-auto absolute left-1/2 -translate-x-1/2"
          />

        </header>

        <main className="flex flex-1 flex-col justify-center">
          <section className="flex flex-1 flex-col justify-center pt-16">
            <div className="flex flex-col items-center text-center gap-8 md:gap-10">
              <div className="max-w-[820px]">
                <h1 className="font-display text-[clamp(2.75rem,7vw,5.25rem)] font-bold leading-[1.05] tracking-tight">
                  21 days.
                  <span className="text-[clamp(1.9rem,4vw,3.25rem)] font-normal text-text-secondary"> idea to revenue</span>
                </h1>
              </div>

              <div className="flex w-full flex-col items-center gap-8">
                <h2 className="max-w-[640px] text-[clamp(1.5rem,3vw,2rem)] font-medium italic leading-snug text-text-secondary">
                  &ldquo;We think like your <span className="text-accent-blue not-italic font-semibold">cofounder</span>, and build like your{' '}
                  <span className="text-accent-blue not-italic font-semibold">CTO</span>&rdquo;
                </h2>

                <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
                  <span className="rounded-full bg-border-color/50 px-5 py-2 text-sm font-medium text-text-primary">
                    <span className="font-semibold">15+ MVPs shipped in 8 months</span>
                  </span>
                  <span className="rounded-full bg-border-color/50 px-5 py-2 text-sm font-medium text-text-primary">
                    MVPs • Landing Pages • AI Tools
                  </span>
                  <span className="rounded-full bg-border-color/50 px-5 py-2 text-sm font-medium text-text-primary">
                    Human led, <span className="font-semibold text-accent-blue">AI-assisted</span> builds
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-10 text-base font-semibold text-white shadow-[0_20px_35px_rgba(37,99,235,0.35)] transition-transform hover:-translate-y-0.5"
                >
                  Get Your Launch Roadmap
                </button>
                <p className="text-sm text-text-secondary">You get a voice note in 24h: what you need, timeline, fit. We cut the BS.</p>
              </div>
            </div>
          </section>

          <section className="mt-10 md:mt-12 flex w-full flex-col items-center gap-6">
            <p className="text-center text-xs uppercase tracking-[0.35em] text-text-secondary">Trusted by founders at</p>
            <div className="max-w-full overflow-x-auto">
              <Dock items={dockItems} />
            </div>
          </section>
        </main>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
