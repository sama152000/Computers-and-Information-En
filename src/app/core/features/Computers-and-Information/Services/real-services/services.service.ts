/**
 * Services Service
 * Handles all API operations related to faculty services
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
 * Faculty Service Interface (API Model)
 */
export interface FacultyService {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FacultyServicesService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get services with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated services response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<FacultyService>> {
    return this.http
      .post<PaginatedResponse<FacultyService>>(
        API_ENDPOINTS.SERVICES.GET_PAGED,
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
   * Get service by ID
   * @param id service unique identifier
   * @returns Observable of service details
   */
  getById(id: string): Observable<ApiResponse<FacultyService>> {
    return this.http
      .get<ApiResponse<FacultyService>>(API_ENDPOINTS.SERVICES.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all services
   * @returns Observable of all services
   */
  getAll(): Observable<ApiResponse<FacultyService[]>> {
    return this.http
      .get<ApiResponse<FacultyService[]>>(API_ENDPOINTS.SERVICES.GET_ALL)
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
   * Get active services only
   * @returns Observable of active services
   */
  getActiveServices(): Observable<FacultyService[]> {
    return new Observable((observer) => {
      this.getAll().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const activeServices = response.data.filter(
              (service) => service.isActive === true
            );
            observer.next(activeServices);
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
   * Search services by query
   * @param query Search query string
   * @returns Observable of matching services
   */
  searchServices(query: string): Observable<FacultyService[]> {
    return new Observable((observer) => {
      this.getAll().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const q = query.toLowerCase();
            const results = response.data.filter(
              (service) =>
                service.title?.toLowerCase().includes(q) ||
                service.description?.toLowerCase().includes(q)
            );
            observer.next(results);
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
}
