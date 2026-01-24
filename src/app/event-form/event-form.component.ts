import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ImportsModule } from '../imports';
import { CommonModule } from '@angular/common';

interface EventDay {
  roju: number;
  thedi: string;
  nakshatram: string;
  rasi: string;
  visheshaalu?: string;
}

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ImportsModule, CommonModule, FormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
  providers: [MessageService]
})
export class EventFormComponent {
  @Output() closeForm: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  eventDays: EventDay[] = [
    { roju: 1, thedi: 'Feb 09 (Mon)', nakshatram: 'Swathi', rasi: 'Tula', visheshaalu: 'Mandalabhishekam Aarambham' },
    { roju: 2, thedi: 'Feb 10 (Tue)', nakshatram: 'Visakha', rasi: 'Tula/Vrischika' },
    { roju: 3, thedi: 'Feb 11 (Wed)', nakshatram: 'Anuradha', rasi: 'Vrischika' },
    { roju: 4, thedi: 'Feb 12 (Thu)', nakshatram: 'Jyeshta', rasi: 'Vrischika', visheshaalu: 'Thai Masam End' },
    { roju: 5, thedi: 'Feb 13 (Fri)', nakshatram: 'Moola', rasi: 'Dhanu', visheshaalu: 'Masi Masam Aarambham' },
    { roju: 6, thedi: 'Feb 14 (Sat)', nakshatram: 'Poorvashada', rasi: 'Dhanu', visheshaalu: 'Shani Pradosham' },
    { roju: 7, thedi: 'Feb 15 (Sun)', nakshatram: 'Uttarashada', rasi: 'Dhanu/Makara', visheshaalu: 'Maha Shivaratri' },
    { roju: 8, thedi: 'Feb 16 (Mon)', nakshatram: 'Sravana', rasi: 'Makara' },
    { roju: 9, thedi: 'Feb 17 (Tue)', nakshatram: 'Dhanishta', rasi: 'Makara/Kumbha', visheshaalu: 'Amavasya' },
    { roju: 10, thedi: 'Feb 18 (Wed)', nakshatram: 'Satabhisham', rasi: 'Kumbha' },
    { roju: 11, thedi: 'Feb 19 (Thu)', nakshatram: 'Poorvabhadra', rasi: 'Kumbha/Meena' },
    { roju: 12, thedi: 'Feb 20 (Fri)', nakshatram: 'Uttarabhadra', rasi: 'Meena' },
    { roju: 13, thedi: 'Feb 21 (Sat)', nakshatram: 'Revathi', rasi: 'Meena' },
    { roju: 14, thedi: 'Feb 22 (Sun)', nakshatram: 'Ashwini', rasi: 'Mesha' },
    { roju: 15, thedi: 'Feb 23 (Mon)', nakshatram: 'Bharani', rasi: 'Mesha' },
    { roju: 16, thedi: 'Feb 24 (Tue)', nakshatram: 'Kruthika', rasi: 'Mesha/Vrushabha', visheshaalu: 'Krithigai / Kruthika' },
    { roju: 17, thedi: 'Feb 25 (Wed)', nakshatram: 'Rohini', rasi: 'Vrushabha' },
    { roju: 18, thedi: 'Feb 26 (Thu)', nakshatram: 'Mrigasira', rasi: 'Vrushabha/Mithuna' },
    { roju: 19, thedi: 'Feb 27 (Fri)', nakshatram: 'Arudra', rasi: 'Mithuna' },
    { roju: 20, thedi: 'Feb 28 (Sat)', nakshatram: 'Punarvasu', rasi: 'Mithuna/Karkataka' },
    { roju: 21, thedi: 'Mar 01 (Sun)', nakshatram: 'Pushyami', rasi: 'Karkataka', visheshaalu: 'Ravi Pradosham' },
    { roju: 22, thedi: 'Mar 02 (Mon)', nakshatram: 'Ashlesha', rasi: 'Karkataka' },
    { roju: 23, thedi: 'Mar 03 (Tue)', nakshatram: 'Makha', rasi: 'Simha', visheshaalu: 'Pournami (Holi)' },
    { roju: 24, thedi: 'Mar 04 (Wed)', nakshatram: 'Pubba (Purva Phalguni)', rasi: 'Simha' },
    { roju: 25, thedi: 'Mar 05 (Thu)', nakshatram: 'Uttara (Uttara Phalguni)', rasi: 'Simha/Kanya' },
    { roju: 26, thedi: 'Mar 06 (Fri)', nakshatram: 'Hasta', rasi: 'Kanya' },
    { roju: 27, thedi: 'Mar 07 (Sat)', nakshatram: 'Chitta', rasi: 'Kanya/Tula' },
    { roju: 28, thedi: 'Mar 08 (Sun)', nakshatram: 'Swathi', rasi: 'Tula' },
    { roju: 29, thedi: 'Mar 09 (Mon)', nakshatram: 'Visakha', rasi: 'Tula/Vrischika' },
    { roju: 30, thedi: 'Mar 10 (Tue)', nakshatram: 'Anuradha', rasi: 'Vrischika' },
    { roju: 31, thedi: 'Mar 11 (Wed)', nakshatram: 'Jyeshta', rasi: 'Vrischika' },
    { roju: 32, thedi: 'Mar 12 (Thu)', nakshatram: 'Moola', rasi: 'Dhanu' },
    { roju: 33, thedi: 'Mar 13 (Fri)', nakshatram: 'Poorvashada', rasi: 'Dhanu' },
    { roju: 34, thedi: 'Mar 14 (Sat)', nakshatram: 'Uttarashada', rasi: 'Dhanu/Makara', visheshaalu: 'Masi Masam End' },
    { roju: 35, thedi: 'Mar 15 (Sun)', nakshatram: 'Sravana', rasi: 'Makara', visheshaalu: 'Panguni Masam Aarambham' },
    { roju: 36, thedi: 'Mar 16 (Mon)', nakshatram: 'Dhanishta', rasi: 'Makara/Kumbha', visheshaalu: 'Soma Pradosham' },
    { roju: 37, thedi: 'Mar 17 (Tue)', nakshatram: 'Satabhisham', rasi: 'Kumbha' },
    { roju: 38, thedi: 'Mar 18 (Wed)', nakshatram: 'Poorvabhadra', rasi: 'Kumbha/Meena' },
    { roju: 39, thedi: 'Mar 19 (Thu)', nakshatram: 'Uttarabhadra', rasi: 'Meena', visheshaalu: 'Amavasya' },
    { roju: 40, thedi: 'Mar 20 (Fri)', nakshatram: 'Revathi', rasi: 'Meena' },
    { roju: 41, thedi: 'Mar 21 (Sat)', nakshatram: 'Ashwini', rasi: 'Mesha' },
    { roju: 42, thedi: 'Mar 22 (Sun)', nakshatram: 'Bharani', rasi: 'Mesha' },
    { roju: 43, thedi: 'Mar 23 (Mon)', nakshatram: 'Kruthika', rasi: 'Mesha/Vrushabha', visheshaalu: 'Krithigai / Kruthika' },
    { roju: 44, thedi: 'Mar 24 (Tue)', nakshatram: 'Rohini', rasi: 'Vrushabha' },
    { roju: 45, thedi: 'Mar 25 (Wed)', nakshatram: 'Mrigasira', rasi: 'Vrushabha/Mithuna' },
    { roju: 46, thedi: 'Mar 26 (Thu)', nakshatram: 'Arudra', rasi: 'Mithuna' },
    { roju: 47, thedi: 'Mar 27 (Fri)', nakshatram: 'Punarvasu', rasi: 'Mithuna/Karkataka' },
    { roju: 48, thedi: 'Mar 28 (Sat)', nakshatram: 'Pushyami', rasi: 'Karkataka', visheshaalu: 'Mandalabhishekam Poorthi' }
  ];

