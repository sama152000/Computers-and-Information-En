// src/app/model/program.model.ts
export interface Program {
  id: string;
  name: string;
  degree: string;
  duration: string;
  creditHours: number;
  description: string;
  vision?: string;
  mission?: string;
  objectives?: string[];
  admissionRequirements?: string[];
  courses?: string[];
  coordinator?: ProgramCoordinator;
  department: string;
  accreditation?: string;
  startYear: number;
}

export interface ProgramCoordinator {
  name: string;
  position: string;
  email?: string;
  phone?: string;
}

export interface ProgramSection {
  id: string;
  title: string;
  icon: string;
  route: string;
}