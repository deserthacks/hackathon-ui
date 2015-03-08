var React = require('react');
var Nav = require('react-bootstrap/lib/Nav');
var Navbar = require('react-bootstrap/lib/Navbar');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var Link = require('react-router').Link;
var RouterNav = require('react-router').Navigation;
var ReactRouterBootstrap = require('react-router-bootstrap'),
    NavItemLink = ReactRouterBootstrap.NavItemLink;

var ActionCreator = require('../actions/DataActionCreators');
var SessionStore = require('../stores/session.store');
var SessionActions = require('../actions/session.actions');

var Brand = <Link to='landing' className='navbar-brand'>Hackathon-UI</Link>;

var Navigation = React.createClass({

  mixins: [RouterNav],

  getDefaultProps: function() {
    if(SessionStore.current().token) {
      var user = JSON.parse(SessionStore.getUser());
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        id: user._id
      };
    }
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  handleLogout: function() {
    SessionActions.logout();
  },

  render: function() {
    if(!SessionStore.isActive()) {
      return (
          <Navbar brand={Brand}>
            <Nav>
              <NavItemLink
                to="apply">
                Apply
              </NavItemLink>
            </Nav>
            <Nav right>
              <NavItemLink
                to="login">
                Login
              </NavItemLink>
              <NavItemLink
                to="register">
                Register
              </NavItemLink>
            </Nav>
          </Navbar>
        );
    } else {
      return (
          <Navbar brand={Brand}>
            <Nav>
              <NavItemLink
                to="apply">
                Apply
              </NavItemLink>
            </Nav>
            <Nav right>
              <DropdownButton title={this.props.firstName}>
                <li><a href="">Profile</a></li>
                <li><a href="">Settings</a></li>
                <li onClick={this.handleLogout}><a href="">Sign Out</a></li>
              </DropdownButton>
            </Nav>
          </Navbar>
        );
    }
  },

  _onChange: function() {
    if(SessionStore.isActive()) {
      this.props = { firstName: SessionStore.current().firstName };
      this.transitionTo('app');
    }
    return SessionStore.current();
  }
});



module.exports = Navigation;