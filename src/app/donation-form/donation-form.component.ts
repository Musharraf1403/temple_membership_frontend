import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ImportsModule } from '../imports';

@Component({
  selector: 'app-donation-form',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './donation-form.component.html',
  styleUrl: './donation-form.component.scss',
  providers: [MessageService]
})
export class DonationFormComponent {
  @Output() closeForm: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  title = 'Donation Form';
  donationForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    amount: new FormControl("", [Validators.required, Validators.min(1)]),
    message: new FormControl("", []),
  });
  apiURL = environment.apiURL;
  loading = false;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  onDonate() {
    if (this.donationForm.valid) {
      this.loading = true;
      this.http.post(`${this.apiURL}/api/donations`, this.donationForm.value).subscribe(
        (value: any) => {
          window.open(value.url, '_blank');
          this.loading = false;
          setTimeout(() => {
            this.donationForm.reset();
            this.closeForm.emit(true);
          }, 1000);
        }, (error) => {
          this.loading = false;
          this.showError(error.error.message || 'An error occurred');
        })
    } else {
      this.showError("Please fill all the required fields!");
    }
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showInfo(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  showWarn(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
