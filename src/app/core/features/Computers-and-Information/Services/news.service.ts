// src/app/services/news.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsItem, NewsFilter, NewsResponse } from '../model/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsData: NewsItem[] = [
    {
      id: 101,
      type: 'news',
      title: 'Student Excellence in University Chess Championship',
      description: 'Students from the Faculty of Computers and Information secured first and second places in the university-wide Chess Championship.',
      content: `Under the patronage of Prof. Dr. Sabreen Abdel-Gelil, President of Luxor University, and with the supervision of the University’s Youth Welfare Administration, students from the Faculty of Computers and Information achieved outstanding success by winning first and second places in the university-wide Chess Championship.

• First Place: Student Salah Yasser Salah  
• Second Place: Student Osama Ahmed Mahgoub

On this joyful occasion, Prof. Dr. Osama Abul-Nasr, Dean of the Faculty, and Prof. Dr. Ibrahim Hamed, Vice Dean for Education and Student Affairs, extended their heartfelt congratulations and pride to the distinguished students. They also expressed sincere gratitude to the Faculty’s Youth Welfare team for their exceptional efforts in nurturing student talents.

We wish our champions continued success and brilliance, and the Faculty of Computers and Information everlasting leadership and excellence.`,
      imageUrl: '/assets/new1.jpg',
      date: new Date('2025-03-15'),
      author: 'Faculty Administration',
      category: 'Student Achievements',
      featured: true,
      tags: ['Chess', 'Championship', 'Student Success', 'Youth Welfare'],
      views: 892
    },

    {
      id: 102,
      type: 'news',
      title: 'Community Engagement: Visit from Al-Aqsur Preparatory School for Girls',
      description: 'The Faculty welcomed female students from Al-Aqsur Al-Edadiya Al-Jadida Preparatory School to explore academic programs and future tech careers.',
      content: `The Faculty of Computers and Information at Luxor University warmly welcomed a delegation of female students from Al-Aqsur Al-Edadiya Al-Jadida Preparatory School for Girls. The visit aimed to introduce the students to the various academic programs offered by the faculty and highlight future career opportunities in computing and information technology.

The visit was supervised by Prof. Dr. Qershi Saadi, Vice Dean for Community Service and Environmental Development, and coordinated by Eng. Abdel-Rahim Al-Sadiq.

Such visits play a vital role in strengthening ties between the university and the local community, guiding young students toward in-demand specializations, and inspiring them to pursue promising careers in modern technology fields.

The Faculty of Computers and Information — always in service of the community.`,
      imageUrl: '/assets/new2.jpg',
      date: new Date('2025-03-10'),
      author: 'Community Service Sector',
      category: 'Community Engagement',
      featured: true,
      tags: ['School Visit', 'Outreach', 'Career Guidance', 'Community Service'],
      views: 756
    },

    {
      id: 103,
      type: 'event',
      title: 'Awareness Seminar: "How to Protect Your Device and Data from Hacking"',
      description: 'Organized by Luxor Tech Society (LTS), the Faculty sponsored a cybersecurity awareness seminar for students.',
      content: `In continuous support of student initiatives, the Faculty proudly sponsored and hosted the awareness seminar titled:

"How to Protect Your Device and Your Data from Hacking"

Organized by the active student group Luxor Tech Society (LTS).

The seminar covered essential cybersecurity topics including:
• Common hacking methods
• Best practices for securing devices and accounts
• How to identify and avoid phishing and malware attacks
• Practical tools and tips to enhance personal digital safety

This event reflects the Faculty’s commitment to developing students’ technical skills, raising awareness about digital security, and encouraging student-led activities that benefit both the university and the wider community.

Well done to the Luxor Tech Society team for this valuable and impactful initiative!`,
      imageUrl: '/assets/new3.jpg',
      date: new Date('2025-03-05'),
      author: 'Luxor Tech Society',
      category: 'Student Activities',
      featured: true,
      tags: ['Cybersecurity', 'Awareness', 'LTS', 'Student Initiative'],
      views: 1024
    },

    {
      id: 104,
      type: 'news',
      title: 'School Visit: Martyr Mohamed Raafat Official Language School',
      description: 'The Faculty received students from Martyr Mohamed Raafat Official Language School to explore computing programs and career paths.',
      content: `The Faculty of Computers and Information received a delegation of students from Martyr Mohamed Raafat Official Language School. The visit aimed to introduce students to the academic programs and specializations offered, as well as promising career paths in computing and information technology.

The visit was supervised by Prof. Dr. Qershi Saadi, Vice Dean for Community Service and Environmental Development, and coordinated by Eng. Doaa Abdel-Karim.

These outreach activities reflect the faculty’s ongoing commitment to building strong bridges with the local community, guiding secondary school students toward future-ready disciplines, and inspiring the next generation of tech leaders.

The Faculty of Computers and Information — proudly serving and shaping our community.`,
      imageUrl: '/assets/new4.jpg',
      date: new Date('2025-02-28'),
      author: 'Community Service Sector',
      category: 'Community Engagement',
      featured: false,
      tags: ['School Visit', 'Career Guidance', 'Outreach'],
      views: 689
    },

    {
      id: 105,
      type: 'event',
      title: 'Faculty Five-a-Side Football Championship Results"',
      description: 'Faculty Five-a-Side Football Championship Results: Congratulations to the winning team and individual awardees!',
      content: `As part of its ongoing support for student activities, the Youth Welfare Administration at the Faculty of Computers and Information successfully organized the Faculty Five-a-Side Football Championship, with the participation of 10 competitive teams.
Final Results:
Champions – 1st Place
Amr Shawky, Al-Taher Mohamed, Mohamed Youssef, Ahmed Mohamed, Fares Abdullah, Amr El-Dardir, Khaled Abdel-Azim
Runners-up – 2nd Place
Mahmoud Sabry, Ahmed Hazem, Ismail Meshwady, Ahmed Nabil, Fares Maher, Mohamed Wazir, Mohamed Mostafa, Mahmoud Mostafa, Abdel-Rahman Mahmoud
Individual Awards:

Top Scorer & Best Player of the Tournament: Amr Shawky
Best Goalkeeper of the Tournament: Al-Taher Mohamed

Heartiest congratulations to the winning team and all individual award winners!
A huge round of applause also goes to every participating team for their outstanding sportsmanship, fair play, and true competitive spirit throughout the championship.
Well played, everyone!

The Faculty of Computers and Information remains committed to its educational and societal role in building conscious, responsible, and ethically grounded generations.`,
      imageUrl: '/assets/new6.jpg',
      date: new Date('2025-02-20'),
      author: 'Youth Welfare & Al-Azhar Collaboration',
      category: 'Community Awareness',
      featured: true,
      tags: ['Dark Web', 'Online Gambling', 'Awareness', 'Al-Azhar', 'Ethics'],
      views: 1347
    },
    {
      id: 10,
      type: 'event',
      title: 'Faculty Five-a-Side Football Championship Results"',
      description: 'Faculty Five-a-Side Football Championship Results: Congratulations to the winning team and individual awardees!',
      content: `As part of its ongoing support for student activities, the Youth Welfare Administration at the Faculty of Computers and Information successfully organized the Faculty Five-a-Side Football Championship, with the participation of 10 competitive teams.
Final Results:
Champions – 1st Place
Amr Shawky, Al-Taher Mohamed, Mohamed Youssef, Ahmed Mohamed, Fares Abdullah, Amr El-Dardir, Khaled Abdel-Azim
Runners-up – 2nd Place
Mahmoud Sabry, Ahmed Hazem, Ismail Meshwady, Ahmed Nabil, Fares Maher, Mohamed Wazir, Mohamed Mostafa, Mahmoud Mostafa, Abdel-Rahman Mahmoud
Individual Awards:

Top Scorer & Best Player of the Tournament: Amr Shawky
Best Goalkeeper of the Tournament: Al-Taher Mohamed

Heartiest congratulations to the winning team and all individual award winners!
A huge round of applause also goes to every participating team for their outstanding sportsmanship, fair play, and true competitive spirit throughout the championship.
Well played, everyone!

The Faculty of Computers and Information remains committed to its educational and societal role in building conscious, responsible, and ethically grounded generations.`,
      imageUrl: '/assets/new6.jpg',
      date: new Date('2025-02-20'),
      author: 'Youth Welfare & Al-Azhar Collaboration',
      category: 'Community Awareness',
      featured: true,
      tags: ['Dark Web', 'Online Gambling', 'Awareness', 'Al-Azhar', 'Ethics'],
      views: 1347
    }
  ];

  // Keep all methods exactly as before — they work perfectly with the new data
  getNews(filter?: NewsFilter, page: number = 1, pageSize: number = 6): Observable<NewsResponse> {
    let filtered = [...this.newsData];

    if (filter?.type && filter.type !== 'all') {
      filtered = filtered.filter(n => n.type === filter.type);
    }
    if (filter?.category) {
      filtered = filtered.filter(n => n.category === filter.category);
    }
    if (filter?.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(term) ||
        n.description.toLowerCase().includes(term) ||
        n.content.toLowerCase().includes(term)       );
    }

    filtered.sort((a, b) => b.date.getTime() - a.date.getTime());

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return of({
      items: filtered.slice(start, end),
      total: filtered.length,
      page,
      pageSize
    });
  }

  getNewsById(id: number): Observable<NewsItem | null> {
    return of(this.newsData.find(n => n.id === id) || null);
  }

  getFeaturedNews(): Observable<NewsItem[]> {
    return of(this.newsData.filter(n => n.featured));
  }

  getCategories(): Observable<string[]> {
    return of([...new Set(this.newsData.map(n => n.category))]);
  }

  getRelatedNews(currentId: number, type: 'news' | 'event', limit = 4): Observable<NewsItem[]> {
    return of(
      this.newsData
        .filter(n => n.id !== currentId && n.type === type)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, limit)
    );
  }

  getNextNews(currentId: number, type: 'news' | 'event'): Observable<NewsItem | null> {
    const items = this.newsData.filter(n => n.type === type);
    const idx = items.findIndex(n => n.id === currentId);
    return of(idx >= 0 && idx < items.length - 1 ? items[idx + 1] : null);
  }

  getPreviousNews(currentId: number, type: 'news' | 'event'): Observable<NewsItem | null> {
    const items = this.newsData.filter(n => n.type === type);
    const idx = items.findIndex(n => n.id === currentId);
    return of(idx > 0 ? items[idx - 1] : null);
  }
}