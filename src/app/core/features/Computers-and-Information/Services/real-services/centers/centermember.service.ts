/**
 * Center Member Service
 * Handles all API operations related to center members
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
 * Center Member Interface
 */
export interface CenterMember {
  id: string;
  isLeader: boolean;
  centerId: string;
  centerName: string;
  memberId: string;
  memberName: string;
}

@Injectable({
  providedIn: 'root',
})
export class CenterMemberService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get center members with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated center members response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<CenterMember>> {
    return this.http
      .post<PaginatedResponse<CenterMember>>(
        API_ENDPOINTS.CENTERMEMBER.GET_PAGED,
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
   * Get center member by ID
   * @param id center member unique identifier
   * @returns Observable of center member details
   */
  getById(id: string): Observable<ApiResponse<CenterMember>> {
    return this.http
      .get<ApiResponse<CenterMember>>(API_ENDPOINTS.CENTERMEMBER.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all center members
   * @returns Observable of all center members
   */
  getAllCenterMembers(): Observable<ApiResponse<CenterMember[]>> {
    return this.http
      .get<ApiResponse<CenterMember[]>>(API_ENDPOINTS.CENTERMEMBER.GET_ALL)
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
   * Get center members by center ID
   * @param centerId The center ID to filter by
   * @returns Observable of filtered center members
   */
  getByCenterId(centerId: string): Observable<CenterMember[]> {
    return new Observable((observer) => {
      this.getAllCenterMembers().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const filtered = response.data.filter(
              (member) => member.centerId === centerId
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
   * Get center leaders only
   * @returns Observable of center leaders
   */
  getLeaders(): Observable<CenterMember[]> {
    return new Observable((observer) => {
      this.getAllCenterMembers().subscribe({
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
   * @deprecated Use getAllCenterMembers() instead
   */
  get centerMembers(): Observable<ApiResponse<CenterMember[]>> {
    return this.getAllCenterMembers();
  }
}
