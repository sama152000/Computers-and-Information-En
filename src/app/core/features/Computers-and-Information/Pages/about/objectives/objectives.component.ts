import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Objective } from '../../../model/about.model';
import { AboutService } from '../../../Services/about.service';

@Component({
  selector: 'app-objectives',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit {
  objectives: Objective[] = [];

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.objectives = this.aboutService.getObjectives();
  }
}
