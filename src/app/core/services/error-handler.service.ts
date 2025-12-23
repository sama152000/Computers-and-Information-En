/**
 * Error Handler Service
 * Centralized error handling and logging
 */
import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { HttpStatus } from '../enums/app.enums';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private messageService = inject(MessageService, { optional: true });

  /**
   * Handle HTTP errors
   */
  handleError(error: HttpErrorResponse): void {
    let errorMessage = 'حدث خطأ غير متوقع';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `خطأ: ${error.error.message}`;
      console.error('Client Error:', error.error.message);
    } else {
      // Server-side error
      errorMessage = this.getServerErrorMessage(error);
      console.error(`Server Error: ${error.status}\nMessage: ${error.message}`);
    }

    // Show error toast
    this.showErrorToast(errorMessage);
  }

  /**
   * Get user-friendly error message based on status code
   */
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case HttpStatus.BAD_REQUEST:
        return error.error?.message || 'طلب غير صحيح';
      case HttpStatus.UNAUTHORIZED:
        return 'غير مصرح لك بالوصول';
      case HttpStatus.FORBIDDEN:
        return 'ليس لديك صلاحية للوصول';
      case HttpStatus.NOT_FOUND:
        return 'المحتوى المطلوب غير موجود';
      case HttpStatus.REQUEST_TIMEOUT:
        return 'انتهت مهلة الطلب';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'خطأ في الخادم';
      case HttpStatus.SERVICE_UNAVAILABLE:
        return 'الخدمة غير متاحة حالياً';
      case 0:
        return 'تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت';
      default:
        return error.error?.message || 'حدث خطأ غير متوقع';
    }
  }

  /**
   * Show error toast notification
   */
  private showErrorToast(message: string): void {
    if (this.messageService) {
      this.messageService.add({
        severity: 'error',
        summary: 'خطأ',
        detail: message,
        life: 5000,
      });
    }
  }

  /**
   * Handle custom errors
   */
  handleCustomError(message: string): void {
    console.error('Custom Error:', message);
    this.showErrorToast(message);
  }
}
