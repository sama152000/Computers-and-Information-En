import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../Services/real-services/news.service';
import { News } from '../../../model/news.model';
import { FooterComponent } from '../../shared/footer/footer.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, SkeletonModule],
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
})
export class NewsDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly newsService = inject(NewsService);

  currentItem: News | null = null;
  relatedItems: News[] = [];
  isLoading = true;
  hasError = false;
  itemType: 'news' | 'event' = 'news';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const type = params['type'] as 'news' | 'event';

      if (id) {
        this.itemType = type || 'news';
        this.loadItemDetails(id);
      } else {
        this.router.navigate(['/news']);
      }
    });
  }

  loadItemDetails(id: string): void {
    this.isLoading = true;
    this.hasError = false;

    this.newsService.getById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.currentItem = response.data;
          this.loadRelatedItems();
        } else {
          this.router.navigate(['/news']);
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  loadRelatedItems(): void {
    if (!this.currentItem) return;

    this.newsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Filter related items by same category, exclude current item
          this.relatedItems = response.data
            .filter((item) => item.id !== this.currentItem!.id)
            .slice(0, 4);
        }
      },
    });
  }

  navigateToItem(item: News): void {
    this.router.navigate(['/news', this.itemType, item.id]);
  }

  navigateToAllNews(): void {
    this.router.navigate(['/news']);
  }

  navigateToAllEvents(): void {
    this.router.navigate(['/news/events']);
  }

  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(dateObj);
  }

  getMainCategory(): string {
    if (
      this.currentItem?.postCategories &&
      this.currentItem.postCategories.length > 0
    ) {
      return this.currentItem.postCategories[0].categoryName || 'Uncategorized';
    }
    return 'Uncategorized';
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.currentItem?.title || '');
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`,
      '_blank'
    );
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.currentItem?.title || '');
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      '_blank'
    );
  }

  shareOnLinkedIn(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.currentItem?.title || '');
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
      '_blank'
    );
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // You could add a toast notification here
      console.log('Link copied to clipboard');
    });
  }

  printArticle(): void {
    window.print();
  }
}
