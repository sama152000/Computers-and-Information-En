import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeanMessage } from '../../../model/about.model';
import { AboutService } from '../../../Services/about.service';

@Component({
  selector: 'app-dean-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dean-message.component.html',
  styleUrls: ['./dean-message.component.css']
})
export class DeanMessageComponent implements OnInit {
  deanData: DeanMessage | null = null;

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.deanData = this.aboutService.getDeanMessage();
  }
}
