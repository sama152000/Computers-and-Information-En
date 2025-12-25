// programs.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProgramsService } from '../../../Services/real-services/programs/programs.service';
import { Program } from '../../../model/program.model';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent implements OnInit {
  private readonly programsService = inject(ProgramsService);
  private readonly router = inject(Router);

  programs: Program[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.isLoading = true;
    this.programsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.programs = response.data;
        }
        this.isLoading = false;
        setTimeout(() => this.observeElements(), 100);
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  navigateToProgram(programId: string): void {
    this.router.navigate(['/programs', programId, 'about']);
  }

  getProgramImage(program: Program): string {
    if (program.programAttachments?.length) {
      return program.programAttachments[0].url;
    }
    return '';
  }

  getProgramName(program: Program): string {
    return program.pageTitle || 'Program';
  }

  private observeElements() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.program-card').forEach((card) => {
      observer.observe(card);
    });
  }
}
