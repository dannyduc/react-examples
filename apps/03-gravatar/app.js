
var React = require('react');
var md5 = require('MD5');
var validateEmail = require('./validateEmail');
var warning = require('react/lib/warning');

var GRAVATAR_URL = "http://gravatar.com/avatar";

var USERS = [
    {id: 1, name: 'Ryan Florence', email: 'rpflorence@gmail.com'},
    {id: 2, name: 'Michael Jackson', email: 'mjijackson@gmail.com'}
];

var emailType = (props, propName, componentName) => {
    warning(
        validateEmail(props[propName]),
        `Invalid email '${props[propName]}' sent to 'Gravatar'. Check the render method of ${componentName}.`
    )
};

var sizeType = (props, propName, componentName) => {
    warning(
        !isNaN(parseInt(props[propName])),
        `Invalid '${propName}', can't convert '${props[propName]}' to number'. Check the render method of ${componentName}.`
    )
};

var Gravatar = React.createClass({

    propTypes: {
        email: emailType,
        size: sizeType
    },

    getDefaultProps() {
        return {
            size: 16
        }
    },

    render() {
        var { email, size } = this.props;
        var hash = md5(email);
        var url = `${GRAVATAR_URL}/${hash}?siz${size*2}`;
        return <img src={url} width={size}/>
    }
});

var App = React.createClass({
    render() {
        var users = USERS.map(u => <li key={u.id}><Gravatar email={u.email} size={26} /> {u.name}</li>);
        return (
            <div>
                <h1>Users</h1>
                <ul>{users}</ul>
            </div>
        );
    }
});

React.render(<App users={USERS}/>, document.body);