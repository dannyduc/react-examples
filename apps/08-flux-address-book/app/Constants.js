var keyMirror = require('react/lib/keyMirror');

module.exports = {
    API: 'http://addressbook-api.herokuapp.com',

    ActionTypes: keyMirror({
        LOAD_CONTACTS: null,
        CONTACTS_LOADED: null,
        CONTACT_DELETED: null,
        CONTACT_ADDED: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    })
};