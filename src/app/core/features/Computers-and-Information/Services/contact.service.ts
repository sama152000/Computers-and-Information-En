// src/app/Services/contact.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactInfo: any = {
    address:
      'Faculty of Computers and Information, Luxor University, Al-Awamiya, Luxor Governorate, Egypt',
    phone: ['+20 95 238 4555', '+20 95 238 4556'],
    fax: '+20 95 238 4557',
    email: 'info@fci.luxor.edu.eg',
    workingHours: 'Sunday - Thursday: 9:00 AM - 4:00 PM',
    googleMapsLink: 'https://maps.app.goo.gl/YourLuxorUniversityLink',
  };

  private socialLinks: any[] = [
    {
      platform: 'Facebook',
      url: 'https://facebook.com/FCI.LuxorUniversity',
      icon: 'pi pi-facebook',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/FCI_Luxor',
      icon: 'pi pi-twitter',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/school/fci-luxor',
      icon: 'pi pi-linkedin',
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/@FCILuxor',
      icon: 'pi pi-youtube',
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/fci_luxor',
      icon: 'pi pi-instagram',
    },
  ];

  private departments: any[] = [
    {
      name: "Dean's Office",
      phone: '+20 95 238 4555 - Ext. 101',
      email: 'dean@fci.luxor.edu.eg',
      location: 'Main Building - 2nd Floor',
    },
    {
      name: 'Vice Dean for Education & Student Affairs',
      phone: '+20 95 238 4555 - Ext. 102',
      email: 'vdean.education@fci.luxor.edu.eg',
    },
    {
      name: 'Vice Dean for Postgraduate Studies & Research',
      phone: '+20 95 238 4555 - Ext. 103',
      email: 'vdean.research@fci.luxor.edu.eg',
    },
    {
      name: 'Student Affairs',
      phone: '+20 95 238 4555 - Ext. 200',
      email: 'students@fci.luxor.edu.eg',
    },
    {
      name: 'IT & Network Unit',
      phone: '+20 95 238 4555 - Ext. 300',
      email: 'it.support@fci.luxor.edu.eg',
    },
    { name: 'Quality Assurance Unit', email: 'qa@fci.luxor.edu.eg' },
  ];

  getContactInfo(): Observable<any> {
    return of(this.contactInfo);
  }

  getSocialLinks(): Observable<any[]> {
    return of(this.socialLinks);
  }

  getDepartmentContacts(): Observable<any[]> {
    return of(this.departments);
  }
}
