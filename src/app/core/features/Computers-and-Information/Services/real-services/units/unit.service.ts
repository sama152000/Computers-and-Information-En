/**
 * Unit Service
 * Handles all API operations related to units
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
 * Unit Attachment Interface
 */
export interface UnitAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  unitId: string;
}

/**
 * Unit Goal Interface
 */
export interface UnitGoal {
  id: string;
  index: number;
  goalName: string;
  aboutId: string;
}

/**
 * Unit Interface
 */
export interface Unit {
  id: string;
  pageId: string;
  unitTitle: string;
  unitTitleEn: string;
  aboutId: string;
  content: string;
  mission: string;
  vision: string;
  history: string;
  goals: UnitGoal[];
  unitAttachments: UnitAttachment[];
}

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get units with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated units response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<Unit>> {
    return this.http
      .post<PaginatedResponse<Unit>>(API_ENDPOINTS.UNITS.GET_PAGED, data)
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
   * Get unit by ID
   * @param id unit unique identifier
   * @returns Observable of unit details
   */
  getById(id: string): Observable<ApiResponse<Unit>> {
    return this.http
      .get<ApiResponse<Unit>>(API_ENDPOINTS.UNITS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all units
   * @returns Observable of all units
   */
  getAllUnits(): Observable<ApiResponse<Unit[]>> {
    return this.http.get<ApiResponse<Unit[]>>(API_ENDPOINTS.UNITS.GET_ALL).pipe(
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
   * @deprecated Use getAllUnits() instead
   */
  get units(): Observable<ApiResponse<Unit[]>> {
    return this.getAllUnits();
  }
}
