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
    console.log('componentDidMount');
    const modal = ReactDOM.findDOMNode(this.refs.myModal);
    $(modal).modal('show');
    $(modal).on('hidden.bs.modal', () => { console.log("close modal")
    });
  }

  submitForm() {
    console.log('submit form');
    const form = ReactDOM.findDOMNode(this.refs.polygonForm);
    console.log(form);
    $(form).submit(this.handleSubmit.bind(this));
    $(form).trigger('submit');
  }

  handleSubmit(event) {
    const thiz = this;
    console.log('handleSubmit');
    console.log(thiz.props.questions);
    event.preventDefault();
    // Find the name field via the React ref
    const name = ReactDOM.findDOMNode(thiz.refs.name).value.trim();

    let polygon = Session.get(SESSION.POLYGON)
    polygon = _.extend(polygon, {name})

    Meteor.call("polygons.insert", polygon, (error, polygonId) => {
      console.log('polygons.insert');
      console.log(polygon);
      if(error) {
        console.log("error", error);
      }
      if(polygonId) {
        console.log("success");
        _.each(thiz.props.questions, (question) => {
          thiz.answerQuestion(question._id, polygonId)
        })

        Session.set(SESSION.POLYGON, undefined);
        // Clear form
        ReactDOM.findDOMNode(thiz.refs.name).value = '';
      }
    });
  }

  answerQuestion(questionId, polygonId) {
    console.log('answerQuestion');
    console.log(questionId);

    const val = $('input[name=inlineRadioOptions' + questionId + ']:checked', '#polygonForm').val()

    console.log(val);

    Meteor.call("polygon.answerQuestion", polygonId, questionId, val,
      (error, result) => {
        console.log("question.answer");

        if(error) {
          console.log("error", error);
        }
        if(result) {

        }
      });
  }

  renderScore(score, question) {
    return (
      <label className="form-check-inline" key={score}>
        <input className="form-check-input" type="radio" name={"inlineRadioOptions" + question._id} id={"inlineRadio" + score} value={score} /> {score}
      </label>
    )
  }

  renderQuestion(question) {
    return (
      <fieldset className="form-group" key={question._id}>
        <label>{question.text}</label><br/>
        {
          SCORES.map((score) => { return this.renderScore(score, question) })
        }
      </fieldset>
    )
  }

  renderQuestions() {
    if(this.props.isLoading) {
      return <h4>Loading</h4>
    } else {
      return this.props.questions.map(this.renderQuestion.bind(this))
    }
  }

  renderModalBody() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} ref='polygonForm' id='polygonForm'>
        <div className="form-group">
          <label htmlFor="name" >What would you like to name this region?</label>
          <input className="form-control" type="text" id="name" ref="name" />
          <small id="nameHelp" className="form-text text-muted">
            Official city, province or colloquial neigborhood name.
          </small>
        </div>

        {this.renderQuestions()}

      </form>
    )
  }

  renderInsertingPolygon() {
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
              {this.renderSubmit()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSubmit() {
    if(this.props.isLoading) {
      return (
        <button className="btn btn-primary btn-block" disabled>Loading...</button>
      )
    } else {
      return (
        <button className="btn btn-primary btn-block" onClick={this.submitForm.bind(this)}>Create region</button>
      )
    }
  }

  render() {
    return this.renderInsertingPolygon()

    // console.log(this.props.insertingPolygon);
    // if(this.props.insertingPolygon) {
    //   console.log('PolygonForm#insertingPolygon');
    //   return this.renderInsertingPolygon()
    // } else {
    //   if(currentPolygon) {
    //     console.log('PolygonForm#currentPolygon');
    //     // add questions for existing polygon (creted by you or someone else)
    //     return <div></div>
    //   }
    //   console.log('PolygonForm#default');
    //   return <div></div>
    // }
  }
}

PolygonForm.propTypes = {
  currentPolygon: React.PropTypes.object,
  insertingPolygon: React.PropTypes.bool,
  questions: React.PropTypes.array,
  isLoading: React.PropTypes.bool
};
