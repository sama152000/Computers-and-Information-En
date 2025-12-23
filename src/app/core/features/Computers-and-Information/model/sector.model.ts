// export interface Sector {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
//   overview: string;
//   responsibilities: string[];
//   departments: string[];
//   services: string[];
//   head?: string;
//   establishedYear?: number;
//   staffCount?: number;
//   budget?: string;
//   achievements: string[];
//   goals: string[];
// }

// ==================== SECTOR MODELS ====================

export interface Goal {
  id: string;
  index: number;
  goalName: string;
  sectorId: string;
}

export interface SectorAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  isFeatured: boolean;
  sectorId: string;
}

export interface Sector {
  id: string;
  name: string;
  subTitle: string;
  pageId: string;
  pageTitle: string;
  aboutId: string;
  about: string;
  mission: string;
  vision: string;
  goals: Goal[];
  sectorAttachments: SectorAttachment[];
}

// ==================== SECTOR DETAILS ====================
export interface SectorDetail {
  id: string;
  content: string;
  title: string;
  sectorId: string;
  sectorName: string;
}

// ==================== SECTOR MEMBER ====================
export interface SectorMember {
  id: string;
  isLeader: boolean;
  sectorId: string;
  sectorName: string;
  memberId: string;
  memberName: string;
}

// ==================== SECTOR POSTS ====================
export interface SectorPost {
  id: string;
  sectorId: string;
  sectorName: string;
  postId: string;
  postName: string;
}

// ==================== SECTOR PROGRAMS ====================
export interface SectorProgram {
  id: string;
  name: string;
  sectorId: string;
  sectorName: string;
  programId: string;
  programName: string;
}

// ==================== SECTOR SERVICES ====================
export interface SectorService {
  id: string;
  name: string;
  details: string;
  duration: string;
  applicationUrl: string;
  downloadUrl: string;
  isOnline: boolean;
  category: string;
  fees: number;
  contactPerson: string;
  contactPhone: string;
  sectorId: string;
  sectorName: string;
}

// ==================== SECTOR UNITS ====================
export interface SectorUnit {
  id: string;
  unitNameAr: string | null;
  unitDescriptionAr: string | null;
  email: string;
  employeesCount: number;
  location: string;
  unitPhone: string;
  memberId: string;
  memberName: string;
  unitId: string;
  unitName: string;
  managementId: string;
  managementName: string;
  sectorId: string;
  sectorName: string;
}
