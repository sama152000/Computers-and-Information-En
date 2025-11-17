// src/app/Services/programs.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Program, ProgramSection } from '../model/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  private programs: Program[] = [
    {
      id: 'cs-general',
      name: 'Computer Science - General Program',
      degree: 'Bachelor of Science in Computer Science',
      duration: '4 Years',
      creditHours: 144,
      department: 'Computer Science',
      startYear: 1995,
      accreditation: 'Accredited by the Supreme Council of Universities',
      description: 'The flagship program offering comprehensive education in algorithms, software engineering, artificial intelligence, and advanced computing systems.',
      vision: 'To be a leading program in computer science education and research in Upper Egypt and beyond.',
      mission: 'Preparing highly qualified graduates capable of innovation and leadership in the field of computing and information technology.',
      objectives: [
        'Develop strong theoretical foundations in computer science',
        'Enhance practical programming and problem-solving skills',
        'Foster research capabilities and innovation',
        'Prepare graduates for global competition'
      ],
      admissionRequirements: [
        'High school certificate (Thanaweya Amma - Science section)',
        'Minimum score determined annually by the coordination office',
        'Pass faculty admission tests (if applicable)'
      ],
      courses: [
        'Data Structures and Algorithms',
        'Operating Systems',
        'Database Systems',
        'Artificial Intelligence',
        'Machine Learning',
        'Computer Networks',
        'Software Engineering'
      ],
      coordinator: {
        name: 'Prof. Ahmed Mahmoud Ali',
        position: 'Program Coordinator',
        email: 'ahmed.mahmoud@fci.edu.eg'
      }
    },
    {
      id: 'ai',
      name: 'Artificial Intelligence Program',
      degree: 'Bachelor of Science in Artificial Intelligence',
      duration: '4 Years',
      creditHours: 140,
      department: 'Computer Science',
      startYear: 2023,
      accreditation: 'New program - Under review for accreditation',
      description: 'A modern program focused on AI, machine learning, deep learning, natural language processing, and intelligent systems.',
      vision: 'To lead AI education and research in the region.',
      mission: 'Graduate AI specialists capable of developing intelligent solutions for real-world challenges.',
      objectives: [
        'Master AI and machine learning fundamentals',
        'Develop expertise in deep learning and neural networks',
        'Apply AI in various domains including healthcare, finance, and education',
        'Promote ethical AI development and deployment'
      ],
      courses: [
        'Introduction to Artificial Intelligence',
        'Machine Learning',
        'Deep Learning',
        'Natural Language Processing',
        'Computer Vision',
        'Reinforcement Learning',
        'AI Ethics and Society'
      ],
      coordinator: {
        name: 'Dr. Sara Mohamed Hassan',
        position: 'AI Program Director',
        email: 'sara.hassan@fci.edu.eg'
      }
    },
    {
      id: 'is',
      name: 'Information Systems Program',
      degree: 'Bachelor of Science in Information Systems',
      duration: '4 Years',
      creditHours: 142,
      department: 'Information Systems',
      startYear: 2000,
      description: 'Focuses on business applications of information technology, systems analysis, database management, and enterprise systems.',
      coordinator: {
        name: 'Prof. Fatima Osman',
        position: 'Program Coordinator'
      }
    },
    {
      id: 'it',
      name: 'Information Technology Program',
      degree: 'Bachelor of Science in Information Technology',
      duration: '4 Years',
      creditHours: 138,
      department: 'Information Technology',
      startYear: 2005,
      description: 'Emphasizes networking, cybersecurity, web development, cloud computing, and IT infrastructure management.',
      coordinator: {
        name: 'Dr. Khaled Ibrahim',
        position: 'IT Program Coordinator'
      }
    }
  ];

  private programSections: ProgramSection[] = [
    { id: 'about', title: 'About the Program', icon: 'pi pi-info-circle', route: 'about' },
    { id: 'vision', title: 'Vision & Mission', icon: 'pi pi-eye', route: 'vision' },
    { id: 'objectives', title: 'Program Objectives', icon: 'pi pi-target', route: 'objectives' },
    { id: 'admission', title: 'Admission Requirements', icon: 'pi pi-user-plus', route: 'admission' },
    { id: 'courses', title: 'Key Courses', icon: 'pi pi-book', route: 'courses' },
    { id: 'coordinator', title: 'Program Coordinator', icon: 'pi pi-user', route: 'coordinator' }
  ];

  getAllPrograms(): Observable<Program[]> {
    return of(this.programs);
  }

  getProgramById(id: string): Observable<Program | undefined> {
    return of(this.programs.find(p => p.id === id));
  }

  getProgramSections(): Observable<ProgramSection[]> {
    return of(this.programSections);
  }
}