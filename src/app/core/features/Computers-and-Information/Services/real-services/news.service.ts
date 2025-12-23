/**
 * News Service
 * Handles all API operations related to news/posts
 * @version 2.0
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, retry, timeout } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { ApiResponse, PaginatedResponse } from '../../../../models/api.models';
import { PageRequest } from '../../model/real model/page-request.model';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { environment } from '../../../../../../environments/environment';
import { News, Category } from '../../model/news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get news with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated news response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<News>> {
    return this.http
      .post<PaginatedResponse<News>>(API_ENDPOINTS.NEWS.GET_PAGED, data)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get news details by ID
   * @param id News unique identifier
   * @returns Observable of news details
   */
  getById(id: string): Observable<ApiResponse<News>> {
    return this.http
      .get<ApiResponse<News>>(API_ENDPOINTS.NEWS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all news
   * @returns Observable of all news
   */
  getAll(): Observable<ApiResponse<News[]>> {
    return this.http.get<ApiResponse<News[]>>(API_ENDPOINTS.NEWS.GET_ALL).pipe(
      timeout(environment.apiTimeout),
      retry({ count: 2, delay: 1000 }),
      catchError((error) => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  /**
   * Get all categories
   * @returns Observable of all categories
   */
  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http
      .get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES.GET_ALL)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }
}
