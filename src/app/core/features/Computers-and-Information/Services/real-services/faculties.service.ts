/**
 * Faculties Service
 * Handles all API operations related to university Faculties
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

@Injectable({
  providedIn: 'root',
})
export class FacultiesService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get faculties with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated faculties response
   * @example
   * ```typescript
   * this.facultiesService.getPaged({
   *   pageNumber: 1,
   *   pageSize: 10,
   *   searchTerm: 'مركز'
   * }).subscribe(result => {
   *   console.log('Faculties:', result.data);
   * });
   * ```
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<any>> {
    return this.http
      .post<PaginatedResponse<any>>(API_ENDPOINTS.FACULTIES.GET_PAGED, data)
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
   * Get faculty details by ID
   * @param id faculty unique identifier
   * @returns Observable of faculty details
   * @example
   * ```typescript
   * this.facultiesService.getById('123').subscribe(result => {
   *   console.log('Faculty:', result.data);
   * });
   * ```
   */
  getById(id: string): Observable<ApiResponse<any>> {
    return this.http
      .get<ApiResponse<any>>(API_ENDPOINTS.FACULTIES.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all faculties
   * @returns Observable of all faculties
   * @example
   * ```typescript
   * this.facultiesService.getAllFaculties().subscribe(result => {
   *   console.log('All faculties:', result.data);
   * });
   * ```
   */
  getAllFaculties(): Observable<ApiResponse<any[]>> {
    return this.http
      .get<ApiResponse<any[]>>(API_ENDPOINTS.FACULTIES.GET_ALL)
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
   * @deprecated Use getAllFaculties() instead
   */
  get faculties(): Observable<ApiResponse<any[]>> {
    return this.getAllFaculties();
  }
}
