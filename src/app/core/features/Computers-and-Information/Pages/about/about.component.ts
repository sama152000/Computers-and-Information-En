import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { VisionMissionpageComponent } from './vision-mission-page/vision-mission-page.component';
import { AdminStructureComponent } from './admin-structure/admin-structure.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { DeanMessageComponent } from './dean-message/dean-message.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, FormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [style({ opacity: 0 }), animate(300)]),
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class AboutComponent implements OnInit, AfterViewInit {
  tabs = [
    { id: 'dean-message', label: "Dean's Message", icon: 'pi pi-user' },
    { id: 'content', label: 'Content', icon: 'pi pi-book' },
    { id: 'vision-mission', label: 'Vision & Mission', icon: 'pi pi-eye' },
    { id: 'objectives', label: 'Objectives', icon: 'pi pi-check-circle' },
    { id: 'history', label: 'Our History', icon: 'pi pi-clock' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // No need for query params now
  }

  ngAfterViewInit() {
    // Scroll to fragment after view is initialized
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => this.scrollToSection(fragment), 100);
      }
    });
  }

  private scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
