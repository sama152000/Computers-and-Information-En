/**
 * Dean Speechs Service
 * Handles all API operations related to dean speeches
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
import { DeanSpeech } from '../../model/deanspeech.model';

@Injectable({
  providedIn: 'root',
})
export class DeanSpeechsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get dean speeches with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated dean speeches response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<DeanSpeech>> {
    return this.http
      .post<PaginatedResponse<DeanSpeech>>(
        API_ENDPOINTS.DEANSPEECHS.GET_PAGED,
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
   * Get dean speech details by ID
   * @param id dean speech unique identifier
   * @returns Observable of dean speech details
   */
  getById(id: string): Observable<ApiResponse<DeanSpeech>> {
    return this.http
      .get<ApiResponse<DeanSpeech>>(API_ENDPOINTS.DEANSPEECHS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all dean speeches
   * @returns Observable of all dean speeches
   */
  getAll(): Observable<ApiResponse<DeanSpeech[]>> {
    return this.http
      .get<ApiResponse<DeanSpeech[]>>(API_ENDPOINTS.DEANSPEECHS.GET_ALL)
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
   * Legacy getter for backward compatibility
   * @deprecated Use getAll() instead
   */
  get deanSpeechs(): Observable<ApiResponse<DeanSpeech[]>> {
    return this.getAll();
  }
}
