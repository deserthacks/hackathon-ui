'use strict';

var request = require('superagent');

var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var SessionProxy = require('../utils/SessionProxy');
var config = require('../config'),
    router = require('react-router');

var SessionActions = {
  sessionTimeout: sessionTimeout,
  loginAttempt: loginAttempt,
  registerAttempt: registerAttempt,
  logout: logout,
  authSuccess: authSuccess,
  authFail: authFail
};

function sessionTimeout() {
  AppDispatcher.dispatch({
    type: Constants.ActionTypes.DESTROY_SESSION
  });
}

function loginAttempt(credentials, payload) {
  _auth(credentials, Constants.ActionTypes.LOGIN_ATTEMPT, 'login', function(err, res) {
    payload.router.transitionTo('/');
  });
}

function registerAttempt(credentials, payload) {
  _auth(credentials, Constants.ActionTypes.JOIN_ATTEMPT, 'register', function(err, res) {
    if(err) return console.error('Error during user registration', err);
    payload.router.transitionTo('/');
  });
}

function logout(router) {
  SessionProxy.destroy(function(res) {
    AppDispatcher.dispatch({
      type: Constants.ActionTypes.DESTROY_SESSION,
      res: res
    });
  }, function(err) {
    console.error('Something went wrong', err);
  });
}

function authSuccess(res) {
  var token = res.headers['x-bearer-token'];
  AppDispatcher.dispatch({
    type: Constants.ActionTypes.SUCCESSFUL_AUTH,
    token: token,
    user: res.body
  });
}

function authFail(res) {
  AppDispatcher.dispatch({
    type: Constants.ActionTypes.FAILED_AUTH,
    error: res.body.error
  });
}

function _logoutSuccess(res) {
  AppDispatcher.dispatch({
    type: Constants.ActionTypes.DESTROY_SESSION,
    res: res
  });

}

function _auth(credentials, actionType, call, done) {
  AppDispatcher.dispatch({
    type: actionType
  });

  SessionProxy[call](credentials, authSuccess, authFail, done);

}

module.exports = SessionActions;