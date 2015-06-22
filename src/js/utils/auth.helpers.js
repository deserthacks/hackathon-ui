'use strict';

var SessionStore = require('../stores/session.store');

var Helpers = {

  notAuthenticated: function(transition) {
    if(SessionStore.isActive()) {
      transition.abort();
    }
  },

  authenticated: function(transition) {
    if(!SessionStore.isActive()) {
      console.warn('User not authenticated for route: ' + transition.path);
      transition.redirect('login', {}, { nextPath: transition.path });
    }
  },

  authenticateAs: function(transition, role) {
    if(!SessionStore.isActive()) {
      var currentUserRole = SessionStore.getUser().role;
      if(currentUserRole !== role) {
        transition.abort();
        transition.redirect('login');
      }
    }
  }
};

module.exports = Helpers;