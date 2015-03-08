var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var DataStore = require('../stores/DataStore');
var ActionCreator = require('../actions/DataActionCreators');
var Navigation = require('./Navigation.jsx');
var Footer = require('./Footer.jsx');

var App = React.createClass({

  getInitialState: function() {
    return DataStore.getAll();
  },

  componentDidMount: function() {
    DataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="app">
        <Navigation />

        <div className="container">
          <RouteHandler/>

          <Footer />
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(DataStore.getAll());
  },

});

module.exports = App;
