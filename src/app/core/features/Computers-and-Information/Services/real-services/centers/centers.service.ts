/**
 * Centers Service
 * Handles all API operations related to university centers
 * @version 2.0
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, retry, timeout } from 'rxjs';
import { API_ENDPOINTS } from '../../../../../constants/api-endpoints';
import {
  ApiResponse,
  PaginatedResponse,
} from '../../../../../models/api.models';
import { PageRequest } from '../../../model/real model/page-request.model';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { environment } from '../../../../../../../environments/environment';
import { Center } from '../../../model/centers.model';

@Injectable({
  providedIn: 'root',
})
export class CentersService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get centers with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated centers response
   * @example
   * ```typescript
   * this.centersService.getPaged({
   *   pageNumber: 1,
   *   pageSize: 10,
   *   searchTerm: 'مركز'
   * }).subscribe(result => {
   *   console.log('Centers:', result.data);
   * });
   * ```
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<Center>> {
    return this.http
      .post<PaginatedResponse<Center>>(API_ENDPOINTS.CENTERS.GET_PAGED, data)
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
   * Get center details by ID
   * @param id Center unique identifier
   * @returns Observable of center details
   * @example
   * ```typescript
   * this.centersService.getById('123').subscribe(result => {
   *   console.log('Center:', result.data);
   * });
   * ```
   */
  getById(id: string): Observable<ApiResponse<Center>> {
    return this.http
      .get<ApiResponse<Center>>(API_ENDPOINTS.CENTERS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all centers
   * @returns Observable of all centers
   * @example
   * ```typescript
   * this.centersService.getAllCenters().subscribe(result => {
   *   console.log('All centers:', result.data);
   * });
   * ```
   */
  getAllCenters(): Observable<ApiResponse<Center[]>> {
    return this.http
      .get<ApiResponse<Center[]>>(API_ENDPOINTS.CENTERS.GET_ALL)
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
   * @deprecated Use getAllCenters() instead
   */
  get centers(): Observable<ApiResponse<Center[]>> {
    return this.getAllCenters();
  }
}
