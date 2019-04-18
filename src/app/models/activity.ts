export class Activity {
  _id: string;
  type: string;
  title: string;
  description: string;
  date: Date;

  constructor(obj?: any) {
    this._id = (obj && obj._id) || null;
    this.type = (obj && obj.type) || null;
    this.title = (obj && obj.title) || null;
    this.description = (obj && obj.description) || null;
    this.date = (obj && obj.date && new Date(obj.date)) || null;
  }
}
