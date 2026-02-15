"use client";

import { useState } from "react";
import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs";

const ADMIN_EMAIL = "krishna@thelaunch.space";

type State = "idle" | "submitting" | "waitlisted" | "admin";

export default function WaitlistCTA() {
  const { isSignedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  // Hide entirely when signed in
  if (isSignedIn) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === ADMIN_EMAIL) {
      setState("admin");
      return;
    }

    setState("submitting");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source: "launch-control-waitlist",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Silent fail
    }
    setState("waitlisted");
  }

  return (
    <div className="rounded-xl border border-border-color/40 bg-surface px-4 py-4 shrink-0">
      {state === "idle" || state === "submitting" ? (
        <>
          <p className="text-xs text-text-secondary mb-2 text-center">
            Want an AI team like this?
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-1.5">
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 text-sm px-3 py-2 sm:py-1.5 rounded-lg border border-border-color/40 bg-white text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-blue/50 transition-colors"
            />
            <button
              type="submit"
              disabled={state === "submitting"}
              className="text-xs font-semibold px-3 py-2 sm:py-1.5 rounded-lg bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {state === "submitting" ? "..." : "Join Waitlist"}
            </button>
          </form>
        </>
      ) : state === "waitlisted" ? (
        <div className="text-center py-1">
          <p className="text-sm font-medium text-accent-emerald">
            You&apos;re on the list!
          </p>
          <p className="text-xs text-text-secondary mt-1">
            We&apos;ll reach out when spots open up.
          </p>
        </div>
      ) : state === "admin" ? (
        <div className="space-y-2 text-center">
          <p className="text-xs text-text-secondary">Welcome back.</p>
          <div className="flex gap-2 justify-center">
            <SignInButton mode="modal">
              <button className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-xs font-semibold px-4 py-1.5 rounded-lg border border-border-color/40 text-text-primary hover:bg-surface-alt transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
