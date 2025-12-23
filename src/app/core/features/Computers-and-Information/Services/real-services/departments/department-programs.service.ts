/**
 * Department Programs Service
 * Handles all API operations related to department programs
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
 * Department Program Interface
 */
export interface DepartmentProgram {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  programId: string;
  programName: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentProgramsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  getPaged(
    data: PageRequest
  ): Observable<PaginatedResponse<DepartmentProgram>> {
    return this.http
      .post<PaginatedResponse<DepartmentProgram>>(
        API_ENDPOINTS.DEPARTMENTPROGRAMS.GET_PAGED,
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

  getById(id: string): Observable<ApiResponse<DepartmentProgram>> {
    return this.http
      .get<ApiResponse<DepartmentProgram>>(
        API_ENDPOINTS.DEPARTMENTPROGRAMS.GET_BY_ID(id)
      )
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  getAll(): Observable<ApiResponse<DepartmentProgram[]>> {
    return this.http
      .get<ApiResponse<DepartmentProgram[]>>(
        API_ENDPOINTS.DEPARTMENTPROGRAMS.GET_ALL
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
