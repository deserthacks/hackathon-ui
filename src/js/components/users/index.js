'use strict';

var h = require('react-hyperscript');
var React = require('react');

var ProfileActions = require('../../actions/profile.actions'),
    ProfileStore = require('../../stores/profile.store'),
    UserProxy = require('../../utils/UserProxy');

function _getParticipants() {
  return UserStore.getParticipants();
}

var Index = React.createClass({

  statics: {
    willTransitionTo: function(transition, params) {
      ProfileActions.init();
    }
  },

  getInitialState: function() {
    return {
      participants: UserProxy.getParticipants()
    };
  },

  render: function() {
    var participants = this.state.participants.map(function(participant) {
      return h('li', {className: 'dh-page--list_item'}, [
        h('span', {className: 'user-name'}, participant.fullName)
      ]);
    });

    return (
      h('div', {className: 'container'}, [
        h('section', {className: 'dh-page--header'}),
        h('section', [
          h('ul', {className: 'dh-page--list'}, [
            h(participants)
          ])
        ])
      ])
    );
  }

});

module.exports = Index;
