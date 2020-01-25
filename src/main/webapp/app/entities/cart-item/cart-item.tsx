import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cart-item.reducer';
import { ICartItem } from 'app/shared/model/cart-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICartItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CartItem = (props: ICartItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { cartItemList, match } = props;
  return (
    <div>
      <h2 id="cart-item-heading">
        <Translate contentKey="threedshopApp.cartItem.home.title">Cart Items</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="threedshopApp.cartItem.home.createLabel">Create new Cart Item</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {cartItemList && cartItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="threedshopApp.cartItem.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="threedshopApp.cartItem.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="threedshopApp.cartItem.product">Product</Translate>
                </th>
                <th>
                  <Translate contentKey="threedshopApp.cartItem.cart">Cart</Translate>
                </th>
                <th>
                  <Translate contentKey="threedshopApp.cartItem.order">Order</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cartItemList.map((cartItem, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cartItem.id}`} color="link" size="sm">
                      {cartItem.id}
                    </Button>
                  </td>
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.price}</td>
                  <td>{cartItem.product ? <Link to={`product/${cartItem.product.id}`}>{cartItem.product.id}</Link> : ''}</td>
                  <td>{cartItem.cart ? <Link to={`cart/${cartItem.cart.id}`}>{cartItem.cart.id}</Link> : ''}</td>
                  <td>{cartItem.order ? <Link to={`order/${cartItem.order.id}`}>{cartItem.order.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cartItem.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cartItem.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cartItem.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="alert alert-warning">
            <Translate contentKey="threedshopApp.cartItem.home.notFound">No Cart Items found</Translate>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ cartItem }: IRootState) => ({
  cartItemList: cartItem.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
