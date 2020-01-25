import { IOrder } from 'app/shared/model/order.model';

export interface ICustomer {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  district?: string;
  order?: IOrder;
}

export const defaultValue: Readonly<ICustomer> = {};
