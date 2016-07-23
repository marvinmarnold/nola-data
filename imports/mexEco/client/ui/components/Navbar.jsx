import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import {loginButtons} from 'meteor/accounts-ui';

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <a className="navbar-brand" href="#">MexEco</a>
        <ul className="nav navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Pricing</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
        </ul>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item active">
            {loginButtons}
          </li>
        </ul>
      </nav>
    );
  }
}
