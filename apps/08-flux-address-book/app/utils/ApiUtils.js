var xhr = require('../lib/xhr');
var { API, ActionTypes } = require('../Constants');
var ServerActionCreators = require('../actions/ServerActionCreators');

var ApiUtils = {
    loadContacts() {
        xhr.getJSON(`${API}/contacts`, (err, res) => {
            ServerActionCreators.loadedContacts(res.contacts);
        });
    },
    deleteContact(contact) {
        xhr.deleteJSON(`${API}/contacts/${contact.id}`, () => {
            ServerActionCreators.deletedContact(contact);
        });
    },
    createContacts(contacts) {
        contacts.forEach((c, i) => {
            xhr.postJSON(`${API}/contacts`, { contact: c }, (resp) => {
                ServerActionCreators.addedContact(resp.contact);
            });
        });
    }
};

module.exports = ApiUtils;