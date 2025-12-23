export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  overview: string;
  vision: string;
  mission: string;
  programs?: string[];
  objectives: string[];
  courses: string[];
  researchAreas: string[];
  headOfDepartment?: string;
  establishedYear?: number;
  studentCount?: number;
  facultyCount?: number;
}
