import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { SESSION } from '../../constants.js';

export class PolygonForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    // Find the name field via the React ref
    const name= ReactDOM.findDOMNode(this.refs.name).value.trim();

    let polygon = Session.get(SESSION.POLYGON)
    polygon = _.extend(polygon, {name})



    // Clear form
    ReactDOM.findDOMNode(this.refs.name).value = '';

    Meteor.call("polygons.insert", polygon, (error, result) => {
      console.log('polygons.insert');
      console.log(polygon);
      if(error) {
        console.log("error", error);
      }
      if(result) {
        console.log("success");

        Session.set(SESSION.POLYGON, undefined);
      }
    });
  }

  renderInsertingPolygon() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group row">
          <label for="name" className="col-xs-2 col-form-label">Name</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" id="name" ref="name"/>
            <small id="nameHelp" className="form-text text-muted">
              What would you like to name this region?
            </small>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }

  render() {
    if(this.props.insertingPolygon) {
      return this.renderInsertingPolygon()
    } else {
      if(currentPolygon) {
        // add questions for existing polygon (creted by you or someone else)
        return <div></div>
      }
    }
    return <div></div>
  }
}

PolygonForm.propTypes = {
  currentPolygon: React.PropTypes.object,
  insertingPolygon: React.PropTypes.bool
};
