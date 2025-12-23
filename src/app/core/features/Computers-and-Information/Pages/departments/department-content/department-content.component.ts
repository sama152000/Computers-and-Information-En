import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './department-content.component.html',
  styleUrls: ['./department-content.component.css'],
})
export class DepartmentContentComponent implements OnInit {
  @Input() department!: any;
  @Input() currentSection!: any;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToDepartments() {
    this.router.navigate(['/departments']);
  }
}
