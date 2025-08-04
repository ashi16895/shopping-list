// Application Constants
export const APP_CONFIG = {
  NEW_ITEM_TIMEOUT: 5000,
  ITEMS_PER_PAGE: 20,
  MAX_ITEMS_DISPLAY: 1000,
  DEFAULT_DATE_FORMAT: 'YYYY-MM-DD',
  SUPPORTED_EXPORT_FORMATS: ['csv', 'json'] as const,
} as const;

// Exchange Rates Configuration
export const EXCHANGE_RATES = {
  USD: 1,
  INR: 83.12,
} as const;

// UI Constants
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC_ERROR: 'An unexpected error occurred',
  NETWORK_ERROR: 'Network connection failed',
  VALIDATION_ERROR: 'Please check your input',
  EXPORT_ERROR: 'Failed to export data',
  CHART_ERROR: 'Unable to load chart data',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  ITEM_ADDED: 'Item added successfully!',
  ITEM_UPDATED: 'Item updated successfully!',
  DATA_EXPORTED: 'Data exported successfully!',
} as const;