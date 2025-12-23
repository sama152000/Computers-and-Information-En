/**
 * Student Lifes Service
 * Handles all API operations related to student life activities
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

export interface StudentLifeAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  studentLifeId: string;
}

export interface StudentLife {
  id: string;
  title: string;
  content: string;
  place: string;
  appointmentDate: string;
  coordinator: string;
  pageId: string;
  pageName?: string;
  studentLifeAttachments: StudentLifeAttachment[];
}

@Injectable({
  providedIn: 'root',
})
export class StudentLifesService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  getPaged(data: PageRequest): Observable<PaginatedResponse<StudentLife>> {
    return this.http
      .post<PaginatedResponse<StudentLife>>(
        API_ENDPOINTS.STUDENTLIFES.GET_PAGED,
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

  getById(id: string): Observable<ApiResponse<StudentLife>> {
    return this.http
      .get<ApiResponse<StudentLife>>(API_ENDPOINTS.STUDENTLIFES.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  getAll(): Observable<ApiResponse<StudentLife[]>> {
    return this.http
      .get<ApiResponse<StudentLife[]>>(API_ENDPOINTS.STUDENTLIFES.GET_ALL)
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
