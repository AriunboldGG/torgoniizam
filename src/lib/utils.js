import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string into Mongolian calendar format.
 * e.g. "2026 оны 4-р сарын 11, 01:00"
 * Uses manual formatting so it works regardless of ICU locale support.
 */
export function formatMongolianDate(dateString, { includeTime = true } = {}) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const base = `${year} оны ${month}-р сарын ${day}`;
  return includeTime ? `${base}, ${hours}:${minutes}` : base;
} 