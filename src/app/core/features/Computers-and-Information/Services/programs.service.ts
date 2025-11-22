// src/app/services/programs.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Program, ProgramSection, HomeProgram } from '../model/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  private programs: Program[] = [
    {
      id: 'cs-general',
      name: 'Computer Science Program',
      degree: 'Bachelor of Science in Computer Science',
      duration: '4 Academic Years',
      creditHours: 144,
      department: 'Computer Science Department',
      startYear: 1995,
      accreditation: 'Accredited by the Supreme Council of Universities',
      description: 'The main and oldest program of the faculty, providing comprehensive education in theoretical and applied computer science, algorithms, software development, and advanced systems.',
      vision: 'Leadership in computer science education and scientific research in Upper Egypt.',
      mission: 'Graduating distinguished competencies capable of innovation and competing globally in software industry and scientific research.',
      objectives: [
        'Building strong theoretical foundations in computer science',
        'Developing advanced programming and problem-solving skills',
        'Preparing graduates for postgraduate studies and scientific research',
        'Meeting the needs of the local and regional labor market'
      ],
      admissionRequirements: [
        'General Secondary Certificate (Thanaweya Amma) - Science (Mathematics) section',
        'Minimum score determined annually by the Coordination Office',
        'Success in faculty aptitude tests (if any)'
      ],
      courses: [
        'Data Structures and Algorithms',
        'Operating Systems',
        'Computer Architecture',
        'Database Systems',
        'Artificial Intelligence Fundamentals',
        'Software Engineering',
        'Compiler Design'
      ],
      coordinator: {
        name: 'Prof. Dr. Mohamed Abdelrahman Elsayed',
        position: 'Head of Computer Science Department',
        email: 'mohamed.abdelrahman@fci.luxor.edu.eg',
      },
      image: 'assets/img1.jpg',
      icon: 'pi pi-code',
      students: 450

    },
    {
      id: 'ai',
      name: 'Artificial Intelligence Program',
      degree: 'Bachelor of Science in Artificial Intelligence',
      duration: '4 Academic Years',
      creditHours: 140,
      department: 'Computer Science Department',
      startYear: 2024,
      accreditation: 'New Program - Under Accreditation Process',
      description: 'A modern program launched in 2024 focusing on artificial intelligence, machine learning, deep learning, computer vision, and natural language processing.',
      vision: 'To be a pioneer in AI education in Upper Egypt and a center for applied AI research.',
      mission: 'Graduating AI specialists capable of developing intelligent systems that solve real-world problems in health, education, agriculture, and industry.',
      objectives: [
        'Mastering fundamentals of AI and machine learning',
        'Practical application of deep learning and neural networks',
        'Developing AI solutions in Arabic language processing',
        'Promoting ethical and responsible AI practices'
      ],
      admissionRequirements: [
        'General Secondary Certificate (Thanaweya Amma) - Science (Mathematics)',
        'High score in Mathematics and English',
        'Passing the faculty admission interview'
      ],
      courses: [
        'Introduction to Artificial Intelligence',
        'Machine Learning',
        'Deep Learning and Neural Networks',
        'Natural Language Processing',
        'Computer Vision',
        'AI Ethics and Society',
        'Big Data Analytics'
      ],
      coordinator: {
        name: 'Dr. Ahmed Hassan Mahmoud',
        position: 'AI Program Coordinator',
        email: 'ahmed.hassan@fci.luxor.edu.eg'
      },
      image: 'assets/img2.jpg',
      icon: 'pi pi-brain',
      students: 120

    },
    {
      id: 'is',
      name: 'Information Systems Program',
      degree: 'Bachelor of Science in Information Systems',
      duration: '4 Academic Years',
      creditHours: 142,
      department: 'Information Systems Department',
      startYear: 2008,
      accreditation: 'Accredited',
      description: 'Focuses on designing and developing enterprise information systems, business analysis, database management, and digital transformation solutions.',
      vision: 'Excellence in preparing specialists in information systems and business technology.',
      mission: 'Graduating professionals capable of analyzing requirements and building integrated information systems that support institutional decision-making.',
      objectives: [
        'Understanding business processes and information needs',
        'Designing and implementing database systems',
        'Developing enterprise resource planning (ERP) solutions',
        'Applying business intelligence and data analysis'
      ],
      courses: [
        'Systems Analysis and Design',
        'Database Management Systems',
        'Enterprise Systems',
        'Business Intelligence',
        'E-Commerce',
        'Project Management'
      ],
      coordinator: {
        name: 'Dr. Amani Ashraf Salama',
        position: 'Information Systems Department Supervisor',
        email: 'amani.ashraf@fci.luxor.edu.eg'
      },
      image: 'assets/img3.jpg',
      icon: 'pi pi-chart-line',
      students: 200

    },
    {
      id: 'it',
      name: 'Information Technology Program',
      degree: 'Bachelor of Science in Information Technology',
      duration: '4 Academic Years',
      creditHours: 138,
      department: 'Information Technology Department',
      startYear: 2010,
      accreditation: 'Accredited',
      description: 'Specialized in networks, cybersecurity, cloud computing, Internet of Things (IoT), and IT infrastructure management.',
      vision: 'Leadership in information technology and cybersecurity education.',
      mission: 'Preparing professionals capable of designing, implementing, and securing modern information technology infrastructures.',
      objectives: [
        'Mastering network design and management',
        'Understanding cybersecurity principles and ethical hacking',
        'Cloud computing and virtualization technologies',
        'Internet of Things and smart systems'
      ],
      courses: [
        'Computer Networks',
        'Network Security',
        'Cloud Computing',
        'Internet of Things',
        'Mobile Application Development',
        'Digital Forensics'
      ],
      coordinator: {
        name: 'Dr. Hosny Ahmed Abbas',
        position: 'Information Technology Department Coordinator',
        email: 'hosny.abbas@fci.luxor.edu.eg'
      },
      image: 'assets/img4.jpg',
      icon: 'pi pi-shield',
      students: 180

    }
  ];

  private programSections: ProgramSection[] = [
    { id: 'overview', title: 'Program Overview', icon: 'pi pi-info-circle', route: 'overview' },
    { id: 'vision-mission', title: 'Vision & Mission', icon: 'pi pi-eye', route: 'vision-mission' },
    { id: 'objectives', title: 'Objectives', icon: 'pi pi-target', route: 'objectives' },
    { id: 'admission', title: 'Admission Requirements', icon: 'pi pi-user-plus', route: 'admission' },
    { id: 'courses', title: 'Key Courses', icon: 'pi pi-book', route: 'courses' },
    { id: 'coordinator', title: 'Program Coordinator', icon: 'pi pi-user', route: 'coordinator' }
  ];

  getAllPrograms(): Observable<Program[]> {
    return of(this.programs);
  }

  getProgramsForHome(): Observable<HomeProgram[]> {
    const homePrograms: HomeProgram[] = this.programs.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      duration: p.duration,
      image: p.image || '',
      icon: p.icon || '',
      students: p.students || 0
    }));
    return of(homePrograms);
  }

  getProgramById(id: string): Observable<Program | undefined> {
    return of(this.programs.find(p => p.id === id));
  }

  getProgramSections(): Observable<ProgramSection[]> {
    return of(this.programSections);
  }

}