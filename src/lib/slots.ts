export const VISIT_MIN = 30;
export const BUFFER_MIN = 0;

const WEEKLY: Record<number, { start: string; end: string } | null> = {
  0: null,
  1: { start: "08:30", end: "17:30" },
  2: { start: "08:30", end: "17:30" },
  3: { start: "08:30", end: "17:30" },
  4: { start: "08:30", end: "17:30" },
  5: { start: "08:30", end: "17:30" },
  6: { start: "09:00", end: "13:30" },
};

/**
 * Creates a UTC Date that corresponds to the given "HH:mm" time in Europe/Bucharest
 * for the specified day (which likely holds YYYY-MM-DD).
 */
function createZonedDate(baseDate: Date, timeStr: string): Date {
  const [h, m] = timeStr.split(":").map(Number);

  // 1. Construct an ISO string "YYYY-MM-DDTHH:mm:00.000" (wall clock time)
  // We assume baseDate is correct YYYY-MM-DD.
  const year = baseDate.getFullYear();
  const month = String(baseDate.getMonth() + 1).padStart(2, "0");
  const day = String(baseDate.getDate()).padStart(2, "0");
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");

  const isoWall = `${year}-${month}-${day}T${hh}:${mm}:00.000`;

  // 2. Find the offset for this specific time in Bucharest.
  // We accept that "date-fns-tz" isn't here, so we do a small trick or manual check.
  // Actually, easiest robust way without libs in Node/Browser is:
  // Create a date assuming UTC, then measure the diff when formatted to Bucharest.

  // Tentatively interpret as UTC to get a stable epoch
  const tentative = new Date(isoWall + "Z");

  // Get what "tentative" looks like in Bucharest
  // e.g. "8:30 AM" or similar.
  const roTimeStr = tentative.toLocaleTimeString("en-US", {
    timeZone: "Europe/Bucharest",
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  });

  // Calculate difference between target "HH:mm" and observed roTimeStr
  // If target is 08:30 and roTimeStr is 10:30 (because tentative was 08:30 UTC),
  // it means Bucharest is +2h ahead of UTC.
  // So we need to subtract 2h from tentative to get the correct UTC moment.

  const [roH, roM] = roTimeStr.split(":").map(Number);

  // Difference in minutes
  // (roH, roM) is what 08:30 UTC looks like in RO.
  // We want the resulting UTC to *be* 08:30 RO.
  // If 08:30 UTC -> 10:30 RO, then Offset is +120min.
  // To get 08:30 RO, we need 06:30 UTC.
  // 06:30 UTC = 08:30 UTC - 120min.

  let diffMinutes = (roH * 60 + roM) - (h * 60 + m);

  // Handle day wrap cases roughly (if diff > 12h, reversed)
  if (diffMinutes > 720) diffMinutes -= 1440;
  if (diffMinutes < -720) diffMinutes += 1440;

  // Apply correction
  const correctTime = new Date(tentative.getTime() - diffMinutes * 60000);
  return correctTime;
}


import { addMinutes, isBefore, addMilliseconds } from "date-fns";

export function genDailySlots(dayUTC: Date) {
  // dayUTC is expected to be roughly the start of the day (e.g. 00:00 UTC).
  // We use it to identify the "day of week" and "Y-M-D".
  // Note: If dayUTC is 2024-05-10T00:00:00Z, getDay() might be different based on timezone if we used local methods.
  // But usage suggests we pass a specific date.

  const dow = dayUTC.getDay();
  const cfg = WEEKLY[dow];
  if (!cfg) return [];

  // Generate start/end for this day in correct timezone
  const start = createZonedDate(dayUTC, cfg.start);
  const end = createZonedDate(dayUTC, cfg.end);

  const out: { start: Date; end: Date }[] = [];
  let cur = start;

  // Safety break to prevent infinite loops if something is wrong
  let safety = 0;
  while (isBefore(addMinutes(cur, VISIT_MIN), addMilliseconds(end, 1)) && safety < 100) {
    const s = cur;
    const e = addMinutes(cur, VISIT_MIN + BUFFER_MIN);
    if (e > end) break;
    out.push({ start: s, end: e });
    cur = e;
    safety++;
  }
  return out;
}
