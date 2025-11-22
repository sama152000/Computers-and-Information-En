// src/app/services/services.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service, ServiceSection } from '../model/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private services: Service[] = [
    {
      id: 'training-center',
      name: 'Training & Continuing Education Center',
      description: 'The Training and Continuing Education Center offers professional diplomas and specialized courses in various fields of computers and information technology to develop skills of graduates and employees.',
      vision: 'To be a leading center in providing high-quality training programs that meet the needs of the labor market locally and regionally.',
      mission: 'Providing distinguished training programs using the latest technologies and qualified trainers to enhance the professional and practical skills of trainees.',
      objectives: [
        'Graduating highly qualified professionals in modern technologies',
        'Meeting the needs of government and private sectors for trained cadres',
        'Providing accredited professional certificates',
        'Organizing workshops and specialized training courses'
      ],
      servicesOffered: [
        'Professional Diploma in Web Development',
        'Diploma in Cybersecurity',
        'Mobile Application Development Course',
        'Data Science & Machine Learning',
        'Network Management and Security (CCNA)',
        'Graphic Design & Multimedia',
        'Python Programming & Automation',
        'Office Automation & Digital Skills'
      ],
      coordinator: {
        name: 'Dr. Ahmed Hassan Mahmoud',
        position: 'Center Director',
        department: 'Information Technology Department',
        email: 'ahmed.hassan@fci.luxor.edu.eg',
        phone: '01001234567'
      },
      team: [
        { name: 'Eng. Sara Mohamed Ali', position: 'Training Coordinator', phone: '01123456789' },
        { name: 'Eng. Khaled Ali Hassan', position: 'Senior Technical Trainer', phone: '01234567890' },
        { name: 'Eng. Doaa Abdel-Karim', position: 'Course Registration Coordinator', phone: '01551234567' }
      ],
      contactInfo: { 
        email: 'training@fci.luxor.edu.eg', 
        phone: '095-2384777', 
        location: 'Main Building - Second Floor - Room 205' 
      },
      workingHours: 'Sunday to Thursday: 9:00 AM - 4:00 PM',
      image: 'assets/services/training-center.jpg'
    },

    {
      id: 'consultation-center',
      name: 'IT Consultation & Technical Support Center',
      nameAr: 'مركز الاستشارات والدعم الفني في تكنولوجيا المعلومات',
      description: 'Provides technical consultations and information technology solutions to government institutions, companies, and individuals in Upper Egypt.',
      vision: 'To be the first destination for IT consultation and technical support in Upper Egypt.',
      mission: 'Providing innovative and effective technological solutions that contribute to digital transformation and institutional development.',
      objectives: [
        'Supporting digital transformation in government institutions',
        'Developing information systems for companies and factories',
        'Providing technical support and maintenance services',
        'Training employees on modern systems',
        'Contributing to local software industry development'
      ],
      servicesOffered: [
        'Design and development of administrative and financial systems',
        'Database design and management (Oracle, SQL Server)',
        'Network design, implementation and security assessment',
        'Website and mobile application development',
        'Annual technical support and maintenance contracts',
        'Digital transformation strategy consulting',
        'Information security audit and penetration testing'
      ],
      coordinator: {
        name: 'Dr. Amani Ashraf Salama',
        position: 'Center Director',
        department: 'Information Systems Department',
        email: 'amani.ashraf@fci.luxor.edu.eg',
        phone: '01009876543'
      },
      team: [
        { name: 'Eng. Ibrahim Elsayed', position: 'Senior Systems Analyst', phone: '01198765432' },
        { name: 'Eng. Jihad Sultan', position: 'Network Engineer', phone: '01011223344' }
      ],
      contactInfo: { 
        email: 'consult@fci.luxor.edu.eg', 
        phone: '095-2384888', 
        location: 'Main Building - Ground Floor - Office 105' 
      },
      workingHours: 'Sunday to Thursday: 8:00 AM - 5:00 PM',
    },

    {
      id: 'student-activities',
      name: 'Student Activities & Community Service Unit',
      description: 'Organizes scientific, cultural, artistic, and sports activities for students and provides community services and awareness campaigns.',
      vision: 'Building a conscious, creative, and socially responsible student.',
      mission: 'Enhancing students’ talents and skills through diverse activities and strengthening the faculty’s role in community service.',
      objectives: [
        'Developing students’ leadership and organizational skills',
        'Encouraging scientific research and innovation',
        'Strengthening community engagement and social responsibility',
        'Organizing cultural, artistic and sports events'
      ],
      servicesOffered: [
        'Scientific conferences and seminars',
        'Programming and AI competitions',
        'Cultural and artistic festivals',
        'Sports tournaments (Football, Chess, Table Tennis)',
        'Community awareness campaigns (Cybersecurity, Digital Ethics)',
        'Volunteer initiatives and field visits',
        'Student clubs (Luxor Tech Society - LTS, IEEE Student Branch)'
      ],
      coordinator: {
        name: 'Eng. Mahmoud Salem Ahmed',
        position: 'Student Activities Coordinator',
        department: 'Youth Welfare Administration',
        email: 'activities@fci.luxor.edu.eg',
        phone: '01234567890'
      },
      contactInfo: { 
        email: 'activities@fci.luxor.edu.eg', 
        phone: '095-2384999', 
        location: 'Student Activities Building - Near the Main Gate' 
      },
      workingHours: 'Daily: 9:00 AM - 4:00 PM',
      featured: true,
      image: 'assets/services/student-activities.jpg'
    }
  ];

  private serviceSections: ServiceSection[] = [
    { id: 'about', title: 'About the Center/Unit', icon: 'pi pi-info-circle', route: 'about' },
    { id: 'vision-mission', title: 'Vision & Mission', icon: 'pi pi-eye', route: 'vision-mission' },
    { id: 'objectives', title: 'Objectives', icon: 'pi pi-target', route: 'objectives' },
    { id: 'services', title: 'Services & Programs', icon: 'pi pi-cog', route: 'services' },
    { id: 'team', title: 'Team & Contact', icon: 'pi pi-users', route: 'team' }
  ];

  getAllServices(): Observable<Service[]> {
    return of(this.services);
  }

  getServiceById(id: string): Observable<Service | undefined> {
    return of(this.services.find(s => s.id === id));
  }

  getServiceSections(): Observable<ServiceSection[]> {
    return of(this.serviceSections);
  }

}