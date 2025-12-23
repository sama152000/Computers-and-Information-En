/**
 * Application-wide Constants
 */

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE_NUMBER: 1,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
} as const;

// Cache keys
export const CACHE_KEYS = {
  CENTERS: 'centers',
  NEWS: 'news',
  EVENTS: 'events',
  DEPARTMENTS: 'departments',
  FACULTIES: 'faculties',
} as const;

// UI constants
export const UI_CONSTANTS = {
  DEBOUNCE_TIME: 500, // milliseconds
  SCROLL_TOP_THRESHOLD: 300, // pixels
  TOAST_DURATION: 3000, // milliseconds
  ANIMATION_DURATION: 300, // milliseconds
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  CENTERS: '/centers',
  CENTER_DETAILS: '/centers/:id',
  NEWS: '/news',
  NEWS_DETAILS: '/news/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  FACULTIES: '/faculties',
  DEPARTMENTS: '/departments',
} as const;
