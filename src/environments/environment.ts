/**
 * Production Environment Configuration
 * This file contains all environment-specific settings for production
 */
export const environment = {
  production: false,
  apiUrl: 'https://computerinformationen.runasp.net/api/v1',
  apiTimeout: 30000, // 30 seconds
  enableDebugMode: true,
  cacheExpiration: 600000, // 10 minutes
};
