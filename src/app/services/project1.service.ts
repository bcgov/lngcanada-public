import { Injectable } from '@angular/core';

import project1Documents from '../../assets/data/project1/documents.json';

@Injectable()
export class Project1Service {
  constructor() {}

  public getDocuments() {
    return project1Documents;
  }
}
