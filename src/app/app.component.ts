import { Component } from '@angular/core';
import { ImportsModule } from './imports';
import { MembershipFormComponent } from './membership-form/membership-form.component';
import { SanityService } from './services/sanity.service';


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

  constructor(private sanityService: SanityService){}

  ngOnInit(){
    this.sanityService.fetchContent().then((data)=>{
      this.landingPageContent = data[0];
      this.heroSectionImage = this.sanityService.urlFor(this.landingPageContent.hero_section.hero_section_image);
      this.aboutUsSectionImage = this.sanityService.urlFor(this.landingPageContent.about_us_section.about_section_image);
      for(let image of this.landingPageContent.gallery_section.gallery_images) {
        this.galleryImages.push(this.sanityService.urlFor(image));
      }
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

}
