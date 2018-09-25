import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";
import { Subscriptions } from "./components/Subscriptions/Subscriptions";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={SignUpForm} />
        <Route exact path="/subscriptions" component={Subscriptions} />
      </Layout>
    );
  }
}
