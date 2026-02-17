"use client";

import { motion } from "framer-motion";
import { PRICING_TIERS } from "@/lib/pitch-data";
import { useGeo } from "@/lib/useGeo";
import { getGeoConfig, getMultiplier, getPriceDisplay } from "@/lib/geo-savings";

export default function PricingSection() {
  const region = useGeo();
  const config = getGeoConfig(region);
  const multiplier = getMultiplier(config);
  const priceDisplay = getPriceDisplay(config);

  // Override pricing per geo — structure stays the same, numbers change
  const geoPricing: Record<string, { price: string; originalPrice: string; cta: string }> = {
    "Proof of Concept": {
      price: config.pricing.pocDisplay,
      originalPrice: config.pricing.pocOriginalPrice,
      cta: config.pricing.pocCta,
    },
    "Growth Partnership": {
      price: config.pricing.growthDisplay,
      originalPrice: config.pricing.growthOriginalPrice,
      cta: config.pricing.growthCta,
    },
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display tracking-[-0.02em] text-2xl md:text-3xl text-text-primary">
          Simple Pricing
        </h2>
        <p className="text-text-secondary text-sm mt-2">
          {config.comparisonLine}
        </p>
        <p className="text-text-secondary/70 text-xs mt-1">
          That&apos;s{" "}
          <span className="font-semibold text-accent-blue">{multiplier}</span>{" "}
          your {priceDisplay} investment
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRICING_TIERS.map((tier, i) => {
          const geo = geoPricing[tier.name];
          const price = geo?.price ?? tier.price;
          const originalPrice = geo?.originalPrice ?? tier.originalPrice;
          const cta = geo?.cta ?? tier.cta;

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`rounded-2xl border bg-surface p-6 md:p-8 relative ${
                tier.highlight
                  ? "border-accent-blue/40 shadow-card-hover"
                  : "border-border-color shadow-card"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white text-[10px] font-mono tracking-[0.12em] uppercase">
                  MOST POPULAR
                </span>
              )}

              <h3 className="font-display tracking-[-0.02em] text-xl text-text-primary">{tier.name}</h3>
              <div className="mt-3 flex items-baseline gap-3">
                {originalPrice && (
                  <span className="relative inline-block text-2xl font-display tracking-[-0.03em] text-text-secondary/50">
                    {originalPrice}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                      aria-hidden="true"
                    >
                      <line
                        x1="0" y1="60" x2="100" y2="40"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="text-accent-rose/70"
                      />
                    </svg>
                  </span>
                )}
                <span className="text-3xl font-display tracking-[-0.03em] text-text-primary">{price}</span>
                <span className="text-text-secondary text-sm">/{tier.period}</span>
              </div>
              {tier.launchLabel && (
                <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald text-[10px] font-mono tracking-[0.08em] uppercase">
                  {tier.launchLabel}
                </span>
              )}
              <p className="text-text-secondary text-sm mt-2">{tier.description}</p>

              <ul className="mt-5 space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-text-primary">
                    <svg
                      className="w-4 h-4 text-accent-emerald flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#lead-capture"
                className={`mt-6 inline-block w-full text-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  tier.highlight
                    ? "bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-cta hover:shadow-cta-hover"
                    : "border border-border-color text-text-primary hover:border-accent-blue hover:text-accent-blue"
                }`}
              >
                {cta}
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
