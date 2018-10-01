import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    const {
      isAuthenticated,
      onLogout,
    } = this.props;

    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Activity Sign Up</Link>
          </Navbar.Brand>
          {isAuthenticated && <Navbar.Toggle />}
        </Navbar.Header>
        {isAuthenticated &&
          <Navbar.Collapse>
            <Nav>
              <React.Fragment>
                <LinkContainer to={'/'} exact>
                  <NavItem>
                    <Glyphicon glyph="plus" /> Sign Up
                  </NavItem>
                </LinkContainer>
                <LinkContainer to={'/subscriptions'}>
                  <NavItem>
                    <Glyphicon glyph='th-list' /> Who's Signed Up?
                  </NavItem>
                </LinkContainer>
                <NavItem onClick={onLogout}>
                  <Glyphicon glyph='off' /> Logout
                </NavItem>
              </React.Fragment>
            </Nav>
          </Navbar.Collapse>
        }
      </Navbar>
    );
  }
}

NavMenu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};
