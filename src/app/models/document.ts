import moment from 'moment';

export class Document {
  _id: string;
  num: number;
  fileName: string;
  name: string;
  agency: string;
  author: string;
  status: string;
  phase: string;
  section: string;
  authorizationId: string;
  complianceDocumentType: string;
  complianceDocumentSubtype: string;
  date: Date;
  description: string;
  url: string;
  mime: string;
  nation: string;

  constructor(obj?: any) {
    this._id = (obj && obj._id) || null;
    this.num = (obj && obj.num) || null;
    this.fileName = (obj && obj.fileName) || null;
    this.name = (obj && obj.name) || null;
    this.agency = (obj && obj.agency) || null;
    this.author = (obj && obj.author) || null;
    this.status = (obj && obj.status) || null;
    this.phase = (obj && obj.phase) || null;
    this.section = (obj && obj.section) || null;
    this.authorizationId = (obj && obj.authorizationId) || null;
    this.complianceDocumentType = (obj && obj.complianceDocumentType) || null;
    this.complianceDocumentSubtype = (obj && obj.complianceDocumentSubtype) || null;
    this.date = (obj && obj.date && moment(obj.date, 'DD-MM-YYYY').toDate()) || null;
    this.description = (obj && obj.description) || null;
    this.url = (obj && obj.url) || null;
    this.mime = (obj && obj.mime) || null;
    this.nation = (obj && obj.nation) || null;
  }
}
