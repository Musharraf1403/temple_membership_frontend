import { Injectable } from '@angular/core';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


@Injectable({
  providedIn: 'root'
})
export class SanityService {
  private client = sanityClient({
    projectId: '1qxlmfae',   // Replace with your Project ID
    dataset: 'production',          // or your dataset name
    useCdn: true                    // Set to false to ensure fresh data
  });

    private builder = imageUrlBuilder(this.client);


  constructor() {}

  // Example method to fetch all posts of type "content"
  fetchContent() {
    return this.client.fetch('*[_type == "landing_page_content"]');
  }

  urlFor(source: any) {
    return this.builder.image(source).url();
  }

}
