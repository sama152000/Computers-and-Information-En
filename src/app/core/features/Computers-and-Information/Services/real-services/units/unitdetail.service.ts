/**
 * Unit Detail Service
 * Handles all API operations related to unit details
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
 * Unit Detail Attachment Interface
 */
export interface UnitDetailAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  unitId: string;
}

/**
 * Unit Detail Interface
 */
export interface UnitDetail {
  id: string;
  title: string;
  content: string;
  unitPlace: string;
  unitId: string;
  unitTitle: string;
  unitAttachments: UnitDetailAttachment[];
}

@Injectable({
  providedIn: 'root',
})
export class UnitDetailService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get unit details with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated unit details response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<UnitDetail>> {
    return this.http
      .post<PaginatedResponse<UnitDetail>>(
        API_ENDPOINTS.UNITDETAIL.GET_PAGED,
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
   * Get unit detail by ID
   * @param id unit detail unique identifier
   * @returns Observable of unit detail
   */
  getById(id: string): Observable<ApiResponse<UnitDetail>> {
    return this.http
      .get<ApiResponse<UnitDetail>>(API_ENDPOINTS.UNITDETAIL.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all unit details
   * @returns Observable of all unit details
   */
  getAllUnitDetails(): Observable<ApiResponse<UnitDetail[]>> {
    return this.http
      .get<ApiResponse<UnitDetail[]>>(API_ENDPOINTS.UNITDETAIL.GET_ALL)
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
   * Get unit details by unit ID
   * @param unitId The unit ID to filter by
   * @returns Observable of filtered unit details
   */
  getByUnitId(unitId: string): Observable<UnitDetail[]> {
    return new Observable((observer) => {
      this.getAllUnitDetails().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const filtered = response.data.filter(
              (detail) => detail.unitId === unitId
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
   * @deprecated Use getAllUnitDetails() instead
   */
  get unitDetails(): Observable<ApiResponse<UnitDetail[]>> {
    return this.getAllUnitDetails();
  }
}
