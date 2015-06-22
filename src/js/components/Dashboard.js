'use strict';

var h = require('react-hyperscript');
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var AppStore = require('../stores/app.store');
var Navigation = require('./Navigation');
var Footer = require('./Footer');
var Landing = require('./Landing');
var DefaultDash = require('./Landing');
var ParticipantDash = require('./Landing');
var MentorDash = require('./Landing');
var AdminDash = require('./Landing');

var Dashboard = React.createClass({

  getInitialState: function() {
    return {
      dashboard: AppStore.getDashboard(),
      hackathon: AppStore.getHackathon()
    }
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var Dashboard = this._getDashboard();

    return (
      h('div', {className: 'container'}, [
        h(Dashboard)
      ])
    );
  },

  _onChange: function() {
    this.setState(AppStore.getState());
  },

  _getDashboard: function() {
    switch(this.state.dashboard) {
      case 'landing':
        return Landing;
      case 'default':
        return DefaultDash;
      case 'participant':
        return ParticipantDash;
      case 'admin':
        return AdminDash;
    }
  }

});

module.exports = Dashboard;
