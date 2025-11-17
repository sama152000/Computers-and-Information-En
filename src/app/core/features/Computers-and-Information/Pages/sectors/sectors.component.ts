import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorsService } from '../../Services/sectors.service';
import { Sector, SectorSection } from '../../model/sector.model';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent implements OnInit {
  allSectors: Sector[] = [];
  currentSector: Sector | null = null;
  sectorSections: SectorSection[] = [];
  currentSection: SectorSection | null = null;

  constructor(
    private sectorsService: SectorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSectors();
    this.loadSectorSections();

    this.route.params.subscribe(params => {
      const id = params['id'];
      const section = params['section'];
      if (id) {
        this.loadSector(id);
        this.loadSection(section || 'about');
      }
    });
  }

  loadSectors() {
    this.sectorsService.getAllSectors().subscribe(s => this.allSectors = s);
  }

  loadSectorSections() {
    this.sectorsService.getSectorSections().subscribe(s => this.sectorSections = s);
  }

  loadSector(id: string) {
    this.sectorsService.getSectorById(id).subscribe(s => this.currentSector = s || null);
  }

  loadSection(sectionId: string) {
    this.currentSection = this.sectorSections.find(s => s.id === sectionId) || this.sectorSections[0];
  }

  selectSector(sector: Sector) {
    this.currentSector = sector;
    this.currentSection = this.sectorSections[0];
    this.router.navigate(['/sectors', sector.id, 'about']);
  }

  selectSection(section: SectorSection) {
    this.currentSection = section;
    if (this.currentSector) {
      this.router.navigate(['/sectors', this.currentSector.id, section.route]);
    }
  }
}