/**
 * Hero Sections Service
 * Handles all API operations related to hero sections
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

/**
 * Hero Attachment Interface
 */
export interface HeroAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  heroSectionId: string;
}

/**
 * Hero Section Interface
 */
export interface HeroSection {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  isActive: boolean;
  heroAttachments: HeroAttachment[];
}

@Injectable({
  providedIn: 'root',
})
export class HeroSectionsService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Get hero sections with pagination
   * @param data Pagination request parameters
   * @returns Observable of paginated hero sections response
   */
  getPaged(data: PageRequest): Observable<PaginatedResponse<HeroSection>> {
    return this.http
      .post<PaginatedResponse<HeroSection>>(
        API_ENDPOINTS.HERO_SECTIONS.GET_PAGED,
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
   * Get hero section by ID
   * @param id hero section unique identifier
   * @returns Observable of hero section details
   */
  getById(id: string): Observable<ApiResponse<HeroSection>> {
    return this.http
      .get<ApiResponse<HeroSection>>(API_ENDPOINTS.HERO_SECTIONS.GET_BY_ID(id))
      .pipe(
        timeout(environment.apiTimeout),
        catchError((error) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }

  /**
   * Get all hero sections
   * @returns Observable of all hero sections
   */
  getAllHeroSections(): Observable<ApiResponse<HeroSection[]>> {
    return this.http
      .get<ApiResponse<HeroSection[]>>(API_ENDPOINTS.HERO_SECTIONS.GET_ALL)
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
   * Get active hero section (first active one)
   * Returns the first active hero section for display on homepage
   */
  getActiveHeroSection(): Observable<PaginatedResponse<HeroSection>> {
    return this.getPaged({
      pageNumber: 1,
      pageSize: 1,
      filter: {} as any,
      orderByValue: [{}] as any,
    });
  }
}
