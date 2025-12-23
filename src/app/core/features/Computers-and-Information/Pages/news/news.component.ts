import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../Services/news.service';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FooterComponent],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  newsItems: any[] = [];
  activeTab: 'news' | 'event' = 'news';
  loading = false;

  // Pagination
  currentPage = 1;
  pageSize = 6;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

    this.loadNews();
  }

  loadNews(): void {
    this.loading = true;

    const filter: any = {
      type: this.activeTab,
    };

    this.newsService
      .getNews(filter, this.currentPage, this.pageSize)
      .subscribe((response) => {
        this.newsItems = response.items;
        this.totalItems = response.total;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.loading = false;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadNews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToDetails(item: any): void {
    this.router.navigate(['/news', item.type, item.id]);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
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
