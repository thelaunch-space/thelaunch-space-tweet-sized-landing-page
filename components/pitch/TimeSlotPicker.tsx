"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeSlotPickerProps {
  onSelect: (date: string, timeIST: string, isCustom: boolean) => void;
  onBack: () => void;
  prefetchCache?: Record<string, string[]>;
}

function getNext7Days(): { iso: string; label: string; dayName: string }[] {
  const days: { iso: string; label: string; dayName: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().split("T")[0];
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    days.push({ iso, label, dayName });
  }
  return days;
}

function istToLocal(dateISO: string, timeIST: string): { time: string; dateDiffers: boolean; localDate: string } {
  const [h, m] = timeIST.split(":").map(Number);
  const [year, month, day] = dateISO.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day, h - 5, m - 30));

  const localTime = utc.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const localDateStr = utc.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const dateDiffers = utc.toISOString().split("T")[0] !== dateISO;

  return { time: localTime, dateDiffers, localDate: localDateStr };
}

function formatISTTime(time: string): string {
  const [h] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}:00 ${period}`;
}

export default function TimeSlotPicker({ onSelect, onBack, prefetchCache }: TimeSlotPickerProps) {
  const days = useMemo(() => getNext7Days(), []);
  const [selectedDate, setSelectedDate] = useState(days[0].iso);

  const [slots, setSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setIsFallback] = useState(false);

  const [showExpanded, setShowExpanded] = useState(false);
  const [expandedSlots, setExpandedSlots] = useState<string[]>([]);
  const [expandedLoading, setExpandedLoading] = useState(false);

  const userTimezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ");
    } catch {
      return "your local time";
    }
  }, []);

  const fetchSlots = useCallback(async (date: string) => {
    setShowExpanded(false);
    setExpandedSlots([]);

    // Use prefetch cache if available
    if (prefetchCache?.[date]) {
      setSlots(prefetchCache[date]);
      setIsFallback(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/calendar/slots?date=${date}`);
      const data = await res.json();
      setSlots(data.slots || []);
      setIsFallback(data.fallback || false);
    } catch {
      setSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, [prefetchCache]);

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate, fetchSlots]);

  const handleExpandedClick = async () => {
    setExpandedLoading(true);
    try {
      const res = await fetch(`/api/calendar/slots?date=${selectedDate}&expanded=true`);
      const data = await res.json();
      setExpandedSlots(data.slots || []);
      setShowExpanded(true);
    } catch {
      setExpandedSlots([]);
      setShowExpanded(true);
    } finally {
      setExpandedLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="text-xs text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to details
      </button>

      {/* Date pills */}
      <div>
        <p className="text-sm font-medium text-text-secondary mb-2.5">Pick a day</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
          {days.map((day) => (
            <button
              key={day.iso}
              onClick={() => setSelectedDate(day.iso)}
              className={`flex flex-col items-center px-3.5 py-2 rounded-xl border transition-all shrink-0 ${
                selectedDate === day.iso
                  ? "border-accent-blue bg-accent-blue/5 text-accent-blue shadow-sm"
                  : "border-border-color/40 text-text-secondary hover:border-accent-blue/30 hover:text-text-primary"
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider">{day.dayName}</span>
              <span className="text-sm font-semibold mt-0.5">{day.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <p className="text-sm font-medium text-text-secondary mb-1">Pick a time</p>
        <p className="text-[11px] text-text-secondary/70 mb-3">
          IST times shown with {userTimezone} equivalent
        </p>

        {isLoading ? (
          /* Skeleton loader */
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-3 rounded-xl border border-border-color/20 animate-pulse"
              >
                <div className="h-4 w-20 bg-border-color/20 rounded" />
                <div className="h-3 w-16 bg-border-color/10 rounded mt-1.5" />
              </div>
            ))}
          </div>
        ) : slots.length === 0 ? (
          /* Empty state */
          <div className="text-center py-6 text-sm text-text-secondary">
            No available times on this day. Try another day or request a custom time below.
          </div>
        ) : (
          /* Slot cards */
          <div className="grid grid-cols-2 gap-2">
            {slots.map((slot) => {
              const local = istToLocal(selectedDate, slot);
              return (
                <button
                  key={slot}
                  onClick={() => onSelect(selectedDate, slot, false)}
                  className="group flex flex-col items-center p-3 rounded-xl border border-border-color/40 hover:border-accent-blue hover:bg-accent-blue/5 transition-all text-left"
                >
                  <span className="text-sm font-semibold text-text-primary group-hover:text-accent-blue transition-colors">
                    {formatISTTime(slot)} IST
                  </span>
                  <span className="text-[11px] text-text-secondary mt-0.5">
                    {local.time}{local.dateDiffers ? ` (${local.localDate})` : ""}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Expanded slots / "None of these work?" */}
      {!isLoading && (
        <div>
          {!showExpanded ? (
            <button
              onClick={handleExpandedClick}
              disabled={expandedLoading}
              className="text-xs text-accent-blue hover:text-accent-purple transition-colors disabled:opacity-50"
            >
              {expandedLoading ? "Loading more times..." : "None of these work?"}
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2.5"
              >
                <p className="text-xs text-text-secondary">Other available times:</p>
                {expandedSlots.length === 0 ? (
                  <p className="text-xs text-text-secondary/70">No other times available on this day.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
                    {expandedSlots.map((slot) => {
                      const local = istToLocal(selectedDate, slot);
                      return (
                        <button
                          key={slot}
                          onClick={() => onSelect(selectedDate, slot, true)}
                          className="group flex flex-col items-center p-3 rounded-xl border border-border-color/30 border-dashed hover:border-accent-blue hover:bg-accent-blue/5 transition-all text-left relative"
                        >
                          <span className="text-sm font-semibold text-text-primary group-hover:text-accent-blue transition-colors">
                            {formatISTTime(slot)} IST
                          </span>
                          <span className="text-[11px] text-text-secondary mt-0.5">
                            {local.time}{local.dateDiffers ? ` (${local.localDate})` : ""}
                          </span>
                          <span className="text-[9px] text-accent-purple/70 mt-1">Outside regular hours</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                <p className="text-[10px] text-text-secondary/60">
                  Krishna will confirm times outside regular hours within 24h.
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}
    </motion.div>
  );
}
