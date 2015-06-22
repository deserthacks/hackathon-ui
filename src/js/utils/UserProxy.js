'use strict';

var request = require('superagent');

var config = require('../config');

var UserProxy = {
  getParticipants: function(token, callback) {
    request
      .get(config.api.url + '/attendees')
      .set('Authorization', 'Bearer ' + token)
      .end(function(err, res) {
        if(err) return callback(err, null);
        callback(null, res);
      });
  },

  getMentors: function(callback) {
    // TODO
  },

  getOrganizers: function(callback) {
    // TODO
  },

  /**
   * Check if the user is an attendee
   * of the current hackathon
   * @param {Object}   user     User object
   * @param {String}   token    Session token
   * @param {Function} callback Callback function
   * @return {null}
   */
  checkUser: function(user, hackathon, token, callback) {
    request
      .get('/users/' + user._id + '/verifyAttendee/' + hackathon._id)
      .set('Authorization', 'Bearer ' + token)
      .end(function(err, res) {
        if(err) return callback(err, null);
        callback(null, res);
      });
  }
};

module.exports = UserProxy;