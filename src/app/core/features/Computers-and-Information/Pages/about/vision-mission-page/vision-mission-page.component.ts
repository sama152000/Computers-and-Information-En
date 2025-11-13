import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisionMission } from '../../../model/about.model';
import { AboutService } from '../../../Services/about.service';

@Component({
  selector: 'app-vision-mission-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vision-mission-page.component.html',
  styleUrls: ['./vision-mission-page.component.css']
})
export class VisionMissionpageComponent implements OnInit {
  visionMissionpageData: VisionMission | null = null;

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.visionMissionpageData = this.aboutService.getVisionMission();
  }
}
