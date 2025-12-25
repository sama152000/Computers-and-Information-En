import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FacultyServicesService,
  FacultyService,
} from '../../Services/real-services/services.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, SkeletonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  private readonly servicesService = inject(FacultyServicesService);

  allServices: FacultyService[] = [];
  selectedService: FacultyService | null = null;
  isLoading = true;
  hasError = false;

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.isLoading = true;
    this.hasError = false;

    this.servicesService.getActiveServices().subscribe({
      next: (services) => {
        this.allServices = services;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  selectService(service: FacultyService) {
    this.selectedService = service;
  }

  clearSelection() {
    this.selectedService = null;
  }

  getIconClass(iconPath: string | null | undefined): string {
    if (!iconPath) return 'pi pi-cog';
    // If it's a PrimeIcons class
    if (iconPath.startsWith('pi ')) return iconPath;
    // If it's a simple icon name, prefix with pi pi-
    if (iconPath.startsWith('pi-')) return 'pi ' + iconPath;
    // Default icon
    return 'pi pi-cog';
  }
}
