//  export interface News {
//    id: number;
//    title: string;
//    content: string;
//    excerpt: string;
//    image: string;
//    date: Date;
//    author?: string;
//    category?: string;
//    slug?: string;
//   type: 'news' | 'article';
//   tags: string[];
//   relatedIds?: number[];
//  }

export interface News {
  id: string;
  title: string;
  urlTitleEn: string;
  content: string;
  status: string;
  publishedDate?: string;
  featuredImagePath: string;
  pageId: string;
  pageTittle: string;
  createdDate: Date;
  postCategories: PostCategory[];
  postAttachments: PostAttachment[];
  tags: Tag[];
}

export interface PostCategory {
  id: string;
  postId: string;
  categoryId: string;
  categoryName?: string;
}

export interface PostAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  postId: string;
}

export interface Tag {
  postId: string;
  index: number;
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}
