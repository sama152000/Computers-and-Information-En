// src/app/model/unit.model.ts
export interface Unit {
  id: string;
  name: string;
  description?: string;
  establishmentInfo?: string;
  vision?: string;
  mission?: string;
  objectives?: string[];
  researchAreas?: string[];
  researchGrants?: ResearchGrant[];
  organizationalStructure?: string[];
  teachingStaff?: UnitMember[];
  teachingAssistants?: UnitMember[];
  administrativeStaff?: UnitMember[];
  supervisor?: UnitMember;
  director?: UnitMember;
  deputyDirector?: UnitMember;
  members?: UnitMember[];
  administrativeMember?: UnitMember;
  subCommittees?: SubCommittee[];
  contactInfo?: ContactInfo;
}

export interface UnitMember {
  name: string;
  department?: string;
  position: string;
  phone?: string;
  email?: string;
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

export interface UnitSection {
  id: string;
  title: string;
  titleAr?: string;
  icon: string;
  route: string;
}
