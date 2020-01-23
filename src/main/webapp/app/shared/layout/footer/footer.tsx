import './footer.scss';

import React from 'react';
import {Col, Container, Row} from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Container className="pt-4">
      <Row>
        <Col>
          <p>
            {/*<Translate contentKey="footer">Your footer</Translate>*/}
            <div className="single_ftr">
              <h4 className="sf_title">Contacts</h4>
              <ul>
                <li>4080 Repperts Coaol Road Sackson, MS 00201 USA</li>
                <li>(+123) 685 78 455 <br/> (+064) 336 987 245</li>
                <li>Contact@yourcompany.com</li>
              </ul>
            </div>
          </p>
        </Col>
        <Col>
          <div className="single_ftr">
            <h4 className="sf_title">Information</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Delivery Information</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </Col>
        <Col>
          <div className="single_ftr">
            <h4 className="sf_title">Services</h4>
            <ul>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Site Map</a></li>
              <li><a href="#">Wish List</a></li>
              <li><a href="#">My Account</a></li>
              <li><a href="#">Order History</a></li>
            </ul>
          </div>
        </Col>
        <Col>
          <div className="single_ftr">
            <h4 className="sf_title">Newsletter</h4>
            <div className="newsletter_form">
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have </p>
              <form method="post" className="form-inline">
                <input name="EMAIL" id="email" placeholder="Enter Your Email" className="form-control" type="email"/>
                <button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;
