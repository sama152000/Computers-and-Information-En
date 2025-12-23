import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../Services/contact.service';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contact!: any;
  socialLinks: any[] = [];
  departments: any[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService
      .getContactInfo()
      .subscribe((data) => (this.contact = data));
    this.contactService
      .getSocialLinks()
      .subscribe((links) => (this.socialLinks = links));
    this.contactService
      .getDepartmentContacts()
      .subscribe((depts) => (this.departments = depts));
  }
}
