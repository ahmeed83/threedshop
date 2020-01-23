import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Container, Form, FormGroup, Input, Label, CustomInput } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket, faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faShoppingBasket, faHeart);

export type IHomeProp = StateProps;


export const LaptopPic = props => (
  <div {...props}>
    <img src="content/images3d/laptop.jpg" alt="pic" />
  </div>
);

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Container className="pt-5">
      <Row>
        <Col lr="2" md="2">
          <h4>Filter</h4>
          <hr />
          <div className="pt-2 " data-role="main">
            <Form>
              <FormGroup>
                <Label for="exampleCustomRange">Price</Label>
                <CustomInput type="range" id="exampleCustomRange" name="customRange" />
              </FormGroup>
              <hr />
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
          <Row>
            {[...Array(16)].map((x, i) =>
              <Col key={i} md="3" sm="6">
                <div className="product-grid6">
                  <div className="product-image6">
                    <a href="#">
                      <LaptopPic />
                    </a>
                  </div>
                  <div className="product-content">
                    <h3 className="title"><a href="#">The New Razer Blade 15</a></h3>
                    <div className="price">$110.00
                      <span>$140.00</span>
                    </div>
                  </div>
                  <ul className="social">
                    <li><a href="" data-tip="Quick View">
                      <FontAwesomeIcon icon="search" />
                    </a>
                    </li>
                    <li><a href="" data-tip="Add to Wishlist">
                      <FontAwesomeIcon icon="heart"/>
                    </a></li>
                    <li><a href="" data-tip="Add to Cart">
                      <FontAwesomeIcon icon="shopping-basket" />
                    </a></li>
                  </ul>
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

    </Container>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
