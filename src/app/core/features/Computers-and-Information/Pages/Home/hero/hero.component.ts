import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeroSectionsService,
  HeroSection,
} from '../../../Services/real-services/hero-sections.service';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly heroSectionsService = inject(HeroSectionsService);
  private readonly elRef = inject(ElementRef);

  currentSlide = 0;
  autoplayInterval: any;

  // Signals for reactive state management
  slides = signal<HeroSlide[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.setSliderHeight();
    this.loadHeroSections();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    this.stopAutoplay();
    window.removeEventListener('resize', this.onResize);
  }

  /**
   * Load hero sections from API
   */
  private loadHeroSections(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.heroSectionsService.getAllHeroSections().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Filter only active hero sections and map to HeroSlide format
          const activeSlides = response.data
            .filter((section: HeroSection) => section.isActive)
            .map((section: HeroSection) => ({
              id: section.id,
              title: section.title,
              subtitle: section.subTitle,
              description: section.description,
              image:
                section.heroAttachments?.[0]?.url || 'assets/default-hero.jpg',
            }));

          this.slides.set(activeSlides);

          // Start autoplay only if we have slides
          if (activeSlides.length > 0) {
            this.startAutoplay();
          }
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading hero sections:', err);
        this.error.set('Failed to load hero sections');
        this.isLoading.set(false);
      },
    });
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
    const slidesLength = this.slides().length;
    if (slidesLength > 0) {
      this.currentSlide = (this.currentSlide + 1) % slidesLength;
    }
  }

  previousSlide() {
    const slidesLength = this.slides().length;
    if (slidesLength > 0) {
      this.currentSlide =
        this.currentSlide === 0 ? slidesLength - 1 : this.currentSlide - 1;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopAutoplay();
    setTimeout(() => this.startAutoplay(), 3000);
  }
}
