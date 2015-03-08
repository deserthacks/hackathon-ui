var request = require('superagent');

var config = require('../config');
var SessionStore = require('../stores/session.store');

function login(credentials, success, fail) {
  return _request('/auth/local', credentials, success, fail);
}

function register(credentials, success, fail) {
  return _request('/users', credentials, success, fail);
}

function destroy(success, fail) {
  var token = SessionStore.getToken();
  return request
          .del(config.api.url + '/auth')
          .set('Authorization', 'Bearer ' + token)
          .end(function(err, res) {
            //if(err) console.error(err, res);
            if(!err && !res.error) {
              success(res); //hack
            } else {
              success(res);
            }
          });
}

function _request(endpoint, credentials, success, fail) {
  return request
          .post(config.api.url + endpoint)
          .send(credentials)
          .end(function(err, res) {
            if(err) console.error('Something went wrong', err);
            if(!res.error) {
              success(res);
            } else {
              fail(res);
            }
          });
}

module.exports = {
  login: login,
  register: register,
  destroy: destroy
};