import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImportsModule } from '../imports';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-payment-cancel',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './payment-cancel.component.html',
  styleUrl: './payment-cancel.component.scss',
  providers: [MessageService]
})
export class PaymentCancelComponent implements OnInit {
  membershipId: string | null = null;
  sessionId: string | null = null;
  pendingDetails: any = null;
  loading = false;
  apiURL = environment.apiURL;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.membershipId = params['membership_id'];
      this.sessionId = params['session_id'];

      this.messageService.add({
        severity: 'warn',
        summary: 'Payment Cancelled',
        detail: 'Your payment has been cancelled.',
        life: 5000
      });

      if (this.sessionId) {
        this.fetchSessionDetails();
      }
    });
  }

  fetchSessionDetails() {
    if (!this.sessionId) return;

    this.loading = true;
    this.httpClient
      .get<any>(`${this.apiURL}/api/session/${this.sessionId}`)
      .subscribe({
        next: (response) => {
          this.pendingDetails = response;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          console.error('Error fetching session details:', error);
        }
      });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
