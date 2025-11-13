import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface VisionMissionItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vision-mission.component.html',
  styleUrls: ['./vision-mission.component.css']
})
export class VisionMissionComponent implements OnInit {
  visionMissionData: VisionMissionItem[] = [
    {
      id: 1,
      title: 'Our Vision',
      description: 'To be a leader in computing education and research that drives innovation and societal growth.',
      icon: 'pi pi-eye'
    },
    {
      id: 2,
      title: 'Our Mission',
      description: 'To equip students with knowledge, skills, and ethics to excel in technology and research fields.',
      icon: 'pi pi-flag'
    },
    {
      id: 3,
      title: 'Our Goals',
      description: 'Enhance education, promote research, and strengthen industry collaboration in computing sciences.',
      icon: 'pi pi-star'
    }
  ];

  ngOnInit() {
    // Add intersection observer for animations
    this.observeElements();
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