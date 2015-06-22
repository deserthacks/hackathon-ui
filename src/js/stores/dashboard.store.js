'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var AppProxy = require('../utils/AppProxy'),
    SessionStore = require('./session.store'),
    config = require('../config');

var appConfig = null,
    hackathon = null,
    dashboard = 'landing';

var DashboardStore = assign(EventEmitter.prototype, {

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
    return {};
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload;

    switch(action.type) {
      case Constants.ActionTypes.SUCCESSFUL_AUTH:
        break;
    }
  })

});

function _init() {
  _setDashboard();
  _setHackathon();
}

module.exports = DashboardStore;
