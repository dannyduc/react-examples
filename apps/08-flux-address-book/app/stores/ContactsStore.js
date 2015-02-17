var AppDispatcher = require('../AppDispatcher');
var { EventEmitter } = require('events');
var { ActionTypes } = require('../Constants');
var assign = require('react/lib/Object.assign');

var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
    contacts: [],
    loaded: false
};

var setState = (newState) => {
    assign(state, newState);
    events.emit(CHANGE_EVENT);
};


var ContactsStore = {
    addChangeListener(fn) {
        events.addListener(CHANGE_EVENT, fn);
    },
    removeChangeListener(fn) {
        events.removeListener(CHANGE_EVENT, fn);
    },
    getState() {
        return state;
    }
};

ContactsStore.dispatchToken = AppDispatcher.register((payload) => {
    var { source, action } = payload;
    if (action.type === ActionTypes.CONTACTS_LOADED) {
        setState({
            loaded: true,
            contacts: action.contacts
        })
    } else if (action.type === ActionTypes.CONTACT_DELETED) {
        var deletedId = action.contact.id;
        var newContacts = state.contacts.filter(c => c.id !== deletedId)
        setState({ contacts: newContacts });
    } else if (action.type === ActionTypes.CONTACT_ADDED) {
        state.contacts.push(action.contact);
        setState({ contacts: state.contacts });
    }
});

module.exports = ContactsStore;