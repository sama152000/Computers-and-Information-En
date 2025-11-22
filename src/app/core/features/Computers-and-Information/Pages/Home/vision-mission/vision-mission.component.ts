import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { routes } from '../../../../../../app.routes';

// Constants for better maintainability and to avoid magic strings
const ICONS = {
  VISION: 'pi pi-eye',
  MISSION: 'pi pi-flag',
  GOALS: 'pi pi-star'
} as const;

const ROUTES = {
  VISION_MISSION: '/about/vision-mission',
  GOALS: '/about/goals'
} as const;

interface VisionMissionItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  routes?: string;
}

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vision-mission.component.html',
  styleUrls: ['./vision-mission.component.css']
})
export class VisionMissionComponent implements OnInit {
  constructor(private router: Router) {}

  visionMissionData: VisionMissionItem[] = [
    {
      id: 1,
      title: 'Our Vision',
      description: 'To be a leader in computing education and research that drives innovation and societal growth.',
      icon: ICONS.VISION,
      routes: ROUTES.VISION_MISSION
    },
    {
      id: 2,
      title: 'Our Mission',
      description: 'To equip students with knowledge, skills, and ethics to excel in technology and research fields.',
      icon: ICONS.MISSION,
      routes: ROUTES.VISION_MISSION
    },
    {
      id: 3,
      title: 'Our Goals',
      description: 'Enhance education, promote research, and strengthen industry collaboration in computing sciences.',
      icon: ICONS.GOALS,
      routes: ROUTES.GOALS
    }
  ];

  ngOnInit() {
    // Add intersection observer for animations
    this.observeElements();
  }

  navigateTo(item: VisionMissionItem): void {
    if (item.routes) {
      this.router.navigate([item.routes]);
    }
  }

  private observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }
}