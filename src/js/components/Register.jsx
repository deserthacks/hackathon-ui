var React = require('react');
var Input = require('react-bootstrap/lib/Input');

var SessionStore = require('../stores/session.store');
var SessionActions = require('../actions/session.actions');

var Register = React.createClass({
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
    SessionActions.registerAttempt(credentials);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <Input type="text" ref="Name" label="Name" />
            <Input type="email" ref="email" label='Email Address' />
            <Input type="text" ref="Location" label='Location' />
            <Input type="textarea" ref="bio" label='About yourself' />
            <Input type="password" ref="password" label='Password' />
            <Input type="password" ref="password" label='Confirm Password' />
            <Input type="submit" value="Register" />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Register;
