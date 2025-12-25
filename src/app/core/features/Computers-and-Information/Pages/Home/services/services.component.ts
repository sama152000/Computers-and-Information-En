import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import {
  FacultyServicesService,
  FacultyService,
} from '../../../Services/real-services/services.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    ButtonModule,
    SkeletonModule,
  ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  private readonly servicesService = inject(FacultyServicesService);

  services: FacultyService[] = [];
  isLoading = true;

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.isLoading = true;
    this.servicesService.getActiveServices().subscribe({
      next: (services) => {
        this.services = services;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  getIconClass(iconPath?: string | null): string {
    if (!iconPath) return 'pi pi-cog';
    if (iconPath.startsWith('pi ')) return iconPath;
    if (iconPath.startsWith('pi-')) return 'pi ' + iconPath;
    return 'pi pi-cog';
  }
}
