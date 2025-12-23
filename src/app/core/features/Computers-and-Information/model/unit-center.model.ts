export interface UnitCenter {
  id: string;
  name: string;
  type: 'unit' | 'center';
  description: string;
  icon: string;
  overview: string;
  objectives: string[];
  services: string[];
  facilities: string[];
  director?: string;
  establishedYear?: number;
  location?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  isActive: boolean;
}