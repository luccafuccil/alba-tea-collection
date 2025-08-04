/**
 * Centralized ID generation utilities
 */

/**
 * Generate a secure UUID for database entities
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Generate a short ID for form elements and temporary UI components
 */
export function generateShortId(prefix?: string): string {
  const id = Math.random().toString(36).substring(2, 11);
  return prefix ? `${prefix}-${id}` : id;
}

/**
 * Generate a timestamp-based ID for ordering
 */
export function generateTimestampId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
}
