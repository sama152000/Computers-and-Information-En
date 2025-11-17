import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { VisionMissionpageComponent } from './vision-mission-page/vision-mission-page.component';
import { AdminStructureComponent } from './admin-structure/admin-structure.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { DeanMessageComponent } from './dean-message/dean-message.component';
import { FooterComponent } from "../shared/footer/footer.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DeanMessageComponent,
    ObjectivesComponent,
    AdminStructureComponent,
    VisionMissionpageComponent,
    FooterComponent,
    FormsModule
],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit, AfterViewInit {
  activeTab: string = 'dean-message';

  tabs = [
    { id: 'dean-message', label: "Dean's Message", icon: 'pi pi-star' },
    { id: 'vision-mission', label: 'Vision & Mission', icon: 'pi pi-lightbulb' },
    { id: 'objectives', label: 'Objectives', icon: 'pi pi-shield' },
    { id: 'admin-structure', label: 'Administrative Structure', icon: 'pi pi-users' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
  }

  ngAfterViewInit() {
    // Scroll to fragment after view is initialized
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => this.scrollToSection(fragment), 100);
      }
    });
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  private scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
