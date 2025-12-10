import { addMinutes, set, isBefore, addMilliseconds } from "date-fns";

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

function parseHM(day: Date, hm: string) {
  const [h, m] = hm.split(":").map(Number);
  return set(day, { hours: h, minutes: m, seconds: 0, milliseconds: 0 });
}

export function genDailySlots(dayUTC: Date) {
  // dayUTC = 00:00 UTC; pentru MVP tratăm orele ca „locale”
  const cfg = WEEKLY[dayUTC.getDay()];
  if (!cfg) return [];

  const start = parseHM(dayUTC, cfg.start);
  const end = parseHM(dayUTC, cfg.end);

  const out: { start: Date; end: Date }[] = [];
  let cur = start;
  while (isBefore(addMinutes(cur, VISIT_MIN), addMilliseconds(end, 1))) {
    const s = cur;
    const e = addMinutes(cur, VISIT_MIN + BUFFER_MIN);
    if (e > end) break;
    out.push({ start: s, end: e });
    cur = e;
  }
  return out;
}
