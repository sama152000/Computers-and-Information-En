import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NewsService } from '../../../Services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  newsArticles: any[] = [];

  constructor(private router: Router, private newsService: NewsService) {}

  ngOnInit() {
    this.fetchLatestNews();
    this.observeElements();
  }

  fetchLatestNews(): void {
    this.newsService.getNews({ type: 'news' }, 1, 6).subscribe((response) => {
      this.newsArticles = response.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        excerpt: item.description,
        imageUrl: item.imageUrl,
        date: item.date,
        category: item.category,
      }));
    });
  }

  navigateToDetails(article: any): void {
    this.router.navigate(['/news', 'news', article.id]);
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
