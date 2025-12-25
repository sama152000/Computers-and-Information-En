import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../Services/real-services/news.service';
import { News } from '../../model/news.model';
import { FooterComponent } from '../shared/footer/footer.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FooterComponent,
    SkeletonModule,
  ],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  allNewsItems: News[] = [];
  newsItems: News[] = [];
  activeTab: 'news' | 'event' = 'news';
  isLoading = true;
  hasError = false;

  // Pagination
  currentPage = 1;
  pageSize = 6;
  totalItems = 0;
  totalPages = 0;

  ngOnInit(): void {
    // Check route to determine active tab
    this.route.url.subscribe((segments) => {
      const path = segments.map((s) => s.path).join('/');
      if (path.includes('events')) {
        this.activeTab = 'event';
      } else {
        this.activeTab = 'news';
      }
      this.loadNews();
    });
  }

  onTabChange(tab: 'news' | 'event'): void {
    this.activeTab = tab;
    this.currentPage = 1;

    // Update URL without reloading
    if (tab === 'event') {
      this.router.navigate(['/news/events'], { replaceUrl: true });
    } else {
      this.router.navigate(['/news'], { replaceUrl: true });
    }

    this.filterNews();
  }

  loadNews(): void {
    this.isLoading = true;
    this.hasError = false;

    this.newsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allNewsItems = response.data;
          this.filterNews();
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  private filterNews(): void {
    // Filter by category type
    let filtered: News[];
    if (this.activeTab === 'event') {
      filtered = this.allNewsItems.filter((item) =>
        item.postCategories?.some(
          (cat) => cat.categoryName?.toLowerCase() === 'event'
        )
      );
    } else {
      filtered = this.allNewsItems.filter((item) =>
        item.postCategories?.some(
          (cat) =>
            cat.categoryName?.toLowerCase() === 'news article' ||
            cat.categoryName?.toLowerCase() === 'news'
        )
      );
    }

    // Sort by date (newest first)
    filtered.sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );

    this.totalItems = filtered.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.newsItems = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.filterNews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToDetails(item: News): void {
    this.router.navigate(['/news', this.activeTab, item.id]);
  }

  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  }

  getExcerpt(content: string, maxLength: number = 150): string {
    if (!content) return '';
    const stripped = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    if (stripped.length <= maxLength) return stripped;
    return stripped.substring(0, maxLength).trim() + '...';
  }

  getMainCategory(item: News): string {
    if (item.postCategories && item.postCategories.length > 0) {
      return item.postCategories[0].categoryName || 'Uncategorized';
    }
    return 'Uncategorized';
  }

  getPaginationArray(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
