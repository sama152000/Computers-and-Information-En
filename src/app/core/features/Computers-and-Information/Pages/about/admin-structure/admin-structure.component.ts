import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from '../../../Services/about.service';

@Component({
  selector: 'app-admin-structure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-structure.component.html',
  styleUrls: ['./admin-structure.component.css'],
})
export class AdminStructureComponent implements OnInit {
  administrators: any[] = [];

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.administrators = this.aboutService.getAdministrativeStructure();
  }
}
