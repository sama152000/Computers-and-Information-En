import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsItem, NewsFilter, NewsResponse } from '../model/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private mockNewsData: NewsItem[] = [
    // News Items
    {
      id: 1,
      type: 'news',
      title: 'AI Workshop for Undergraduate Students',
      description: 'Students participated in a practical workshop on AI and machine learning applications organized by the department.',
      content: `The Department of Computer Science recently organized an interactive <strong>Artificial Intelligence Workshop</strong> for undergraduate students, aimed at introducing them to the fundamentals of AI and machine learning.

Students explored real-world applications of AI, including computer vision, natural language processing, and robotics. The workshop also featured a hands-on session where participants built simple machine learning models using Python and TensorFlow.

The department extends its gratitude to the event coordinators and teaching assistants for their dedication and enthusiasm. More workshops and tech events will be announced soon as part of our ongoing <strong>AI Education Initiative</strong>.`,
      imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: new Date('2025-01-10'),
      author: 'CS Department',
      category: 'Workshops',
      featured: true,
      tags: ['AI', 'Machine Learning', 'Workshop', 'Students'],
      views: 245
    },
    {
      id: 2,
      type: 'news',
      title: 'Congratulations to Hackathon Winners!',
      description: 'Our students achieved 1st place in the National Coding Hackathon for developing an innovative health app.',
      content: `We are proud to announce that our Computer Science students have achieved first place in the National Coding Hackathon 2025. The winning team developed an innovative health monitoring application that uses machine learning to predict potential health issues.

The hackathon, which lasted 48 hours, brought together over 200 participants from universities across Egypt. Our team's solution impressed the judges with its technical innovation, user-friendly interface, and potential real-world impact.

The winning application, called "HealthGuard," uses wearable device data to monitor vital signs and provides early warnings for potential health concerns. The team will receive a cash prize of 50,000 EGP and mentorship opportunities with leading tech companies.`,
      imageUrl: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: new Date('2025-01-08'),
      author: 'Dr. Ahmed Hassan',
      category: 'Achievements',
      featured: false,
      tags: ['Hackathon', 'Competition', 'Students', 'Health Tech'],
      views: 189
    },
    {
      id: 3,
      type: 'news',
      title: 'Annual Research Symposium 2025',
      description: 'The Computer Science Department hosted its annual symposium featuring student and faculty research presentations.',
      content: `The Faculty of Computers and Information successfully hosted its Annual Research Symposium 2025, showcasing cutting-edge research from both faculty members and graduate students.

The symposium featured presentations on various topics including artificial intelligence, cybersecurity, data science, and software engineering. Over 50 research papers were presented during the two-day event.

Distinguished guests from industry and academia attended the event, providing valuable feedback and networking opportunities for our researchers. The symposium concluded with awards for the best student research papers and faculty presentations.`,
      imageUrl: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: new Date('2025-01-05'),
      author: 'Research Committee',
      category: 'Research',
      featured: false,
      tags: ['Research', 'Symposium', 'Academic', 'Presentations'],
      views: 156
    },
    {
      id: 4,
      type: 'news',
      title: 'New Cybersecurity Lab Inauguration',
      description: 'The faculty inaugurated a state-of-the-art cybersecurity laboratory equipped with the latest security tools and technologies.',
      content: `The Faculty of Computers and Information proudly inaugurated its new Cybersecurity Laboratory, a state-of-the-art facility designed to enhance cybersecurity education and research capabilities.

The lab is equipped with advanced security tools, penetration testing software, and network simulation environments. Students will have hands-on experience with real-world cybersecurity scenarios and learn to defend against various cyber threats.

The inauguration ceremony was attended by industry experts, faculty members, and students. The lab will support both undergraduate and graduate cybersecurity programs, preparing students for careers in this critical field.`,
      imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: new Date('2025-01-03'),
      author: 'Dr. Sarah Mohamed',
      category: 'Infrastructure',
      featured: false,
      tags: ['Cybersecurity', 'Laboratory', 'Infrastructure', 'Education'],
      views: 203
    },

    // Event Items
    {
      id: 5,
      type: 'event',
      title: 'Tech Career Fair 2025',
      description: 'Join us for the annual tech career fair featuring leading technology companies and startups looking to hire our graduates.',
      content: `The Faculty of Computers and Information is excited to announce the Tech Career Fair 2025, scheduled for February 15-16, 2025. This premier event will bring together leading technology companies, innovative startups, and our talented students and graduates.

Over 40 companies will participate, including major tech giants, local software companies, and emerging startups. The fair will feature job interviews, company presentations, networking sessions, and career guidance workshops.

Students are encouraged to prepare their resumes and portfolios for this excellent opportunity to connect with potential employers and explore career paths in the technology industry.`,
      imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: new Date('2025-02-15'),
      author: 'Career Services',
      category: 'Career Events',
      featured: true,
      tags: ['Career Fair', 'Jobs', 'Networking', 'Companies'],
      views: 312
    },
    {
      id: 6,
      type: 'event',
      title: 'International Conference on AI and Data Science',
      description: 'A three-day international conference bringing together researchers and practitioners in AI and data science.',
      content: `The Faculty of Computers and Information, in collaboration with international partners, is organizing the International Conference on Artificial Intelligence and Data Science (ICAIDS 2025).

The conference will take place from March 20-22, 2025, and will feature keynote speeches from renowned researchers, technical paper presentations, workshops, and panel discussions on the latest trends in AI and data science.

Registration is now open for students, faculty, and industry professionals. Early bird registration offers significant discounts. The conference provides an excellent opportunity for knowledge sharing and networking with experts from around the world.`,
      imageUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: new Date('2025-03-20'),
      author: 'Conference Committee',
      category: 'Academic Events',
      featured: false,
      tags: ['Conference', 'AI', 'Data Science', 'International'],
      views: 178
    },
    {
      id: 7,
      type: 'event',
      title: 'Programming Competition for High School Students',
      description: 'Annual programming competition designed to encourage high school students to pursue computer science education.',
      content: `The Faculty of Computers and Information announces its Annual Programming Competition for High School Students, aimed at promoting computational thinking and programming skills among young minds.

The competition will be held on April 10, 2025, and is open to all high school students across Egypt. Participants will solve algorithmic problems using their preferred programming languages within a specified time limit.

Winners will receive scholarships, certificates, and the opportunity to visit our faculty facilities. The event also includes workshops on programming fundamentals and career guidance sessions for interested students and their parents.`,
      imageUrl: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: new Date('2025-04-10'),
      author: 'Student Activities',
      category: 'Competitions',
      featured: false,
      tags: ['Programming', 'Competition', 'High School', 'Outreach'],
      views: 134
    },
    {
      id: 8,
      type: 'event',
      title: 'Alumni Reunion and Networking Event',
      description: 'Annual reunion bringing together graduates from different years to share experiences and network with current students.',
      content: `The Faculty of Computers and Information cordially invites all alumni to the Annual Alumni Reunion and Networking Event, scheduled for May 5, 2025.

This special event will bring together graduates from different years to reconnect, share their professional experiences, and network with current students and faculty members. The evening will feature success stories from distinguished alumni, career panels, and networking sessions.

Current students will have the opportunity to learn from alumni experiences, gain insights into various career paths, and build professional connections. The event will conclude with a dinner and awards ceremony recognizing outstanding alumni achievements.`,
      imageUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: new Date('2025-05-05'),
      author: 'Alumni Relations',
      category: 'Alumni Events',
      featured: false,
      tags: ['Alumni', 'Networking', 'Reunion', 'Career'],
      views: 167
    }
  ];

  getNews(filter?: NewsFilter, page: number = 1, pageSize: number = 6): Observable<NewsResponse> {
    let filteredNews = [...this.mockNewsData];

    if (filter) {
      if (filter.type && filter.type !== 'all') {
        filteredNews = filteredNews.filter(item => item.type === filter.type);
      }
      
      if (filter.category) {
        filteredNews = filteredNews.filter(item => item.category === filter.category);
      }
      
      if (filter.searchTerm) {
        const searchTerm = filter.searchTerm.toLowerCase();
        filteredNews = filteredNews.filter(item => 
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      }
      
      if (filter.dateFrom) {
        filteredNews = filteredNews.filter(item => item.date >= filter.dateFrom!);
      }
      
      if (filter.dateTo) {
        filteredNews = filteredNews.filter(item => item.date <= filter.dateTo!);
      }
    }

    // Sort by date (newest first)
    filteredNews.sort((a, b) => b.date.getTime() - a.date.getTime());

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    return of({
      items: paginatedNews,
      total: filteredNews.length,
      page,
      pageSize
    });
  }

  getNewsById(id: number): Observable<NewsItem | null> {
    const item = this.mockNewsData.find(item => item.id === id);
    return of(item || null);
  }

  getRelatedNews(currentId: number, type: 'news' | 'event', limit: number = 4): Observable<NewsItem[]> {
    const related = this.mockNewsData
      .filter(item => item.id !== currentId && item.type === type)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
    
    return of(related);
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.mockNewsData.map(item => item.category))];
    return of(categories);
  }

  getFeaturedNews(): Observable<NewsItem[]> {
    const featured = this.mockNewsData.filter(item => item.featured);
    return of(featured);
  }

  getNextNews(currentId: number, type: 'news' | 'event'): Observable<NewsItem | null> {
    const typeItems = this.mockNewsData.filter(item => item.type === type);
    const currentIndex = typeItems.findIndex(item => item.id === currentId);
    
    if (currentIndex === -1 || currentIndex === typeItems.length - 1) {
      return of(null);
    }
    
    return of(typeItems[currentIndex + 1]);
  }

  getPreviousNews(currentId: number, type: 'news' | 'event'): Observable<NewsItem | null> {
    const typeItems = this.mockNewsData.filter(item => item.type === type);
    const currentIndex = typeItems.findIndex(item => item.id === currentId);
    
    if (currentIndex === -1 || currentIndex === 0) {
      return of(null);
    }
    
    return of(typeItems[currentIndex - 1]);
  }
}