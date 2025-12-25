import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProgramsService } from '../../Services/real-services/programs/programs.service';
import { ProgramMembersService } from '../../Services/real-services/programs/program-members.service';
import { ProgramDetailsService } from '../../Services/real-services/programs/program-details.service';
import {
  Program,
  ProgramMember,
  ProgramDetail,
} from '../../model/program.model';
import { FooterComponent } from '../shared/footer/footer.component';
import { SkeletonModule } from 'primeng/skeleton';

interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, SkeletonModule],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent implements OnInit {
  private readonly programsService = inject(ProgramsService);
  private readonly membersService = inject(ProgramMembersService);
  private readonly detailsService = inject(ProgramDetailsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  allPrograms: Program[] = [];
  currentProgram: Program | null = null;
  currentSection: SectionConfig | null = null;
  programMembers: ProgramMember[] = [];
  programLeader: ProgramMember | null = null;
  programDetails: ProgramDetail[] = [];
  isLoading = true;
  hasError = false;

  programSections: SectionConfig[] = [
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
    { id: 'details', title: 'Details', icon: 'pi pi-list', route: 'details' },
    { id: 'staff', title: 'Staff', icon: 'pi pi-users', route: 'staff' },
  ];

  ngOnInit() {
    this.loadPrograms();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadProgram(params['id']);
        this.loadSection(params['section'] || 'about');
      }
    });
  }

  loadPrograms() {
    this.isLoading = true;
    this.hasError = false;

    this.programsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allPrograms = response.data;
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  loadProgram(id: string) {
    this.programsService.getById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.currentProgram = response.data;
          this.loadRelatedData(id);
        }
      },
    });
  }

  loadRelatedData(programId: string) {
    // Load Members
    this.membersService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.programMembers = response.data.filter(
            (m) => m.programId === programId
          );
          this.programLeader =
            this.programMembers.find((m) => m.isLeader) || null;
        }
      },
    });

    // Load Details
    this.detailsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.programDetails = response.data.filter(
            (d) => d.programId === programId
          );
        }
      },
    });
  }

  loadSection(sectionId: string) {
    this.currentSection =
      this.programSections.find((s) => s.id === sectionId) ||
      this.programSections[0];
  }

  selectProgram(program: Program) {
    this.currentProgram = program;
    this.currentSection = this.programSections[0];
    this.loadRelatedData(program.id);
    this.router.navigate(['/programs', program.id, 'about']);
  }

  selectSection(section: SectionConfig) {
    this.currentSection = section;
    if (this.currentProgram) {
      this.router.navigate([
        '/programs',
        this.currentProgram.id,
        section.route,
      ]);
    }
  }

  getFeaturedImage(): string {
    if (this.currentProgram?.programAttachments?.length) {
      return this.currentProgram.programAttachments[0].url;
    }
    return '';
  }

  getProgramName(program: Program): string {
    return program.pageTitle || 'Program';
  }
}
