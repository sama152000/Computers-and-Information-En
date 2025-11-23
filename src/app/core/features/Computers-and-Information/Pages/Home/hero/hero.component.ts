import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  autoplayInterval: any;

  constructor(private elRef: ElementRef) {}

  slides: HeroSlide[] = [
    {
      id: 1,
      title: 'Welcome to the Computer Science Department',
      subtitle: 'Empowering innovation through technology and research',
      image: 'assets/slide1.jpg'
    },
    {
      id: 2,
      title: 'Explore Our Programs',
      subtitle: 'Undergraduate, Graduate, and Research Opportunities',
      image: 'assets/slide2.jpg'
    },
    {
      id: 3,
      title: 'Hands-On Learning',
      subtitle: 'Modern labs and real-world projects',
      image: 'assets/slide3.jpg'
    },
    {
      id: 4,
      title: 'Innovate, Design, and Create',
      subtitle: 'Our students shape the future of computing',
      image: 'assets/slide4.jpg'
    }
  ];

  ngOnInit() {
    this.setSliderHeight();
    this.startAutoplay();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    this.stopAutoplay();
    window.removeEventListener('resize', this.onResize);
  }

  @HostListener('window:resize')
  onResize = () => {
    this.setSliderHeight();
  };

  setSliderHeight() {
    const slider = this.elRef.nativeElement.querySelector('.hero-slider');
    if (slider) {
      slider.style.height = window.innerHeight + 'px';
      slider.style.minHeight = '280px'; // maintain min height for smaller devices
    }
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopAutoplay();
    setTimeout(() => this.startAutoplay(), 3000);
  }
}
