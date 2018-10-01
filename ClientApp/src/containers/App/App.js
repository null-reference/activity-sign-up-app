import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "../../components/Layout";
import { PrivateRoute } from "../../components/PrivateRoute";
import { Login } from "../../components/Login";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import { Subscriptions } from "../Subscriptions/Subscriptions";
import { testAuth, login } from "../../lib/api-client";
import { ACCESS_TOKEN_KEY } from "../../constants";

// TODO: in a perfect world, we'd have a "create user profile" menu option; alas, we are not perfect...yet

export default class App extends Component {
  displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loggingIn: false,
    };
    this.pollAuth = this.pollAuth.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  
  pollAuth(immediate = false) {
    setTimeout(() => testAuth().then(authed => {
      this.setState({
        isAuthenticated: authed,
      });

      // always continue polling auth status
      this.pollAuth();
    }), immediate ? 0 : 10000);
  };

  componentDidMount() {
    this.pollAuth(true);
  }

  onLogin({ username, password }) {
    this.setState({
      loggingIn: true,
    });

    // NOTE: auth resource props to --> https://code-maze.com/authentication-aspnetcore-jwt-1/
    login({ username, password }).then(success => {
      this.setState({
        isAuthenticated: success,
        loggingIn: false,
      });
    });
  }

  onLogout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.setState({
      isAuthenticated: false,
    });
  }

  render() {
    const {
      isAuthenticated,
      loggingIn,
    } = this.state;

    return (
      <Layout isAuthenticated={isAuthenticated} onLogout={this.onLogout}>
        <Route exact path="/login" component={() => <Login onLogin={this.onLogin} isAuthenticated={isAuthenticated} loggingIn={loggingIn} />} />
        <PrivateRoute exact path="/" component={SignUpForm} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/subscriptions" component={Subscriptions} isAuthenticated={isAuthenticated} />
      </Layout>
    );
  }
}
