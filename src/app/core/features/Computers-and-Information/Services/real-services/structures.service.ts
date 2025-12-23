/**
 * Structures Service
 * Handles all API operations related to organizational structures
 * @version 1.0
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, retry, timeout } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';
import { ApiResponse, PaginatedResponse } from '../../../../models/api.models';
import { PageRequest } from '../../model/real model/page-request.model';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { environment } from '../../../../../../environments/environment';

export interface Structure {
  id: string;
  pageId: string;
  name: string;
  parentId: string | null;
  childs: Structure[];
}

@Injectable({
  providedIn: 'root',
})
export class StructuresService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPaged(data: any): Observable<any> {
    return this.http
      .post<any>(API_ENDPOINTS.STRUCTURES.GET_PAGED, data, this.httpOptions)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  getById(id: string): Observable<ApiResponse<Structure>> {
    return this.http
      .get<ApiResponse<Structure>>(API_ENDPOINTS.STRUCTURES.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  getAll(): Observable<ApiResponse<Structure[]>> {
    return this.http
      .get<ApiResponse<Structure[]>>(API_ENDPOINTS.STRUCTURES.GET_ALL)
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
