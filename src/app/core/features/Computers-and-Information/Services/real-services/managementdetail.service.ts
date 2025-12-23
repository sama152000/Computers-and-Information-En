/**
 * Management Detail Service
 * Handles all API operations related to management details
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
import { ManagementDetail } from '../../model/management.model';

@Injectable({
  providedIn: 'root',
})
export class ManagementdetailService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get management details with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated management details response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<ManagementDetail>> {
    return this.http
      .post<PaginatedResponse<ManagementDetail>>(
        API_ENDPOINTS.MANAGEMENTDETAIL.GET_PAGED,
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
   * Get management detail by ID
   * @param id management detail unique identifier
   * @returns Observable of management detail
   */
  getById(id: string): Observable<ApiResponse<ManagementDetail>> {
    return this.http
      .get<ApiResponse<ManagementDetail>>(
        API_ENDPOINTS.MANAGEMENTDETAIL.GET_BY_ID(id)
      )
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all management details
   * @returns Observable of all management details
   */
  getAllManagementdetails(): Observable<ApiResponse<ManagementDetail[]>> {
    return this.http
      .get<ApiResponse<ManagementDetail[]>>(
        API_ENDPOINTS.MANAGEMENTDETAIL.GET_ALL
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
   * Legacy method for backward compatibility
   * @deprecated Use getAllManagementdetails() instead
   */
  get managementdetails(): Observable<ApiResponse<ManagementDetail[]>> {
    return this.getAllManagementdetails();
  }
}
