import { Component, EventEmitter, Output } from '@angular/core';
import { ImportsModule } from '../imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mandalaabhishekam-invitation',
  standalone: true,
  imports: [ImportsModule, CommonModule],
  templateUrl: './mandalaabhishekam-invitation.component.html',
  styleUrl: './mandalaabhishekam-invitation.component.scss'
})
export class MandalaabhishekamInvitationComponent {
  @Output() closeForm = new EventEmitter<boolean>();

  invitations = [
    {
      id: 1,
      language: 'English',
      title: 'Inviting you to the Maha Kumbabhishekam',
      image: '/assets/images/mandalaabhishekam-invitation.png'
    },
    {
      id: 2,
      language: 'Tamil',
      title: 'மகா கும்ப அபிஷேகத்திற்கு உங்களை அழைக்கிறோம்',
      image: '/assets/images/mandalaabhishekam-invitation-2.png'
    }
  ];

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor() { }

  ngOnInit() { }

  downloadPDF(invitationId: number) {
    // Download the specific PDF based on invitation ID
    const pdfUrl = invitationId === 1 
      ? '/assets/documents/mandalaabhishekam-invitation.pdf'
      : '/assets/documents/mandalaabhishekam-invitation-2.pdf';
    
    const fileName = invitationId === 1
      ? 'mandalaabhishekam-invitation-english.pdf'
      : 'mandalaabhishekam-invitation-tamil.pdf';
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onClose() {
    this.closeForm.emit(true);
  }

  onMembership101() {
    window.open('?plan=yearly', '_self');
    this.onClose();
  }

  onMembership21() {
    window.open('?plan=monthly', '_self');
    this.onClose();
  }

  onDonate() {
    window.open('?donate=true', '_self');
    this.onClose();
  }

  onMandalaabhishekam48Days() {
    window.open('?mandalaabhishekam=true', '_self');
    this.onClose();
  }
}
