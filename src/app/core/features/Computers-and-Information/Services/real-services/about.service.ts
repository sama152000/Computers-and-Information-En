/**
 * About Service
 * Handles all API operations related to about pages/information
 * @version 1.0
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, retry, timeout } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { ApiResponse, PaginatedResponse } from '../../../../models/api.models';
import { PageRequest } from '../../model/real model/page-request.model';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { environment } from '../../../../../../environments/environment';

/**
 * Goal Interface
 */
export interface Goal {
  id: string;
  index: number;
  goalName: string;
  aboutId: string;
}

/**
 * About/Page Interface
 */
export interface About {
  id: string;
  content: string;
  mission: string;
  vision: string;
  history: string;
  goals: Goal[];
  pageId: string;
  pageName: string;
  pageNameEn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get about pages with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated about pages response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<About>> {
    return this.http
      .post<PaginatedResponse<About>>(API_ENDPOINTS.PAGES.GET_PAGED, data)
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
   * Get about page by ID
   * @param id about page unique identifier
   * @returns Observable of about page details
   */
  getById(id: string): Observable<ApiResponse<About>> {
    return this.http
      .get<ApiResponse<About>>(API_ENDPOINTS.PAGES.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all about pages
   * @returns Observable of all about pages
   */
  getAllAboutPages(): Observable<ApiResponse<About[]>> {
    return this.http
      .get<ApiResponse<About[]>>(API_ENDPOINTS.PAGES.GET_ALL)
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
   * Get about page by slug
   * Useful for routing based on slug instead of ID
   * @param slug The slug identifier (e.g., 'vision', 'mission')
   */
  getBySlug(slug: string): Observable<ApiResponse<About[]>> {
    // Filter by slug using getAllAboutPages
    // Backend should ideally have a dedicated endpoint for this
    return this.getAllAboutPages();
  }

  /**
   * Get About University page specifically
   * Filters for page with pageNameEn === "About University" or pageName === "عن الجامعة"
   * @returns Observable of About University data
   */
  getAboutUniversity(): Observable<About | null> {
    return new Observable((observer) => {
      this.getAllAboutPages().subscribe({
        next: (response) => {
          if (response.success && response.data && response.data.length > 0) {
            const aboutUniversity = response.data.find(
              (page) =>
                page.pageNameEn?.toLowerCase() === 'about university' ||
                page.pageName === 'عن الجامعة'
            );
            observer.next(aboutUniversity || null);
            observer.complete();
          } else {
            observer.next(null);
            observer.complete();
          }
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }
}
