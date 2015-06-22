'use strict';

var h = require('react-hyperscript');
var React = require('react');

var NotFound = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      h('div', {className: 'text-center'}, [
        h('h3', 'Hmm, a page you will not find here.')
      ])
    );
  }

});

module.exports = NotFound;
