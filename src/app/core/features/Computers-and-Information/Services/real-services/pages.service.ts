/**
 * Pages Service (About Pages)
 * Handles all API operations related to about/information pages
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

// TODO: Create proper Page model interface
interface Page {
  id: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get pages with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated pages response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<Page>> {
    return this.http
      .post<PaginatedResponse<Page>>(API_ENDPOINTS.PAGES.GET_PAGED, data)
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
   * Get page details by ID
   * @param id Page unique identifier
   * @returns Observable of page details
   */
  getById(id: string): Observable<ApiResponse<Page>> {
    return this.http
      .get<ApiResponse<Page>>(API_ENDPOINTS.PAGES.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all pages
   * @returns Observable of all pages
   */
  getAllPages(): Observable<ApiResponse<Page[]>> {
    return this.http.get<ApiResponse<Page[]>>(API_ENDPOINTS.PAGES.GET_ALL).pipe(
      timeout(environment.apiTimeout),
      retry({ count: 2, delay: 1000 }),
      catchError((error) => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  /**
   * Legacy method for backward compatibility
   * @deprecated Use getAllPages() instead
   */
  get pages(): Observable<ApiResponse<Page[]>> {
    return this.getAllPages();
  }
}
