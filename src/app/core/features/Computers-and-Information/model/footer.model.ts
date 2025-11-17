export interface FooterLink {
  id: number;
  label: string;
  route: string;
  external?: boolean;
  icon?: string;
}

export interface FooterSection {
  id: number;
  title: string;
  links: FooterLink[];
}

export interface SocialMediaLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  address: string;
  addressAr?: string;
  phone: string;
  email: string;
  workingHours: string;
  workingHoursAr?: string;
}

export interface FooterData {
  sections: FooterSection[];
  socialMedia: SocialMediaLink[];
  contactInfo: ContactInfo;
  copyright: string;
  copyrightAr?: string;
}
