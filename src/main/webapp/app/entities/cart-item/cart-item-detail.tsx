import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cart-item.reducer';
import { ICartItem } from 'app/shared/model/cart-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICartItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CartItemDetail = (props: ICartItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { cartItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="threedshopApp.cartItem.detail.title">CartItem</Translate> [<b>{cartItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantity">
              <Translate contentKey="threedshopApp.cartItem.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{cartItemEntity.quantity}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="threedshopApp.cartItem.price">Price</Translate>
            </span>
          </dt>
          <dd>{cartItemEntity.price}</dd>
          <dt>
            <Translate contentKey="threedshopApp.cartItem.product">Product</Translate>
          </dt>
          <dd>{cartItemEntity.product ? cartItemEntity.product.id : ''}</dd>
          <dt>
            <Translate contentKey="threedshopApp.cartItem.cart">Cart</Translate>
          </dt>
          <dd>{cartItemEntity.cart ? cartItemEntity.cart.id : ''}</dd>
          <dt>
            <Translate contentKey="threedshopApp.cartItem.order">Order</Translate>
          </dt>
          <dd>{cartItemEntity.order ? cartItemEntity.order.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/cart-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cart-item/${cartItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ cartItem }: IRootState) => ({
  cartItemEntity: cartItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CartItemDetail);
