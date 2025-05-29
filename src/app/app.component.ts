import { Component } from '@angular/core';
import { ImportsModule } from './imports';
import { MembershipFormComponent } from './membership-form/membership-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImportsModule, MembershipFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'Temple Membership'

}
