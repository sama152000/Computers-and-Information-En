// src/app/core/features/Luxor-university/model/management.model.ts
export interface ManagementAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  managementId: string;
}

export interface Management {
  id: string;
  pageId: string;
  managementTitle: string;
  managementTitleEn: string;
  aboutId: string;
  content: string;
  mission: string;
  vision: string;
  goals: string[];
  history: string;
  managementAttachments: ManagementAttachment[];
}

export interface ManagementMember {
  id: string;
  isLeader: boolean;
  managementId: string;
  managementTitle: string;
  memberId: string;
  memberName: string;
}

export interface ManagementDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  managementId: string;
  managementTitle: string;
}
