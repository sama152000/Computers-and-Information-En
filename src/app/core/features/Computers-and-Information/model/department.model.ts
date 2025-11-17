export interface Department {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  vision: string;
  mission: string;
  objectives: string[];
  researchAreas: string[];
  administrativeStructure: AdministrativeStructure;
  organizationalStructure: string[];
  teachingStaff: StaffMember[];
  teachingAssistants: StaffMember[];
  administrativeStaff: StaffMember[];
  supervisor?: StaffMember;
  imageUrl?: string;
  establishmentInfo?: string;
  researchGrants?: ResearchGrant[];
  contactInfo: ContactInfo;
}

export interface StaffMember {
  id: string;
  name: string;
  nameAr?: string;
  position: string;
  positionAr?: string;
  email?: string;
  phone?: string;
  cvUrl?: string;
  imageUrl?: string;
  specialization?: string[];
}

export interface AdministrativeStructure {
  headOfDepartment: StaffMember;
  committees: Committee[];
}

export interface Committee {
  name: string;
  nameAr?: string;
  description?: string;
  members?: StaffMember[];
}

export interface ResearchGrant {
  year: number;
  title: string;
  principalInvestigator: string;
  status: 'ongoing' | 'completed';
  description?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface DepartmentSection {
  id: string;
  title: string;
  titleAr?: string;
  icon: string;
  route: string;
}