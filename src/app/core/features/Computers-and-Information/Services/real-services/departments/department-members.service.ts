/**
 * Department Members Service
 * Handles all API operations related to department members
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
 * Department Member Interface
 */
export interface DepartmentMember {
  id: string;
  isLeader: boolean;
  departmentId: string;
  departmentName: string;
  memberId: string;
  memberName: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentMembersService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  getPaged(data: PageRequest): Observable<PaginatedResponse<DepartmentMember>> {
    return this.http
      .post<PaginatedResponse<DepartmentMember>>(
        API_ENDPOINTS.DEPARTMENTMEMBERS.GET_PAGED,
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

  getById(id: string): Observable<ApiResponse<DepartmentMember>> {
    return this.http
      .get<ApiResponse<DepartmentMember>>(
        API_ENDPOINTS.DEPARTMENTMEMBERS.GET_BY_ID(id)
      )
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  getAll(): Observable<ApiResponse<DepartmentMember[]>> {
    return this.http
      .get<ApiResponse<DepartmentMember[]>>(
        API_ENDPOINTS.DEPARTMENTMEMBERS.GET_ALL
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
}
