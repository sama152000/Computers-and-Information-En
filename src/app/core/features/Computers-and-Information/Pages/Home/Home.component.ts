import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { HeroComponent } from './hero/hero.component';
import { VisionMissionComponent } from './vision-mission/vision-mission.component';
import { ProgramsComponent } from './programs/programs.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { ServicesComponent } from './services/services.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    VisionMissionComponent,
    ProgramsComponent,
    NewsComponent,
    EventsComponent,
    ServicesComponent,
    StatisticsComponent,
    FooterComponent
  ],
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {
  
}