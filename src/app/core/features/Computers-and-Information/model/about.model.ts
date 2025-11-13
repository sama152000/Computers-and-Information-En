export interface DeanMessage {
  name: string;
  title: string;
  message: string;
  photoUrl: string;
}

export interface VisionMission {
  vision: string;
  mission: string;
}

export interface Objective {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface AdministrativeMember {
  id: number;
  name: string;
  position: string;
  photoUrl: string;
  department?: string;
}

export interface AboutTabData {
  deanMessage: DeanMessage;
  visionMission: VisionMission;
  objectives: Objective[];
  administrativeStructure: AdministrativeMember[];
}
