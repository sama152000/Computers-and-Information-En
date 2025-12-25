import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  DepartmentsService,
  Department,
} from '../../Services/real-services/departments/departments.service';
import { DepartmentContentComponent } from '../../Pages/departments/department-content/department-content.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SkeletonModule } from 'primeng/skeleton';

interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DepartmentContentComponent,
    FooterComponent,
    SkeletonModule,
  ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  private readonly departmentsService = inject(DepartmentsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  allDepartments: Department[] = [];
  currentDepartment: Department | null = null;
  currentSection: SectionConfig | null = null;
  isLoading = true;
  hasError = false;

  departmentSections: SectionConfig[] = [
    { id: 'about', title: 'About', icon: 'pi pi-info-circle', route: 'about' },
    {
      id: 'vision',
      title: 'Vision & Mission',
      icon: 'pi pi-eye',
      route: 'vision',
    },
    {
      id: 'objectives',
      title: 'Objectives',
      icon: 'pi pi-check-circle',
      route: 'objectives',
    },
    {
      id: 'programs',
      title: 'Programs',
      icon: 'pi pi-book',
      route: 'programs',
    },
    { id: 'staff', title: 'Staff', icon: 'pi pi-users', route: 'staff' },
  ];

  ngOnInit() {
    this.loadDepartments();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadDepartment(params['id']);
        this.loadSection(params['section'] || 'about');
      }
    });
  }

  loadDepartments() {
    this.isLoading = true;
    this.hasError = false;

    this.departmentsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allDepartments = response.data;
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  loadDepartment(id: string) {
    this.departmentsService.getById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.currentDepartment = response.data;
        }
      },
    });
  }

  loadSection(sectionId: string) {
    this.currentSection =
      this.departmentSections.find((s) => s.id === sectionId) ||
      this.departmentSections[0];
  }

  selectDepartment(department: Department) {
    this.currentDepartment = department;
    this.currentSection = this.departmentSections[0];
    this.router.navigate(['/departments', department.id, 'about']);
  }

  selectSection(section: SectionConfig) {
    this.currentSection = section;
    if (this.currentDepartment) {
      this.router.navigate([
        '/departments',
        this.currentDepartment.id,
        section.route,
      ]);
    }
  }

  getFeaturedImage(): string {
    if (this.currentDepartment?.departmentAttachments?.length) {
      const featured = this.currentDepartment.departmentAttachments.find(
        (a) => a.isFeatured
      );
      return (
        featured?.url || this.currentDepartment.departmentAttachments[0].url
      );
    }
    return '';
  }
}
