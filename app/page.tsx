"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/pivot/HeroVariantB";
import UseCasesSection from "@/components/pivot/UseCasesSection";
import ProofSection from "@/components/pivot/ProofSection";
import PrinciplesSection from "@/components/pivot/PrinciplesSection";
import LaunchControlSection from "@/components/pivot/LaunchControlSection";
import PricingSection from "@/components/pivot/PricingSection";
import FaqSection from "@/components/pivot/FaqSection";
import FounderStrip from "@/components/pivot/FounderStrip";
import SectionDivider from "@/components/pivot/SectionDivider";
import LeadCaptureSection from "@/components/pitch/LeadCaptureSection";

function useFloatingCtaVisible() {
  const [scrolled, setScrolled] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setReachedBottom(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return scrolled && !reachedBottom;
}

export default function Home() {
  const showFloatingCta = useFloatingCtaVisible();

  return (
    <main className="pwa-bottom-pad snap-y snap-proximity">
      <HeroSection />

      <SectionDivider />
      <UseCasesSection />
      <ProofSection />
      <FounderStrip />
      <SectionDivider />
      <PrinciplesSection />
      <LaunchControlSection />
      <PricingSection />
      <SectionDivider />
      <FaqSection />

      {/* Booking section + modal */}
      <section className="snap-section pt-16 md:pt-20 pb-16 md:pb-20">
        <LeadCaptureSection />
      </section>

      {/* Floating CTA — desktop (hidden on small screens) */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 right-8 z-40 hidden sm:block"
          >
            <a
              href="#contact"
              className="bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-xl py-3 px-6 font-sans font-semibold text-sm shadow-cta hover:-translate-y-0.5 hover:shadow-cta-hover transition-all duration-200"
            >
              Book a call
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky mobile CTA bar — sm screens only */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/90 backdrop-blur-md border-t border-border-color/30 p-3 pb-safe"
          >
            <a
              href="#contact"
              className="block w-full text-center bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-xl py-3 px-6 font-sans font-semibold text-sm shadow-cta"
            >
              Book a call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
