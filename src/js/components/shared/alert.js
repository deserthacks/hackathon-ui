'use strict';

var h = require('react-hyperscript');
var React = require('react');

var Alert = React.createClass({

  propTypes: {
    error: React.PropTypes.func
  },

  render: function() {
    return (
      h('div', {className: 'alert alert-error'}, [
        h(this.prop.error)
      ])
    );
  }

});

module.exports = Alert;
