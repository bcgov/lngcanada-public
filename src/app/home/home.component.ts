import { Component, OnInit } from '@angular/core';
import { PageTypes } from 'app/utils/page-types.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public pageType: PageTypes = PageTypes.HOME;

  constructor() {}

  ngOnInit() {}
}
