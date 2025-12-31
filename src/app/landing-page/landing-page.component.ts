import { Component } from '@angular/core';
import { ImportsModule } from '../imports';
import { MembershipFormComponent } from '../membership-form/membership-form.component';
import { SanityService } from '../services/sanity.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ImportsModule, MembershipFormComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  providers: []
})
export class LandingPageComponent {
  title = 'Temple Membership';
  package_plan;
  package_price;
  openForm = false;
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
  landingPageContent;

  sidebarVisible1 = false;
  heroSectionImage;
  aboutUsSectionImage;
  galleryImages = [];

  constructor(private sanityService: SanityService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      if (params['form'] && params['form'] === 'true') {
        this.package_plan = 'monthly';
        this.package_price = 21;
        this.openForm = true;
      }
    });
    this.sanityService.fetchContent().then((data) => {
      this.landingPageContent = data[0];
      this.heroSectionImage = this.sanityService.urlFor(this.landingPageContent.hero_section.hero_section_image);
      this.aboutUsSectionImage = this.sanityService.urlFor(this.landingPageContent.about_us_section.about_section_image);
      for (let image of this.landingPageContent.gallery_section.gallery_images) {
        this.galleryImages.push(this.sanityService.urlFor(image));
      }
      this.router.queryParams.subscribe(params => {
        if (params['form'] && params['form'] === 'true') {
          this.openForm = true;
        }
      });
    })
  }

  onClickSubscribe(plan, price) {
    this.openForm = true;
    this.package_plan = plan === 'Yearly Temple Scheme' ? 'yearly' : 'monthly';
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

  onCloseForm(event: boolean) {
    this.openForm = !event;
  }

  convertToWhatsAppNumber(rawNumber: string): string {
  if (!rawNumber) return '';

  return rawNumber
    .replace(/\(0\)/g, '')   // remove (0)
    .replace(/\D/g, '');     // remove non-digits
}

  onClickMobileNumber(mobileNumber: string) {
    window.open(`https://wa.me/${this.convertToWhatsAppNumber(mobileNumber)}`, '_blank');
  }

  onClickEmail(emailId: string) {
    window.location.href = `mailto:${emailId}`;
  }
}
