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
  retrying = false;
  tooManyAttempts = false;
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

      // Call cancel session API
      if (this.membershipId && this.sessionId) {
        this.cancelSession();
      }
    });
  }

  cancelSession() {
    this.loading = true;
    const payload = {
      membershipId: this.membershipId,
      sessionId: this.sessionId
    };

    this.httpClient
      .post<any>(`${this.apiURL}/api/membership/cancel-session`, payload)
      .subscribe({
        next: (response) => {
          console.log('Session cancelled:', response);
          // After cancelling, fetch pending details
          this.fetchPendingDetails();
        },
        error: (err) => {
          console.error('Error cancelling session:', err);
          this.loading = false;
        }
      });
  }

  fetchPendingDetails() {
    if (!this.membershipId) {
      this.loading = false;
      return;
    }

    this.httpClient
      .get<any>(`${this.apiURL}/api/membership/pending/${this.membershipId}`)
      .subscribe({
        next: (response) => {
          console.log('Pending details:', response);
          this.pendingDetails = response;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching pending details:', err);
          this.loading = false;
        }
      });
  }

  retryPayment() {
    if (!this.membershipId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Membership ID not found',
        life: 5000
      });
      return;
    }

    this.retrying = true;
    this.tooManyAttempts = false;

    const payload = {
      membershipId: this.membershipId,
      sessionId: this.sessionId
    };

    this.httpClient
      .post<any>(`${this.apiURL}/api/membership/retry/${this.membershipId}`, payload)
      .subscribe({
        next: (response) => {
          this.retrying = false;
          // Response should contain redirect URL for payment
          if (response.url) {
            window.location.href = response.url;
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Retry Initiated',
              detail: 'Redirecting to payment gateway...',
              life: 3000
            });
          }
        },
        error: (err) => {
          this.retrying = false;
          if (err.status === 429) {
            this.tooManyAttempts = true;
            this.messageService.add({
              severity: 'error',
              summary: 'Too Many Attempts',
              detail: 'You have exceeded the maximum number of payment attempts. Please contact our representative for assistance.',
              life: 7000
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to retry payment. Please try again later.',
              life: 5000
            });
          }
          console.error('Error retrying payment:', err);
        }
      });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
