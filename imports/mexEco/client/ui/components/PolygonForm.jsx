import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Questions } from '../../../common/collections/questions.js';
import { SESSION, SCORES } from '../../constants.js';

class PolygonForm extends Component {
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

  renderLoading() {
    return <h1>Loading</h1>
  }

  renderScore(score) {
    return (
      <label className="form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id={"inlineRadio" + score} value={"option" + score} /> {score}
      </label>
    )
  }

  renderQuestion(question) {
    return (
      <fieldset className="form-group">
        <label>{question.text}</label><br/>
        {SCORES.map(this.renderScore.bind(this))}
      </fieldset>
    )
  }

  renderInsertingPolygon() {
    if(this.props.isLoading) {
      return this.renderLoading()
    } else {
      return (
        <div>
          <h2 className='m-b-1'>Complete Region details</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>

            <div className="form-group">
              <label htmlFor="name" >What would you like to name this region?</label>
              <input className="form-control" type="text" id="name" ref="name"/>
              <small id="nameHelp" className="form-text text-muted">
                Official city, province or colloquial neigborhood name.
              </small>
            </div>

            {this.props.questions.map(this.renderQuestion.bind(this))}

            <button type="submit" className="btn btn-primary btn-block">Create region</button>
          </form>
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

export default createContainer(({currentPolygon, insertingPolygon}) => {
  console.log("rerender PolygonForm");
  console.log(insertingPolygon);

  const questionsHandle = Meteor.subscribe('questions.all');
  const isLoading = !questionsHandle.ready();

  console.log("questions loading");
  console.log(isLoading);

  console.log(Questions.find().fetch());

  return {
    currentPolygon,
    insertingPolygon,
    isLoading,
    questions: isLoading ? [] : Questions.find().fetch(),
  };
}, PolygonForm);
