'use strict';

var request = require('superagent');

var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var SessionStore = require('../stores/session.store');
var AppProxy = require('../utils/AppProxy');
var config = require('../config');

var _token = SessionStore.getToken();

var ProfileActions = {
  init: init,
  createEvent: createEvent
};

function init() {
  AppDispatcher.dispatch({
    type: Constants.ActionTypes.USERS_INIT
  });
}

function createEvent(event) {
  AppProxy.post('/events', _token, event,
    function(res) {
      AppDispatcher.dispatch({
        type: Constants.ActionTypes.EVENT_CREATED,
        event: event
      });
    },
    function(err) {
      console.error(err);
    });
}

module.exports = ProfileActions;