'use strict';

var h = require('react-hyperscript');
var React = require('react');
var Router = require('react-router');

var AppStore = require('../stores/app.store.js');
var SessionStore = require('../stores/session.store.js');
var Navigation = require('./Navigation');
var Footer = require('./Footer');

function _getApplicationState() {
  return SessionStore.getApplicationState();
}

var App = React.createClass({

  getInitialState: function() {
    return AppStore.getState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      h('div', {className: 'app'}, [
        // h(Navigation),
        h('div', {className: 'container'}, [
          h(Router.RouteHandler)
        ]),
        h(Footer)
      ])
    );
  },

  _onChange: function() {
    this.setState({
      application: _getApplicationState()
    });
  }

});

module.exports = App;
