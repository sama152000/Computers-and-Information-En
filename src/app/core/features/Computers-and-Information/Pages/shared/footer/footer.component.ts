import {
  Component,
  OnInit,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactsService } from '../../../Services/real-services/contacts.service';
import { LogosService } from '../../../Services/real-services/logos.service';

interface Contact {
  id: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  youTube: string;
  whatsApp: string;
  mapLocation: string;
  webSite: string;
  fax: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  className: string;
}

interface QuickLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  private readonly contactsService = inject(ContactsService);
  private readonly logosService = inject(LogosService);

  currentYear = new Date().getFullYear();
  logo: WritableSignal<any> = signal(null);
  contact: Contact | null = null;
  socialLinks: SocialLink[] = [];

  quickLinks: QuickLink[] = [
    { label: 'Home', route: '/home' },
    { label: 'About', route: '/about' },
    { label: 'Departments', route: '/departments' },
    { label: 'Programs', route: '/programs' },
    { label: 'News', route: '/news' },
    { label: 'Contact', route: '/contact-us' },
  ];

  ngOnInit() {
    this.loadLogo();
    this.loadContactInfo();
  }

  loadLogo() {
    this.logosService.loadLogo(this.logo);
  }

  loadContactInfo() {
    this.contactsService.getAllContacts().subscribe({
      next: (response) => {
        if (response.success && response.data && response.data.length > 0) {
          this.contact = response.data[0];
          this.extractSocialLinks();
        }
      },
    });
  }

  private extractSocialLinks(): void {
    if (!this.contact) return;

    this.socialLinks = [];

    if (this.contact.facebook) {
      this.socialLinks.push({
        name: 'Facebook',
        url: this.contact.facebook,
        icon: 'pi pi-facebook',
        className: 'facebook',
      });
    }
    if (this.contact.twitter) {
      this.socialLinks.push({
        name: 'Twitter',
        url: this.contact.twitter,
        icon: 'pi pi-twitter',
        className: 'twitter',
      });
    }
    if (this.contact.linkedIn) {
      this.socialLinks.push({
        name: 'LinkedIn',
        url: this.contact.linkedIn,
        icon: 'pi pi-linkedin',
        className: 'linkedin',
      });
    }
    if (this.contact.instagram) {
      this.socialLinks.push({
        name: 'Instagram',
        url: this.contact.instagram,
        icon: 'pi pi-instagram',
        className: 'instagram',
      });
    }
    if (this.contact.youTube) {
      this.socialLinks.push({
        name: 'YouTube',
        url: this.contact.youTube,
        icon: 'pi pi-youtube',
        className: 'youtube',
      });
    }
  }

  getPhoneNumbers(): string[] {
    if (!this.contact?.phone) return [];
    return this.contact.phone.split(',').map((p) => p.trim());
  }
}
