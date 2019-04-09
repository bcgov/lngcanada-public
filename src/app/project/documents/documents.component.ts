import { Component, OnInit, ViewChild } from '@angular/core';
import { ExplorePanelComponent } from './explore-panel/explore-panel.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  @ViewChild('explorePanel') explorePanel: ExplorePanelComponent;

  public documents = [
    {
      name: 'Document 1',
      agency: 'BC Gov',
      complianceDocumentType: 'Government Inspection',
      date: new Date('June 1, 2015')
    },
    {
      name: 'Document 3',
      agency: 'AB Gov',
      complianceDocumentType: 'Enforcement Order',
      date: new Date('Dec 31, 2019')
    },
    {
      name: 'Document 2',
      agency: 'ON Gov',
      complianceDocumentType: 'Company Self Report',
      date: new Date('June 1, 2018')
    },
    {
      name: 'Document 4',
      agency: 'BC Gov',
      complianceDocumentType: 'Enforcement Order',
      date: new Date('April 12, 2000')
    }
  ];

  public sortColumn = '';
  public sortDirection = 0;

  public isExplorePanelVisible = false;

  constructor() {}

  ngOnInit() {}

  public sort(sortBy: string) {
    this.sortColumn = sortBy;
    this.sortDirection = this.sortDirection > 0 ? -1 : 1;
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
