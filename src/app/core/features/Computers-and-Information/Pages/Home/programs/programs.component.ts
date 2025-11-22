// programs.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProgramsService } from '../../../Services/programs.service';
import { HomeProgram } from '../../../model/program.model';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  programs: HomeProgram[] = [];

  constructor(private programsService: ProgramsService, private router: Router) {}

  ngOnInit(): void {
    this.programsService.getProgramsForHome().subscribe(data => {
      this.programs = data;
      setTimeout(() => this.observeElements(), 100);
    });
  }

  navigateToProgram(programId: string): void {
    this.router.navigate(['/programs', programId, 'overview']);
  }

  private observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.program-card').forEach(card => {
      observer.observe(card);
    });
  }
}