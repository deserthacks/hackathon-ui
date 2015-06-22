'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var AppProxy = require('../utils/AppProxy'),
    SessionStore = require('./session.store'),
    config = require('../config');

var annoncements = null;

var AnnouncementStore = assign(EventEmitter.prototype, {

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

  getAnnouncements: function() {
    if(!announcements) _retrieveAnnouncements();
    return announcements;
  }

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload;

    switch(action.type) {
      case Constants.ActionTypes.ANNOUNCEMENT_RECEIVED:
        _updateAnnouncements(action.announcement);
        this.emitChange();
        break;
    }
  })

});

function _updateAnnouncements(announcement) {
  announcements.unshift(announcement);
}

function _retrieveAnnouncements() {
  // TODO
  return null;
}

module.exports = AnnouncementStore;
