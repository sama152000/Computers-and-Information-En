import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterService } from '../../../Services/footer.service';
import { FooterData, FooterSection, SocialMediaLink, ContactInfo } from '../../../model/footer.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  footerData!: FooterData;
  footerSections: FooterSection[] = [];
  socialMediaLinks: SocialMediaLink[] = [];
  contactInfo!: ContactInfo;
  copyright: string = '';

  constructor(private footerService: FooterService) {}

  ngOnInit() {
    this.footerService.getFooterData().subscribe(data => {
      this.footerData = data;
      this.footerSections = data.sections;
      this.socialMediaLinks = data.socialMedia;
      this.contactInfo = data.contactInfo;
      this.copyright = data.copyright;
    });
  }
}
