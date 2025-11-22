import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Statistic } from '../model/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private statisticsData: Statistic[] = [
    {
      id: 1,
      value: 1200,
      label: 'Active Students',
      description: 'Enrolled across all programs',
      icon: 'pi pi-users'
    },
    {
      id: 2,
      value: 45,
      label: 'Computer Labs',
      description: 'State-of-the-art facilities',
      icon: 'pi pi-desktop'
    },
    {
      id: 3,
      value: 320,
      label: 'Research Projects',
      description: 'Ongoing and completed',
      icon: 'pi pi-chart-line'
    },
    {
      id: 4,
      value: 150,
      label: 'Awards & Grants',
      description: 'Recognition and funding',
      icon: 'pi pi-star'
    }
  ];

  getStatistics(): Observable<Statistic[]> {
    return of(this.statisticsData);
  }
}