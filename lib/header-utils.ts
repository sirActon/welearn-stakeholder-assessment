"use client";

/**
 * Utility to check if header should be visible based on URL parameters
 * @returns boolean indicating whether header should be displayed
 */
export function shouldShowHeader(): boolean {
  // Only run on client side
  if (typeof window === 'undefined') return false;
  
  // Check for URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const embedParam = urlParams.get('embed');
  const headerParam = urlParams.get('showHeader');
  
  // If embedded, never show header
  if (embedParam === 'true') return false;
  
  return headerParam === 'true';
}

/**
 * Returns true if the page is running in embedded mode (?embed=true)
 */
export function isEmbedded(): boolean {
  if (typeof window === 'undefined') return false;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('embed') === 'true';
}
