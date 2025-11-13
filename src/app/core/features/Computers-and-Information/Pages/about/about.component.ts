import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { VisionMissionpageComponent } from './vision-mission-page/vision-mission-page.component';
import { AdminStructureComponent } from './admin-structure/admin-structure.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { DeanMessageComponent } from './dean-message/dean-message.component';
import { FooterComponent } from "../shared/footer/footer.component";

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
    FooterComponent
],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
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

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }
}
