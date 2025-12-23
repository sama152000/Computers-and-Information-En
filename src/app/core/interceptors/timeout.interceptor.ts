/**
 * Timeout Interceptor
 * Adds timeout to HTTP requests
 */
import { HttpInterceptorFn } from '@angular/common/http';
import { timeout } from 'rxjs';
import { environment } from '../../../environments/environment';

export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {
  // Get timeout from request headers or use default
  const timeoutValue = req.headers.has('X-Timeout')
    ? parseInt(req.headers.get('X-Timeout') || '0', 10)
    : environment.apiTimeout;

  return next(req).pipe(timeout(timeoutValue));
};
