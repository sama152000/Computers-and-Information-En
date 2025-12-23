// src/app/services/sectors.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectorsService {
  private sectors: any[] = [
    {
      id: 'is',
      name: 'Information Systems Department',
      description:
        'The Information Systems Department serves as the cornerstone of digital transformation, automation, data science, knowledge engineering, decision support systems, institutional management platforms, and a wide range of applied information systems across diverse sectors.',
      establishmentYear: undefined,
      headOfDepartment: {
        name: 'Dr. Amani Ashraf Salama',
        position: 'Supervisor of Information Systems Department',
        email: undefined,
        office: undefined,
      },
      vision:
        'The Information Systems Department strives to be a pioneering leader in Egypt and a distinguished provider of world-class education that keeps pace with the evolution of information systems and information sciences. It aims to deliver innovative research contributions while actively supporting the strategic goals of the faculty and the nation.',
      mission:
        'To cultivate an advanced educational environment enriched with cutting-edge academic and technological services that uphold quality, knowledge advancement, and innovation in information systems. The department is committed to achieving academic and research excellence, enhancing students’ professional skills, and empowering them to address modern challenges and succeed in competitive job markets.',
      objectives: [
        'Prepare highly qualified graduates in information systems, grounded in solid theoretical foundations and practical methodologies.',
        'Conduct cutting-edge scientific and applied research aligned with Egypt’s Vision 2030.',
        'Support government and business sectors through training and technical consultations.',
      ],
      researchAreas: [
        'Decision Support Systems',
        'Knowledge Management',
        'Enterprise Systems',
        'Data Mining & Knowledge Discovery',
        'Database Systems',
        'Business Intelligence',
      ],
      programs: ['Information Systems Program'],
      labs: [],
      staff: [
        { name: 'Dr. Amani Ashraf Salama', position: 'Department Supervisor' },
        { name: 'Dr. Mohamed Ali Fouad', position: 'Lecturer' },
        { name: 'Dr. Musa Al-Khudr Hosni', position: 'Lecturer' },
        { name: 'Eng. Jihad Sultan', position: 'Teaching Assistant' },
      ],
      contactInfo: {
        email: 'is@fci.luxor.edu.eg',
        phone: undefined,
        location: 'Faculty of Computers and Information, Luxor University',
      },
    },
    {
      id: 'it',
      name: 'Information Technology Department',
      description:
        'The department focuses on networking, cybersecurity, web and mobile application development, IoT, cloud computing, and IT infrastructure management.',
      headOfDepartment: {
        name: 'Dr. Hosny Ahmed Abbas',
        position: 'Coordinator of Information Technology Department',
        email: 'Hosny.abbas@fci.luxor.edu.eg',
      },
      vision:
        'To foster continuous improvement in IT education, enhance institutional performance, elevate graduates to global standards of excellence, and maximize community service and sustainable development.',
      mission:
        'Graduating highly skilled professionals in information technology, keeping programs up-to-date with global advancements, and solving real-world community problems through distinguished curricula and high-quality research.',
      objectives: [
        'Train specialists in IT, networking, and cybersecurity',
        'Conduct applied research with direct societal impact',
        'Provide technical consultations and professional diplomas',
        'Collaborate with industry for software localization and training',
      ],
      researchAreas: [
        'Cloud & Fog Computing',
        'Internet of Things (IoT)',
        'Cybersecurity & Digital Forensics',
        'Mobile Computing',
        'Big Data Analytics',
        'Smart Networks',
        'Blockchain Technology',
      ],
      programs: ['Information Technology Program'],
      staff: [
        {
          name: 'Dr. Hosny Ahmed Abbas',
          position: 'Coordinator',
          email: 'Hosny.abbas@fci.luxor.edu.eg',
        },
        {
          name: 'Dr. Hammam Mohamed Mohamed',
          position: 'Lecturer',
          email: 'hammam_abdelaal@fci.luxor.edu.eg',
        },
        {
          name: 'Eng. Ibrahim Elsayed Ibrahim',
          position: 'Assistant Lecturer',
          email: 'Ibrahim.elsayed@fci.luxor.edu.eg',
        },
      ],
      contactInfo: {
        email: 'it@fci.luxor.edu.eg',
        phone: undefined,
        location: 'Luxor University Campus',
      },
    },
    {
      id: 'quality',
      name: 'Quality Assurance Unit',
      description:
        'Responsible for promoting a culture of continuous improvement in education, research, and community service in alignment with NAQAAE standards.',
      headOfDepartment: {
        name: 'Dr. Mohamed Ali Fouad',
        position: 'Director of Quality Assurance Unit',
      },
      vision:
        'Achieving leadership at local and regional levels in promoting quality and continuous improvement for excellence.',
      mission:
        'Embedding a culture of continuous development to prepare the faculty for accreditation and contribute to sustainable community development.',
      objectives: [
        'Establish an internal quality assurance system',
        'Build trust with stakeholders',
        'Create supportive learning and research environments',
        'Promote quality culture among all members',
      ],
      contactInfo: {
        email: 'quality@fci.luxor.edu.eg',
        phone: undefined,
        location: undefined,
      },
    },
    {
      id: 'evaluation',
      name: 'Measurement and Evaluation Unit',
      description:
        'Develops modern, fair, and technology-enhanced student assessment and examination systems.',
      headOfDepartment: {
        name: 'Dr. Hosny Ahmed Abbas',
        position: 'Unit Director',
        email: 'Hosny.abbas@fci.luxor.edu.eg',
      },
      vision:
        'Continuous development of assessment systems to enhance graduate competitiveness.',
      mission:
        'Transform evaluation into a collaborative, fair, and impactful process aligned with quality standards.',
      objectives: [
        'Update question banks based on ILOs',
        'Train faculty on modern assessment methods',
        'Automate examinations and correction',
        'Monitor satisfaction and prepare annual reports',
      ],
      contactInfo: { email: 'evaluation@fci.luxor.edu.eg' },
    },
  ];

  private sectorSections: any[] = [
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
      icon: 'pi pi-target',
      route: 'objectives',
    },
    {
      id: 'research',
      title: 'Research Areas',
      icon: 'pi pi-flask',
      route: 'research',
    },
    {
      id: 'programs',
      title: 'Programs',
      icon: 'pi pi-graduation-cap',
      route: 'programs',
    },
    { id: 'staff', title: 'Staff', icon: 'pi pi-users', route: 'staff' },
    { id: 'contact', title: 'Contact', icon: 'pi pi-phone', route: 'contact' },
  ];

  getAllSectors(): Observable<any[]> {
    return of(this.sectors);
  }

  getSectorById(id: string): Observable<any | undefined> {
    return of(this.sectors.find((s) => s.id === id));
  }

  getSectorSections(): Observable<any[]> {
    return of(this.sectorSections);
  }
}
