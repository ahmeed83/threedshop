import { Moment } from 'moment';

export interface IOrder {
  id?: number;
  totalPrice?: number;
  orderDate?: Moment;
  status?: string;
}

export const defaultValue: Readonly<IOrder> = {};
