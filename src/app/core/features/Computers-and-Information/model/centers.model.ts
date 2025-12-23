export interface Center {
  id: string;
  aboutId?: string;
  pageId?: string;
  centerName: string;
  centerNameEn?: string;
  subTitle?: string;
  place?: string;
  about?: string;
  mission?: string;
  vision?: string;
  goals?: Goal[];
  centerAttachments?: CenterAttachment[];
}

export interface CenterAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  centerId: string;
}
export interface Goal {
  goalName?: string;
  id?: string;
  aboutId?: string;
}
