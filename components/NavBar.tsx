"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin } from "lucide-react";
import XIcon from "@/components/XIcon";

export default function NavBar() {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blogs");

  return (
    <nav className="bg-background/80 backdrop-blur-sm z-50 px-6 md:px-10 lg:px-16 py-3">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Link href="/">
          <img
            src="/logo.png"
            alt="thelaunch.space"
            className="h-12 md:h-14 w-auto"
          />
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/blogs"
            className={`text-sm font-medium transition-colors ${
              isBlog
                ? "text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Blog
          </Link>
          <a
            href="https://x.com/nkgoutham"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary"
          >
            <XIcon size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/krishna-goutham/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}
