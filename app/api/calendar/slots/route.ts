import { NextResponse } from "next/server";
import { getAvailableSlots, getExpandedSlots } from "@/lib/google-calendar";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const expanded = searchParams.get("expanded") === "true";

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date format. Use YYYY-MM-DD." }, { status: 400 });
  }

  // Validate date is within next 14 days
  const now = new Date();
  const target = new Date(date + "T00:00:00");
  const diffDays = (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays < 0 || diffDays > 14) {
    return NextResponse.json({ error: "Date must be within the next 14 days." }, { status: 400 });
  }

  try {
    const slots = expanded
      ? await getExpandedSlots(date)
      : await getAvailableSlots(date);

    return NextResponse.json({ slots, expanded, fallback: false });
  } catch (err) {
    console.error("Calendar API error:", err);

    // Fallback: return all primary-window candidates without filtering
    const [y, m, d] = date.split("-").map(Number);
    const dow = new Date(y, m - 1, d).getDay();
    const fallbackSlots =
      dow === 0 || dow === 6
        ? ["15:00"]
        : ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

    return NextResponse.json({ slots: fallbackSlots, expanded: false, fallback: true });
  }
}
