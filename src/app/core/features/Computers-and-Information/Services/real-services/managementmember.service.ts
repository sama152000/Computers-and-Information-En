/**
 * Management Member Service
 * Handles all API operations related to management members
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
import { ManagementMember } from '../../model/management.model';

@Injectable({
  providedIn: 'root',
})
export class ManagementmemberService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get management members with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated management members response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<ManagementMember>> {
    return this.http
      .post<PaginatedResponse<ManagementMember>>(
        API_ENDPOINTS.MANAGEMENTMEMBER.GET_PAGED,
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
   * Get management member by ID
   * @param id management member unique identifier
   * @returns Observable of management member details
   */
  getById(id: string): Observable<ApiResponse<ManagementMember>> {
    return this.http
      .get<ApiResponse<ManagementMember>>(
        API_ENDPOINTS.MANAGEMENTMEMBER.GET_BY_ID(id)
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
   * Get all management members
   * @returns Observable of all management members
   */
  getAllManagementmembers(): Observable<ApiResponse<ManagementMember[]>> {
    return this.http
      .get<ApiResponse<ManagementMember[]>>(
        API_ENDPOINTS.MANAGEMENTMEMBER.GET_ALL
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
   * @deprecated Use getAllManagementmembers() instead
   */
  get managementmembers(): Observable<ApiResponse<ManagementMember[]>> {
    return this.getAllManagementmembers();
  }
}
