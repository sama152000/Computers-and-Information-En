import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServicesService } from '../../Services/services.service';
import { Service, ServiceSection } from '../../model/service.model';
import { FooterComponent } from '../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, FormsModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  allServices: Service[] = [];
  currentService: Service | null = null;
  serviceSections: ServiceSection[] = [];
  currentSection: ServiceSection | null = null;

  constructor(
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadServices();
    this.loadServiceSections();

    this.route.params.subscribe(params => {
      const id = params['id'];
      const section = params['section'];
      if (id) {
        this.loadService(id);
        this.loadSection(section || 'about');
      }
    });
  }

  loadServices() {
    this.servicesService.getAllServices().subscribe(s => this.allServices = s);
  }

  loadServiceSections() {
    this.servicesService.getServiceSections().subscribe(s => this.serviceSections = s);
  }

  loadService(id: string) {
    this.servicesService.getServiceById(id).subscribe(s => this.currentService = s || null);
  }

  loadSection(sectionId: string) {
    this.currentSection = this.serviceSections.find(s => s.id === sectionId) || this.serviceSections[0];
  }

  selectService(service: Service) {
    this.currentService = service;
    this.currentSection = this.serviceSections[0];
    this.router.navigate(['/services', service.id, 'about']);
  }

  selectSection(section: ServiceSection) {
    this.currentSection = section;
    if (this.currentService) {
      this.router.navigate(['/services', this.currentService.id, section.route]);
    }
  }

  goToServices() {
    this.router.navigate(['/services']);
  }
}