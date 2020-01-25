import { Moment } from 'moment';

export interface ICategory {
  id?: number;
  name?: string;
  lastUpdate?: Moment;
}

export const defaultValue: Readonly<ICategory> = {};
