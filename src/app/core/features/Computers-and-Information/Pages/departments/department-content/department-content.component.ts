import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Department } from '../../../Services/real-services/departments/departments.service';
import {
  DepartmentMembersService,
  DepartmentMember,
} from '../../../Services/real-services/departments/department-members.service';
import {
  DepartmentProgramsService,
  DepartmentProgram,
} from '../../../Services/real-services/departments/department-programs.service';
import {
  DepartmentDetailsService,
  DepartmentDetail,
} from '../../../Services/real-services/departments/department-details.service';
import { SkeletonModule } from 'primeng/skeleton';

interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-department-content',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './department-content.component.html',
  styleUrls: ['./department-content.component.css'],
})
export class DepartmentContentComponent implements OnChanges {
  private readonly router = inject(Router);
  private readonly membersService = inject(DepartmentMembersService);
  private readonly programsService = inject(DepartmentProgramsService);
  private readonly detailsService = inject(DepartmentDetailsService);

  @Input() department!: Department;
  @Input() currentSection!: SectionConfig;

  // Related data
  departmentMembers: DepartmentMember[] = [];
  departmentLeader: DepartmentMember | null = null;
  departmentPrograms: DepartmentProgram[] = [];
  departmentDetails: DepartmentDetail[] = [];
  isLoadingRelated = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['department'] && this.department) {
      this.loadRelatedData();
    }
  }

  loadRelatedData() {
    this.isLoadingRelated = true;

    // Load Members
    this.membersService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.departmentMembers = response.data.filter(
            (m) => m.departmentId === this.department.id
          );
          this.departmentLeader =
            this.departmentMembers.find((m) => m.isLeader) || null;
        }
      },
    });

    // Load Programs
    this.programsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.departmentPrograms = response.data.filter(
            (p) => p.departmentId === this.department.id
          );
        }
      },
    });

    // Load Details
    this.detailsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.departmentDetails = response.data.filter(
            (d) => d.departmentId === this.department.id
          );
        }
        this.isLoadingRelated = false;
      },
      error: () => {
        this.isLoadingRelated = false;
      },
    });
  }

  getFeaturedImage(): string {
    if (this.department?.departmentAttachments?.length) {
      const featured = this.department.departmentAttachments.find(
        (a) => a.isFeatured
      );
      return featured?.url || this.department.departmentAttachments[0].url;
    }
    return '';
  }

  goToDepartments() {
    this.router.navigate(['/departments']);
  }
}
