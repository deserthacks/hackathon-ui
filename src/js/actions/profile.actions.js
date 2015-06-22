'use strict';

var request = require('superagent');

var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var AppProxy = require('../utils/AppProxy');
var config = require('../config');

var ProfileActions = {
  init: init,
  openProfile: openProfile
};

function init() {
  AppDispatcher.dispatch({
    type: Constants.ActionTypes.USERS_INIT
  });
}

function openProfile(user) {
  AppDispatcher.dispatch({
    type: Constants.ActionTypes.OPEN_PROFILE,
    profile: user
  });
}

module.exports = ProfileActions;