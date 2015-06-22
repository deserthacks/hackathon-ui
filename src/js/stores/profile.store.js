'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var AppProxy = require('../utils/AppProxy'),
    SessionStore = require('./session.store'),
    config = require('../config');

var currentProfile = null;

var ProfileStore = assign(EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  getState: function() {
    return {
      profile: currentProfile
    };
  },

  dispatcherIndex: AppDispatcher.register(function(action) {
    switch(action.type) {
      case Constants.ActionTypes.OPEN_PROFILE:
        _setCurrentProfile(action);
        break;
    }
  })

});

function _setCurrentProfile(action) {
  AppProxy.authGetRequest('users/' + action.user._id, function(res) {
    currentProfile = res;
  }, function(err) {
    console.error('There was an error:', err);
  });
}

module.exports = ProfileStore;
