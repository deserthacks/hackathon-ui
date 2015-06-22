'use strict';

var React = require('react');
var Router = require('react-router');

var Auth = require('./utils/auth.helpers');

var App = require('./components/App');
var LoginPage = require('./components/Login');
var RegisterPage = require('./components/Register');
var ApplicationPage = require('./components/Application');
var Dashboard = require('./components/Dashboard');
var Profile = require('./components/users/Profile');
var UsersIndex = require('./components/users/index');
var NotFound = require('./components/NotFound');

/**
 * Application Routing Layout
 *
 * Name Path Details
 * App /
 *   - Login /login
 *   - Register /register
 *   - Apply /apply
 *   - Judge /judge (Protected: Authenticated, Role: Mentor+)
 *   - Users /users (Protected: Authenticated)
 *     - Profile /users/:id
 *     - Index (Default)
 *   - Teams /teams (Protected: Authenticated)
 *     - Profile /teams/:id
 *     - Create /teams/create
 *     - Index (Default)
 *   - Projects /projects (Protected: Authenticated)
 *     - Profile /projects/:id
 *     - Create /projects/create
 *     - Index (Default)
 *   - Mentors /mentors (Protected: Authenticated)
 *     - Profile /mentors/:id
 *     - Index (Default)
 *   - Dashboard (Default) /
 *   - NotFound (RouteNotFound) /404
 */

var app = Router.createRoute({
  name: 'app',
  path: '/',
  handler: App
}, function() {
  // Add child routes here
  var users = Router.createRoute({
    name: 'users',
    path: 'users/',
    handler: UsersIndex,
    onEnter: Auth.authenticated
  });
});

var login = Router.createRoute({
  name: 'login',
  path:'login',
  handler: LoginPage,
  onEnter: Auth.notAuthenticated,
  parentRoute: app
});

var register = Router.createRoute({
  name: 'register',
  path:'register',
  handler: RegisterPage,
  onEnter: Auth.notAuthenticated,
  parentRoute: app
});

var apply = Router.createRoute({
  name: 'apply',
  path:'apply',
  handler: ApplicationPage,
  onEnter: Auth.authenticated,
  parentRoute: app
});

var profile = Router.createRoute({
  name: 'profile',
  path:'/:id',
  handler: Profile,
  onEnter: Auth.authenticated,
  parentRoute: app
});

var dashboard = Router.createRoute({
  name: 'dashboard',
  handler: Dashboard,
  parentRoute: app,
  isDefault: true
});

var notFound = Router.createRoute({
  handler: NotFound,
  parentRoute: app,
  isNotFound: true
});

var routes = {
  app: app
};

var output = [];
for (var route in routes) {
  output.push(routes[route]);
}

module.exports = output;
