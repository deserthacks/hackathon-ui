'use strict';

var h = require('react-hyperscript');
var React = require('react');

var AppStore = require('../../stores/app.store'),
    SessionStore = require('../.../stores/session.store'),
    DashboardStore = require('../../stores/dashboard.store'),
    ParticipantActions = require('../../actions/participant.actions');

var SideNav = require('../dashboard/sidenav'),
    UpdateStream = require('../dashboard/updateStream');

var UpdateStream = React.createClass({

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
      h('div', '\"update stream\"')
    );
  },

  _onChange: function() {
    this.setState({
      app: AppStore.getState()
    });
  }

});

module.exports = UpdateStream;
