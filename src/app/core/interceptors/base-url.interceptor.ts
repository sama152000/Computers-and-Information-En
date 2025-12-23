/**
 * Base URL Interceptor
 * Automatically adds the base API URL to all HTTP requests
 */
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip if the URL is already absolute
  if (req.url.startsWith('http://') || req.url.startsWith('https://')) {
    return next(req);
  }

  // Clone the request and prepend the base URL
  const apiReq = req.clone({
    url: `${environment.apiUrl}${req.url}`,
  });

  return next(apiReq);
};
