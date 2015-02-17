var React = require('react');
var assign = require('react/lib/Object.assign');

var styles = {};

styles.nav = {
    display: 'inline-block',
    padding: 10
};

styles.activeNav = assign({}, styles.nav, {
    weight: 'bold'
});

var App = React.createClass({
	render: function() {
        var pages = {
            '/home': "Home",
            '/about': "About"
        };
        var page = pages[this.props.route];
		return (
            <div>
                <ul style={styles.nav}>
                    <li style={styles.nav}>
                        <a href="#/home">home</a>
                    </li>
                    <li style={styles.nav}>
                        <a href="#/about">about</a>
                    </li>
                </ul>
                <div>{page}</div>
            </div>
		);
	}

});

var render = () => {
    React.render(<App route={location.hash.substr(1)}/>, document.body);
};

window.addEventListener("hashchange", render, false);

render();

