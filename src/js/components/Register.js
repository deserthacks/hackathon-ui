'use strict';

var h = require('react-hyperscript');
var React = require('react');
var Input = require('react-bootstrap/lib/Input');

var SessionStore = require('../stores/session.store');
var SessionActions = require('../actions/session.actions');

var Register = React.createClass({

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

  handleSubmit: function(e) {
    var form = this.refs;
    e.preventDefault();
    if(form.password.getInputDOMNode().value !== form.password_confirm.getInputDOMNode().value) {
      return alert('passwords don\'t match');
    }
    var credentials = {
      email: form.email.getInputDOMNode().value,
      password: form.password.getInputDOMNode().value,
      firstName: form.first_name.getInputDOMNode().value,
      lastName: form.last_name.getInputDOMNode().value,
      bio: form.bio.getInputDOMNode().value,
      location: form.location.getInputDOMNode().value
    };
    SessionActions.registerAttempt(credentials, { router: this.context.router });
    console.log(SessionStore.isActive());
    if(SessionStore.isActive()) {
      this.context.transitionTo('/');
    }
  },

  render: function() {
    return (
      h('div', {className: 'row'}, [
        h('div', {className: 'col-md-6'}, [
          h('form', {onSubmit: function onSubmit() {
            this.handleSubmit();
          }}, [
            h(Input, {type: 'text', ref: 'first_name', label: 'First name'}),
            h(Input, {type: 'tezt', ref: 'last_name', label: 'Last name'}),
            h(Input, {type: 'email', ref: 'email', label: 'Email address'}),
            h(Input, {type: 'text', ref: 'location', label: 'Location'}),
            h(Input, {type: 'textarea', ref: 'bio', label: 'Bio'}),
            h(Input, {type: 'password', ref: 'password', label: 'Password'}),
            h(Input, {type: 'password', ref: 'password_confirm', label: 'Confirm password'}),
            h(Input, {type: 'submit', label: 'Register'})
          ])
        ])
      ])
    );
  }

});

module.exports = Register;
