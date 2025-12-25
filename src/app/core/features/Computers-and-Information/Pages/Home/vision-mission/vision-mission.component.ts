import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AboutService } from '../../../Services/real-services/about.service';
import { SkeletonModule } from 'primeng/skeleton';

// Constants for routes
const ROUTES = {
  VISION_MISSION: '/about/vision-mission',
  HISTORY: '/about/history',
  CONTENT: '/about/content',
} as const;

// Constants for icons
const ICONS = {
  CONTENT: 'pi pi-file-edit',
  VISION: 'pi pi-eye',
  MISSION: 'pi pi-flag',
  HISTORY: 'pi pi-clock',
} as const;

interface VisionMissionItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  routes?: string;
}

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './vision-mission.component.html',
  styleUrls: ['./vision-mission.component.css'],
})
export class VisionMissionComponent implements OnInit {
  private readonly aboutService = inject(AboutService);
  private readonly router = inject(Router);

  visionMissionData: VisionMissionItem[] = [];
  isLoading = true;
  hasError = false;

  ngOnInit() {
    this.loadAboutData();
  }

  private loadAboutData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.aboutService.getByPageType('AboutUniversity').subscribe({
      next: (data) => {
        if (data) {
          this.visionMissionData = [
            {
              id: 1,
              title: 'About Us',
              description:
                this.stripHtml(data.content) ||
                'Learn more about our faculty and its mission.',
              icon: ICONS.CONTENT,
              routes: ROUTES.CONTENT,
            },
            {
              id: 2,
              title: 'Our Vision',
              description:
                this.stripHtml(data.vision) || 'Our vision for the future.',
              icon: ICONS.VISION,
              routes: ROUTES.VISION_MISSION,
            },
            {
              id: 3,
              title: 'Our Mission',
              description:
                this.stripHtml(data.mission) || 'Our mission and values.',
              icon: ICONS.MISSION,
              routes: ROUTES.VISION_MISSION,
            },
            {
              id: 4,
              title: 'Our History',
              description:
                this.stripHtml(data.history) || 'The history of our faculty.',
              icon: ICONS.HISTORY,
              routes: ROUTES.HISTORY,
            },
          ];
        }
        this.isLoading = false;
        // Add intersection observer for animations after data loads
        this.observeElements();
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  /**
   * Strip HTML tags and truncate text for card descriptions
   */
  private stripHtml(html: string): string {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const text = doc.body.textContent || '';
    // Truncate to 150 characters for card display
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  }

  navigateTo(item: VisionMissionItem): void {
    if (item.routes) {
      this.router.navigate([item.routes]);
    }
  }

  private observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((el) => observer.observe(el));
    }, 100);
  }
}
