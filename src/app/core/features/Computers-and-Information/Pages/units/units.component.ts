// src/app/core/features/Computers-and-Information/Pages/units/units.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UnitsService } from '../../Services/units.service';
import { Unit, UnitSection } from '../../model/unit.model';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  allUnits: Unit[] = [];
  currentUnit: Unit | null = null;
  unitSections: UnitSection[] = [];
  currentSection: UnitSection | null = null;

  constructor(
    private unitsService: UnitsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUnits();
    this.loadUnitSections();

    this.route.params.subscribe(params => {
      const id = params['id'];
      const section = params['section'];
      
      if (id) {
        this.loadUnit(id);
        this.loadSection(section || 'about');
      }
    });
  }

  loadUnits() {
    this.unitsService.getAllUnits().subscribe(units => this.allUnits = units);
  }

  loadUnitSections() {
    this.unitsService.getUnitSections().subscribe(sections => this.unitSections = sections);
  }

  loadUnit(id: string) {
    this.unitsService.getUnitById(id).subscribe(unit => this.currentUnit = unit || null);
  }

  loadSection(sectionId: string) {
    this.currentSection = this.unitSections.find(s => s.id === sectionId) || this.unitSections[0];
  }

  selectUnit(unit: Unit) {
    this.currentUnit = unit;
    this.currentSection = this.unitSections[0];
    this.router.navigate(['/units', unit.id, 'about']);
  }

  selectSection(section: UnitSection) {
    this.currentSection = section;
    if (this.currentUnit) {
      this.router.navigate(['/units', this.currentUnit.id, section.route]);
    }
  }

  goToUnits() {
    this.router.navigate(['/units']);
  }
}