import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

/**
 * Simple component that displays activity subscriptions, nothing more
 */
export class Subscriptions extends Component {
  displayName = Subscriptions.name

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      subscriptions: [],
    };
  }

  componentWillMount() {
    fetch("/api/subscriptions").then(res => {
      res.json().then(subs => {
        this.setState({ 
          loading: false,
          // pre-sort by id
          subscriptions: subs.sort((a, b) => a.subscriptionID - b.subscriptionID),
        });
      });
    });
  }

  render() {
    const {
      loading,
      subscriptions,
    } = this.state;

    return (
      <div>
        <h1>See Who's Signed Up</h1>

        {loading && <div>Loading...</div>}

        {!loading &&
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Activity</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map(x => 
                <tr key={x.subscriptionID}>
                  <td>{x.subscriptionID}</td>
                  <td>{x.firstName}</td>
                  <td>{x.lastName}</td>
                  <td>{x.email}</td>
                  <td>{x.activity}</td>
                  <td>{x.comments}</td>
                </tr>
              )}
            </tbody>
          </Table>
        }
      </div>
    );
  }
}
