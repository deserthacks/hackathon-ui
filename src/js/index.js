'use strict';

var h = require('react-hyperscript');
var React = require('react');
var Router = require('react-router');

var routes = require('./routes');

Router.run(routes, function (Handler) {
  React.render(h(Handler), document.getElementById('main'));
});
