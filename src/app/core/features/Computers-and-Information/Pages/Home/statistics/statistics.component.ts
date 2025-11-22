import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Statistic } from '../../../model/statistics.model';
import { StatisticsService } from '../../../Services/statistics.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  displayValues: number[] = [];

  statistics: Statistic[] = [];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.statisticsService.getStatistics().subscribe(stats => {
      this.statistics = stats;
      this.displayValues = new Array(this.statistics.length).fill(0);
      this.observeElements();
    });
  }

  private observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.startCountAnimation();
        }
      });
    });

    setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }

  private startCountAnimation() {
    this.statistics.forEach((stat, index) => {
      this.animateValue(index, 0, stat.value, 2000);
    });
  }

  private animateValue(index: number, start: number, end: number, duration: number) {
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      this.displayValues[index] = Math.floor(start + (end - start) * easeOutQuart);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.displayValues[index] = end;
      }
    };
    
    requestAnimationFrame(animate);
  }
}