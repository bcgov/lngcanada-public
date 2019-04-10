import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import moment from 'moment';

import { ExplorePanelComponent } from './explore-panel/explore-panel.component';
import { Project1Service } from 'app/services/project1.service';
import { Project2Service } from 'app/services/project2.service';
import { Document } from 'app/models/document';

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

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  @ViewChild('explorePanel') explorePanel: ExplorePanelComponent;

  public projectService;

  public filters: IDocumentFilters = EMPTY_DOCUMENT_FILTERS;

  public documents: Document[] = [];

  public sortColumn = '';
  public sortDirection = 0;

  public isExplorePanelVisible = false;

  constructor(private injector: Injector, public route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      if (params.id && params.id === '1') {
        this.projectService = this.injector.get(Project1Service);
      } else if (params.id && params.id === '2') {
        this.projectService = this.injector.get(Project2Service);
      }
    });
  }

  ngOnInit() {
    this.filterDocuments();
  }

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

  public updateDocumentFilters(documentFilters: IDocumentFilters) {
    this.filters = { ...EMPTY_DOCUMENT_FILTERS, ...documentFilters };
    this.filterDocuments();
  }

  public filterDocuments() {
    setTimeout(() => {
      this.documents = [];

      const documentsJson = this.projectService.getDocuments();
      Object.keys(documentsJson).forEach(key => {
        const doc: Document = new Document(documentsJson[key]);

        if (this.isFiltered(doc)) {
          this.documents.push(doc);
        }
      });
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
   * Applies compliance document type filterse and returns true if the agency is included in the filters,
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
  public toggleExplore() {
    this.isExplorePanelVisible = !this.isExplorePanelVisible;

    // this.urlService.setFragment(this.isSidePanelVisible ? 'explore' : null);
  }

  public closeSidePanel() {
    this.isExplorePanelVisible = false;
    // this.urlService.setFragment(null);
  }
}
