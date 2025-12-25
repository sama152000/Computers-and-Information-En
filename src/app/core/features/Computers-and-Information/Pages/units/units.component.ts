import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  UnitService,
  Unit,
} from '../../Services/real-services/units/unit.service';
import {
  UnitMemberService,
  UnitMember,
} from '../../Services/real-services/units/unitmember.service';
import { CentersService } from '../../Services/real-services/centers/centers.service';
import { Center } from '../../model/centers.model';
import { FooterComponent } from '../shared/footer/footer.component';
import { SkeletonModule } from 'primeng/skeleton';
import { forkJoin } from 'rxjs';

interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  route: string;
}

type ItemType = 'unit' | 'center';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, SkeletonModule],
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css'],
})
export class UnitsComponent implements OnInit {
  private readonly unitService = inject(UnitService);
  private readonly unitMemberService = inject(UnitMemberService);
  private readonly centersService = inject(CentersService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // Data
  allUnits: Unit[] = [];
  allCenters: Center[] = [];
  currentUnit: Unit | null = null;
  currentCenter: Center | null = null;
  unitMembers: UnitMember[] = [];
  unitLeader: UnitMember | null = null;

  // UI State
  activeTab: ItemType = 'unit';
  currentSection: SectionConfig | null = null;
  isLoading = true;
  hasError = false;
  isLoadingDetails = false;

  // Sections for Units
  unitSections: SectionConfig[] = [
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
    { id: 'members', title: 'Members', icon: 'pi pi-users', route: 'members' },
  ];

  // Sections for Centers
  centerSections: SectionConfig[] = [
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
  ];

  ngOnInit() {
    this.loadData();

    this.route.params.subscribe((params) => {
      const type = params['type'] as ItemType;
      const id = params['id'];
      const section = params['section'];

      if (type && id) {
        this.activeTab = type;
        if (type === 'unit') {
          this.loadUnit(id);
        } else {
          this.loadCenter(id);
        }
        this.loadSection(section || 'about');
      }
    });
  }

  loadData() {
    this.isLoading = true;
    this.hasError = false;

    forkJoin([
      this.unitService.getAllUnits(),
      this.centersService.getAllCenters(),
    ]).subscribe({
      next: ([unitsRes, centersRes]) => {
        if (unitsRes.success && unitsRes.data) {
          this.allUnits = unitsRes.data;
        }
        if (centersRes.success && centersRes.data) {
          this.allCenters = centersRes.data;
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  loadUnit(id: string) {
    this.isLoadingDetails = true;
    this.currentCenter = null;

    this.unitService.getById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.currentUnit = response.data;
          this.loadUnitMembers(id);
        }
        this.isLoadingDetails = false;
      },
      error: () => {
        this.isLoadingDetails = false;
      },
    });
  }

  loadCenter(id: string) {
    this.isLoadingDetails = true;
    this.currentUnit = null;

    this.centersService.getById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.currentCenter = response.data;
        }
        this.isLoadingDetails = false;
      },
      error: () => {
        this.isLoadingDetails = false;
      },
    });
  }

  loadUnitMembers(unitId: string) {
    this.unitMemberService.getByUnitId(unitId).subscribe({
      next: (members) => {
        this.unitMembers = members;
        this.unitLeader = members.find((m) => m.isLeader) || null;
      },
    });
  }

  loadSection(sectionId: string) {
    const sections =
      this.activeTab === 'unit' ? this.unitSections : this.centerSections;
    this.currentSection =
      sections.find((s) => s.id === sectionId) || sections[0];
  }

  onTabChange(tab: ItemType) {
    this.activeTab = tab;
    this.currentUnit = null;
    this.currentCenter = null;
    this.currentSection = null;
  }

  selectUnit(unit: Unit) {
    this.activeTab = 'unit';
    this.currentUnit = unit;
    this.currentCenter = null;
    this.currentSection = this.unitSections[0];
    this.router.navigate(['/units', 'unit', unit.id, 'about']);
    this.loadUnitMembers(unit.id);
  }

  selectCenter(center: Center) {
    this.activeTab = 'center';
    this.currentCenter = center;
    this.currentUnit = null;
    this.currentSection = this.centerSections[0];
    this.router.navigate(['/units', 'center', center.id, 'about']);
  }

  selectSection(section: SectionConfig) {
    this.currentSection = section;
    if (this.activeTab === 'unit' && this.currentUnit) {
      this.router.navigate([
        '/units',
        'unit',
        this.currentUnit.id,
        section.route,
      ]);
    } else if (this.activeTab === 'center' && this.currentCenter) {
      this.router.navigate([
        '/units',
        'center',
        this.currentCenter.id,
        section.route,
      ]);
    }
  }

  goToUnits() {
    this.currentUnit = null;
    this.currentCenter = null;
    this.currentSection = null;
    this.router.navigate(['/units']);
  }

  getCurrentSections(): SectionConfig[] {
    return this.activeTab === 'unit' ? this.unitSections : this.centerSections;
  }

  getCurrentName(): string {
    if (this.activeTab === 'unit' && this.currentUnit) {
      return this.currentUnit.unitTitleEn || this.currentUnit.unitTitle;
    }
    if (this.activeTab === 'center' && this.currentCenter) {
      return this.currentCenter.centerNameEn || this.currentCenter.centerName;
    }
    return '';
  }

  getFeaturedImage(): string {
    if (
      this.activeTab === 'unit' &&
      this.currentUnit?.unitAttachments?.length
    ) {
      return this.currentUnit.unitAttachments[0].url;
    }
    if (
      this.activeTab === 'center' &&
      this.currentCenter?.centerAttachments?.length
    ) {
      return this.currentCenter.centerAttachments[0].url;
    }
    return '';
  }
}
