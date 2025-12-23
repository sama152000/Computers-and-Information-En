export interface AboutUsData {
  id: number;
  title: string;
  description?: string;
  mission?: string;
  vision?: string;
  objectives?: string[];
  history?: string;
  messageFromDean?: string;
  deanName?: string;
  deanTitle?: string;
  deanImage?: string;
  establishedYear?: number;
  achievements?: string[];
}

export interface QuickNavItem {
  id: string;
  label: string;
  route: string;
  icon: string;
  color: string;
}