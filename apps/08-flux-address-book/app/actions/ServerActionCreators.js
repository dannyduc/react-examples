var { ActionTypes } = require('../Constants');
var AppDispatcher = require('../AppDispatcher');


var ServerActionCreators = {
    loadedContacts(contacts) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.CONTACTS_LOADED,
            contacts: contacts
        });
    },
    deletedContact(contact) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.CONTACT_DELETED,
            contact: contact
        });
    },
    addedContact(contact) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.CONTACT_ADDED,
            contact: contact
        });
    }
};

module.exports = ServerActionCreators;