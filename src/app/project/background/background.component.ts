import { Component, OnInit } from '@angular/core';
import { PageTypes } from 'app/utils/page-types.enum';
import { DataService } from 'app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  public pageType: PageTypes = PageTypes.BACKGROUND;

  public id: number;
  public text: string[];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.id = params.id;

      this.text = this.dataService.getText(this.id, this.pageType);
    });
  }

  ngOnInit() {}
}
