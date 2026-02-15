import type { Metadata } from "next";
import LaunchControlDashboard from "@/components/launch-control/LaunchControlDashboard";

export const metadata: Metadata = {
  title: "Launch Control | thelaunch.space",
  description:
    "Watch 5 AI agents work in real time — scanning communities, creating research briefs, and publishing SEO blogs. Live dashboard powered by OpenClaw.",
  openGraph: {
    title: "Launch Control | thelaunch.space",
    description:
      "Watch 5 AI agents work in real time — scanning communities, creating research briefs, and publishing SEO blogs.",
    url: "https://thelaunch.space/launch-control",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Launch Control — AI agents working in real time",
      },
    ],
  },
};

export default function LaunchControlPage() {
  return <LaunchControlDashboard />;
}
