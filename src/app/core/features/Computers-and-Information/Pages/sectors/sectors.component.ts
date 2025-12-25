import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorsService } from '../../Services/real-services/sectors/sectors.service';
import { SectorDetailsService } from '../../Services/real-services/sectors/sector-details.service';
import { SectorMembersService } from '../../Services/real-services/sectors/sector-members.service';
import { SectorProgramsService } from '../../Services/real-services/sectors/sector-programs.service';
import {
  Sector,
  SectorDetail,
  SectorMember,
  SectorProgram,
} from '../../model/sector.model';
import { FooterComponent } from '../shared/footer/footer.component';
import { SkeletonModule } from 'primeng/skeleton';
import { forkJoin } from 'rxjs';

interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [CommonModule, FooterComponent, SkeletonModule],
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css'],
})
export class SectorsComponent implements OnInit {
  private readonly sectorsService = inject(SectorsService);
  private readonly sectorDetailsService = inject(SectorDetailsService);
  private readonly sectorMembersService = inject(SectorMembersService);
  private readonly sectorProgramsService = inject(SectorProgramsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  allSectors: Sector[] = [];
  currentSector: Sector | null = null;
  sectorDetails: SectorDetail[] = [];
  sectorMembers: SectorMember[] = [];
  sectorPrograms: SectorProgram[] = [];
  sectorLeader: SectorMember | null = null;

  currentSection: SectionConfig | null = null;
  isLoading = true;
  hasError = false;
  isLoadingDetails = false;

  sectorSections: SectionConfig[] = [
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
    {
      id: 'programs',
      title: 'Programs',
      icon: 'pi pi-graduation-cap',
      route: 'programs',
    },
    { id: 'staff', title: 'Staff', icon: 'pi pi-users', route: 'staff' },
    {
      id: 'details',
      title: 'Details',
      icon: 'pi pi-file',
      route: 'details',
    },
  ];

  ngOnInit() {
    this.loadSectors();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      const section = params['section'];
      if (id) {
        this.loadSector(id);
        this.loadSection(section || 'about');
      }
    });
  }

  loadSectors() {
    this.isLoading = true;
    this.hasError = false;

    this.sectorsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allSectors = response.data;
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  loadSector(id: string) {
    this.isLoadingDetails = true;

    this.sectorsService.getById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.currentSector = response.data;
          this.loadSectorRelatedData(id);
        }
        this.isLoadingDetails = false;
      },
      error: () => {
        this.isLoadingDetails = false;
      },
    });
  }

  loadSectorRelatedData(sectorId: string) {
    forkJoin([
      this.sectorDetailsService.getAll(),
      this.sectorMembersService.getAll(),
      this.sectorProgramsService.getAll(),
    ]).subscribe({
      next: ([detailsRes, membersRes, programsRes]) => {
        if (detailsRes.success && detailsRes.data) {
          this.sectorDetails = detailsRes.data.filter(
            (d) => d.sectorId === sectorId
          );
        }
        if (membersRes.success && membersRes.data) {
          const members = membersRes.data.filter(
            (m) => m.sectorId === sectorId
          );
          this.sectorMembers = members;
          this.sectorLeader = members.find((m) => m.isLeader) || null;
        }
        if (programsRes.success && programsRes.data) {
          this.sectorPrograms = programsRes.data.filter(
            (p) => p.sectorId === sectorId
          );
        }
      },
    });
  }

  loadSection(sectionId: string) {
    this.currentSection =
      this.sectorSections.find((s) => s.id === sectionId) ||
      this.sectorSections[0];
  }

  selectSector(sector: Sector) {
    this.currentSector = sector;
    this.currentSection = this.sectorSections[0];
    this.router.navigate(['/sectors', sector.id, 'about']);
    this.loadSectorRelatedData(sector.id);
  }

  selectSection(section: SectionConfig) {
    this.currentSection = section;
    if (this.currentSector) {
      this.router.navigate(['/sectors', this.currentSector.id, section.route]);
    }
  }

  getFeaturedImage(): string {
    if (this.currentSector?.sectorAttachments) {
      const featured = this.currentSector.sectorAttachments.find(
        (a) => a.isFeatured
      );
      if (featured) return featured.url;
      if (this.currentSector.sectorAttachments.length > 0) {
        return this.currentSector.sectorAttachments[0].url;
      }
    }
    return '';
  }
}
