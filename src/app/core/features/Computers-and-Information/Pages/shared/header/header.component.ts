import {
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogosService } from '../../../Services/real-services/logos.service';
import { ContactsService } from '../../../Services/real-services/contacts.service';

interface NavLink {
  label: string;
  route: string;
  icon?: string;
}

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
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private readonly contactsService = inject(ContactsService);
  private readonly logosService = inject(LogosService);

  isNavbarCollapsed = true;
  logo: WritableSignal<any> = signal(null);
  contact: Contact | null = null;
  socialLinks: SocialLink[] = [];

  navLinks: NavLink[] = [
    { label: 'Home', route: '/home', icon: 'pi pi-home' },
    { label: 'About', route: '/about', icon: 'pi pi-building' },
    { label: 'Programs', route: '/programs', icon: 'pi pi-book' },
    { label: 'Sectors', route: '/sectors', icon: 'pi pi-sitemap' },
    { label: 'News', route: '/news', icon: 'pi pi-megaphone' },
    { label: 'Services', route: '/services', icon: 'pi pi-briefcase' },
    { label: 'Units', route: '/units', icon: 'pi pi-th-large' },
    { label: 'Departments', route: '/departments', icon: 'pi pi-users' },
    { label: 'Contact', route: '/contact-us', icon: 'pi pi-envelope' },
  ];

  ngOnInit(): void {
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
      });
    }
    if (this.contact.twitter) {
      this.socialLinks.push({
        name: 'Twitter',
        url: this.contact.twitter,
        icon: 'pi pi-twitter',
      });
    }
    if (this.contact.instagram) {
      this.socialLinks.push({
        name: 'Instagram',
        url: this.contact.instagram,
        icon: 'pi pi-instagram',
      });
    }
    if (this.contact.linkedIn) {
      this.socialLinks.push({
        name: 'LinkedIn',
        url: this.contact.linkedIn,
        icon: 'pi pi-linkedin',
      });
    }
    if (this.contact.youTube) {
      this.socialLinks.push({
        name: 'YouTube',
        url: this.contact.youTube,
        icon: 'pi pi-youtube',
      });
    }
  }

  getPhoneNumbers(): string[] {
    if (!this.contact?.phone) return [];
    return this.contact.phone.split(',').map((p) => p.trim());
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  closeNavbar() {
    this.isNavbarCollapsed = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (window.innerWidth < 992) {
      this.isNavbarCollapsed = true;
    }
  }
}
