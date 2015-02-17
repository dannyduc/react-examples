var React = require('react');
var assign = require('react/lib/Object.assign');

var DATA = [
    {name: 'USA', description: 'Land of the Free, Home of the brave'},
    {name: 'China', description: 'Lots of concrete'},
    {name: 'Russia', description: 'World Cup 2018!'}
];

var App = React.createClass({

    getInitialState() {
        return {
            index: 0
        };
    },

    getDefaultProps() {
        return {
            countries: []
        }
    },

    tabClicked(index) {
        this.setState({
            index
        });
    },

    renderTabs() {
        var { index } = this.state;
        return this.props.countries.map((c, i) => {
            var inlineStyles = (index === i) ? styles.activeTab : styles.tab;
            return <div onClick={this.tabClicked.bind(this, i)} key={c.name} style={inlineStyles}>{c.name}</div>;
        });
    },

    renderPanel() {
        var country = this.props.countries[this.state.index];
        return <div style={styles.tabPanel}>{country.description}</div>
    },

	render: function() {
		return (
			<div>
                <div>
                    {this.renderTabs()}
                </div>
                <div>
                    {this.renderPanel()}
                </div>
            </div>
		);
	}

});

var styles = {};

styles.tab = {
    display: 'inline-block',
    padding: 10,
    margin: 10,
    borderBottom: '4px solid',
    borderBottomColor: '#ccc',
    cursor: 'pointer'
};

styles.activeTab = assign({}, styles.tab, {
    borderBottomColor: '#000'
});

styles.tabPanel = {
    padding: 10
};

React.render(<App countries={DATA}/>, document.body);