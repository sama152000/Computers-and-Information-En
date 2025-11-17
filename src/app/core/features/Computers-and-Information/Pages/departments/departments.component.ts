import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartmentsService } from '../../Services/departments.service';
import { Department, DepartmentSection } from '../../model/department.model';
import { DepartmentContentComponent } from '../../Pages/departments/department-content/department-content.component';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule, DepartmentContentComponent, FooterComponent],
  templateUrl: './departments.component.html',
 styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  allDepartments: Department[] = [];
  currentDepartment: Department | null = null;
  departmentSections: DepartmentSection[] = [];
  currentSection: DepartmentSection | null = null;

  constructor(
    private departmentsService: DepartmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDepartments();
    this.loadDepartmentSections();
    
    // Subscribe to route parameters
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadDepartment(params['id']);
        if (params['section']) {
          this.loadSection(params['section']);
        } else {
          // Default to 'about' section
          this.loadSection('about');
        }
      }
    });
  }

  loadDepartments() {
    this.departmentsService.getAllDepartments().subscribe(departments => {
      this.allDepartments = departments;
    });
  }

  loadDepartmentSections() {
    this.departmentsService.getDepartmentSections().subscribe(sections => {
      this.departmentSections = sections;
    });
  }

  loadDepartment(id: string) {
    this.departmentsService.getDepartmentById(id).subscribe(department => {
      this.currentDepartment = department || null;
    });
  }

  loadSection(sectionId: string) {
    this.departmentsService.getSectionById(sectionId).subscribe(section => {
      this.currentSection = section || null;
    });
  }

  selectDepartment(department: Department) {
    this.currentDepartment = department;
    this.currentSection = this.departmentSections[0]; // Default to first section
    this.router.navigate(['/departments', department.id, 'about']);
  }

  selectSection(section: DepartmentSection) {
    this.currentSection = section;
    if (this.currentDepartment) {
      this.router.navigate(['/departments', this.currentDepartment.id, section.route]);
    }
  }
}