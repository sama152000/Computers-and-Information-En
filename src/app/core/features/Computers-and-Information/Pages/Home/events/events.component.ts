import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  image: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [
    {
      id: 1,
      title: 'Awareness Seminar: "How to Protect Your Device and Data from Hacking',
      description: 'Organized by Luxor Tech Society (LTS), the Faculty sponsored a cybersecurity awareness seminar for students.',
      date: new Date('2025-11-05'),
      time: '2:00 PM - 4:00 PM',
      location: 'Main Auditorium',
      image:  '/assets/new6.jpg'
    },
    {
      id: 2,
      title: 'Faculty Five-a-Side Football Championship Results',
      description: 'As part of its ongoing support for student activities .',
      date: new Date('2025-12-01'),
      time: '10:00 AM - 3:00 PM',
      location: 'Computer Lab 1',
      image:  '/assets/new3.jpg'
    },
    {
      id: 3,
      title: 'Faculty Five-a-Side Football Championship Results',
      description: 'As part of its ongoing support for student activities .',
      date: new Date('2026-01-10'),
      time: '9:00 AM - 5:00 PM',
      location: 'University Hall',
      image:  '/assets/new3.jpg'
    }
  ];

  ngOnInit() {
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
      const elements = document.querySelectorAll('.timeline-item');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }
}