/**
 * Statistics Service
 * Handles all API operations related to statistics
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

export interface Statistic {
  id: string;
  title: string;
  value: string;
  iconPath: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get statistics with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated statistics response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<Statistic>> {
    return this.http
      .post<PaginatedResponse<Statistic>>(
        API_ENDPOINTS.STATISTICS.GET_PAGED,
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
   * Get statistic by ID
   * @param id statistic unique identifier
   * @returns Observable of statistic details
   */
  getById(id: string): Observable<ApiResponse<Statistic>> {
    return this.http
      .get<ApiResponse<Statistic>>(API_ENDPOINTS.STATISTICS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all statistics
   * @returns Observable of all statistics
   */
  getAllStatistics(): Observable<ApiResponse<Statistic[]>> {
    return this.http
      .get<ApiResponse<Statistic[]>>(API_ENDPOINTS.STATISTICS.GET_ALL)
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
   * @deprecated Use getAllStatistics() instead
   */
  get statistics(): Observable<ApiResponse<Statistic[]>> {
    return this.getAllStatistics();
  }
}
