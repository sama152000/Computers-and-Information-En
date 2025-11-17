// src/app/model/sector.model.ts
export interface Sector {
  id: string;
  name: string;
  description: string;
  headOfDepartment: SectorMember;
  establishmentYear?: string;
  vision?: string;
  mission?: string;
  objectives?: string[];
  researchAreas?: string[];
  programs?: string[];
  staff?: SectorMember[];
  labs?: string[];
  contactInfo?: ContactInfo;
}

export interface SectorMember {
  name: string;
  position: string;
  email?: string;
  phone?: string;
  office?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
}

export interface SectorSection {
  id: string;
  title: string;
  icon: string;
  route: string;
}