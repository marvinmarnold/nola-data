import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { SESSION, SCORES } from '../../constants.js';

export default class PolygonForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {

    // $('#myModal').modal()
    // ReactDOM.findDOMNode(this.refs.myModal).modal()
    console.log(ReactDOM.findDOMNode(this.refs.myModal));
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

  renderLoading() {
    return <div></div>
  }

  renderScore(score) {
    return (
      <label className="form-check-inline" key={score}>
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id={"inlineRadio" + score} value={"option" + score} /> {score}
      </label>
    )
  }

  renderQuestion(question) {
    return (
      <fieldset className="form-group" key={question._id}>
        <label>{question.text}</label><br/>
        {SCORES.map(this.renderScore.bind(this))}
      </fieldset>
    )
  }

  renderModalBody() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="name" >What would you like to name this region?</label>
          <input className="form-control" type="text" id="name" ref="name" />
          <small id="nameHelp" className="form-text text-muted">
            Official city, province or colloquial neigborhood name.
          </small>
        </div>

        {this.props.questions.map(this.renderQuestion.bind(this))}

        <button type="submit" className="btn btn-primary btn-block">Create region</button>
      </form>
    )
  }

  renderInsertingPolygon() {
    if(this.props.isLoading) {
      return this.renderLoading()
    } else {
      return (
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" ref='myModal'>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Complete Region details</h4>
              </div>
              <div className="modal-body">
                {this.renderModalBody()}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    console.log(this.props.insertingPolygon);
    if(this.props.insertingPolygon) {
      console.log('PolygonForm#insertingPolygon');
      return this.renderInsertingPolygon()
    } else {
      if(currentPolygon) {
        console.log('PolygonForm#currentPolygon');
        // add questions for existing polygon (creted by you or someone else)
        return <div></div>
      }
      console.log('PolygonForm#default');
      return <div></div>
    }
  }
}

PolygonForm.propTypes = {
  currentPolygon: React.PropTypes.object,
  insertingPolygon: React.PropTypes.bool,
  questions: React.PropTypes.array,
  isLoading: React.PropTypes.bool
};
