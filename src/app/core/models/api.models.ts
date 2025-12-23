/**
 * Generic API Response Model
 */
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  timestamp?: Date;
}

/**
 * Paginated Response Model
 */
export interface PaginatedResponse<T = any> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  success: boolean;
  message?: string;
  errors?: string[];
  statusCode?: number;
  timestamp?: string;
}

/**
 * Page Request Model
 */
export interface PageRequest {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Error Response Model
 */
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: Date;
  path?: string;
}
