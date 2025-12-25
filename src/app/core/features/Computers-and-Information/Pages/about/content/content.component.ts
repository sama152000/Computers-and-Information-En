import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from '../../../Services/real-services/about.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  private readonly aboutService = inject(AboutService);

  contentData: {
    title: string;
    content: string;
    mission: string;
    vision: string;
  } | null = null;

  isLoading = true;
  hasError = false;

  ngOnInit() {
    this.loadContent();
  }

  private loadContent(): void {
    this.isLoading = true;
    this.hasError = false;

    this.aboutService.getByPageType('AboutUniversity').subscribe({
      next: (data) => {
        if (data) {
          this.contentData = {
            title: data.pageNameEn || 'About Faculty',
            content: data.content,
            mission: data.mission,
            vision: data.vision,
          };
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
