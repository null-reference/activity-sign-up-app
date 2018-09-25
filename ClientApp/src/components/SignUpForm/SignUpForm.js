import React, { Component } from 'react';
import './SignUpForm.css';

const TextInputField = ({ name, value, label, onChange }) => 
  <div>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} />
  </div>;

export class SignUpForm extends Component {
  displayName = SignUpForm.name

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      activity: "",
      comments: "",
    };
    this.formValueChanged = this.formValueChanged.bind(this);
  }

  formValueChanged(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitForm(event) {

  }

  render() {

    const {
      firstName,
      lastName,
      email,
      activity,
      comments,
    } = this.state;

    return (
      <div>
        <h1>Sign Up</h1>

        <TextInputField name="firstName" value={firstName} label="First Name" onChange={this.formValueChanged} />
        <TextInputField name="lastName" value={lastName} label="Last Name" onChange={this.formValueChanged} />
        <TextInputField name="email" value={email} label="Email" onChange={this.formValueChanged} />
        <TextInputField name="activity" value={activity} label="Activity" onChange={this.formValueChanged} />
        <TextInputField name="comments" value={comments} label="Comments" onChange={this.formValueChanged} />

        <button onClick={this.submitForm}>Sign-up</button>
      </div>
    );
  }
}
