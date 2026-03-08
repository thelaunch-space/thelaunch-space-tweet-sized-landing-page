import { NextResponse } from "next/server";
import { createBookingEvent } from "@/lib/google-calendar";

export async function POST(request: Request) {
  try {
    const { date, timeIST, email, companyName } = await request.json();

    if (!date || !timeIST || !email || !companyName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const eventId = await createBookingEvent({ date, timeIST, email, companyName });
    return NextResponse.json({ success: true, eventId });
  } catch (err) {
    console.error("Calendar booking error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to create calendar event." },
      { status: 500 }
    );
  }
}
