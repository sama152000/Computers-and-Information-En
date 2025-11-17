import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FooterData, FooterSection, SocialMediaLink, ContactInfo } from '../model/footer.model';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private footerData: FooterData = {
    sections: [
      {
        id: 1,
        title: 'Quick Links',
        links: [
          {
            id: 11,
            label: 'Home',
            route: '/'
          },
          {
            id: 12,
            label: 'About Us',
            route: '/about'
          },
          {
            id: 13,
            label: 'Programs',
            route: '/programs'
          },
          {
            id: 14,
            label: 'News & Events',
            route: '/news'
          }
        ]
      },
      {
        id: 2,
        title: 'Academic',
        links: [
          {
            id: 21,
            label: 'Research',
            route: '/research'
          },
          {
            id: 22,
            label: 'Publications',
            route: '/publications'
          },
          {
            id: 23,
            label: 'Library',
            route: '/library'
          },
          {
            id: 24,
            label: 'Student Portal',
            route: '/student-portal'
          }
        ]
      },
      {
        id: 3,
        title: 'Services',
        links: [
          {
            id: 31,
            label: 'IT Support',
            route: '/it-support'
          },
          {
            id: 32,
            label: 'Career Services',
            route: '/career-services'
          },
          {
            id: 33,
            label: 'Alumni',
            route: '/alumni'
          },
          {
            id: 34,
            label: 'Contact Us',
            route: '/contact'
          }
        ]
      }
    ],
    socialMedia: [
      {
        id: 1,
        platform: 'Facebook',
        url: 'https://facebook.com/facultycomputers',
        icon: 'pi pi-facebook'
      },
      {
        id: 2,
        platform: 'Twitter',
        url: 'https://twitter.com/facultycomp',
        icon: 'pi pi-twitter'
      },
      {
        id: 3,
        platform: 'LinkedIn',
        url: 'https://linkedin.com/company/faculty-computers-info',
        icon: 'pi pi-linkedin'
      },
      {
        id: 4,
        platform: 'YouTube',
        url: 'https://youtube.com/facultycomputers',
        icon: 'pi pi-youtube'
      }
    ],
    contactInfo: {
      address: 'Faculty of Computers and Information, University Campus, Cairo, Egypt',
      addressAr: 'كلية الحاسبات والمعلومات، حرم الجامعة، القاهرة، مصر',
      phone: '+20 123 456 7890',
      email: 'info@computers.edu.eg',
      workingHours: 'Sunday - Thursday: 8:00 AM - 4:00 PM',
      workingHoursAr: 'الأحد - الخميس: 8:00 ص - 4:00 م'
    },
    copyright: '© 2025 Faculty of Computers and Information. All rights reserved.',
    copyrightAr: '© 2025 كلية الحاسبات والمعلومات. جميع الحقوق محفوظة.'
  };

  getFooterData(): Observable<FooterData> {
    return of(this.footerData);
  }

  getFooterSections(): Observable<FooterSection[]> {
    return of(this.footerData.sections);
  }

  getSocialMediaLinks(): Observable<SocialMediaLink[]> {
    return of(this.footerData.socialMedia);
  }

  getContactInfo(): Observable<ContactInfo> {
    return of(this.footerData.contactInfo);
  }

  getCopyright(): Observable<string> {
    return of(this.footerData.copyright);
  }
}
