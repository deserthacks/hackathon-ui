var React = require('react');
var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var ReactRouterBootstrap = require('react-router-bootstrap');
var ButtonLink = ReactRouterBootstrap.ButtonLink;

var Landing = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div className="container">
        <Jumbotron className="text-center">
          <h1>Hackathon-UI</h1>
          <p>
            A Front-End web app that connects to <a href="https://github.com/deserthacks/hackathon-hq">hackathon-hq</a>, a RESTful API that helps hackathon organizers provide the best online experience for their attendees, volunteers and sponsors.
          </p>
          <div className="center-block">
            <ButtonLink
              to="apply"
              className="btn btn-success">
              Apply
            </ButtonLink>
          </div>
        </Jumbotron>
      </div>
    );
  }
});

module.exports = Landing;
