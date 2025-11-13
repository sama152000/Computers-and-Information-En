import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../Services/news.service';
import { NewsItem } from '../../../model/news.model';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  currentItem: NewsItem | null = null;
  relatedItems: NewsItem[] = [];
  nextItem: NewsItem | null = null;
  previousItem: NewsItem | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const type = params['type'] as 'news' | 'event';
      
      if (id && type) {
        this.loadItemDetails(id, type);
      } else {
        this.router.navigate(['/news']);
      }
    });
  }

  loadItemDetails(id: number, type: 'news' | 'event'): void {
    this.loading = true;
    
    this.newsService.getNewsById(id).subscribe(item => {
      if (item && item.type === type) {
        this.currentItem = item;
        this.loadRelatedItems(item);
        this.loadNavigationItems(id, type);
        
        // Increment view count (in a real app, this would be handled by the backend)
        if (item.views) {
          item.views++;
        }
      } else {
        this.router.navigate(['/news']);
      }
      this.loading = false;
    });
  }

  loadRelatedItems(item: NewsItem): void {
    this.newsService.getRelatedNews(item.id, item.type, 4)
      .subscribe(items => {
        this.relatedItems = items;
      });
  }

  loadNavigationItems(id: number, type: 'news' | 'event'): void {
    this.newsService.getNextNews(id, type).subscribe(item => {
      this.nextItem = item;
    });
    
    this.newsService.getPreviousNews(id, type).subscribe(item => {
      this.previousItem = item;
    });
  }

  navigateToItem(item: NewsItem): void {
    this.router.navigate(['/news', item.type, item.id]);
  }

  navigateToNext(): void {
    if (this.nextItem) {
      this.navigateToItem(this.nextItem);
    }
  }

  navigateToPrevious(): void {
    if (this.previousItem) {
      this.navigateToItem(this.previousItem);
    }
  }

  navigateToAllNews(): void {
    this.router.navigate(['/news']);
  }

  navigateToAllEvents(): void {
    this.router.navigate(['/news/events']);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.currentItem?.title || '');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank');
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.currentItem?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
  }

  shareOnLinkedIn(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.currentItem?.title || '');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
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