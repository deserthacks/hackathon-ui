'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var _application = {};

var ApplicationStore = assign(EventEmitter.prototype, {

  // TODO: Create an action for this event
  updateApplication: function() {
    return {
      tasks: _data
    };
  },

  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload;

    switch(action.type) {
      case Constants.ActionTypes.SUBMISSION_REQUEST:
        ApplicationAPI.submitApplication(data, function cb(response) {
          _updateApplication(response);
          ApplicationStore.emitChange();
        });
        break;

      case Constants.ActionTypes.SUBMISSION_SUCCESS:
        updateApplication(action);
        ApplicationStore.emitChange(true);
        break;

      case Constants.ActionTypes.SUBMISSION_FAIL:
        ApplicationStore.emitChange(false, action.error);
        break;
      case Constants.ActionTypes.RETRIEVE_APPLICATION:

        break;
    }
  })

});

module.exports = ApplicationStore;
