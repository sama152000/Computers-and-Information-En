/**
 * Member Service
 * Handles all API operations related to members
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
import { Member } from '../../model/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get members with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated members response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<Member>> {
    return this.http
      .post<PaginatedResponse<Member>>(API_ENDPOINTS.MEMBERS.GET_PAGED, data)
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
   * Get member by ID
   * @param id member unique identifier
   * @returns Observable of member details
   */
  getById(id: string): Observable<ApiResponse<Member>> {
    return this.http
      .get<ApiResponse<Member>>(API_ENDPOINTS.MEMBERS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all members
   * @returns Observable of all members
   */
  getAllMembers(): Observable<ApiResponse<Member[]>> {
    return this.http
      .get<ApiResponse<Member[]>>(API_ENDPOINTS.MEMBERS.GET_ALL)
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
   * Get members by type (Sector, Department, Program, Management)
   * @param memberType The type of member to filter by
   * @returns Observable of filtered members
   */
  getMembersByType(memberType: string): Observable<Member[]> {
    return new Observable((observer) => {
      this.getAllMembers().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const filteredMembers = response.data.filter(
              (member) => member.memberType === memberType
            );
            observer.next(filteredMembers);
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
   * Get president/leader members only
   * @returns Observable of president members
   */
  getPresidentMembers(): Observable<Member[]> {
    return new Observable((observer) => {
      this.getAllMembers().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const presidents = response.data.filter(
              (member) => member.isPresident === true
            );
            observer.next(presidents);
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
   * @deprecated Use getAllMembers() instead
   */
  get members(): Observable<ApiResponse<Member[]>> {
    return this.getAllMembers();
  }
}
