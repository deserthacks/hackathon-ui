'use strict';

var request = require('superagent');

var config = require('../config');

var AppProxy = {
  getHackathon: function() {
    return request
            .get(config.api.url + '/hackathons/' + config.hackathon.id)
            .end(function(err, res) {
              if(err) return console.error(err);
              return res.body;
            });
  }
};

function postRequest(endpoint, token, payload, success, fail) {
  return request
          .set('Authorization', 'Bearer ' + token)
          .post(config.api.url + endpoint)
          .send(payload)
          .end(function(err, res) {
            if(err) console.error('Something went wrong', err);
            if(!res.error) {
              success(res);
            } else {
              fail(res);
            }
          });
}

function getRequest(endpoint, success, fail) {
  return request
          .get(config.api.url + endpoint)
          .end(function(err, res) {
            if(err) console.error('Something went wrong', err);
            if(!res.error) {
              success(res);
            } else {
              fail(res);
            }
          });
}

function authGetRequest(endpoint, token, success, fail) {
  return request
          .get(config.api.url + endpoint)
          .set('Authorization', 'Bearer ' + token)
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
  post: postRequest,
  get: getRequest,
  authGet: authGetRequest
};