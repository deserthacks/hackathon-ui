'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var AppProxy = require('../utils/AppProxy'),
    SessionProxy = require('../utils/SessionProxy'),
    config = require('../config');

var appConfig = null,
    hackathon = null,
    dashboard = 'landing';

var AppStore = assign(EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  getDashboard: function() {
    if(!dashboard) _setDashboard();
    return dashboard;
  },

  getHackathon: function() {
    if(!hackathon) _setHackathon();
    return hackathon;
  },

  getState: function() {
    return {
      dashboard: dashboard,
      hackathon: hackathon
    };
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload;

    switch(action.type) {
      case Constants.ActionTypes.SUCCESSFUL_AUTH:
        console.log('setting dashboard');
        _setDashboard();
        break;
    }
  })

});

function _init() {
  _setDashboard();
  _setHackathon();
}

function _setDashboard(action) {
  var attendee = SessionProxy.getUser();
  var appsdfs = {};
  console.log(attendee);
  if(attendee) {
    switch(attendee.role) {
      case 'participant':
        dashboard = 'participant';
        break;
      case 'mentor':
        dashboard = 'mentor';
        break;
      case 'sponsor':
        dashboard = 'sponsor';
        break;
      case 'organizer':
        dashboard = 'organizer';
        break;
      default:
        dashboard = 'landing';
        break;
    }
  } else {
    dashboard = 'landing';
  }
}

function _setHackathon() {
  if(!hackathon) {
    if(!window.localStorage['hackathon']) {
      AppProxy.get('/hackathons/' + config.hackathon.id, function(res) {
        console.log(res.body);
        hackathon = res.body;
        window.localStorage['hackathon'] = JSON.stringify(hackathon);
      }, function(err) {
        console.error(err);
      });
    } else {
      hackathon = JSON.parse(window.localStorage['hackathon']);
    }
  }
}

module.exports = AppStore;
