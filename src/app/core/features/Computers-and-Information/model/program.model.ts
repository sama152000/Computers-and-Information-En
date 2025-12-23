// export interface Program {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
//   level: 'bachelor' | 'master' | 'phd' | 'diploma';
//   duration: string;
//   overview: string;
//   objectives: string[];
//   requirements: string[];
//   courses: string[];
//   careerOpportunities: string[];
//   admissionRequirements: string[];
//   fees?: string;
//   coordinator?: string;
//   department: string;
//   creditsRequired: number;
//   isActive: boolean;
// }

// ==================== PROGRAM MODELS ====================

export interface ProgramAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  programId: string;
}

export interface ProgramGoal {
  id: string;
  index: number;
  goalName: string;
  programId: string;
}

export interface Program {
  id: string;
  pageId: string;
  pageTitle: string;
  aboutId: string;
  about: string;
  mission: string;
  vision: string;
  goals: ProgramGoal[];
  programAttachments: ProgramAttachment[];
}

// ==================== PROGRAM DETAIL ====================
export interface ProgramDetail {
  id: string;
  title: string;
  content: string;
  programCategory: string;
  facultyId: string;
  facultyName: string;
  programId: string;
  programName: string;
}

// ==================== PROGRAM MEMBER ====================
export interface ProgramMember {
  id: string;
  isLeader: boolean;
  programId: string;
  programName: string;
  memberId: string;
  memberName: string;
}
