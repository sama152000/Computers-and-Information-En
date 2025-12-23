/**
 * Loading Service
 * Manages global loading state using Angular Signals
 */
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // Loading state using signals
  private loadingCount = signal(0);
  public isLoading = signal(false);

  /**
   * Show loading indicator
   */
  show(): void {
    this.loadingCount.update((count) => count + 1);
    this.isLoading.set(true);
  }

  /**
   * Hide loading indicator
   */
  hide(): void {
    this.loadingCount.update((count) => Math.max(0, count - 1));

    // Only hide when all requests are complete
    if (this.loadingCount() === 0) {
      this.isLoading.set(false);
    }
  }

  /**
   * Force hide all loading
   */
  forceHide(): void {
    this.loadingCount.set(0);
    this.isLoading.set(false);
  }
}
