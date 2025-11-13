import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Program {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
  duration: string;
  students: number;
}

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  programs: Program[] = [
    {
      id: 1,
      name: 'Web Development',
      description: 'Master web technologies HTML5, CSS3, JavaScript and Node.js',
      image: 'assets/img1.jpg',
      icon: 'pi pi-globe',
      duration: '4 Years',
      students: 320
    },
    {
      id: 2,
      name: 'Data Science',
      description: 'Learn data analysis, machine learning, and statistical modeling with Python and R',
      image: 'assets/img2.jpg',
      icon: 'pi pi-chart-bar',
      duration: '4 Years',
      students: 280
    },
    {
      id: 3,
      name: 'Artificial Intelligence',
      description: 'Explore AI algorithms, neural networks, and deep learning technologies',
      image: 'assets/img3.jpg',
      icon: 'pi pi-android',
      duration: '4 Years',
      students: 250
    },
    {
      id: 4,
      name: 'Cyber Security',
      description: 'Protect digital assets with advanced security protocols and ethical hacking',
      image: 'assets/img4.jpg',
      icon: 'pi pi-shield',
      duration: '4 Years',
      students: 200
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
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }
}