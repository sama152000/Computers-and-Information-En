// src/app/core/features/Luxor-university/model/deanspeech.model.ts
export interface DeanSpeechAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
}

export interface DeanSpeech {
  id: string;
  memberId: string;
  memberName: string;
  memberPosition: string;
  speech: string;
  deanSpeechAttachments: DeanSpeechAttachment[];
}
