import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../Services/services.service';
import { Service } from '../../../model/service.model';

interface HomeService {
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
  constructor(private servicesService: ServicesService) {}

  currentIndex = 0;
  transformPosition = 0;
  cardWidth = 350; // Width of each card + gap
  autoplayInterval: any;
  displayServices: HomeService[] = [];

  services: HomeService[] = [];

  ngOnInit() {
    this.servicesService.getAllServices().subscribe(services => {
      this.services = services.map((service, index) => ({
        id: index + 1,
        title: service.name,
        description: service.description || '',
        icon: 'pi pi-cog', // Default icon since not in data
        features: service.servicesOffered || []
      }));
      this.displayServices = this.services.concat(this.services);
      this.startAutoplay();
      this.updateCardWidth();
    });
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