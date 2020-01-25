import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CartItem from './cart-item';
import CartItemDetail from './cart-item-detail';
import CartItemUpdate from './cart-item-update';
import CartItemDeleteDialog from './cart-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CartItemDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CartItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CartItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CartItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={CartItem} />
    </Switch>
  </>
);

export default Routes;
