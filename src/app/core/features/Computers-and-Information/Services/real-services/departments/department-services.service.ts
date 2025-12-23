/**
 * Department Services Service
 * Handles all API operations related to department services
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
 * Department Service Interface
 */
export interface DepartmentService {
  id: string;
  name: string;
  details: string;
  duration: string;
  applicationUrl: string;
  downloadUrl: string;
  isOnline: boolean;
  category: string;
  fees: number;
  contactPerson: string;
  contactPhone: string;
  departmentId: string;
  departmentName: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentServicesService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  getPaged(
    data: PageRequest
  ): Observable<PaginatedResponse<DepartmentService>> {
    return this.http
      .post<PaginatedResponse<DepartmentService>>(
        API_ENDPOINTS.DEPARTMENTSERVICES.GET_PAGED,
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

  getById(id: string): Observable<ApiResponse<DepartmentService>> {
    return this.http
      .get<ApiResponse<DepartmentService>>(
        API_ENDPOINTS.DEPARTMENTSERVICES.GET_BY_ID(id)
      )
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  getAll(): Observable<ApiResponse<DepartmentService[]>> {
    return this.http
      .get<ApiResponse<DepartmentService[]>>(
        API_ENDPOINTS.DEPARTMENTSERVICES.GET_ALL
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
