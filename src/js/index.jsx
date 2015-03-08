var React = require('react'),
    App = require('./components/App.jsx'),
    DataActionCreators = require('./actions/DataActionCreators');

var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var LoginPage = require('./components/Login.jsx');
var RegisterPage = require('./components/Register.jsx');
var ApplicationPage = require('./components/Application.jsx');
var LandingPage = require('./components/Landing.jsx');
var Profile = require('./components/Profile.jsx');
var NotFound = require('./components/NotFound.jsx');

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='login' path='/login' handler={LoginPage} />
    <Route name='register' path='/register' handler={RegisterPage} />
    <Route name='apply' path='/apply' handler={ApplicationPage} />
    <Route name='profile' path='/users/:id' handler={Profile} />
    <DefaultRoute name='landing' handler={LandingPage} />

    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('main'));
});