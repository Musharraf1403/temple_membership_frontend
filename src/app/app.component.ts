import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../environments/environment';
import { MessageService } from 'primeng/api';
import { ImportsModule } from './imports';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent {
  title = 'Membership Form';
  membershipForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    pincode: new FormControl("", [Validators.required]),
    function_date: new FormControl("", [Validators.required])
  });
  apiURL = environment.apiURL;
  loading = false;
  disabledDates = [];
  minDate = new Date();
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit() {
    this.http.get(`${this.apiURL}/api/membership/getBlockedDates`).subscribe((value:any)=>{
      for(let date of value.blocked_dates) {
        this.disabledDates.push(new Date(date))
      }
      console.log(this.disabledDates);
    })
  }
  
  onCreate() {
    if (this.membershipForm.valid) {
      this.loading = true;
      this.http.post(`${this.apiURL}/api/membership`, this.membershipForm.value).subscribe(
        (value: any) => {
          this.loading = false;
          this.showSuccess(value.message);
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
