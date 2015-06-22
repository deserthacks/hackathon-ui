'use strict';

var h = require('react-hyperscript');
var React = require('react');
var Router = require('react-router');
var Nav = require('react-bootstrap/lib/Nav');
var Navbar = require('react-bootstrap/lib/Navbar');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var Link = require('react-router').Link;

var SessionStore = require('../stores/session.store');
var NotificationStore = require('../stores/notification.store');
var ApplicationStore = require('../stores/application.store');
var SessionActions = require('../actions/session.actions');

var Brand = h(Link, {to: 'dashboard', className: 'navbar-brand'}, 'Hackathon-UI');

function getCurrentUser() {
  return SessionStore.getUser();
}

function getNotifications() {
  return NotificationStore.getNotifications();
}

function getUserApplication() {
  return ApplicationStore.getApplication();
}

var ApplicationLink = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      h('p', 'application link')
    );
  }

});

var Navigation = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      /**
       * Get current user object from
       * session store
       *
       * @type: {object}
       */
      user: getCurrentUser(),

      /**
       * Get current notifications
       * from store for user
       *
       * @type: {array}
       */
      notifications: getNotifications(),

      /**
       * Get current application state
       * for the user
       *
       * @type: {object}
       */
      application: getUserApplication()
    };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  handleLogout: function() {
    SessionActions.logout({ router: this.context.router });
  },

  render: function() {
    if(!SessionStore.isActive()) {
      return (
        h(NavBar, {brand: Brand}, [
          h(Nav, [
            h(Link, {to: 'apply'}, 'Apply')
          ]),
          h(Nav, {right: true}, [
            h(Link, {to: 'login'}, 'Login'),
            h(Link, {to: 'register'}, 'Register')
          ])
        ])
      );
    } else {
      return (
        h(Navbar, {brand: Brand}, [
          h(Nav, [
            h(ApplicationLink, {user: this.state.user}),
            h(Link, {to: 'users'}, 'Attendees')
          ]),
          h(Nav, {right: true}, [
            h(DropdownButton, {title: this.state.user.firstName}, [
              h('li', [
                h(Link, {to: '/' + this.state.user._id}, 'Profile'),
              ]),
              h('li', [
                h(Link, {to: 'apply'}, 'Settings')
              ]),
              h('li', {onClick: function() {
                this.handleLogout();
              }}, 'Sign out')
            ])
          ])
        ])
      );
    }
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = Navigation;
