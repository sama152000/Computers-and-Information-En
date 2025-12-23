/**
 * Departments Service
 * Handles all API operations related to departments
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
 * Goal Interface
 */
export interface Goal {
  id: string;
  index: number;
  goalName: string;
  aboutId: string;
}

/**
 * Department Attachment Interface
 */
export interface DepartmentAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  isFeatured: boolean;
  departmentId: string;
}

/**
 * Department Interface
 */
export interface Department {
  id: string;
  name: string;
  subTitle: string;
  pageId: string;
  pageTitle: string;
  aboutId: string;
  about: string;
  mission: string;
  vision: string;
  goals: Goal[];
  departmentAttachments: DepartmentAttachment[];
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  getPaged(data: PageRequest): Observable<PaginatedResponse<Department>> {
    return this.http
      .post<PaginatedResponse<Department>>(
        API_ENDPOINTS.DEPARTMENTS.GET_PAGED,
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

  getById(id: string): Observable<ApiResponse<Department>> {
    return this.http
      .get<ApiResponse<Department>>(API_ENDPOINTS.DEPARTMENTS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  getAll(): Observable<ApiResponse<Department[]>> {
    return this.http
      .get<ApiResponse<Department[]>>(API_ENDPOINTS.DEPARTMENTS.GET_ALL)
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
