import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NewsService } from '../../../Services/real-services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  newsArticles: any[] = [];

  router = inject(Router);
  newsService = inject(NewsService);

  ngOnInit(): void {
    this.fetchLatestNews();
  }

  fetchLatestNews(): void {
    this.newsService.getAll().subscribe((response: any) => {
      this.newsArticles = response.data.filter((article: any) =>
        article.postCategories?.some(
          (category: any) => category.categoryName === 'News Article'
        )
      );
    });
  }

  navigateToDetails(article: any): void {
    this.router.navigate(['/news', 'news', article.id]);
  }
}
