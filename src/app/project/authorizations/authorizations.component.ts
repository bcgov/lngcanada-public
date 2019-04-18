import { Component, OnInit } from '@angular/core';
import { PageTypes } from 'app/utils/page-types.enum';
import { DataService } from 'app/services/data.service';
import { ActivatedRoute } from '@angular/router';

export interface IImage {
  url: string | null;
  href?: string;
  clickAction?: () => void;
  caption?: string;
  title?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}

@Component({
  selector: 'app-authorizations',
  templateUrl: './authorizations.component.html',
  styleUrls: ['./authorizations.component.scss']
})
export class AuthorizationsComponent implements OnInit {
  public pageType: PageTypes = PageTypes.AUTHORIZATIONS;

  public id: number;
  public text: string[];

  public slideshowImages: IImage[] = [
    {
      url: 'assets/images/prc-hero-banner-img.jpg',
      clickAction: () => this.openInNewWindow('https://www2.gov.bc.ca/gov/content/industry/natural-gas-oil/lng'),
      caption: 'Learn more about LNG in BC',
      title: 'LNG in BC'
    },
    {
      url: 'assets/temp/IMG_8240.jpeg',
      clickAction: () =>
        this.openInNewWindow(
          'https://www.google.com/search?safe=off&client=firefox-b-d&biw=1920&bih=1018&tbm=isch&sa=1&ei=sdSwXPHECILYtAWX8ou4Bg&q=cats&oq=cats&gs_l=img.3...1714.1714..1840...0.0..0.0.0.......1....1..gws-wiz-img._ymJI4lUiTM'
        ),
      caption: 'See pictures of cats',
      title: 'Cats'
    }
  ];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.id = params.id;
      this.text = this.dataService.getText(this.id, this.pageType);
    });
  }

  ngOnInit() {}

  public openInNewWindow(url: string): void {
    if (url) {
      window.open(url);
    }
  }
}
