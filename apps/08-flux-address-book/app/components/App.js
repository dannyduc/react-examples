var React = require('react');
var ContactsStore = require('../stores/ContactsStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var App = React.createClass({

    getInitialState() {
        return ContactsStore.getState();
    },

    componentDidMount() {
        ContactsStore.addChangeListener(this.handleStoreChange)
        ViewActionCreators.loadContacts();
    },

    handleStoreChange() {
        this.setState(ContactsStore.getState());
    },

    deleteContact(contact) {
        ViewActionCreators.deleteContact(contact);
    },

    createContacts() {
        ViewActionCreators.createContacts();
    },

    renderContacts(contacts) {
        if (contacts.length === 0) {
            return <div><button onClick={this.createContacts}>create contacts</button></div>
        }
        return contacts.map(c => {
            return (
                <li key={c.id}>
                    {c.first} {c.last}
                    {' '}
                    <button onClick={this.deleteContact.bind(this, c)}>delete</button>
                </li>
            );
        })
    },

	render: function() {
        var { loaded, contacts } = this.state;
        if (loaded) {
            return (
                <div>
                    <ul>
                        {this.renderContacts(contacts)}
                    </ul>
                </div>
            );
        }
        return <div>Loading...</div>;
	}

});

module.exports = App;