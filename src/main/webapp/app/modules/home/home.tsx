import './home.scss';

import React, {useEffect, useState} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {getSortState} from 'react-jhipster';
import {connect} from 'react-redux';
import {Col, Container, CustomInput, Form, FormGroup, Input, Label, Row, Spinner} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faHeart, faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import {getEntities, reset} from "app/entities/product/product.reducer";
import {ITEMS_PER_PAGE} from "app/shared/util/pagination.constants";

library.add(faShoppingBasket, faHeart);

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const LaptopPic = props => (
  <div {...props}>
    <img src="content/images3d/laptop.jpg" alt="pic"/>
  </div>
);

export const Home = (props: IHomeProp) => {
  // const {account} = props;
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [sorting, setSorting] = useState(false);

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const resetAll = () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1
    });
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      getAllEntities();
    }
  });

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
    setSorting(true);
  };

  const {productList} = props;

  return (
    <Container className="pt-5">
      <Row>
        <Col lr="2" md="2">
          <hr/>
          <h4>Sort & Filter</h4>
          <hr/>
          <button type="button" className="btn btn-secondary btn-block" onClick={sort('name')}>Sort</button>
          <hr/>
          <div className="pt-2 " data-role="main">
            <Form>
              <FormGroup>
                <Label for="exampleCustomRange">Price</Label>
                <CustomInput type="range" id="exampleCustomRange" name="customRange"/>
              </FormGroup>
              <hr/>
              <h5 className="pt-2">Category</h5>
              <FormGroup className="pt-2" check>
                <Input type="checkbox" name="Laptop" id="Laptop"/>
                <Label for="exampleCheck" check>Laptop</Label>
              </FormGroup>
              <FormGroup className="pt-2" check>
                <Input type="checkbox" name="Mobile" id="Mobile"/>
                <Label for="exampleCheck" check>Mobile</Label>
              </FormGroup>
              <FormGroup className="pt-2" check>
                <Input type="checkbox" name="Desktop" id="Desktop"/>
                <Label for="exampleCheck" check>Desktop</Label>
              </FormGroup>
              <FormGroup className="pt-2" check>
                <Input type="checkbox" name="Game" id="Game"/>
                <Label for="exampleCheck" check>Game</Label>
              </FormGroup>
            </Form>
          </div>
        </Col>
        <Col lr="10" md="10" sm="10">
          {productList && productList.length > 0 ? (
            <Row className="pt-2">
              {productList.map((product, i) => (
                <Col key={`entity-${i}`} md="3" sm="6">
                  <div className="product-grid6">
                    <div className="product-image6">
                      <Link to={`/product/${product.id}`}>
                        <LaptopPic/>
                      </Link>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="#">{product.name}</a></h3>
                      <div className="price">$110.00
                        <span>$140.00</span>
                      </div>
                    </div>
                    <ul className="social">
                      <li><a href="" data-tip="Quick View">
                        <FontAwesomeIcon icon="search"/>
                      </a>
                      </li>
                      <li><a href="" data-tip="Add to Wishlist">
                        <FontAwesomeIcon icon="heart"/>
                      </a></li>
                      <li><a href="" data-tip="Add to Cart">
                        <FontAwesomeIcon icon="shopping-basket"/>
                      </a></li>
                    </ul>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <Spinner className="loader" color="info" style={{width: '9rem', height: '9rem'}}/>
          )}
        </Col>
      </Row>
    </Container>
  );
};

// const mapStateToProps = storeState => ({
const mapStateToProps = ({product}: IRootState) => ({
  productList: product.entities,
  totalItems: product.totalItems,
  links: product.links,
  entity: product.entity,
  updateSuccess: product.updateSuccess,
  // account: storeState.authentication.account,
  // isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
