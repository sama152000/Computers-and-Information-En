// event.model.ts
export interface Event {
  id: number;
  title: string;
  description: string;
  speaker?: string;
  supervisors?: string[];
  image: string;
  date: Date;
  location: string;
  category: string;
}