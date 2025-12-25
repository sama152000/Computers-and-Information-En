import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AboutService,
  Goal,
} from '../../../Services/real-services/about.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-objectives',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css'],
})
export class ObjectivesComponent implements OnInit {
  private readonly aboutService = inject(AboutService);

  objectives: Goal[] = [];
  isLoading = true;
  hasError = false;

  ngOnInit() {
    this.loadObjectives();
  }

  private loadObjectives(): void {
    this.isLoading = true;
    this.hasError = false;

    this.aboutService.getByPageType('AboutUniversity').subscribe({
      next: (data) => {
        if (data && data.goals) {
          this.objectives = data.goals.sort((a, b) => a.index - b.index);
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
}