  selectedFilterType: string = 'date';
  selectedDay: EventDay | null = null;
  filteredDays: EventDay[] = [];
  showForm = false;

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.filteredDays = this.eventDays;
  }

  eventForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    amount: new FormControl(101),
  });

  apiURL = environment.apiURL;
  loading = false;



  onFilterChange(filterType: string) {
    this.selectedFilterType = filterType;
    
    // Filter days based on selected filter type
    if (filterType === 'event') {
      // Only show days with special events
      this.filteredDays = this.eventDays.filter(day => day.visheshaalu);
    } else {
      // Show all days for other filters
      this.filteredDays = this.eventDays;
    }
    
    this.selectedDay = null;
  }

  onSelectDay(day: EventDay) {
    this.selectedDay = day;
  }

  onNext() {
    if (!this.selectedDay) {
      this.showError("Please select a date");
      return;
    }
    this.showForm = true;
  }

  onSubmit() {
    if (this.eventForm.valid && this.selectedDay) {
      this.loading = true;
      
      // Parse date from thedi format (e.g., "Feb 10 (Tue)") to DD-MM-YYYY format
      const dateString = this.selectedDay.thedi.split(' (')[0]; // Get "Feb 10"
      const parsedDate = new Date(`${dateString} 2026`); // Create date with year 2026
      const day = String(parsedDate.getDate()).padStart(2, '0');
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const formattedDate = `${day}-${month}-2026`;
      
      const payload = {
        name: this.eventForm.value.name,
        email: this.eventForm.value.email,
        phone: this.eventForm.value.phone,
        address: this.eventForm.value.address,
        amount: this.eventForm.value.amount,
        date: formattedDate,
        rasi: this.selectedDay.rasi,
        star: this.selectedDay.nakshatram,
        specialEvent: this.selectedDay.visheshaalu || null
      };
      this.http.post(`${this.apiURL}/api/mandalaaabhishekam`, payload).subscribe(
        (value: any) => {
          window.open(value.url, '_blank');
          this.loading = false;
          setTimeout(() => {
            this.eventForm.reset();
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

  onBack() {
    this.showForm = false;
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
