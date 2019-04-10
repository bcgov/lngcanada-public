export class Document {
  _id: string;
  fileName: string;
  name: string;
  agency: string;
  complianceDocumentType: string;
  date: Date;
  description: string;
  url: string;
  mime: string;

  constructor(obj?: any) {
    this._id = (obj && obj._id) || null;
    this.fileName = (obj && obj.fileName) || null;
    this.name = (obj && obj.name) || null;
    this.agency = (obj && obj.agency) || null;
    this.complianceDocumentType = (obj && obj.complianceDocumentType) || null;
    this.date = (obj && obj.date && new Date(obj.date)) || null;
    this.description = (obj && obj.description) || null;
    this.url = (obj && obj.url) || null;
    this.mime = (obj && obj.mime) || null;
  }
}
