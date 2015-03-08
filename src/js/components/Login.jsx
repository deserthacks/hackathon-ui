var React = require('react');
var Input = require('react-bootstrap/lib/Input');

var SessionStore = require('../stores/session.store');
var SessionActions = require('../actions/session.actions');

var Login = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var credentials = {
      email: this.refs.email.getInputDOMNode().value,
      password: this.refs.password.getInputDOMNode().value
    }
    SessionActions.loginAttempt(credentials);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <Input type="email" ref="email" label='Email Address' autofocus />
            <Input type="password" ref="password" label='Password' />
            <Input type="submit" value="Login" />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Login;
