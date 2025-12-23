/**
 * Unit Member Service
 * Handles all API operations related to unit members
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
 * Unit Member Interface
 */
export interface UnitMember {
  id: string;
  isLeader: boolean;
  unitId: string;
  unitTitle: string;
  memberId: string;
  memberName: string;
}

@Injectable({
  providedIn: 'root',
})
export class UnitMemberService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get unit members with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated unit members response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<UnitMember>> {
    return this.http
      .post<PaginatedResponse<UnitMember>>(
        API_ENDPOINTS.UNITMEMBER.GET_PAGED,
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
   * Get unit member by ID
   * @param id unit member unique identifier
   * @returns Observable of unit member details
   */
  getById(id: string): Observable<ApiResponse<UnitMember>> {
    return this.http
      .get<ApiResponse<UnitMember>>(API_ENDPOINTS.UNITMEMBER.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all unit members
   * @returns Observable of all unit members
   */
  getAllUnitMembers(): Observable<ApiResponse<UnitMember[]>> {
    return this.http
      .get<ApiResponse<UnitMember[]>>(API_ENDPOINTS.UNITMEMBER.GET_ALL)
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
   * Get unit members by unit ID
   * @param unitId The unit ID to filter by
   * @returns Observable of filtered unit members
   */
  getByUnitId(unitId: string): Observable<UnitMember[]> {
    return new Observable((observer) => {
      this.getAllUnitMembers().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const filtered = response.data.filter(
              (member) => member.unitId === unitId
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
   * Get unit leaders only
   * @returns Observable of unit leaders
   */
  getLeaders(): Observable<UnitMember[]> {
    return new Observable((observer) => {
      this.getAllUnitMembers().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const leaders = response.data.filter(
              (member) => member.isLeader === true
            );
            observer.next(leaders);
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
   * @deprecated Use getAllUnitMembers() instead
   */
  get unitMembers(): Observable<ApiResponse<UnitMember[]>> {
    return this.getAllUnitMembers();
  }
}
