'use strict';

var request = require('superagent');

var config = require('../config');
var SessionStore = require('../stores/session.store');

function login(credentials, success, fail) {
  return request
          .post(config.api.url + '/auth/local')
          .send(credentials)
          .end(function(err, res) {
            if(err) console.error('Error sending API request:', err);
            if(res && !err && !res.error) {
              success(res);
            } else {
              fail(res);
            }
          });
}

function register(credentials, success, fail) {
  return request
          .post(config.api.url + '/users')
          .send(credentials)
          .end(function(err, res) {
            if(err) console.error('Error sending API request:', err);
            if(res && !err && !res.error) {
              success(res);
            } else {
              fail(res);
            }
          });
}

function destroy(success, fail) {
  var token = SessionStore.getToken();
  return request
          .del(config.api.url + '/auth')
          .set('Authorization', 'Bearer ' + token)
          .end(function(err, res) {
            console.log(err, res);
            if(!err && !res.error) {
              success(res);
            } else {
              fail(err, res);
            }
          });
}

function getAttendee() {
  return SessionStore.getAttendee();
}

module.exports = {
  login: login,
  register: register,
  destroy: destroy,
  getAttendee: getAttendee
};