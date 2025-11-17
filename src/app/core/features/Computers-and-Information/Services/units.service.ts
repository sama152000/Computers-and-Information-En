// src/app/Services/units.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Unit, UnitSection , UnitMember } from '../model/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  private units: Unit[] = [
    {
      id: 'quality-assurance',
      name: 'Quality Assurance Unit',
      vision: 'The Quality Assurance Unit strives to achieve leadership at the local and regional levels in promoting a culture of quality and driving continuous improvement in university performance, with the ultimate goal of attaining excellence.',
      mission: 'The Quality Assurance Unit at the faculty is responsible for fostering and embedding a culture of continuous development across educational processes, scientific research, and community service — in full alignment with the standards of the National Authority for Quality Assurance and Accreditation of Education (NAQAAE).',
      objectives: [
        'Establish an Internal Quality System: Develop a structured and systematic quality assurance framework within the faculty...',
        'Build Trust: Foster an environment of confidence among students, stakeholders...',
        'Create a Supportive Learning Environment...',
        'Develop a Conducive Research Environment...',
        'Promote a Culture of Quality...',
        'Activate Departmental Engagement...',
        'Provide a Framework for Continuous Improvement...'
      ],
      supervisor: {
        name: 'Dr. Mohamed Ali Fouad',
        position: 'Director of the Quality Assurance Unit'
      },
      teachingStaff: [
        {
          name: 'Dr. Mohamed Ali Fouad',
          position: 'Director of the Quality Assurance Unit'
        }
      ],
      teachingAssistants: [],
      administrativeStaff: []
    },
    {
      id: 'measurement-evaluation',
      name: 'Measurement and Evaluation Unit',
      vision: 'Continuous development of student assessment and examination systems at the faculty to elevate the scientific proficiency and competitive edge of graduates within civil society.',
      mission: 'The Measurement and Evaluation Unit seeks to contribute effectively to the advancement of all aspects of the educational process—particularly examinations—through systematic, evidence-based efforts...',
      objectives: [
        'Raise awareness across the faculty about the concept and importance of measurement and evaluation...',
        'Develop and refine student assessment mechanisms...',
        'Prepare guidelines and standards...',
        'Train faculty members and teaching assistants...',
        'Establish and regularly update question banks...',
        'Provide technical support...',
        'Monitor satisfaction indicators...',
        'Review and prepare annual reports...',
        'Adopt modern pedagogical and technological assessment methods...',
        'Continuously evaluate the educational process...'
      ],
      supervisor: {
        name: 'Dr. Hosny Ahmed Abbas',
        position: 'Director – Measurement and Evaluation Unit',
        department: 'Information Technology Department',
        phone: '01007478550'
      },
      teachingStaff: [
        {
          name: 'Dr. Hosny Ahmed Abbas',
          position: 'Director – Measurement and Evaluation Unit',
          department: 'Information Technology Department',
          phone: '01007478550'
        },
        {
          name: 'Dr. Amani Ashraf',
          position: 'Deputy Director',
          department: 'Computer Science Department',
          phone: '01112282018'
        },
        { name: 'Eng. Ibrahim Elsayed Ibrahim', department: 'IT Department', phone: '01118919376', position: 'Member' },
        { name: 'Eng. Ibrahim Shawky Farahat', department: 'CS Department', phone: '01273090528', position: 'Member' },
        { name: 'Eng. Mohamed Fathy Mohamed', department: 'CS Department', phone: '01064679925', position: 'Member' }
      ],
      teachingAssistants: [],
      administrativeStaff: [
        {
          name: 'Ms. Asmaa Yassin',
          position: 'Student Affairs',
          phone: '01016168753'
        }
      ]
    }
  ];

  private unitSections: UnitSection[] = [
    { id: 'about', title: 'About the Unit', icon: 'pi pi-info-circle', route: 'about' },
    { id: 'vision', title: 'Unit Vision', icon: 'pi pi-eye', route: 'vision' },
    { id: 'mission', title: 'Unit Mission', icon: 'pi pi-flag', route: 'mission' },
    { id: 'objectives', title: 'Unit Objectives', icon: 'pi pi-target', route: 'objectives' },
    { id: 'research', title: 'Research Areas', icon: 'pi pi-search', route: 'research' },
    { id: 'structure', title: 'Organizational Structure', icon: 'pi pi-sitemap', route: 'structure' },
    { id: 'staff', title: 'Unit Staff', icon: 'pi pi-users', route: 'staff' }
  ];

  getAllUnits(): Observable<Unit[]> {
    return of(this.units);
  }

  getUnitById(id: string): Observable<Unit | undefined> {
    return of(this.units.find(u => u.id === id));
  }

  getUnitSections(): Observable<UnitSection[]> {
    return of(this.unitSections);
  }
}