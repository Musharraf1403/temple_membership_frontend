import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImportsModule } from '../imports';
import { SanityService } from '../services/sanity.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
  providers: [MessageService]
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  sessionDetails: any = null;
  loading = true;
  error: string | null = null;
  apiURL = environment.apiURL;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      if (this.sessionId) {
        this.fetchSessionDetails();
      } else {
        this.error = 'No session ID found. Redirecting to home...';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      }
    });
  }

  fetchSessionDetails() {
    this.loading = true;
    this.error = null;
    this.httpClient
      .get<any>(`${this.apiURL}/api/membership/session/${this.sessionId}`)
      .subscribe({
        next: (response) => {
          this.sessionDetails = response;
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Payment Successful',
            detail: 'Thank you for your membership!',
            life: 5000
          });
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Failed to fetch session details. Please try again.';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not retrieve transaction details',
            life: 5000
          });
          console.error('Error fetching session details:', err);
        }
      });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  downloadReceipt() {
    if (!this.sessionDetails) return;
    
    // Generate a simple text-based receipt
    const receiptContent = `
MEMBERSHIP PAYMENT RECEIPT
================================

Thank You for Your Membership!

PAYMENT DETAILS
--------------
Session ID: ${this.sessionDetails.sessionId}
Amount: ${this.sessionDetails.currency.toUpperCase()} ${this.sessionDetails.amount}
Payment Status: ${this.sessionDetails.paymentStatus}
Date: ${new Date(this.sessionDetails.created).toLocaleDateString()}

MEMBER DETAILS
--------------
Name: ${this.sessionDetails.member.name}
Email: ${this.sessionDetails.member.email}
Membership ID: ${this.sessionDetails.member.membership_id}

MEMBERSHIP INFORMATION
---------------------
Approval Date: ${new Date(this.sessionDetails.member.approval_date).toLocaleDateString()}
Expiry Date: ${new Date(this.sessionDetails.member.expiry_date).toLocaleDateString()}
Status: ${this.sessionDetails.member.payment_status}

Thank you for your support!
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${this.sessionDetails.sessionId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    this.messageService.add({
      severity: 'info',
      summary: 'Receipt Downloaded',
      detail: 'Your receipt has been downloaded',
      life: 3000
    });
  }
}
