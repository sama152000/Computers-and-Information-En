/**
 * Global Loading Component
 * Displays the logo with a pulsing animation when HTTP requests are in progress
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loadingService.isLoading()) {
    <div class="loading-overlay">
      <div class="loading-container">
        <img src="assets/logo.jpg" alt="Loading..." class="loading-logo" />
        <div class="loading-ring"></div>
      </div>
    </div>
    }
  `,
  styles: `
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(6px);
    }

    .loading-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loading-logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      animation: pulse 1.5s ease-in-out infinite;
      box-shadow: 0 0 30px rgba(212, 168, 83, 0.5);
      z-index: 2;
    }

    .loading-ring {
      position: absolute;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 4px solid transparent;
      border-top-color: #d4a853;
      border-right-color: #0d4f8b;
      animation: spin 1.2s linear infinite;
    }

    .loading-ring::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 8px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #0d4f8b;
      border-left-color: #d4a853;
      animation: spin 1.5s linear infinite reverse;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(212, 168, 83, 0.4);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 40px rgba(212, 168, 83, 0.7);
      }
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
})
export class LoadingComponent {
  protected loadingService = inject(LoadingService);
}
