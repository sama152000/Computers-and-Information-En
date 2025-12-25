import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NewsService } from '../../../Services/real-services/news.service';
import { News } from '../../../model/news.model';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  private readonly router = inject(Router);

  events: News[] = [];
  isLoading = true;
  hasError = false;

  ngOnInit() {
    this.fetchEvents();
    this.observeElements();
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.hasError = false;

    this.newsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Filter only events
          this.events = response.data
            .filter((item) =>
              item.postCategories?.some(
                (cat) => cat.categoryName?.toLowerCase() === 'event'
              )
            )
            .sort(
              (a, b) =>
                new Date(b.createdDate).getTime() -
                new Date(a.createdDate).getTime()
            )
            .slice(0, 4);
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  navigateToDetails(event: News): void {
    this.router.navigate(['/news', 'event', event.id]);
  }

  getExcerpt(content: string, maxLength: number = 120): string {
    if (!content) return '';
    const stripped = content.replace(/<[^>]*>/g, '');
    if (stripped.length <= maxLength) return stripped;
    return stripped.substring(0, maxLength).trim() + '...';
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
      const elements = document.querySelectorAll('.timeline-item');
      elements.forEach((el) => observer.observe(el));
    }, 100);
  }
}
