/**
 * Member Model
 * Defines interfaces for member-related data structures
 */

/**
 * Member Attachment Interface
 */
export interface MemberAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  memberId: string;
}

/**
 * Member Type Enum
 */
export type MemberType =
  | 'President'
  | 'Sector'
  | 'Department'
  | 'Program'
  | 'Management';

/**
 * Member Interface
 */
export interface Member {
  id: string;
  isPresident: boolean;
  fullName: string;
  position: string;
  specialization: string;
  pageId: string;
  memberType: MemberType;
  memberAttachments: MemberAttachment[];
}
