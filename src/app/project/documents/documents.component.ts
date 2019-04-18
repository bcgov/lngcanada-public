import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import moment from 'moment';

import { ExplorePanelComponent } from './explore-panel/explore-panel.component';
import { Document } from 'app/models/document';
import { PageTypes } from 'app/utils/page-types.enum';
import { DataService } from 'app/services/data.service';

export interface IDocumentFilters {
  agencies: string[];
  complianceDocumentTypes: string[];
  dateRangeFrom: Date;
  dateRangeTo: Date;
}

const EMPTY_DOCUMENT_FILTERS: IDocumentFilters = {
  agencies: [],
  complianceDocumentTypes: [],
  dateRangeFrom: null,
  dateRangeTo: null
};

/**
 * Documents component.
 * Displays a list of documents, including filter side panel.
 *
 * @export
 * @class DocumentsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  @Input() pageType: PageTypes;
  @ViewChild('explorePanel') explorePanel: ExplorePanelComponent;

  public id: number;

  public filters: IDocumentFilters = EMPTY_DOCUMENT_FILTERS;

  public documents: Document[] = [];

  public sortColumn = '';
  public sortDirection = 0;

  public documentCountMessage = 'Total Results: ';

  public isFilterPanelVisible = false;

  constructor(private dataService: DataService, public route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.id = params.id;
      this.filterDocuments();
    });
  }

  ngOnInit() {
    this.filterDocuments();
  }

  /**
   * Sets the sort properties (column, direction) used by the OrderBy pipe.
   *
   * @param {string} sortBy
   * @memberof DocumentsComponent
   */
  public sort(sortBy: string) {
    this.sortColumn = sortBy;
    this.sortDirection = this.sortDirection > 0 ? -1 : 1;
  }

  public downloadFile(data) {
    if (data.url) {
      window.open(data.url);
    } else {
      // handle with real file downloads
    }
  }

  /**
   * Updates the total results message.  THis string can be displayed as is.
   *
   * @memberof DocumentsComponent
   */
  public updateDocumentCountMessage() {
    this.documentCountMessage = `Total Results: ${this.documents.length}`;
  }

  /**
   * Updates the document filters:
   * - Updates the filters object.
   * - Updates the documents array, which dictates which documents to show on the page.
   * - Updates the total results message.
   *
   * @param {IDocumentFilters} documentFilters
   * @memberof DocumentsComponent
   */
  public updateDocumentFilters(documentFilters: IDocumentFilters) {
    this.filters = { ...EMPTY_DOCUMENT_FILTERS, ...documentFilters };
    this.filterDocuments();
  }

  /**
   * Uses the document filters to filter the list of all documents.
   *
   * @memberof DocumentsComponent
   */
  public filterDocuments() {
    setTimeout(() => {
      this.documents = [];

      const documentsJson = this.dataService.getDocuments(this.id, this.pageType);
      Object.keys(documentsJson).forEach(key => {
        const doc: Document = new Document(documentsJson[key]);

        if (this.isFiltered(doc)) {
          this.documents.push(doc);
        }
      });
      this.updateDocumentCountMessage();
    });
  }

  /**
   * Applies all fiters, and returns true if the document is included in the filters, false otherwise.
   *
   * @param {Document} document
   * @returns {boolean}
   * @memberof DocumentsComponent
   */
  public isFiltered(document: Document): boolean {
    return (
      this.isDateRangeFiltered(document.date) &&
      this.isAgencyFiltered(document.agency) &&
      this.isComplianceDocumentTypeFiltered(document.complianceDocumentType)
    );
  }

  /**
   * Applies date filters and returns true if the date is included in the filters, false otherwise.
   *
   * @param {Date} date
   * @returns {boolean}
   * @memberof DocumentsComponent
   */
  public isDateRangeFiltered(date: Date): boolean {
    if (!this.filters.dateRangeFrom && !this.filters.dateRangeTo) {
      return true;
    }

    if (this.filters.dateRangeFrom && !this.filters.dateRangeTo) {
      return moment(date).isSameOrAfter(moment(this.filters.dateRangeFrom));
    }

    if (!this.filters.dateRangeFrom && this.filters.dateRangeTo) {
      return moment(date).isSameOrBefore(moment(this.filters.dateRangeTo));
    }

    return (
      moment(date).isSameOrAfter(moment(this.filters.dateRangeFrom)) &&
      moment(date).isSameOrBefore(moment(this.filters.dateRangeTo))
    );
  }

  /**
   * Applies agency filters and returns true if the agency is included in the filters, false otherwise.
   *
   * @param {string} agency
   * @returns {boolean}
   * @memberof DocumentsComponent
   */
  public isAgencyFiltered(agency: string): boolean {
    if (!this.filters.agencies || !this.filters.agencies.length) {
      return true;
    }

    return (
      this.filters.agencies.filter(agencyVal => {
        return agencyVal.toLowerCase() === agency.toLowerCase();
      }).length > 0
    );
  }

  /**
   * Applies compliance document type filters and returns true if the agency is included in the filters,
   * false otherwise.
   *
   * @param {string} agency
   * @returns {boolean}
   * @memberof DocumentsComponent
   */
  public isComplianceDocumentTypeFiltered(complianceDocumentType: string): boolean {
    if (!this.filters.complianceDocumentTypes || !this.filters.complianceDocumentTypes.length) {
      return true;
    }

    return (
      this.filters.complianceDocumentTypes.filter(complianceDocumentTypeVal => {
        return complianceDocumentTypeVal.toLowerCase() === complianceDocumentType.toLowerCase();
      }).length > 0
    );
  }

  // toggle Explore side panel
  public toggleFilterPanel() {
    this.isFilterPanelVisible = !this.isFilterPanelVisible;

    console.log(this.isFilterPanelVisible);

    // this.urlService.setFragment(this.isSidePanelVisible ? 'explore' : null);
  }

  public closeSidePanel() {
    this.isFilterPanelVisible = false;
    // this.urlService.setFragment(null);
  }
}
