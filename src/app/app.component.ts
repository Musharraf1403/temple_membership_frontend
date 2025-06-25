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
  title = 'Temple Membership';
  package_plan;
  package_price;
  openForm = false;
  images = [{
    itemImageSrc: "../assets/images/about-us.png"
  }, {
    itemImageSrc: "../assets/images/about-us.png"
  }, {
    itemImageSrc: "../assets/images/about-us.png"
  }, {
    itemImageSrc: "../assets/images/about-us.png"
  }, {
    itemImageSrc: "../assets/images/about-us.png"
  }, {
    itemImageSrc: "../assets/images/about-us.png"
  }];
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  sidebarVisible1 = false;

  onClickSubscribe(plan, price) {
    this.openForm = true;
    this.package_plan = plan;
    this.package_price = price;
  }

  navigateToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Close sidebar
    this.sidebarVisible1 = false;
  }

}
