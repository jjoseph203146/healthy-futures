export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function parseTimeToMinutes(t: string): number {
  const m = t.trim().match(/^(\d{1,2})(?::(\d{2}))?([ap]m)$/i);
  if (!m) return -1;
  let h = parseInt(m[1]);
  const min = parseInt(m[2] ?? "0");
  const ap = m[3].toLowerCase();
  if (ap === "pm" && h !== 12) h += 12;
  if (ap === "am" && h === 12) h = 0;
  return h * 60 + min;
}

export function isBusinessOpen(hours: Record<string, string> | null): boolean {
  if (!hours) return false;

  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(now);

  const day = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hourStr = parts.find((p) => p.type === "hour")?.value ?? "0";
  const minStr = parts.find((p) => p.type === "minute")?.value ?? "00";
  const period = parts.find((p) => p.type === "dayPeriod")?.value?.toLowerCase() ?? "am";

  let h = parseInt(hourStr);
  if (period === "pm" && h !== 12) h += 12;
  if (period === "am" && h === 12) h = 0;
  const currentMin = h * 60 + parseInt(minStr);

  const todayStr = hours[day];
  if (!todayStr || todayStr.toLowerCase() === "closed") return false;

  // handles en-dash (–) or regular hyphen
  const normalized = todayStr.replace(/–/g, "-");
  const dashIdx = normalized.indexOf("-");
  if (dashIdx === -1) return false;

  const open = parseTimeToMinutes(normalized.substring(0, dashIdx).trim());
  const close = parseTimeToMinutes(normalized.substring(dashIdx + 1).trim());
  if (open === -1 || close === -1) return false;

  return currentMin >= open && currentMin < close;
}
