// src/app/model/contact.model.ts
export interface ContactInfo {
  address: string;
  phone: string[];
  fax?: string;
  email: string;
  workingHours: string;
  googleMapsLink: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface DepartmentContact {
  name: string;
  phone?: string;
  email?: string;
  location?: string;
}