var React = require('react');

var NotFound = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div className="text-center">
        <h3>Oops, route not found</h3>
      </div>
    );
  }
});

module.exports = NotFound;
