'use strict';

var h = require('react-hyperscript');
var React = require('react');
var Input = require('react-bootstrap/lib/Input');

var SessionStore = require('../stores/session.store');
var SessionActions = require('../actions/session.actions');

var Alert = require('./shared/alert');

var Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {};
  },

  statics: {
    willTransitionTo: function (transition, params) {
      console.log('transitioning to');
      if (SessionStore.isActive()) {
        transition.redirectTo('Dashboard');
      }
    },

    willTransitionFrom: function (transition, element) {
      if (element.formHasUnsavedData()) {
        if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
          transition.abort();
        }
      }
    }
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var credentials = {
      email: this.refs.email.getInputDOMNode().value,
      password: this.refs.password.getInputDOMNode().value
    };
    SessionActions.loginAttempt(credentials, { router: this.context.router });
  },

  render: function() {
    var alert;
    // TODO: Improve design of form alert
    if (this.state.isError) {
      alert = h(Alert, {error: this.state.isError})
    } else {
      alert = undefined;
    }
    return (
      h('div', {className: 'row'}, [
        h('div', {className: 'col-md-6'}, [
          h(alert),
          h('form', {onSubmit: function onSubmit() {
           this.handleSubmit();
          }}, [
            h(Input, {type: 'email', ref: 'email', label: 'Email Address'}),
            h(Input, {type: 'password', ref: 'password', label: 'Password'}),
            h(Input, {type: 'submit', value: 'Login'})
          ])
        ])
      ])
    );
  },

  _onChange: function(change) {
    console.log(change);
    if(change.error) {
      this.setState({ isError: change.error });
    }
  }

});

module.exports = Login;
