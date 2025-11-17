import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department, DepartmentSection } from '../model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private departments: Department[] = [
    {
      id: 'information-systems',
      name: 'Information Systems Department',
      description: 'The Information Systems Department serves as the cornerstone of digital transformation, automation, data science, knowledge engineering, decision support systems, institutional management platforms, and a wide range of applied information systems across diverse sectors. This role stems from its deep focus on the foundational principles of information systems—analysis, design, development, and continuous enhancement—alongside advanced database technologies, data mining, knowledge discovery, and information center management.',
      vision: 'The Information Systems Department strives to be a pioneering leader in Egypt and a distinguished provider of world-class education that keeps pace with the evolution of information systems and information sciences. It aims to deliver innovative research contributions while actively supporting the strategic goals of the faculty and the nation.',
      mission: 'To cultivate an advanced educational environment enriched with cutting-edge academic and technological services that uphold quality, knowledge advancement, and innovation in information systems. The department is committed to achieving academic and research excellence, enhancing students\' professional skills, and empowering them to address modern challenges, succeed in competitive job markets—locally, regionally, and globally—and emerge as highly capable, market-ready graduates.',
      objectives: [
        'Prepare highly qualified graduates in information systems, grounded in solid theoretical foundations and practical methodologies, enabling them to compete effectively in local and international job markets.',
        'Conduct cutting-edge scientific and applied research in information systems aligned with Egypt\'s Vision 2030 for software development and technological advancement.',
        'Support government and business sectors through workforce training programs and the provision of advanced technical and technological consultations.'
      ],
      researchAreas: [
        'Database Systems and Data Mining',
        'Knowledge Discovery and Management',
        'Decision Support Systems',
        'Enterprise Resource Planning',
        'Business Intelligence',
        'Data Analytics and Visualization'
      ],
      organizationalStructure: [
        'Information Systems Department Council',
        'Examinations and Assessment Committee',
        'Alumni Affairs Committee',
        'Graduate Studies Committee',
        'Educational Process Monitoring Committee',
        'Academic Advising Committee',
        'Academic Grievances Review Committee',
        'Development and Quality Assurance Committee',
        'Timetabling and Scheduling Committee',
        'Graduation Projects Committee'
      ],
      administrativeStructure: {
        headOfDepartment: {
          id: 'amani-salama',
          name: 'Dr. Amani Ashraf Salama',
          position: 'Department Supervisor',
          email: 'amani.salama@fci.luxor.edu.eg',
          cvUrl: '#'
        },
        committees: []
      },
      teachingStaff: [
        {
          id: 'amani-salama',
          name: 'Dr. Amani Ashraf Salama',
          position: 'Department Supervisor',
          email: 'amani.salama@fci.luxor.edu.eg',
          cvUrl: '#'
        },
        {
          id: 'mohamed-fouad',
          name: 'Dr. Mohamed Ali Fouad',
          position: 'Lecturer',
          cvUrl: '#'
        },
        {
          id: 'musa-hosni',
          name: 'Dr. Musa Al-Khudr Hosni',
          position: 'Lecturer',
          cvUrl: '#'
        }
      ],
      teachingAssistants: [
        {
          id: 'jihad-sultan',
          name: 'Eng. Jihad Sultan',
          position: 'Teaching Assistant'
        }
      ],
      administrativeStaff: [
        {
          id: 'dept-secretary',
          name: 'Department Secretariat',
          position: 'Administrative Staff'
        }
      ],
      supervisor: {
        id: 'amani-salama',
        name: 'Dr. Amani Ashraf Salama',
        position: 'Supervisor of the Information Systems Department'
      },
      contactInfo: {
        email: 'info@is.fci.luxor.edu.eg',
        phone: '+20 123 456 789',
        location: 'Faculty of Computers and Information, Luxor University'
      }
    },
    {
      id: 'information-technology',
      name: 'Information Technology Department',
      description: 'The Information Technology Department at the Faculty of Computers and Information, Luxor University, was established pursuant to Decision No. (    ) dated (   /  /   ). Its primary mission is to produce graduates equipped with cutting-edge scientific knowledge in information technology, while aligning with modern development trends to address societal challenges effectively.',
      vision: 'The Information Technology Department aspires to foster continuous improvement in IT education to keep pace with rapid scientific and technological advancements, enhance institutional performance, elevate graduates to global standards of excellence and competitiveness, produce outstanding research, and maximize its role in community service and sustainable development.',
      mission: 'Established under the faculty regulations per Decision No. (    ) dated (   /   /     ), the department is dedicated to graduating highly skilled professionals in information technology. It ensures its programs remain up-to-date with the latest global advancements and leverages available resources to solve real-world community problems. This is achieved through delivering distinguished curricula across various IT disciplines, conducting high-quality scientific and applied research that meets international standards, and actively contributing to environmental sustainability and societal development.',
      objectives: [
        'Train specialists in information technology, networking, and systems management, grounded in solid theoretical foundations and practical methodologies, enabling them to compete globally in advancing computing and information technologies.',
        'Conduct scientific and applied research in IT with direct impact on comprehensive societal development.',
        'Provide scientific and technical consultations to organizations utilizing IT infrastructure, networks, and related components.',
        'Offer professional retraining programs (applied diplomas) for graduates from various disciplines to meet evolving market demands in modern IT, networking, and multimedia fields.',
        'Raise awareness and enhance efficiency in the use of IT across government and institutional sectors through specialized professional training courses.',
        'Collaborate with specialized entities to develop and localize IT software, network applications, and related tools.',
        'Organize seminars and scientific conferences to deepen conceptual understanding and elevate professional standards among IT specialists.',
        'Establish scientific partnerships with local, regional, and international institutions to exchange expertise and conduct joint research in IT specializations.',
        'Propose the creation of specialized research units focused on advanced and emerging areas of information technology.'
      ],
      researchAreas: [
        'Mobile computing applications and paradigms',
        'E-learning, e-management, and mobile commerce',
        'Networked embedded systems and RFID applications',
        'Cloud computing, fog computing, and emerging models',
        'Enterprise architecture, data science, and scientific data management',
        'Multimedia systems and voice-controlled interfaces',
        'Computer vision, virtual reality, and augmented reality',
        'Streaming technologies and digital media',
        'Robotics, autonomous vehicles, and automation',
        'Human-Computer Interaction (HCI) and intelligent interfaces',
        'Smart networks and infrastructure',
        'Network components, algorithms, design, and implementation',
        'Distributed systems, software engineering, and algorithmic analysis',
        'Network protocols, security, digital forensics, and privacy',
        'Network services, operations, and management',
        'Systems programming and advanced technologies',
        'E-learning, e-governance, e-commerce, and digital economy',
        'Cybersecurity, web security, adaptive systems, and applications',
        'Internet of Things (IoT)',
        'Big data management, storage, processing, and analytics'
      ],
      organizationalStructure: [
        'Information Technology Department Council',
        'Curriculum Development Committee',
        'Research and Development Committee',
        'Industry Partnership Committee',
        'Student Affairs Committee',
        'Quality Assurance Committee'
      ],
      administrativeStructure: {
        headOfDepartment: {
          id: 'hosny-abbas',
          name: 'Dr. Hosny Ahmed Abbas',
          position: 'IT Department Coordinator',
          email: 'Hosny.abbas@fci.luxor.edu.eg'
        },
        committees: []
      },
      teachingStaff: [
        {
          id: 'hosny-abbas',
          name: 'Dr. Hosny Ahmed Abbas',
          position: 'IT Department Coordinator',
          email: 'Hosny.abbas@fci.luxor.edu.eg'
        },
        {
          id: 'hammam-mohamed',
          name: 'Dr. Hammam Mohamed Mohamed',
          position: 'Lecturer',
          email: 'hammam_abdelaal@fci.luxor.edu.eg'
        }
      ],
      teachingAssistants: [
        {
          id: 'ibrahim-elsayed',
          name: 'Eng. Ibrahim Elsayed Ibrahim',
          position: 'Assistant Lecturer',
          email: 'Ibrahim.elsayed@fci.luxor.edu.eg'
        }
      ],
      administrativeStaff: [],
      supervisor: {
        id: 'hosny-abbas',
        name: 'Dr. Hosny Ahmed Abbas',
        position: 'Coordinator, Information Technology Department'
      },
      researchGrants: [
        {
          year: 2023,
          title: 'Permissioned Blockchain for Secure Data Sharing in Smart Cities',
          principalInvestigator: 'Dr. Hosny Ahmed Abbas',
          status: 'ongoing',
          description: 'A research team from the department, led by Dr. Hosny Ahmed Abbas (Principal Investigator), secured funding for this project. The project is currently underway.'
        },
        {
          year: 2022,
          title: 'RFID: Security System for Luxor University',
          principalInvestigator: 'Senior Students',
          status: 'completed',
          description: 'A senior student graduation project that won 2nd Place at the Upper Egypt in Action – 6th IEEE Conference in Aswan (May 12–14, 2022).'
        }
      ],
      contactInfo: {
        email: 'info@it.fci.luxor.edu.eg',
        phone: '+20 123 456 790',
        location: 'Faculty of Computers and Information, Luxor University'
      }
    },
    {
      id: 'computer-science',
      name: 'Computer Science Department',
      description: 'The Computer Science Department focuses on theoretical foundations and practical applications of computing, including algorithms, programming languages, software engineering, artificial intelligence, and computational theory.',
      vision: 'To be a leading department in computer science education and research, producing graduates who can contribute to technological advancement and innovation.',
      mission: 'To provide comprehensive education in computer science fundamentals while fostering research and innovation in emerging technologies.',
      objectives: [
        'Develop strong programming and algorithmic thinking skills',
        'Conduct research in artificial intelligence and machine learning',
        'Prepare students for careers in software development and research'
      ],
      researchAreas: [
        'Artificial Intelligence',
        'Machine Learning',
        'Software Engineering',
        'Algorithms and Data Structures',
        'Computer Graphics',
        'Natural Language Processing'
      ],
      organizationalStructure: [
        'Computer Science Department Council',
        'Curriculum Committee',
        'Research Committee'
      ],
      administrativeStructure: {
        headOfDepartment: {
          id: 'cs-head',
          name: 'Dr. Ahmed Mohamed',
          position: 'Head of Department',
          email: 'ahmed.mohamed@fci.luxor.edu.eg'
        },
        committees: []
      },
      teachingStaff: [],
      teachingAssistants: [],
      administrativeStaff: [],
      contactInfo: {
        email: 'info@cs.fci.luxor.edu.eg',
        phone: '+20 123 456 791',
        location: 'Faculty of Computers and Information, Luxor University'
      }
    }
  ];

  private departmentSections: DepartmentSection[] = [
    {
      id: 'about',
      title: 'About the Department',
      icon: 'pi pi-info-circle',
      route: 'about'
    },
    {
      id: 'vision',
      title: 'Department Vision',
      icon: 'pi pi-eye',
      route: 'vision'
    },
    {
      id: 'mission',
      title: 'Department Mission',
      icon: 'pi pi-flag',
      route: 'mission'
    },
    {
      id: 'objectives',
      title: 'Department Objectives',
      icon: 'pi pi-target',
      route: 'objectives'
    },
    {
      id: 'research',
      title: 'Research Areas',
      icon: 'pi pi-search',
      route: 'research'
    },
    {
      id: 'structure',
      title: 'Administrative Structure',
      icon: 'pi pi-sitemap',
      route: 'structure'
    },
    {
      id: 'staff',
      title: 'Teaching Staff',
      icon: 'pi pi-users',
      route: 'staff'
    }
  ];

  getAllDepartments(): Observable<Department[]> {
    return of(this.departments);
  }

  getDepartmentById(id: string): Observable<Department | undefined> {
    const department = this.departments.find(dept => dept.id === id);
    return of(department);
  }

  getDepartmentSections(): Observable<DepartmentSection[]> {
    return of(this.departmentSections);
  }

  getSectionById(sectionId: string): Observable<DepartmentSection | undefined> {
    const section = this.departmentSections.find(s => s.id === sectionId);
    return of(section);
  }
}