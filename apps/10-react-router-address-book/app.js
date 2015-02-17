var React = require('react');
var Router = require('react-router');
var ContactStore = require('./ContactStore');
var {
    Route,
    DefaultRoute,
    NotFoundRoute,
    RouteHandler,
    Link
} = Router;

var App = React.createClass({

    getInitialState() {
        return {
            contacts: ContactStore.getContacts(),
            loading: true
        };
    },

    componentWillMount() {
        ContactStore.init();
    },

    componentDidMount() {
        ContactStore.addChangeListener(this.updateContacts);
    },

    updateContacts() {
        this.setState({
            contacts: ContactStore.getContacts(),
            loading: false
        });
    },

	render: function() {
        var contacts = this.state.contacts.map(c => {
            return (
                <li key={c.id}><Link to="contact" params={c}>{c.first}</Link></li>
            );
        });
		return (
			<div className="App">
                <div className="ContactList">
                    <Link to="new">New Contact</Link>
                    <ul>
                    {contacts}
                    </ul>
                    <Link to="/nothing-here">Invalid Link (not found)</Link>

                    <p><Link to="about">About</Link></p>
                </div>
                <div className="Content">
                    <RouteHandler/>
                </div>
            </div>
		);
	}

});

var Index = React.createClass({
    render() {
        return <h1>Address Book</h1>;
    }
});

var Contact = React.createClass({

    mixins: [ Router.Navigation, Router.State ],


    getInitialState() {
        return this.getStateFromStore();
    },

    componentDidMount() {
        ContactStore.addChangeListener(this.updateContact);
    },

    componentWillUnmount() {
        ContactStore.removeChangeListener(this.updateContact);
    },

    componentWillReceiveProps() {
        this.setState(this.getStateFromStore());
    },

    getStateFromStore() {
        var id = this.getParams().id;
        return {
            contact: ContactStore.getContact(id)
        };
    },

    updateContact() {
        if (!this.isMounted()) return;

        this.setState(this.getStateFromStore());
    },

    destroy() {
        var id = this.getParams().id;
        ContactStore.removeContact(id);
        this.transitionTo('/');
    },

    render() {
        var contact = this.state.contact || {};
        var name = contact.first + ' ' + contact.last;
        var avatar = contact.avatar;
        return (
            <div className="Contact">
                <img height="50" src={avatar} key={avatar}/>
                <h3>{name}</h3>
                <button onClick={this.destroy}>Delete</button>
            </div>
        );
    }
});

var NewContact = React.createClass({

    mixins: [ Router.Navigation ],

    createContact(event) {
        event.preventDefault();
        ContactStore.addContact({
            first: this.refs.first.getDOMNode().value,
            last: this.refs.last.getDOMNode().value
        }, (contact) => {
            this.transitionTo('contact', { id: contact.id });
        });
    },

    render() {
        return (
            <form onSubmit={this.createContact}>
                <p>
                    <input ref="first" placeholder="First name"/>
                    <input ref="last" placeholder="Last name"/>
                </p>
                <p>
                    <button type="submit">Save</button> {' '}
                    <Link to="/">Cancel</Link>
                </p>
            </form>
        );
    }
});

var NotFound = React.createClass({
    render() {
        return <h2>Not found</h2>;
    }
});

var About = React.createClass({
    render() {
        return (
            <h1>About</h1>
        );
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Index}/>
        <Route name="new" path="contact/new" handler={NewContact}/>
        <Route name="about" path="contact/about" handler={About}/>
        <Route name="contact" path="contact/:id" handler={Contact}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

Router.run(routes, Handler => {
    React.render(<Handler/>, document.body);
});