'use strict';

module.exports = {
  api: {
    url: 'http://localhost:3000'
  },
  hackathon: {
    id: 'f15'
  },
  domain: function() {
    var host = window.location.host.split('.');
    return host;
  }
};