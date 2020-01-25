import { IProduct } from 'app/shared/model/product.model';
import { ICart } from 'app/shared/model/cart.model';
import { IOrder } from 'app/shared/model/order.model';

export interface ICartItem {
  id?: number;
  quantity?: number;
  price?: number;
  product?: IProduct;
  cart?: ICart;
  order?: IOrder;
}

export const defaultValue: Readonly<ICartItem> = {};
