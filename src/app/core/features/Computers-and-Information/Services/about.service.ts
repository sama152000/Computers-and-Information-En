import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private aboutData: any = {
    deanMessage: {
      name: 'Prof. Dr. Ahmed Hassan',
      title: 'Dean of Faculty',
      message: `"In a world driven by algorithms and innovation, our mission is to empower students with not just knowledge — but the mindset to create, question, and lead the digital future. The Faculty of Computers and Information stands at the intersection of technology and imagination — where every line of code has the potential to change the world. We believe that education is not merely about transferring information, but about cultivating critical thinkers and problem-solvers who will shape tomorrow's technology landscape. Our commitment extends beyond the classroom to foster an environment of research, collaboration, and ethical innovation that prepares our students to make meaningful contributions to society."`,
      photoUrl: './assets/icon.jpg',
    },
    visionMission: {
      vision:
        'To be a pioneer in computer science education and research that contributes to sustainable technology growth and innovation, recognized locally and internationally for excellence in developing skilled professionals who drive digital transformation.',
      mission:
        'To provide students with comprehensive knowledge, creativity, and ethical responsibility to innovate and lead in IT industries; to conduct cutting-edge research; and to serve as a catalyst for technological advancement in our community.',
    },
    objectives: [
      {
        id: 1,
        title: 'Academic Excellence',
        description:
          'Deliver high-quality education in computer science and information technology through innovative curricula and experienced faculty.',
        icon: 'pi pi-graduation-cap',
      },
      {
        id: 2,
        title: 'Research & Innovation',
        description:
          'Promote and conduct research that addresses real-world challenges and contributes to technological advancement.',
        icon: 'pi pi-search',
      },
      {
        id: 3,
        title: 'Industry Partnership',
        description:
          'Foster strong partnerships with leading tech companies to ensure relevance and provide practical training opportunities.',
        icon: 'pi pi-building',
      },
      {
        id: 4,
        title: 'Student Development',
        description:
          'Nurture students holistically to become well-rounded professionals with strong technical and soft skills.',
        icon: 'pi pi-users',
      },
      {
        id: 5,
        title: 'Community Engagement',
        description:
          'Contribute to society through technology transfer, consulting, and training programs for the local community.',
        icon: 'pi pi-share-alt',
      },
      {
        id: 6,
        title: 'Ethical Technology',
        description:
          'Instill ethical principles and social responsibility in the development and deployment of technology solutions.',
        icon: 'pi pi-shield',
      },
    ],
    administrativeStructure: [
      {
        id: 1,
        name: 'Prof. Dr. Ahmed Hassan',
        position: 'Dean of Faculty',
        photoUrl: './assets/icon.jpg',
        department: 'Faculty Administration',
      },
      {
        id: 2,
        name: 'Dr. Fatima El-Sayed',
        position: 'Deputy Dean - Academic Affairs',
        photoUrl: './assets/icon.jpg',
        department: 'Academic Division',
      },
      {
        id: 3,
        name: 'Dr. Mohamed Karim',
        position: 'Deputy Dean - Research & Development',
        photoUrl: './assets/icon.jpg',
        department: 'Research Division',
      },
      {
        id: 4,
        name: 'Dr. Sara Ibrahim',
        position: 'Head of Computer Science Department',
        photoUrl: './assets/icon.jpg',
        department: 'CS Department',
      },
      {
        id: 5,
        name: 'Dr. Omar Mustafa',
        position: 'Head of Information Technology Department',
        photoUrl: './assets/icon.jpg',
        department: 'IT Department',
      },
      {
        id: 6,
        name: 'Dr. Noor Al-Qadi',
        position: 'Head of Information Systems Department',
        photoUrl: './assets/icon.jpg',
        department: 'IS Department',
      },
    ],
  };

  getDeanMessage(): any {
    return this.aboutData.deanMessage;
  }

  getVisionMission(): any {
    return this.aboutData.visionMission;
  }

  getObjectives(): any[] {
    return this.aboutData.objectives;
  }

  getAdministrativeStructure(): any[] {
    return this.aboutData.administrativeStructure;
  }

  getAllAboutData(): any {
    return this.aboutData;
  }
}
