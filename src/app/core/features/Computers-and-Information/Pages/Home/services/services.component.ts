import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  transformPosition = 0;
  cardWidth = 350; // Width of each card + gap
  autoplayInterval: any;
  displayServices: Service[] = [];

  services: Service[] = [
    {
      id: 1,
      title: 'Computer Labs',
      description: 'Access to high-performance computing and software tools.',
      icon: 'pi pi-desktop',
      features: ['24/7 Access', 'Latest Software', 'High-Speed Internet', 'Technical Support']
    },
    {
      id: 2,
      title: 'Research Support',
      description: 'Encouraging innovative research through grants and mentorship.',
      icon: 'pi pi-user',
      features: ['Research Grants', 'Expert Mentorship', 'Publication Support', 'Conference Funding']
    },
    {
      id: 3,
      title: 'Library',
      description: 'Comprehensive digital and physical resources for all students.',
      icon: 'pi pi-book',
      features: ['Digital Library', 'Study Spaces', 'Research Databases', 'Extended Hours']
    },
    {
      id: 4,
      title: 'Community Outreach',
      description: 'Collaborating with industry and society for a better tech future.',
      icon: 'pi pi-users',
      features: ['Industry Partnerships', 'Internship Programs', 'Community Projects', 'Tech Workshops']
    }
  ];

  ngOnInit() {
    this.displayServices = this.services.concat(this.services);
    this.startAutoplay();
    this.updateCardWidth();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  nextSlide() {
    this.currentIndex++;
    this.transformPosition = -this.currentIndex * this.cardWidth;
    if (this.currentIndex >= this.services.length) {
      setTimeout(() => {
        this.currentIndex = 0;
        this.transformPosition = 0;
      }, 600); // Match transition duration
    }
  }

  previousSlide() {
    this.currentIndex--;
    this.transformPosition = -this.currentIndex * this.cardWidth;
    if (this.currentIndex < 0) {
      setTimeout(() => {
        this.currentIndex = this.services.length - 1;
        this.transformPosition = -this.currentIndex * this.cardWidth;
      }, 600);
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.transformPosition = -this.currentIndex * this.cardWidth;
    this.stopAutoplay();
    setTimeout(() => this.startAutoplay(), 3000);
  }

  get activeIndex(): number {
    return this.currentIndex % this.services.length;
  }

  private updateCardWidth() {
    // Adjust card width based on screen size
    if (window.innerWidth < 768) {
      this.cardWidth = 300;
    } else if (window.innerWidth < 992) {
      this.cardWidth = 320;
    } else {
      this.cardWidth = 350;
    }
  }
}