import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeanSpeechsService } from '../../../Services/real-services/dean-speechs.service';
import { DeanSpeech } from '../../../model/deanspeech.model';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-home-dean-message',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './dean-message.component.html',
  styleUrls: ['./dean-message.component.css'],
})
export class HomeDeanMessageComponent implements OnInit {
  private readonly deanSpeechsService = inject(DeanSpeechsService);

  deanData: {
    name: string;
    title: string;
    message: string;
    photoUrl: string;
  } | null = null;

  isLoading = true;
  hasError = false;

  ngOnInit() {
    this.loadDeanMessage();
  }

  private loadDeanMessage(): void {
    this.isLoading = true;
    this.hasError = false;

    this.deanSpeechsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data && response.data.length > 0) {
          const speechData: DeanSpeech = response.data[0];
          this.deanData = {
            name: speechData.memberName,
            title: speechData.memberPosition,
            message: speechData.speech,
            photoUrl: speechData.deanSpeechAttachments?.[0]?.url || '',
          };
        }
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
}
