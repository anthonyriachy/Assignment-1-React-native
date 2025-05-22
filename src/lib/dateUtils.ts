/**
 * Utility functions for date manipulation and formatting
 */

/**
 * Transforms an ISO date string into a relative time string (e.g., "today", "18 days ago", "1 month ago", "1 year ago")
 * @param isoDate - The ISO date string (e.g., "2025-05-19T06:12:58.855Z")
 * @returns A string representing the relative time
 */
export const getRelativeTime = (isoDate: string): string => {
  const now = new Date();
  const pastDate = new Date(isoDate);
  
  // Calculate the difference in milliseconds
  const diffInMs = now.getTime() - pastDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Check if the date is from today
  if (diffInDays <=0) {
    return 'today';
  }

  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

/**
 * Formats a date into a relative time string with a minimum unit
 * @param date - The date to transform
 * @param minUnit - The minimum time unit to display (e.g., 'day' will not show hours/minutes)
 * @returns A string representing the relative time
 */
export const getRelativeTimeStringWithMinUnit = (
  date: Date | string | number,
  minUnit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' = 'minute'
): string => {
  const now = new Date();
  const pastDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  // Get the minimum seconds for the specified unit
  const minSeconds = intervals[minUnit];

  // If the difference is less than the minimum unit, return the minimum unit
  if (diffInSeconds < minSeconds) {
    return `less than 1 ${minUnit} ago`;
  }

  // Find the appropriate interval
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const diff = Math.floor(diffInSeconds / secondsInUnit);
    
    if (diff >= 1) {
      return `${diff} ${unit}${diff === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
};

/**
 * Checks if a date is from today
 * @param date - The date to check
 * @returns boolean indicating if the date is from today
 */
export const isToday = (date: Date | string | number): boolean => {
  const today = new Date();
  const checkDate = new Date(date);
  
  return checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear();
};

/**
 * Checks if a date is from yesterday
 * @param date - The date to check
 * @returns boolean indicating if the date is from yesterday
 */
export const isYesterday = (date: Date | string | number): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const checkDate = new Date(date);
  
  return checkDate.getDate() === yesterday.getDate() &&
    checkDate.getMonth() === yesterday.getMonth() &&
    checkDate.getFullYear() === yesterday.getFullYear();
}; 