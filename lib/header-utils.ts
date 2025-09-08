"use client";

/**
 * Utility to check if header should be visible based on URL parameters
 * @returns boolean indicating whether header should be displayed
 */
export function shouldShowHeader(): boolean {
  if (typeof window === 'undefined') return false;
  const urlParams = new URLSearchParams(window.location.search);
  const embedParam = urlParams.get('embed') ?? urlParams.get('embedded');
  const headerParam = urlParams.get('showHeader');

  // Hide header when embedded
  if (truthyParam(embedParam)) return false;

  // If explicit showHeader is provided, respect it
  if (headerParam !== null) return truthyParam(headerParam);

  // Default: show header when not embedded
  return true;
}

/**
 * Returns true if the page is running in embedded mode (?embed=true)
 */
export function isEmbedded(): boolean {
  if (typeof window === 'undefined') return false;
  const urlParams = new URLSearchParams(window.location.search);
  const embedParam = urlParams.get('embed') ?? urlParams.get('embedded');
  return truthyParam(embedParam);
}

function truthyParam(value: string | null): boolean {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return v === 'true' || v === '1' || v === 'yes' || v === 'y' || v === 't';
}
