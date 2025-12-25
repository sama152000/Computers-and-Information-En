/**
 * Production Environment Configuration
 * This file contains all environment-specific settings for production
 */
export const environment = {
  production: true,
  apiUrl: 'https://computerinformationen.runasp.net/api/v1',
  apiTimeout: 30000, // 30 seconds
  enableDebugMode: false,
  cacheExpiration: 600000, // 10 minutes
};
