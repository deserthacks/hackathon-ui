var React = require('react');
var Input = require('react-bootstrap/lib/Input');

var ApplicationActions = require('../actions/application.actions');
var ApplicationStore = require('../stores/application.store');

var Application = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    ApplicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ApplicationStore.removeChangeListener(this._onChange);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var credentials = {
      email: this.refs.email.getInputDOMNode().value,
      password: this.refs.password.getInputDOMNode().value
    }
    ApplicationActions.submitApplication(credentials);
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <Input type="text" ref="github" label='GitHub Handle' />
              <div className="form-group">
                <div className="col-md-6">
                  <p>Is this your first hackathon?</p>
                  <Input type="radio" name="hackathon-first-time" label="Yes" />
                  <Input type="radio" name="hackathon-first-time" label="No" />
                </div>
              </div>
              <Input type="textarea" ref="experience" label='Describe your favorite project' />
              <Input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    return null;
  }
});

module.exports = Application;
