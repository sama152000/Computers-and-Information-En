import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: Date;
  category: string;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  constructor(private router: Router) {}

  newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: 'New AI Lab Inauguration',
      excerpt: 'The department proudly opens a new Artificial Intelligence research lab with advanced computing facilities and innovation spaces for students.',
      image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=60',
      date: new Date('2025-10-10'),
      category: 'Research'
    },
    {
      id: 2,
      title: 'Student Hackathon 2025',
      excerpt: 'Join our 48-hour coding challenge with industry mentors and exciting prizes. Open to all Computer Science students and alumni.',
      image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=60',
      date: new Date('2025-09-20'),
      category: 'Events'
    },
    {
      id: 3,
      title: 'Faculty Research Published',
      excerpt: 'Our faculty have published groundbreaking papers in IEEE journals, advancing the fields of AI ethics and machine learning optimization.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=60',
      date: new Date('2025-08-28'),
      category: 'Academic'
    }
  ];

  ngOnInit() {
    this.observeElements();
  }

  navigateToDetails(article: NewsArticle): void {
    this.router.navigate(['/news', 'news', article.id]);
  }

  private observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }
}
