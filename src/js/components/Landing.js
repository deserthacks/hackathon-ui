'use strict';

var h = require('react-hyperscript');
var React = require('react');
var Router = require('react-router');
var Jumbotron = require('react-bootstrap/lib/Jumbotron');

var Landing = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      h('div', {className: 'container'}, [
        h(Jumbotron, {className: 'text-center'}, [
          h('h1', 'Hackathon-UI'),
          h('p', 'A Front-End web app that connects to hackathon-hq, a RESTful API that helps hackathon organizers provide the best online experience for their attendees, volunteers and sponsors.')
        ]),
        h('div', {className: 'center-block'}, [
          h(Router.Link, {className: 'btn', to: 'apply'}, 'Apply')
        ])
      ])
    );
  }

});

module.exports = Landing;
