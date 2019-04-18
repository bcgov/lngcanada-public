import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import moment from 'moment';

import { DataService } from 'app/services/data.service';
import { Activity } from 'app/models/activity';
import { PageTypes } from 'app/utils/page-types.enum';

/**
 * Activity component.
 * Displays a list of activity updates.
 *
 * @export
 * @class ActivityComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @Input() pageType: PageTypes;

  public id: number;

  public allActivities: Activity[] = [];

  public pagination = {
    currentPage: 0,
    itemsPerPage: 5,
    pageCount: 1
  };

  public activitiesToDisplay: Activity[] = [];

  constructor(private dataService: DataService, public route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.id = params.id;
      this.updateActivities();
    });
  }

  ngOnInit() {
    this.updateActivities();
  }

  public updateActivities(): void {
    this.updateAllActivities();
    this.setInitialPagination();
    this.updateActivitiesToDisplay();
  }

  public updateAllActivities(): void {
    const activitiesJSON = this.dataService.getActivities(this.id, this.pageType);
    const activities: Activity[] = [];
    Object.keys(activitiesJSON).forEach(key => {
      activities.push(new Activity(activitiesJSON[key]));
    });

    this.allActivities = activities;
  }

  public updateActivitiesToDisplay(): void {
    const startIndex: number = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    const endIndex: number = this.pagination.currentPage * this.pagination.itemsPerPage;

    this.activitiesToDisplay = this.allActivities.slice(startIndex, endIndex);
  }

  public setInitialPagination(page: number = 1, itemsPerPage: number = 5): void {
    this.pagination.currentPage = page;
    this.pagination.itemsPerPage = itemsPerPage;
    this.pagination.pageCount = Math.max(1, Math.ceil(this.allActivities.length / this.pagination.itemsPerPage));
  }

  public updatePage(page: number = 0) {
    if (
      (page === -1 && this.pagination.currentPage + page >= 1) ||
      (page === 1 && this.pagination.pageCount >= this.pagination.currentPage + page)
    ) {
      this.pagination.currentPage += page;
      this.updateActivitiesToDisplay();
    }
  }

  public setPage(page: number = 1) {
    if (page >= 1 && this.pagination.pageCount >= page) {
      this.pagination.currentPage = page;
      this.updateActivitiesToDisplay();
    }
  }
}
