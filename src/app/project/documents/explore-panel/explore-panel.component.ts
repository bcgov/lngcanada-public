import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import moment from 'moment';

import { Constants } from 'app/utils/constants';
import { UrlService } from 'app/services/url.service';

@Component({
  selector: 'app-explore-panel',
  templateUrl: './explore-panel.component.html',
  styleUrls: ['./explore-panel.component.scss']
})
export class ExplorePanelComponent implements OnInit, OnDestroy {
  @Output() updateFilters = new EventEmitter(); // to applications component
  @Output() hideSidePanel = new EventEmitter(); // to applications component // used in template
  @Output() resetView = new EventEmitter(); // to applications component

  readonly minDate = moment('1900-01-01').toDate(); // first app created
  readonly maxDate = moment('2100-12-31').toDate(); // today

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  public agencyKeys: string[] = [];
  public agencyFilters: object = {}; // array-like object
  public _agencyFilters: object = {}; // temporary filters for Cancel feature

  public complianceDocumentTypeKeys: string[] = [];
  public complianceDocumentTypeFilters: object = {}; // array-like object
  public _complianceDocumentTypeFilters: object = {}; // temporary filters for Cancel feature

  public dateRangeFromFilter: Date = null;
  public _dateRangeFromFilter: Date = null; // temporary filters for Cancel feature

  public dateRangeToFilter: Date = null;
  public _dateRangeToFilter: Date = null; // temporary filters for Cancel feature

  constructor(private urlService: UrlService) {
    // declare agencies keys
    Constants.agencies.forEach(agency => {
      this.agencyKeys.push(agency.toUpperCase());
    });
    Constants.complianceDocumentTypes.forEach(complianceDocumentType => {
      this.complianceDocumentTypeKeys.push(complianceDocumentType.toUpperCase());
    });

    // initialize temporary filters
    this.agencyKeys.forEach(key => {
      this._agencyFilters[key] = false;
    });
    this.complianceDocumentTypeKeys.forEach(key => {
      this._complianceDocumentTypeFilters[key] = false;
    });

    // watch for URL param changes
    // NB: this must be in constructor to get initial parameters
    this.urlService.onNavEnd$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      // get initial or updated parameters
      // TODO: could also get params from event.url
      const hasChanges = this.getParameters();

      // notify applications component that we have new filters
      if (hasChanges) {
        this.updateFilters.emit(this.getFilters());
      }
    });
  }

  private getParameters(): boolean {
    const complianceDocumentTypes = (this.urlService.query('complianceDocumentTypes') || '').split('|');
    this.complianceDocumentTypeKeys.forEach(key => {
      this.complianceDocumentTypeFilters[key] = complianceDocumentTypes.includes(key);
    });

    const agencies = (this.urlService.query('agencies') || '').split('|');
    this.agencyKeys.forEach(key => {
      this.agencyFilters[key] = agencies.includes(key);
    });

    this.dateRangeFromFilter = this.urlService.query('dateRangeFrom')
      ? moment(this.urlService.query('dateRangeFrom')).toDate()
      : null;
    this.dateRangeToFilter = this.urlService.query('dateRangeTo')
      ? moment(this.urlService.query('dateRangeTo')).toDate()
      : null;

    const hasChanges =
      !_.isEqual(this._complianceDocumentTypeFilters, this.complianceDocumentTypeFilters) ||
      !_.isEqual(this._agencyFilters, this.agencyFilters) ||
      !_.isEqual(this._dateRangeFromFilter, this.dateRangeFromFilter) ||
      !_.isEqual(this._dateRangeToFilter, this.dateRangeToFilter);

    // copy all data from actual to temporary properties
    this._complianceDocumentTypeFilters = { ...this.complianceDocumentTypeFilters };
    this._agencyFilters = { ...this.agencyFilters };
    this._dateRangeFromFilter = this.dateRangeFromFilter;
    this._dateRangeToFilter = this.dateRangeToFilter;

    return hasChanges;
  }

  public ngOnInit() {}

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getFilters(): object {
    // convert array-like objects to arrays
    const complianceDocumentTypes: string[] = [];
    Object.keys(this.complianceDocumentTypeFilters).forEach(key => {
      if (this.complianceDocumentTypeFilters[key]) {
        complianceDocumentTypes.push(key);
      }
    });

    const agencies: string[] = [];
    Object.keys(this.agencyFilters).forEach(key => {
      if (this.agencyFilters[key]) {
        agencies.push(key);
      }
    });

    return {
      complianceDocumentTypes: complianceDocumentTypes,
      agencies: agencies,
      dateRangeFrom: this.dateRangeFromFilter
        ? moment(this.dateRangeFromFilter)
            .startOf('day')
            .toDate()
        : null,
      dateRangeTo: this.dateRangeToFilter
        ? moment(this.dateRangeToFilter)
            .endOf('day')
            .toDate()
        : null
    };
  }

  public applyAllFilters(doNotify: boolean = true) {
    // notify applications component to reset map view so user has context of what results are returned
    this.resetView.emit();

    // apply all temporary filters
    this.complianceDocumentTypeFilters = { ...this._complianceDocumentTypeFilters };
    this.agencyFilters = { ...this._agencyFilters };
    this.dateRangeFromFilter = this._dateRangeFromFilter;
    this.dateRangeToFilter = this._dateRangeToFilter;

    // save parameters
    this._saveParameters();

    // notify applications component that we have new filters
    if (doNotify) {
      this.updateFilters.emit(this.getFilters());
    }
  }

  private _saveParameters() {
    let complianceDocumentTypes: string = null;
    this.complianceDocumentTypeKeys.forEach(key => {
      if (this.complianceDocumentTypeFilters[key]) {
        if (!complianceDocumentTypes) {
          complianceDocumentTypes = key;
        } else {
          complianceDocumentTypes += '|' + key;
        }
      }
    });

    let agencies: string = null;
    this.agencyKeys.forEach(key => {
      if (this.agencyFilters[key]) {
        if (!agencies) {
          agencies = key;
        } else {
          agencies += '|' + key;
        }
      }
    });

    this.urlService.save('complianceDocumentTypes', complianceDocumentTypes);
    this.urlService.save('agencies', agencies);
    this.urlService.save(
      'dateRangeFrom',
      this.dateRangeFromFilter && moment(this.dateRangeFromFilter).format('YYYY-MM-DD')
    );
    this.urlService.save('dateRangeTo', this.dateRangeToFilter && moment(this.dateRangeToFilter).format('YYYY-MM-DD'));
  }

  // clear all temporary filters
  public clearAllFilters(doNotify: boolean = true) {
    if (this.filterCount() > 0) {
      this.complianceDocumentTypeKeys.forEach(key => {
        this._complianceDocumentTypeFilters[key] = false;
      });
      this.agencyKeys.forEach(key => {
        this._agencyFilters[key] = false;
      });
      this._dateRangeFromFilter = null;
      this._dateRangeToFilter = null;

      this.applyAllFilters(doNotify);
    }
  }

  // return count of filters
  public filterCount(): number {
    const complianceDocumentTypeCount = this.complianceDocumentTypeKeys.filter(
      key => this.complianceDocumentTypeFilters[key]
    ).length;
    const agencyCount = this.agencyKeys.filter(key => this.agencyFilters[key]).length;
    const dateRangeCount = this.dateRangeFromFilter || this.dateRangeToFilter ? 1 : 0;

    return complianceDocumentTypeCount + agencyCount + dateRangeCount;
  }
}
