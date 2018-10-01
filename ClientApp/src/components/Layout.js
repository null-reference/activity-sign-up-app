import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  displayName = Layout.name

  render() {
    const {
      isAuthenticated,
      onLogout,
    } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col sm={3}>
            <NavMenu isAuthenticated={isAuthenticated} onLogout={onLogout} />
          </Col>
          <Col sm={9}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

Layout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};
