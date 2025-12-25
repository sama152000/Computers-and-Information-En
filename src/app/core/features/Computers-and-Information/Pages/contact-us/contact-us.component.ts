import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../Services/real-services/contacts.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { SkeletonModule } from 'primeng/skeleton';

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
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FooterComponent, SkeletonModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  private readonly contactsService = inject(ContactsService);

  contact: Contact | null = null;
  socialLinks: SocialLink[] = [];
  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadContactInfo();
  }

  loadContactInfo(): void {
    this.isLoading = true;
    this.hasError = false;

    this.contactsService.getAllContacts().subscribe({
      next: (response) => {
        if (response.success && response.data && response.data.length > 0) {
          this.contact = response.data[0];
          this.extractSocialLinks();
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
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

  get formattedWhatsApp(): any {
    return this.contact?.whatsApp.replace(/\s+/g, '');
  }
}
