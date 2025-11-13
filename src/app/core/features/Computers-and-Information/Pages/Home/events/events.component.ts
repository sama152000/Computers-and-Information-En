import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [
    {
      id: 1,
      title: 'Tech Talk: Future of AI',
      description: 'Join experts discussing advancements in Artificial Intelligence, ethical challenges, and future research directions.',
      date: new Date('2025-11-05'),
      time: '2:00 PM - 4:00 PM',
      location: 'Main Auditorium',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 2,
      title: 'Workshop: Secure Coding Practices',
      description: 'Hands-on session on writing secure applications — perfect for students preparing for cybersecurity roles.',
      date: new Date('2025-12-01'),
      time: '10:00 AM - 3:00 PM',
      location: 'Computer Lab 1',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 3,
      title: 'Career Fair: Meet Top IT Companies',
      description: 'Network with leading IT companies and explore career opportunities in software development and data analytics.',
      date: new Date('2026-01-10'),
      time: '9:00 AM - 5:00 PM',
      location: 'University Hall',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60'
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