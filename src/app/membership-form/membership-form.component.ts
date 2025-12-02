import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ImportsModule } from '../imports';

@Component({
  selector: 'app-membership-form',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './membership-form.component.html',
  styleUrl: './membership-form.component.scss',
  providers: [MessageService]
})
export class MembershipFormComponent {
  @Input() package_plan: string = 'yearly';
  @Input() package_price: number = 101;
  @Output() closeForm: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  title = 'Membership Form';
  membershipForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    pincode: new FormControl("", [Validators.required]),
    function_date: new FormControl("", [Validators.required]),
    package_plan: new FormControl({value: this.package_plan, disabled: true}),
    package_price: new FormControl({value: this.package_price, disabled: true}),
  });
  apiURL = environment.apiURL;
  loading = false;
  disabledDates = [];
  minDate = new Date();
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit() {
    this.http.get(`${this.apiURL}/api/membership/getBlockedDates`).subscribe((value: any) => {
      for (let date of value.blocked_dates) {
        this.disabledDates.push(new Date(date))
      }
    })
  }

  ngOnChanges() {
    this.membershipForm.patchValue({
      package_plan: this.package_plan,
      package_price: this.package_price
    });
    this.membershipForm.updateValueAndValidity();
  }

  onCreate() {
    if (this.membershipForm.valid) {
      this.loading = true;
      this.http.post(`${this.apiURL}/api/membership`, this.membershipForm.getRawValue()).subscribe(
        (value: any) => {
          window.open(value.url);
          this.loading = false;
          setTimeout(() => {
            this.membershipForm.reset();
            this.closeForm.emit(true);
          }, 1000);
        }, (error) => {
          this.loading = false;
          this.showError(error.error.message);
        })
    } else {
      this.showError("Please fill all the fields!");
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
