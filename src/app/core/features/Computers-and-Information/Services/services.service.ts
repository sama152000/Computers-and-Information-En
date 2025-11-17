// src/app/Services/services.service.ts
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
      nameAr: 'مركز التدريب والتعليم المستمر',
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
        'Graphic Design & Multimedia'
      ],
      coordinator: {
        name: 'Dr. Ahmed Hassan Mahmoud',
        position: 'Center Director',
        department: 'Information Technology',
        email: 'ahmed.hassan@fci.luxor.edu.eg',
        phone: '01001234567'
      },
      team: [
        { name: 'Eng. Sara Mohamed', position: 'Training Coordinator', phone: '01123456789' },
        { name: 'Eng. Khaled Ali', position: 'Technical Trainer', phone: '01234567890' }
      ],
      contactInfo: { email: 'training@fci.luxor.edu.eg', phone: '095-2384777', location: 'Building A - Second Floor' },
      workingHours: 'Sunday to Thursday: 9:00 AM - 4:00 PM'
    },
    {
      id: 'consultation-center',
      name: 'IT Consultation & Technical Support Center',
      nameAr: 'مركز الاستشارات والدعم الفني',
      description: 'Provides technical consultations and information technology solutions to government institutions, companies, and individuals in Upper Egypt.',
      vision: 'To be the first destination for IT consultation and technical support in Upper Egypt.',
      mission: 'Providing innovative and effective technological solutions that contribute to digital transformation and institutional development.',
      objectives: [
        'Supporting digital transformation in government institutions',
        'Developing information systems for companies and factories',
        'Providing technical support and maintenance services',
        'Training employees on modern systems'
      ],
      servicesOffered: [
        'Design and development of administrative systems',
        'Database design and management',
        'Network design and security',
        'Website and mobile application development',
        'Technical support and maintenance contracts',
        'Digital transformation consulting'
      ],
      coordinator: {
        name: 'Dr. Fatima Abdelrahman',
        position: 'Center Director',
        department: 'Information Systems',
        email: 'fatima@fci.luxor.edu.eg',
        phone: '01009876543'
      },
      contactInfo: { email: 'consult@fci.luxor.edu.eg', phone: '095-2384888', location: 'Main Building - Ground Floor' },
      workingHours: 'Sunday to Thursday: 8:00 AM - 5:00 PM'
    },
    {
      id: 'student-activities',
      name: 'Student Activities & Community Service Unit',
      nameAr: 'وحدة الأنشطة الطلابية وخدمة المجتمع',
      description: 'Organizes scientific, cultural, artistic and sports activities for students and provides community services and awareness campaigns.',
      coordinator: {
        name: 'Eng. Mahmoud Salem',
        position: 'Unit Coordinator',
        phone: '01234567890'
      },
      servicesOffered: [
        'Scientific conferences and seminars',
        'Programming competitions',
        'Cultural and artistic events',
        'Sports tournaments',
        'Community awareness campaigns',
        'Volunteer initiatives'
      ],
      contactInfo: { email: 'activities@fci.luxor.edu.eg', phone: '095-2384999', location: 'Student Activities Building' }
    }
  ];

  private serviceSections: ServiceSection[] = [
    { id: 'about', title: 'About the Service', icon: 'pi pi-info-circle', route: 'about' },
    { id: 'vision', title: 'Vision & Mission', icon: 'pi pi-eye', route: 'vision' },
    { id: 'objectives', title: 'Objectives', icon: 'pi pi-target', route: 'objectives' },
    { id: 'services', title: 'Services Offered', icon: 'pi pi-cog', route: 'services' },
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