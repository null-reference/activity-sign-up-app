import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
// import { Home } from './components/Home';
// import { FetchData } from './components/FetchData';
// import { Counter } from './components/Counter';
import { SignUpForm } from "./components/SignUpForm/SignUpForm";
import { Subscriptions } from "./components/Subscriptions/Subscriptions";

export default class App extends Component {
  displayName = App.name;

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     signUpForm: {
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       activity: "",
  //       comments: ""
  //     },
  //     subscriptions: []
  //   };
  //   this.signUpFormValueChanged = this.signUpFormValueChanged.bind(this);
  //   this.signUpFormSubmitted = this.signUpFormSubmitted.bind(this);
  // }

  // signUpFormValueChanged(event) {
  //   const existingSignUpForm = this.state.signUpForm;

  //   this.setState({
  //     signUpForm: {
  //       ...existingSignUpForm,
  //       [event.target.name]: event.target.value
  //     }
  //   });
  // }

  // submitForm(event) {}

  render() {
    return (
      <Layout>

        {/* <Route exact path="/" component={(props) => <SignUpForm { ...props } />} />
        <Route exact path="/subscriptions" component={Subscriptions} /> */}

        <Route exact path="/" component={SignUpForm} />
        <Route exact path="/subscriptions" component={Subscriptions} />
        {/* <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} /> */}
      </Layout>
    );
  }
}
