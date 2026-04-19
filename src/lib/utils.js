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
/**
 * Prepends the assets CDN domain to a backend-relative image path.
 * Absolute URLs and local /images/ or /svg/ paths are returned unchanged.
 */
export function getAssetUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('/images/') || path.startsWith('/svg/')) return path
  return `https://assets.torgoniizam.mn/${path.startsWith('/') ? path.slice(1) : path}`
}

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