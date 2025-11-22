export interface NewsItem {
  id: number;
  type: 'news' | 'event';
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  content: string;
  contentAr?: string;
  imageUrl: string;
  date: Date;
  author: string;
  authorAr?: string;
  category: string;
  categoryAr?: string;
  featured?: boolean;
  tags?: string[];
  views?: number;
}

export interface NewsFilter {
  type?: 'news' | 'event' | 'all';
  category?: string;
  searchTerm?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface NewsResponse {
  items: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: Date;
  category: string;
}