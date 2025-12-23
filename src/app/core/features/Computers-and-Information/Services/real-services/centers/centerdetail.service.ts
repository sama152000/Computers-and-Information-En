/**
 * Center Detail Service
 * Handles all API operations related to center details
 * @version 1.0
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

/**
 * Center Detail Interface
 */
export interface CenterDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  centerId: string;
  center: string;
}

@Injectable({
  providedIn: 'root',
})
export class CenterDetailService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get center details with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated center details response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<CenterDetail>> {
    return this.http
      .post<PaginatedResponse<CenterDetail>>(
        API_ENDPOINTS.CENTERDETAIL.GET_PAGED,
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
   * Get center detail by ID
   * @param id center detail unique identifier
   * @returns Observable of center detail
   */
  getById(id: string): Observable<ApiResponse<CenterDetail>> {
    return this.http
      .get<ApiResponse<CenterDetail>>(API_ENDPOINTS.CENTERDETAIL.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all center details
   * @returns Observable of all center details
   */
  getAllCenterDetails(): Observable<ApiResponse<CenterDetail[]>> {
    return this.http
      .get<ApiResponse<CenterDetail[]>>(API_ENDPOINTS.CENTERDETAIL.GET_ALL)
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
   * Get center details by center ID
   * @param centerId The center ID to filter by
   * @returns Observable of filtered center details
   */
  getByCenterId(centerId: string): Observable<CenterDetail[]> {
    return new Observable((observer) => {
      this.getAllCenterDetails().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const filtered = response.data.filter(
              (detail) => detail.centerId === centerId
            );
            observer.next(filtered);
            observer.complete();
          } else {
            observer.next([]);
            observer.complete();
          }
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  /**
   * Legacy method for backward compatibility
   * @deprecated Use getAllCenterDetails() instead
   */
  get centerDetails(): Observable<ApiResponse<CenterDetail[]>> {
    return this.getAllCenterDetails();
  }
}
