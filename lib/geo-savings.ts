export type GeoRegion = "IN" | "INTL";

export const GEO_COOKIE_NAME = "geo_region";
export const GEO_COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

interface AgentSavings {
  monthlySavings: string;
  costEquivalent: string;
}

export interface GeoPricing {
  pocPrice: number;
  pocDisplay: string;
  pocOriginalPrice: string;
  growthPrice: number;
  growthDisplay: string;
  growthOriginalPrice: string;
  pocCta: string;
  growthCta: string;
}

export interface GeoSavingsConfig {
  currencySymbol: string;
  totalMonthly: number;
  totalDisplay: string;
  pricing: GeoPricing;
  agents: Record<string, AgentSavings>;
  comparisonLine: string;
  rationale: string;
}

// Derived getters — computed from config, not hardcoded
export function getMultiplier(config: GeoSavingsConfig): string {
  return Math.floor(config.totalMonthly / config.pricing.pocPrice) + "x";
}

export function getPriceDisplay(config: GeoSavingsConfig): string {
  return config.pricing.pocDisplay + "/mo";
}

const INTL_CONFIG: GeoSavingsConfig = {
  currencySymbol: "$",
  totalMonthly: 11000,
  totalDisplay: "$11K/mo",
  pricing: {
    pocPrice: 99,
    pocDisplay: "$99",
    pocOriginalPrice: "$199",
    growthPrice: 699,
    growthDisplay: "$699",
    growthOriginalPrice: "$1,000",
    pocCta: "Start my team — $99/mo",
    growthCta: "Talk to us",
  },
  agents: {
    parthasarathi: {
      monthlySavings: "$1K",
      costEquivalent: "Replaces a $1K/month project manager",
    },
    vibhishana: {
      monthlySavings: "$3K",
      costEquivalent: "Replaces a $3K/month research analyst",
    },
    vyasa: {
      monthlySavings: "$7K",
      costEquivalent: "Replaces a $7K/month content marketer",
    },
    valmiki: {
      monthlySavings: "$3.5K",
      costEquivalent: "Replaces a $3.5K/month social media manager",
    },
    sanjaya: {
      monthlySavings: "$4K",
      costEquivalent: "Replaces a $4K/month lead researcher",
    },
  },
  comparisonLine:
    "vs $5K/month for a content marketer. vs $10K/month for an agency.",
  rationale:
    "Based on US median salaries for equivalent roles (project manager, research analyst, content marketer) from Glassdoor and Bureau of Labor Statistics data.",
};

const IN_CONFIG: GeoSavingsConfig = {
  currencySymbol: "₹",
  totalMonthly: 230000,
  totalDisplay: "₹2.3L/mo",
  pricing: {
    pocPrice: 9999,
    pocDisplay: "₹9,999",
    pocOriginalPrice: "₹17,999",
    growthPrice: 65000,
    growthDisplay: "₹65,000",
    growthOriginalPrice: "₹90,000",
    pocCta: "Start my team — ₹9,999/mo",
    growthCta: "Talk to us",
  },
  agents: {
    parthasarathi: {
      monthlySavings: "₹10K",
      costEquivalent: "Replaces a ₹10K/month project manager",
    },
    vibhishana: {
      monthlySavings: "₹40K",
      costEquivalent: "Replaces a ₹40K/month research analyst",
    },
    vyasa: {
      monthlySavings: "₹1.6L",
      costEquivalent: "Replaces a ₹1.6L/month content marketer",
    },
    valmiki: {
      monthlySavings: "₹50K",
      costEquivalent: "Replaces a ₹50K/month social media manager",
    },
    sanjaya: {
      monthlySavings: "₹60K",
      costEquivalent: "Replaces a ₹60K/month lead researcher",
    },
  },
  comparisonLine:
    "vs ₹40K/month for a content writer. vs ₹1.5L/month for an agency.",
  rationale:
    "Based on Indian median salaries for equivalent roles from Glassdoor India and Naukri data for Tier-1 cities.",
};

export function getGeoConfig(region: GeoRegion): GeoSavingsConfig {
  return region === "IN" ? IN_CONFIG : INTL_CONFIG;
}

export function calculateCostSaved(
  stats: { questions: number; briefs: number; blogs: number },
  region: GeoRegion
): number {
  const { questions: q, briefs: b, blogs: bl } = stats;
  // Scale factor: IN costs are roughly 0.2x of US costs
  const scale = region === "IN" ? 0.2 : 1;
  return Math.round(
    ((q / 50) * 112.5 + b * 180 + bl * 300 + 5 * 180) * scale
  );
}

export function calculateHoursSaved(stats: {
  questions: number;
  briefs: number;
  blogs: number;
}): number {
  const { questions: q, briefs: b, blogs: bl } = stats;
  return Math.round((q / 50) * 2.5 + b * 4 + bl * 4 + 5 * 3);
}

export function formatCurrency(amount: number, region: GeoRegion): string {
  if (region === "IN") {
    return "₹" + amount.toLocaleString("en-IN");
  }
  return "$" + amount.toLocaleString("en-US");
}
