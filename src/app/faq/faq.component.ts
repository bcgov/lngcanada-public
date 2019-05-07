import { Component, OnInit } from '@angular/core';
const $ = window['jQuery'];

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  constructor() {}

  /*
    Bootstrap uses jQuery to control it's widgets.
    This hides and shows all question answers.
  */
  public toggleOpen = (e) => {
    const el = $(e.srcElement);
    if (el.hasClass('open')) {
      el.removeClass('open');
      el.html('Show All (+)');
      $('.collapse,.answer').collapse('hide');
    } else {
      el.addClass('open');
      el.html('Hide All (-)');
      $('.collapse,.answer').collapse('show');
    }
  }

  ngOnInit() {}
}
