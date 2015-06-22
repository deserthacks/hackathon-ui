'use strict';

var h = require('react-hyperscript');
var React = require('react');
var Input = require('react-bootstrap/lib/Input');

var ApplicationActions = require('../actions/application.actions');
var ApplicationStore = require('../stores/application.store');

var Application = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    ApplicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ApplicationStore.removeChangeListener(this._onChange);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var credentials = {
      email: this.refs.email.getInputDOMNode().value,
      password: this.refs.password.getInputDOMNode().value
    };
    ApplicationActions.submitApplication(credentials);
  },

  render: function() {
    return (
      h('div', [
        h('p', 'temporary application page')
      ])
    );
  },

  _onChange: function() {
    return null;
  }

});

module.exports = Application;
