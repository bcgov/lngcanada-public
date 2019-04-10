import { Injectable } from '@angular/core';

import project2Documents from '../../assets/data/project2/documents.json';

@Injectable()
export class Project2Service {
  constructor() {}

  public getDocuments() {
    return project2Documents;
  }
}
