import { Moment } from 'moment';
import { ICategory } from 'app/shared/model/category.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  quantity?: number;
  image?: string;
  price?: number;
  lastUpdate?: Moment;
  category?: ICategory;
}

export const defaultValue: Readonly<IProduct> = {};
