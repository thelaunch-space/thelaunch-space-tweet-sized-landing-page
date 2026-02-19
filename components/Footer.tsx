"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hidden on Launch Control (same as NavBar)
  if (pathname.startsWith("/launch-control")) return null;

  return (
    <footer className="border-t border-border-color">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary">
        <span>&copy; 2026 VAMIX Technologies Pvt Ltd</span>
        <div className="flex items-center gap-3">
          <Link href="/privacy" className="hover:text-text-primary transition-colors">
            Privacy Policy
          </Link>
          <span aria-hidden="true">&middot;</span>
          <Link href="/terms" className="hover:text-text-primary transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
