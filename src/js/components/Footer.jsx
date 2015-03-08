var React = require('react');

var Footer = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div className="container">
        <footer className="col-md-12">
          <ul className="list-inline text-center">
            <li><a href="http://deserthacks.org">Created by DesertHacks</a> @ HackArizona S15</li>
            <li><a href="https://github.com/deserthacks/hackathon-ui">GitHub</a></li>
          </ul>
        </footer>
      </div>
    );
  }
});

module.exports = Footer;
