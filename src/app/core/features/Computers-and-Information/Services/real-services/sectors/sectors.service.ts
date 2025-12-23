/**
 * Sectors Service
 * Handles all API operations related to sectors
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
import { Sector } from '../../../model/sector.model';

@Injectable({
  providedIn: 'root',
})
export class SectorsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  getPaged(data: PageRequest): Observable<PaginatedResponse<Sector>> {
    return this.http
      .post<PaginatedResponse<Sector>>(API_ENDPOINTS.SECTORS.GET_PAGED, data)
      .pipe(
        timeout(environment.apiTimeout),
        retry({ count: 2, delay: 1000 }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  getById(id: string): Observable<ApiResponse<Sector>> {
    return this.http
      .get<ApiResponse<Sector>>(API_ENDPOINTS.SECTORS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  getAll(): Observable<ApiResponse<Sector[]>> {
    return this.http
      .get<ApiResponse<Sector[]>>(API_ENDPOINTS.SECTORS.GET_ALL)
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
