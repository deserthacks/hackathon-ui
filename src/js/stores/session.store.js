'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var AppProxy = require('../utils/AppProxy'),
    UserProxy = require('../utils/UserProxy');

// Local private variables
var _user = null;
// noep var _attendee = null;
var _token = null;

var isAttendee = null;

var SessionStore = assign(EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  emitChange: function(data) {
    this.emit(Constants.CHANGE_EVENT, data);
  },

  /**
   * Return current session objects
   * @return {Object} Contains token and user
   */
  current: function() {
    _checkStore();
    return {
      token: _token,
      user: _user,
      attendee: _attendee,
      isAttendee: isAttendee
    };
  },

  /**
   * Retrieves the user object from the store
   * if it exists
   * @return {Object} user object
   */
  getUser: function() {
    _checkStore();
    return _user;
  },

  /**
   * Retrieves the token string from the store
   * if it exists
   * @return {String}
   */
  getToken: function() {
    _checkStore();
    return _token;
  },

  /**
   * Returns whether the user session is active
   * or not
   * @return {Boolean}
   */
  // TODO: Remove/find a better name for this
  // any session would be "active" just by a user
  // being on the site. Isn't clear what this is for.
  isActive: function() {
    _checkStore();
    return !!_token && !!_user;
  },

  /**
   * Returns whether the current user is an
   * attendee of the current hackathon
   * @return {Boolean}
   */
  // TODO: Generalize this to not just and attendee
  // but for what ever user type someone might be
  isAttendee: function() {
    if(!isAttendee) _checkUser();
    return isAttendee;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload;

    switch(action.type) {
      case Constants.ActionTypes.AUTH_REQUEST:
        SessionProxy.login();
      case Constants.ActionTypes.SUCCESSFUL_AUTH:
        _create(action);
        SessionStore.emitChange('success');
        break;

      case Constants.ActionTypes.FAILED_AUTH:
        SessionStore.emitChange('error', action.error);
        break;

      case Constants.ActionTypes.DESTROY_SESSION:
      console.log('DESTROY_SESSION', action);
        _destroy();
        SessionStore.emitChange();
        break;
    }
  })

});

function _create(data) {
  _update({
    user: data.user,
    token: data.token
  });
  _checkUser(data.user);
}

function _destroy() {
  _update({
    user: null,
    token: null
  });
  window.localStorage['token'] = '';
  window.localStorage['user'] = '';
}

function _checkUser(user) {
  if(!user) {
    user = SessionStore.getUser();
  }
  UserProxy.checkUser(user, _token, function(err, res) {
    if(err) return console.error('An error occured:', err);

    // Parse the response body
    if(typeof res.body === Object) {
      isAttendee = true;
      _attendee = res.body;
    } else {
      isAttendee = false;
    }
  });
}

function _update(data) {
  _setUser(JSON.stringify(data.user));
  _setToken(JSON.stringify(data.token));
}

/**
 * Set the user for session
 * @param {Object} user
 */
function _setUser(user) {
  if (user || user === null) {
    _user = user;
  }
  _storeUser(_user);
}

/**
 * Set the token for session
 * @param {string} token
 */
function _setToken(token) {
  if (token || token === null) {
    _token = token;
  }
  _storeToken(_token);
}

/**
 * Store user in localStorage
 * @param {object} user
 */
function _storeUser(user) {
  window.localStorage['user'] = user;
}

/**
 * Store token in localStorage
 * @param {String} token
 */
function _storeToken(token) {
  window.localStorage['token'] = token;
}

function _checkStore() {
  var sessionInfo = _retrieveStore();
  _user = sessionInfo.user;
  _token = sessionInfo.token;
}

function _retrieveStore() {
  if(window.localStorage['token'] && window.localStorage['user']) {
    return {
      token: JSON.parse(window.localStorage['token']),
      user: JSON.parse(window.localStorage['user'])
    };
  }
  return {
    token: null,
    user: null
  };
}

module.exports = SessionStore;
