'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var AppProxy = require('../utils/AppProxy'),
    config = require('../config');

var participants = null,
    mentors = null,
    organizers = null,
    volunteers = null;

var UserStore = assign(EventEmitter.prototype, {

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
      participants: participants,
      mentors: mentors
    };
  },

  dispatcherIndex: AppDispatcher.register(function(action) {
    switch(action.type) {
      case Constants.ActionTypes.USERS_INIT:
        console.log('init');
        _retrieveParticipants();
        break;
    }
  })

});

module.exports = UserStore;
