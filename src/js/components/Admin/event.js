'use strict';

var h = require('react-hyperscript');
var React = require('react');
var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var ReactRouterBootstrap = require('react-router-bootstrap');
var ButtonLink = ReactRouterBootstrap.ButtonLink;

var AppStore = require('../../stores/app.store'),
    SessionStore = require('../.../stores/session.store'),
    DashboardStore = require('../../stores/dashboard.store'),
    ParticipantActions = require('../../actions/participant.actions');

var UpdateStream = require('../dashboard/updateStream');

var AdminDashboard = React.createClass({

  getInitialState: function() {
    return {
      app: AppStore.getState(),
      session: SessionStore.current()
    };
  },

  componentDidMount: function() {
    DashboardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashboardStore.removeChangeListener(this._onChange);
  },

  handleSubmit: function() {
    e.preventDefault();
    var event = {
      title: this.refs.title.getInputDOMNode().value,
      description: this.refs.description.getInputDOMNode().value,
      date: this.refs.date.getInputDOMNode().value,
      duration: this.refs.duration.getInputDOMNode().value,
      type: this.refs.type.getInputDOMNode().value
    };
    AdminActions.createEvent(event);
  },

  render: function() {
    return (
      h('div', {className: 'container'}, [
        h('div', {className: 'row'}, [
          h('div', {className: 'col-md-12'}, [
            h('form', [
              h('div', {className: 'form-group'}, [
                h('label', {for: 'title'}, 'Title'),
                h('input', {type: 'text', className: 'form-control', ref: 'title'})
              ]),
              h('div', {className: 'form-group'}, [
                h('label', {for: 'description'}, 'Description'),
                h('textarea', {className: 'form-control', ref: 'description'})
              ]),
              h('div', {className: 'form-group'}, [
                h('label', {for: 'datetime'}, 'Datetime'),
                h('input', {type: 'datetime', className: 'form-control', ref: 'datetime'})
              ]),
              h('div', {className: 'form-group'}, [
                h('label', {for: 'duration'}, 'Duration'),
                h('input', {type: 'number', className: 'form-control', ref: 'duration'})
              ]),
              h('div', {className: 'form-group'}, [
                h('label', {for: 'type'}, 'Type'),
                h('input', {type: 'select', className: 'form-control', ref: 'type'}, [
                  h('option', {value: 'food'}, 'Food'),
                  h('option', {value: 'activity'}, 'Activity')
                  h('option', {value: 'talk'}, 'Talk')
                ])
              ]),
              h('div', {className: 'form-group'}, [
                h('input', {type: 'submit', className: 'btn btn-primary'}, 'Create')
              ])
            ])
          ])
        ])
      ])
    );
  }

});

module.exports = AdminDashboard;
