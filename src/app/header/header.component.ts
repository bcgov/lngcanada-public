import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public router: Router) {}

  project = ((proj) => {
    // console.log(this.router);
    switch(proj){
      case 1: return "LNG Canada";
      case 2: return "Coastal Gas Link";
      default: return "Projects"
    }
  })(1);

  ngOnInit () {
    console.log(this.router);
  }
}
