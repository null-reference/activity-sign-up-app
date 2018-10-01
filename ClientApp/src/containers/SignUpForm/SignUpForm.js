import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { postSubscription } from '../../lib/api-client';
import './SignUpForm.css';

const initialFormData = {
  activity: "",
  comments: "",
};

export class SignUpForm extends Component {
  displayName = SignUpForm.name;

  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      errorMessage: null,
      showSuccessMessage: false,
      navigateToSubscriptions: false,
      formData: {
        ...initialFormData
      }
    };
    this.formValueChanged = this.formValueChanged.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.dismissSuccessMessage = this.dismissSuccessMessage.bind(this);
    this.navigateToSubscriptions = this.navigateToSubscriptions.bind(this);
  }

  formValueChanged(event) {
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value
      }
    });
  }

  submitForm() {
    // put our state into a "saving" mode and clear any error/success messages
    this.setState({
      saving: true,
      errorMessage: false,
      showSuccessMessage: false,
    });

    const dataToSave = this.state.formData;

    //////////////////////////////////////////////////
    // VALIDATION

    // NOTE: Pretty lame validation; this can be so much better (ie. tooltips, list, etc...)

    const validate = () => {
      const errors = [];
      if (!dataToSave.activity) {
        errors.push("Missing activity.")
      }
      return errors;
    };
    
    const errors = validate();
    if (errors.length) {
      this.setState({
        saving: false,
        errorMessage: `Error during sign-up. ${errors.join(' ')}`, 
      });
      return;
    }
    //////////////////////////////////////////////////

    postSubscription(dataToSave).then(res => {
      if (res.ok) {
        this.setState({
          saving: false,
          showSuccessMessage: true,
          formData: {
            // reset our form data to the initial state
            ...initialFormData
          }
        });
      } else {
        // make sure we gracefully handle errors from the server
        this.setState({
          saving: false,
          errorMessage: `Error during sign-up. ${res.result}`, 
        });
      }
    });
  }

  dismissSuccessMessage() {
    this.setState({
      showSuccessMessage: false
    });
  }

  navigateToSubscriptions() {
    this.setState({
      navigateToSubscriptions: true
    });
  }

  render() {
    const {
      saving,
      errorMessage,
      showSuccessMessage,
      navigateToSubscriptions
    } = this.state;

    const {
      activity,
      comments
    } = this.state.formData;

    return (
      <div>
        {navigateToSubscriptions && <Redirect to="/subscriptions" />}

        <h1>Sign Up</h1>

        {errorMessage && (
          <Alert bsStyle="danger">
            <p>{errorMessage}</p>
          </Alert>
        )}

        {showSuccessMessage && (
          <Alert
            className="success-alert"
            bsStyle="success"
            onDismiss={this.dismissSuccessMessage}
          >
            <h4>You have successfully signed up!</h4>

            <p>
              <Button bsStyle="info" onClick={this.navigateToSubscriptions}>
                See Who's Signed Up
              </Button>
              <span> or </span>
              <Button onClick={this.dismissSuccessMessage}>
                Hide This Message
              </Button>
            </p>
          </Alert>
        )}

        <TextInputField
          name="activity"
          value={activity}
          label="Activity"
          onChange={this.formValueChanged}
          saving={saving}
        />
        <TextAreaField
          name="comments"
          value={comments}
          label="Comments"
          onChange={this.formValueChanged}
          saving={saving}
        />

        <Button className="submit-button" onClick={this.submitForm}>
          {saving ? "Signing-up..." : "Sign-up"}
        </Button>

        <div className="required-field-footnote">* Required field</div>
      </div>
    );
  }
}

const TextInputField = ({ name, value, label, onChange, saving }) => (
  <div>
    <label htmlFor={name}>
      {label} <span className="required-field-indicator" />
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={saving}
    />
  </div>
);

const TextAreaField = ({ name, value, label, onChange, saving }) => (
  <div>
    <label className="label-align-top" htmlFor={name}>
      {label}
    </label>
    <textarea
      rows={10}
      name={name}
      value={value}
      onChange={onChange}
      disabled={saving}
    />
  </div>
);
