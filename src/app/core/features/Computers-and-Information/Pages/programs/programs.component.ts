import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from '../../Services/programs.service';
import { Program, ProgramSection } from '../../model/program.model';
import { FooterComponent } from "../shared/footer/footer.component";
@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  allPrograms: Program[] = [];
  currentProgram: Program | null = null;
  programSections: ProgramSection[] = [];
  currentSection: ProgramSection | null = null;

  constructor(
    private programsService: ProgramsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPrograms();
    this.loadProgramSections();

    this.route.params.subscribe(params => {
      const id = params['id'];
      const section = params['section'];
      if (id) {
        this.loadProgram(id);
        this.loadSection(section || 'about');
      }
    });
  }

  loadPrograms() {
    this.programsService.getAllPrograms().subscribe(p => this.allPrograms = p);
  }

  loadProgramSections() {
    this.programsService.getProgramSections().subscribe(s => this.programSections = s);
  }

  loadProgram(id: string) {
    this.programsService.getProgramById(id).subscribe(p => this.currentProgram = p || null);
  }

  loadSection(sectionId: string) {
    this.currentSection = this.programSections.find(s => s.id === sectionId) || this.programSections[0];
  }

  selectProgram(program: Program) {
    this.currentProgram = program;
    this.currentSection = this.programSections[0];
    this.router.navigate(['/programs', program.id, 'about']);
  }

  selectSection(section: ProgramSection) {
    this.currentSection = section;
    if (this.currentProgram) {
      this.router.navigate(['/programs', this.currentProgram.id, section.route]);
    }
  }
}