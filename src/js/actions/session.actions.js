var request = require('superagent');

var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var SessionProxy = require('../utils/SessionProxy');
var config = require('../config');

var SessionActions = {
  sessionTimeout: sessionTimeout,
  loginAttempt: loginAttempt,
  registerAttempt: registerAttempt,
  logout: logout,
  authSuccess: authSuccess,
  authFail: authFail
};

function sessionTimeout() {
  AppDispatcher.handleServerAction({
    type: Constants.ActionTypes.DESTROY_SESSION
  });
}

function loginAttempt(credentials) {
  _auth(credentials, Constants.ActionTypes.LOGIN_ATTEMPT, "login");
}

function registerAttempt(credentials) {
  _auth(credentials, Constants.ActionTypes.JOIN_ATTEMPT, "join");
}

function logout() {
  SessionProxy.destroy(_logoutSuccess, function(response) {
    console.error("Something went wrong", response);
  });
}

function authSuccess(response) {
  var token = response.headers['x-bearer-token'];
  AppDispatcher.handleServerAction({
    type: Constants.ActionTypes.SUCCESSFUL_AUTH,
    token: token,
    user: response.body
  });
}

function authFail(response) {
  AppDispatcher.handleServerAction({
    type: Constants.ActionTypes.FAILED_AUTH,
    error: response.body.error
  });
}

function _logoutSuccess(response) {
  AppDispatcher.handleServerAction({
    type: Constants.ActionTypes.DESTROY_SESSION,
    response: response
  });
}

function _auth(credentials, actionType, call) {
  AppDispatcher.handleViewAction({
    type: actionType
  });

  SessionProxy[call](credentials, authSuccess, authFail);

}

module.exports = SessionActions;