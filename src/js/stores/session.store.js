var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

// Local private variables
var _user = null;
var _token = null;

var SessionStore = assign(EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  current: function() {
    if (!_token || !_user) {
      _checkStore();
    }
    return {
      token: _token,
      user: _user
    };
  },

  getUser: function() {
    if(!_user) {
      _checkStore();
    }
    return _user;
  },

  getToken: function() {
    if(!_token) {
      _checkStore();
    }
    return _token;
  },

  isActive: function() {
    if (!_user || !_token) {
      _retrieveStore();
    }
    console.log(!!_token, !!_user);
    return !!_token && !!_user;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.SUCCESSFUL_AUTH:
        _create(action);
        SessionStore.emitChange(true);
        break;

      case Constants.ActionTypes.FAILED_AUTH:
        SessionStore.emitChange(false, action.error);
        break;

      case Constants.ActionTypes.DESTROY_SESSION:
        _destroy();
        SessionStore.emitChange();
        break;

      default:
        console.log('Invalid action type');
    }
  })

});

function _create(data) {
  var user = JSON.stringify(data.user);
  _update({
    user: user,
    token: data.token
  });
}

function _destroy() {
  _update({
    user: null,
    token: null
  });
  window.localStorage['token'] = '';
  window.localStorage['user'] = '';
}

function _update(session) {
  _setUser(session.user);
  _setToken(session.token);
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
 * @param {String} token
 */
function _setToken(token) {
  if (token || token === null) {
    _token = token;
  }
  _storeToken(_token);
}

/**
 * Store user in localStorage
 * @param {Object} user
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
  return {
    token: window.localStorage['token'],
    user: window.localStorage['user']
  }
}

module.exports = SessionStore;
