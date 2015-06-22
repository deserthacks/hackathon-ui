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

var SideNav = require('../dashboard/sidenav'),
    UpdateStream = require('../dashboard/updateStream');

var ParticipantDashboard = React.createClass({

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

  render: function() {
    return (
      h('div', {className: 'container'}, [
        h('div', {className: 'row'}, [
          h('div', {className: 'col-md-3'}, [
            h(SideNav)
          ]),
          h('div', {className: 'col-md-6'}, [
            h(UpdateStream)
          ]),
          h('div', {className: 'col-md-3'}, [
            h('h1', 'participant dash')
          ])
        ])
      ])
    );
  }

});

module.exports = ParticipantDashboard;
