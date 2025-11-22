// src/app/model/service.model.ts
export interface Service {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  establishmentInfo?: string;
  vision?: string;
  mission?: string;
  objectives?: string[];
  servicesOffered?: string[];
  targetAudience?: string[];
  researchAreas?: string[];
  researchGrants?: ResearchGrant[];
  organizationalStructure?: string[];
  teachingStaff?: ServiceMember[];
  teachingAssistants?: ServiceMember[];
  administrativeStaff?: ServiceMember[];
  supervisor?: ServiceMember;
  director?: ServiceMember;
  deputyDirector?: ServiceMember;
  members?: ServiceMember[];
  administrativeMember?: ServiceMember;
  subCommittees?: SubCommittee[];
  coordinator?: ServiceMember;
  team?: ServiceMember[];
  contactInfo?: ContactInfo;
  workingHours?: string;
  location?: string;
  featured?: boolean;
  image?: string;
}

export interface ServiceMember {
  name: string;
  position: string;
  department?: string;
  email?: string;
  phone?: string;
  cvUrl?: string;
}

export interface SubCommittee {
  name: string;
  nameAr?: string;
  members: string[];
}

export interface ResearchGrant {
  year: string;
  title?: string;
  description?: string;
  principalInvestigator?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface ServiceSection {
  id: string;
  title: string;
  icon: string;
  route: string;
}
