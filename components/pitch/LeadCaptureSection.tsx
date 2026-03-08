"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CHALLENGE_OPTIONS, COUNTRY_CODES } from "@/lib/pitch-data";
import TimeSlotPicker from "./TimeSlotPicker";
import { useGeo } from "@/lib/useGeo";
import { getGeoConfig, getPriceDisplay } from "@/lib/geo-savings";

type Step = "contact" | "time" | "success";

interface BookingData {
  selectedDate: string;
  selectedTimeIST: string;
  isCustomTime: boolean;
  googleEventId?: string;
}

/** Convert IST time to user's local display */
function istToLocalDisplay(dateISO: string, timeIST: string): string {
  const [h, m] = timeIST.split(":").map(Number);
  const [year, month, day] = dateISO.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day, h - 5, m - 30));
  return utc.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatISTDisplay(dateISO: string, timeIST: string): string {
  const [year, month, day] = dateISO.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const [h] = timeIST.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}, ${displayH}:00 ${period} IST`;
}

export default function LeadCaptureSection() {
  const createBooking = useMutation(api.pitchBookings.create);
  const region = useGeo();
  const config = getGeoConfig(region);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("contact");

  // Step 1 fields
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [challenge, setChallenge] = useState("");
  const [whatsappCountryCode, setWhatsappCountryCode] = useState("+1");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  // State
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Prefetch slots for tomorrow while user fills the form
  const prefetchCache = useRef<Record<string, string[]>>({});
  const prefetchDone = useRef(false);

  const getDefaultDate = useCallback(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    if (prefetchDone.current) return;
    prefetchDone.current = true;
    // Delay prefetch so it doesn't block initial page render
    const timer = setTimeout(() => {
      const date = getDefaultDate();
      fetch(`/api/calendar/slots?date=${date}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.slots) prefetchCache.current[date] = data.slots;
        })
        .catch(() => {});
    }, 3000);
    return () => clearTimeout(timer);
  }, [getDefaultDate]);

  // Listen for #contact hash to auto-open
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#contact") {
        setIsOpen(true);
        // Clear hash so it doesn't keep re-triggering
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    if (step === "success") {
      // Reset everything on close after success
      setStep("contact");
      setCompanyName("");
      setWebsiteUrl("");
      setEmail("");
      setChallenge("");
      setWhatsappNumber("");
      setWhatsappConsent(true);
      setBooking(null);
    }
    setIsOpen(false);
    setError("");
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!companyName.trim()) {
      setError("Please enter your company name.");
      return;
    }
    if (!websiteUrl.trim()) {
      setError("Please enter your website URL.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setStep("time");
  };

  const handleTimeSelect = async (date: string, timeIST: string, isCustom: boolean) => {
    setError("");
    setIsSubmitting(true);

    try {
      // Try to create Google Calendar event
      let googleEventId: string | undefined;
      try {
        const calRes = await fetch("/api/calendar/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            timeIST,
            email: email.trim(),
            companyName: companyName.trim(),
          }),
        });
        const calData = await calRes.json();
        if (calData.success) {
          googleEventId = calData.eventId;
        }
      } catch {
        // Calendar API failed — continue without it
      }

      await createBooking({
        companyName: companyName.trim(),
        websiteUrl: websiteUrl.trim(),
        email: email.trim(),
        contentChallenge: challenge || undefined,
        whatsappNumber: whatsappNumber.trim() || undefined,
        whatsappCountryCode: whatsappNumber.trim() ? whatsappCountryCode : undefined,
        whatsappConsent: whatsappNumber.trim() ? whatsappConsent : false,
        selectedDate: date,
        selectedTimeIST: timeIST,
        isCustomTime: isCustom,
        googleEventId,
      });

      setBooking({ selectedDate: date, selectedTimeIST: timeIST, isCustomTime: isCustom, googleEventId });
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Inline CTA anchor — replaces the old inline form */}
      <section id="contact" className="scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="font-display tracking-[-0.02em] text-2xl md:text-3xl text-text-primary">
            Get My AI Team This Week
          </h2>
          <div className="mt-3 mb-6 flex flex-col items-center gap-1.5 text-xs text-text-secondary/70">
            <span>One-time setup. You own the system.</span>
            <span>Your agents start producing within 48 hours.</span>
            <span>{getPriceDisplay(config)} &mdash; less than one freelance blog post.</span>
          </div>
          <button
            onClick={handleOpen}
            className="rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-8 py-3.5 text-sm font-semibold text-white shadow-cta hover:-translate-y-0.5 hover:shadow-cta-hover transition-all duration-300"
          >
            Book a call &rarr;
          </button>
        </motion.div>
      </section>

      {/* Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl bg-background border border-border-color/30 shadow-2xl p-6 md:p-8"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-text-secondary/60 hover:text-text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal header */}
              <div className="text-center mb-6">
                <h2 className="font-display tracking-[-0.02em] text-xl md:text-2xl text-text-primary">
                  {step === "contact" && "Book Your Setup Call"}
                  {step === "time" && "Pick a Time"}
                  {step === "success" && (booking?.isCustomTime ? "Time Requested!" : "You\u2019re Booked!")}
                </h2>
                {step === "contact" && (
                  <p className="text-xs text-text-secondary/70 mt-1.5">
                    25-min call &mdash; we&apos;ll map your content workflow and show how AI agents fit in.
                  </p>
                )}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1 — Contact Info */}
                {step === "contact" && (
                  <motion.form
                    key="contact"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="pitch-company" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Company Name
                      </label>
                      <input
                        id="pitch-company"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full p-3 bg-surface border border-border-color/40 rounded-lg text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all"
                        placeholder="Acme Corp"
                        required
                        autoFocus
                      />
                    </div>

                    <div>
                      <label htmlFor="pitch-website" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Website URL
                      </label>
                      <input
                        id="pitch-website"
                        type="text"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="w-full p-3 bg-surface border border-border-color/40 rounded-lg text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all"
                        placeholder="https://acme.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="pitch-email" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Email
                      </label>
                      <input
                        id="pitch-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-surface border border-border-color/40 rounded-lg text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all"
                        placeholder="you@company.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="pitch-challenge" className="block text-sm font-medium text-text-secondary mb-1.5">
                        What&apos;s your biggest content challenge?
                      </label>
                      <select
                        id="pitch-challenge"
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        className="w-full p-3 bg-surface border border-border-color/40 rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all"
                      >
                        <option value="">Select one...</option>
                        {CHALLENGE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* WhatsApp section */}
                    <div>
                      <label htmlFor="pitch-whatsapp" className="block text-sm font-medium text-text-secondary mb-1.5">
                        WhatsApp Number <span className="text-text-secondary/60 font-normal">(optional)</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={whatsappCountryCode}
                          onChange={(e) => setWhatsappCountryCode(e.target.value)}
                          className="w-[130px] shrink-0 p-3 bg-surface border border-border-color/40 rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all"
                        >
                          {COUNTRY_CODES.map((cc) => (
                            <option key={cc.code} value={cc.dial}>
                              {cc.label}
                            </option>
                          ))}
                        </select>
                        <input
                          id="pitch-whatsapp"
                          type="tel"
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          className="flex-1 p-3 bg-surface border border-border-color/40 rounded-lg text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all"
                          placeholder="1234567890"
                        />
                      </div>
                      {whatsappNumber.trim() && (
                        <div className="mt-2.5">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={whatsappConsent}
                              onChange={(e) => setWhatsappConsent(e.target.checked)}
                              className="mt-0.5 rounded border-border-color/40 text-accent-blue focus:ring-accent-blue/20"
                            />
                            <span className="text-xs text-text-secondary leading-relaxed">
                              I&apos;m comfortable with you reaching out on WhatsApp
                            </span>
                          </label>
                          <p className="text-[11px] text-text-secondary/60 mt-1 ml-6">
                            Totally optional — not everyone uses WhatsApp, and that&apos;s okay
                          </p>
                        </div>
                      )}
                    </div>

                    {error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 text-sm font-semibold text-white shadow-cta hover:-translate-y-0.5 hover:shadow-cta-hover transition-all duration-300"
                    >
                      Pick a time &rarr;
                    </button>
                  </motion.form>
                )}

                {/* Step 2 — Time Slot */}
                {step === "time" && (
                  <motion.div
                    key="time"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isSubmitting ? (
                      <div className="text-center py-12">
                        <div className="w-8 h-8 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin mx-auto" />
                        <p className="text-sm text-text-secondary mt-3">Booking your slot...</p>
                      </div>
                    ) : (
                      <TimeSlotPicker
                        onSelect={handleTimeSelect}
                        onBack={() => { setError(""); setStep("contact"); }}
                        prefetchCache={prefetchCache.current}
                      />
                    )}
                    {error && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm">
                        {error}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 3 — Success */}
                {step === "success" && booking && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-4"
                  >
                    <div className="w-14 h-14 bg-accent-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-7 h-7 text-accent-emerald"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-text-secondary">
                        {formatISTDisplay(booking.selectedDate, booking.selectedTimeIST)}
                      </p>
                      <p className="text-xs text-text-secondary/70">
                        {istToLocalDisplay(booking.selectedDate, booking.selectedTimeIST)} (your time)
                      </p>
                    </div>
                    <p className="text-sm text-text-secondary mt-5">
                      {booking.googleEventId && !booking.isCustomTime
                        ? `A calendar invite has been sent to ${email.trim()}.`
                        : booking.isCustomTime
                          ? `We'll confirm and send an invite to ${email.trim()} within 24 hours.`
                          : `We'll send your calendar invite to ${email.trim()} shortly.`}
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 text-sm text-accent-blue hover:text-accent-purple transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
