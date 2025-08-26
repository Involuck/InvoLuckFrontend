// Utility functions for the application

/**
 * Formats a date to a localized string
 * @param date - The date to format
 * @param locale - The locale to use for formatting (default: 'es-ES')
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale = 'es-ES'): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale to use for formatting (default: 'es-ES')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'es-ES'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}

/**
 * Truncates text to a specified length and adds an ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - The maximum length before truncation
 * @returns The truncated text with an ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Creates a debounced version of a function
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generates a unique ID
 * @returns A unique ID string
 */
export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
 * @param value - The value to check
 * @returns True if the value is empty, false otherwise
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
