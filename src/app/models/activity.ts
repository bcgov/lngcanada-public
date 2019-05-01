export class Activity {
  icon: string;
  title: string;
  description: string;
  date: Date;

  constructor(obj?: any) {
    this.icon = (obj && obj.icon) || 'info';
    this.title = (obj && obj.title) || null;
    this.description = (obj && obj.description) || null;
    this.date = (obj && obj.date && new Date(obj.date)) || null;
  }
}
