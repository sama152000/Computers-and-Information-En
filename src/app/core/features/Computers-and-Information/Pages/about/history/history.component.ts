import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from '../../../Services/real-services/about.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  private readonly aboutService = inject(AboutService);

  historyData: {
    title: string;
    history: string;
  } | null = null;

  isLoading = true;
  hasError = false;

  ngOnInit() {
    this.loadHistory();
  }

  private loadHistory(): void {
    this.isLoading = true;
    this.hasError = false;

    this.aboutService.getByPageType('AboutUniversity').subscribe({
      next: (data) => {
        if (data) {
          this.historyData = {
            title: data.pageNameEn || 'Our History',
            history: data.history,
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
