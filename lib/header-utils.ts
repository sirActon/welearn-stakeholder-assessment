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
  const headerParam = urlParams.get('showHeader');
  
  return headerParam === 'true';
}
