'use strict';

var h = require('react-hyperscript');
var React = require('react');

var ProfileStore = require('../../stores/profile.store');

function _getProfile(id) {
  return ProfileStore.getProfile(id);
}

var Profile = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    console.log(this.context);
    var router = this.context.router;
    console.log(router);
    var id = router.getCurrentParams().id;

    return {
      profile: _getProfile(id)
    }
  },

  componentDidMount: function() {
    ProfileStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ProfileStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var profile = this.state.profile;
    var application = {title: 'Fall 2015', status: {message: 'We\'re still reviewing applications, hang tight', state: 'Pending'}};

    return (
      h('div', {className: 'container'}, [
        h('div', {className: 'row'}, [
          h('div', {className: 'col-md-12'}, [
            h('section', {className: 'profile-header'}, [
              h('h3', profile.fullName)
            ])
          ])
        ]),
        // TODO: Move application status to it's
        // own page in application route
        h('div', {className: 'row'}, [
          h('div', {className: 'col-md-8'}),
          h('div', {className: 'col-md-4'}, [
            h('section', {className: 'profile--application-status'}, [
              h('h3', application.title),
              h('p', [
                h('span', {className: 'dh-text-emphasis'}, 'Status:'),
                h('span', application.status.state)
              ]),
              h('p', application.status.message)
            ])
          ])
        ])
      ])
    );
  },

  onChange: function() {
    var router = this.context.router;
    var id = router.getCurrentParams().id;

    this.setState({
      profile: _getProfile(id)
    });
  }
});

module.exports = Profile;
