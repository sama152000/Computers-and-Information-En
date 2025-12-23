/**
 * Base Component with common state management
 * All components should extend this for consistent state handling
 * @abstract
 */
import {
  Component,
  DestroyRef,
  inject,
  signal,
  computed,
  Directive,
} from '@angular/core';
import { LoadingState } from '../../core/enums/app.enums';

@Directive()
export abstract class BaseComponent {
  // Services
  protected readonly destroyRef = inject(DestroyRef);

  // Common State Signals
  protected loadingState = signal<LoadingState>(LoadingState.IDLE);
  protected error = signal<string | null>(null);

  // Common Computed Values
  protected isLoading = computed(
    () => this.loadingState() === LoadingState.LOADING
  );

  protected hasError = computed(
    () => this.loadingState() === LoadingState.ERROR
  );

  protected isSuccess = computed(
    () => this.loadingState() === LoadingState.SUCCESS
  );

  protected isIdle = computed(() => this.loadingState() === LoadingState.IDLE);

  /**
   * Set loading state
   */
  protected setLoading(): void {
    this.loadingState.set(LoadingState.LOADING);
    this.error.set(null);
  }

  /**
   * Set success state
   */
  protected setSuccess(): void {
    this.loadingState.set(LoadingState.SUCCESS);
    this.error.set(null);
  }

  /**
   * Set error state
   * @param errorMessage Error message to display
   */
  protected setError(errorMessage: string): void {
    this.loadingState.set(LoadingState.ERROR);
    this.error.set(errorMessage);
  }

  /**
   * Reset to idle state
   */
  protected setIdle(): void {
    this.loadingState.set(LoadingState.IDLE);
    this.error.set(null);
  }

  /**
   * Handle HTTP error
   * @param error Error object
   * @param customMessage Custom error message
   */
  protected handleError(error: any, customMessage?: string): void {
    const message = customMessage || 'حدث خطأ أثناء تحميل البيانات';
    this.setError(message);
    console.error('Error:', error);
  }

  /**
   * Retry logic - to be implemented by child components
   */
  protected abstract retry?(): void;
}
