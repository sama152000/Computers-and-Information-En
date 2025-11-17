import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Department, DepartmentSection } from '../../../model/department.model';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-department-content',
  standalone: true,
  imports: [CommonModule, ],
 templateUrl: './department-content.component.html',
 styleUrls: ['./department-content.component.css']
})
export class DepartmentContentComponent implements OnInit {
  @Input() department!: Department;
  @Input() currentSection!: DepartmentSection;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToDepartments() {
    this.router.navigate(['/departments']);
  }


}