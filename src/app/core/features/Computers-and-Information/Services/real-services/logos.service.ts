/**
 * Logos Service
 * Handles all API operations related to logos
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

export interface LogoAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class LogosService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get logos with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated logos response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<LogoAttachment>> {
    return this.http
      .post<PaginatedResponse<LogoAttachment>>(
        API_ENDPOINTS.LOGOS.GET_PAGED,
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
   * Get logo by ID
   * @param id logo unique identifier
   * @returns Observable of logo details
   */
  getById(id: string): Observable<ApiResponse<LogoAttachment>> {
    return this.http
      .get<ApiResponse<LogoAttachment>>(API_ENDPOINTS.LOGOS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all logos
   * @returns Observable of all logos
   */
  getAllLogos(): Observable<ApiResponse<LogoAttachment[]>> {
    return this.http
      .get<ApiResponse<LogoAttachment[]>>(API_ENDPOINTS.LOGOS.GET_ALL)
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
   * @deprecated Use getAllLogos() instead
   */
  get logos(): Observable<ApiResponse<LogoAttachment[]>> {
    return this.getAllLogos();
  }
}
