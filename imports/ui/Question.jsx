import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Questions } from '../api/questions.js';

import InlineTextEditor from './InlineTextEditor.jsx';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.deleteThisQuestion = this.deleteThisQuestion.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.updateText = this.updateText.bind(this);
    this.resetQuestion = this.resetQuestion.bind(this);
  }
  updatePriority(e) {
    Meteor.call('questions.priority.update',
      this.props.question._id,
      Number(e.currentTarget.value));
  }
  deleteThisQuestion() {
    if (confirm("delete this question???")) {
      Meteor.call('questions.remove', this.props.question._id);
    }
  }
  updateText(type, content) {
    Meteor.call('questions.content.update',
      this.props.question._id,
      {[type]: content});
  }
  resetQuestion() {
    if (confirm("Reset this question???")) {
      Meteor.call('questions.reset', this.props.question._id);
    }
  }
  render() {
    let priority = this.props.question.priority || '';
    return (
      <li className='question'>
        <div className="row">
          <div className="col-md-2">
            <select value={priority.toString()}
                    onChange={this.updatePriority} >
              <option value='0'>Urgent 5x</option>
              <option value='1'>High 3x</option>
              <option value='2'>Medium 2x</option>
              <option value='3'>Low 1x</option>
              <option value='4'>Turned Off</option>
            </select>
          </div>
          <div className="col-md-4">
            <InlineTextEditor text={this.props.question.text}
                              type={'text'}
                              updateMethod={this.updateText} />
          </div>
          <div className="col-md-2">
            <InlineTextEditor text={this.props.question.optionA}
                              type={'optionA'}
                              prefix={'A. '}
                              updateMethod={this.updateText} />
          </div>
          <div className="col-md-2">
            <InlineTextEditor text={this.props.question.optionB}
                              type={'optionB'}
                              prefix={'B. '}
                              updateMethod={this.updateText} />
          </div>
          <div className="col-md-1">
            <button className="btn" onClick={this.resetQuestion}>
              {this.props.question.count.A} {'/'} {this.props.question.count.B}
            </button>
          </div>
          <div className="col-md-1">
            <button className="delete" onClick={this.deleteThisQuestion}>
              &times;
            </button>
          </div>
        </div>
      </li>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
};
