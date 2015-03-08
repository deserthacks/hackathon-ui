var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var _application = {};

var ApplicationStore = assign(EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  updateApplication: function() {
    return {
      tasks: _data
    };
  },

  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
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

function _update(application) {

}

function _setApplication(application) {
  if(application || application === null) {
    _application = application;
  }
  _storeApplication(application);
}

/**
 * Use localStorage to save the application
 * in the browser for the user
 * @param {[type]} application [description]
 * @return {[type]} [description]
 */
function _storeApplication(application) {

}

module.exports = ApplicationStore;
