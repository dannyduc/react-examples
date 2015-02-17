var ApiUtils = require('../utils/ApiUtils');

ViewActionCreators = {
    loadContacts() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOAD_CONTACTS
        });
        ApiUtils.loadContacts();
    },
    deleteContact(contact) {
        ApiUtils.deleteContact(contact);
    },
    createContacts() {
        var newContacts = require('../contacts');
        ApiUtils.createContacts(newContacts);
    }
};

module.exports = ViewActionCreators;