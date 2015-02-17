var React = require('react');

var fetchUsers = cb => {
    setTimeout(() => {
        cb([{name: 'joe'}, {name: 'bob'}, {name:'george'}]);
    }, 500);
};

var App = React.createClass({
    getInitialState() {
        return {
            loaded: false
        }
    },

    componentDidMount() {
        fetchUsers(users => {
            this.setState({
                loaded: true,
                users
            })
        });
    },

	render() {
        if (!this.state.loaded) {
            return <div>loading...</div>;
        }
        var users = this.state.users.map(u => <li key={u.name}>{u.name}</li>)
		return (
            <div>
                <h1>Hello</h1>
                <ul>{users}</ul>
            </div>
        );
	}
});

React.render(<App/>, document.body);

module.exports = App;