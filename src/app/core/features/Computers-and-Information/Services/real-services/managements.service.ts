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
import { Management } from '../../model/management.model';

@Injectable({
  providedIn: 'root',
})
export class ManagementsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get managements with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated managements response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<Management>> {
    return this.http
      .post<PaginatedResponse<Management>>(
        API_ENDPOINTS.MANAGMENTS.GET_PAGED,
        data
      )
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
   * Get management details by ID
   * @param id management unique identifier
   * @returns Observable of management details
   */
  getById(id: string): Observable<ApiResponse<Management>> {
    return this.http
      .get<ApiResponse<Management>>(API_ENDPOINTS.MANAGMENTS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all managements
   * @returns Observable of all managements
   */
  getAllManagments(): Observable<ApiResponse<Management[]>> {
    return this.http
      .get<ApiResponse<Management[]>>(API_ENDPOINTS.MANAGMENTS.GET_ALL)
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
   * Legacy method for backward compatibility
   * @deprecated Use getAllManagments() instead
   */
  get managments(): Observable<ApiResponse<Management[]>> {
    return this.getAllManagments();
  }
}
