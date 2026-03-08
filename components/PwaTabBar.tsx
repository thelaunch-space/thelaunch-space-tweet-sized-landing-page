"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsStandalone } from "@/hooks/useIsStandalone";
import { MessageSquare, LayoutDashboard } from "lucide-react";

const tabs = [
  { href: "/agents", label: "Agents", icon: MessageSquare },
  { href: "/launch-control", label: "Launch Control", icon: LayoutDashboard },
] as const;

export default function PwaTabBar() {
  const isStandalone = useIsStandalone();
  const pathname = usePathname();

  if (!isStandalone) return null;

  // Only show on /agents* and /launch-control* routes
  const onPwaRoute = tabs.some((t) => pathname.startsWith(t.href));
  if (!onPwaRoute) return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200">
      <div className="flex h-14">
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${
                active ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-blue-500" />
              )}
              <tab.icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
      {/* iOS safe area bottom padding */}
      <div className="pb-safe" />
    </nav>
  );
}
