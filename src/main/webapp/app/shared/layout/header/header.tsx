import './header.scss';

import React, {useEffect, useState} from 'react';
import {Storage, Translate} from 'react-jhipster';
import {Collapse, Container, Nav, Navbar, NavbarToggler} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import {isRTL} from 'app/config/translation';

import {Brand, Home} from './header-components';
import {AccountMenu, AdminMenu, EntitiesMenu, LocaleMenu} from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => document.querySelector('html').setAttribute('dir', isRTL(Storage.session.get('locale')) ? 'rtl' : 'ltr'));

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
    document.querySelector('html').setAttribute('dir', isRTL(langKey) ? 'rtl' : 'ltr');
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`}/>
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar"/>
      <Navbar className="navbar navbar-inverse navbar-light navbar-expand-md justify-content-center fixed-top">
        <Container>
          <Brand/>
          <NavbarToggler aria-label="Menu" onClick={toggleMenu}/>
          <Collapse isOpen={menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              <Home/>
              <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange}/>
              <AccountMenu isAuthenticated={props.isAuthenticated}/>
              {props.isAuthenticated && props.isAdmin && <EntitiesMenu/>}
              {props.isAuthenticated && props.isAdmin && (
                <AdminMenu showSwagger={props.isSwaggerEnabled} showDatabase={!props.isInProduction}/>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
