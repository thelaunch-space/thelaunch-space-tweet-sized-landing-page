import { google } from "googleapis";

function getCalendarClient() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not set");

  const key = JSON.parse(keyJson);
  const auth = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
    subject: process.env.GOOGLE_CALENDAR_ID || "krishna@thelaunch.space",
  });

  return google.calendar({ version: "v3", auth });
}

/** Mon-Fri: 16-23 IST, Sat-Sun: 15 only */
function getPrimaryCandidates(dateISO: string): string[] {
  const [y, m, d] = dateISO.split("-").map(Number);
  const dow = new Date(y, m - 1, d).getDay(); // 0=Sun, 6=Sat
  if (dow === 0 || dow === 6) return ["15:00"];
  return ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
}

/** Every hour 0-23 IST */
function getAllCandidates(): string[] {
  return Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
}

function istToUTC(dateISO: string, timeIST: string): Date {
  const [h, m] = timeIST.split(":").map(Number);
  const [y, mo, d] = dateISO.split("-").map(Number);
  // IST = UTC+5:30
  return new Date(Date.UTC(y, mo - 1, d, h - 5, m - 30));
}

async function getBusyPeriods(dateISO: string): Promise<{ start: Date; end: Date }[]> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "krishna@thelaunch.space";

  // Query full day in UTC
  const dayStart = istToUTC(dateISO, "00:00");
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      timeZone: "Asia/Kolkata",
      items: [{ id: calendarId }],
    },
  });

  const busy = res.data.calendars?.[calendarId]?.busy || [];
  return busy.map((b) => ({
    start: new Date(b.start!),
    end: new Date(b.end!),
  }));
}

function filterAvailable(dateISO: string, candidates: string[], busy: { start: Date; end: Date }[]): string[] {
  const now = new Date();
  return candidates.filter((time) => {
    const slotStart = istToUTC(dateISO, time);
    const slotEnd = new Date(slotStart.getTime() + 25 * 60 * 1000); // 25 min

    // Skip past slots
    if (slotStart <= now) return false;

    // Check overlap with any busy period
    return !busy.some((b) => slotStart < b.end && slotEnd > b.start);
  });
}

export async function getAvailableSlots(dateISO: string): Promise<string[]> {
  const candidates = getPrimaryCandidates(dateISO);
  const busy = await getBusyPeriods(dateISO);
  return filterAvailable(dateISO, candidates, busy);
}

export async function getExpandedSlots(dateISO: string): Promise<string[]> {
  const primary = new Set(getPrimaryCandidates(dateISO));
  const allCandidates = getAllCandidates().filter((t) => !primary.has(t));
  const busy = await getBusyPeriods(dateISO);
  return filterAvailable(dateISO, allCandidates, busy);
}

export async function createBookingEvent({
  date,
  timeIST,
  email,
  companyName,
}: {
  date: string;
  timeIST: string;
  email: string;
  companyName: string;
}): Promise<string> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "krishna@thelaunch.space";

  const start = istToUTC(date, timeIST);
  const end = new Date(start.getTime() + 25 * 60 * 1000);

  const res = await calendar.events.insert({
    calendarId,
    sendUpdates: "all",
    requestBody: {
      summary: `thelaunch.space \u2014 ${companyName}`,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      attendees: [
        { email: calendarId },
        { email },
      ],
    },
  });

  return res.data.id!;
}
