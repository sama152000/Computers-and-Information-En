/**
 * Contact Model
 * Matches the API response structure for contact information
 */

/**
 * Contact Info Interface - matches API response
 */
export interface ContactInfo {
  id: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  youTube: string;
  whatsApp: string;
  mapLocation: string;
  webSite: string;
  fax: string;
}

/**
 * Social Media Link interface for component use
 */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
