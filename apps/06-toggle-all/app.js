var React = require('react');

var ContentToggle = React.createClass({

    propTypes: {
        showDetails: React.PropTypes.bool.isRequired,
        onToggle: React.PropTypes.func.isRequired
    },

    getDefaultProps() {
        return {
            showDetails: false,
            children: []
        }
    },

    renderDetails() {
        var { showDetails } = this.props;
        if (showDetails) {
            return this.props.children;
        }
    },

    toggle() {
        this.props.onToggle();
    },

    render() {
        var summaryClassName = "ContentToggle__Summary";
        if (this.props.showDetails) {
            summaryClassName += " ContentToggle__Summary--open";
        }
        return (
            <div className="ContentToggle">
                <div onClick={this.toggle} className={summaryClassName}>{this.props.summary}</div>
                <div ref="details" className="ContentToggle__Details">{this.renderDetails()}</div>
            </div>
        );
    }
});

var App = React.createClass({

    getInitialState() {
        return {
            toggleAll: false,
            toggleStates: {
                jerk: false,
                thai: false
            }
        }
    },

    toggleAll() {
        var { toggleStates, toggleAll } = this.state;
        var newStates = Object.keys(toggleStates).reduce((newStates, key) => {
            newStates[key] = !toggleAll;
            return newStates;
        }, {});
        this.setState({
            toggleAll: !toggleAll,
            toggleStates: newStates
        });
    },

    handleToggle(id) {
        var { toggleStates } = this.state;
        toggleStates[id] = !toggleStates[id];
        this.setState({ toggleStates });
        var keys = Object.keys(toggleStates);
        var areOpen = keys.filter(key => toggleStates[key]);
        if (areOpen.length === keys.length) {
            this.setState({ toggleAll: true });
        } else if (areOpen.length === 0) {
            this.setState({ toggleAll: false });
        }
    },

	render: function() {
		return (
            <div>
                <button onClick={this.toggleAll}>toggleAll</button>
                <div style={{margin: '10px 0'}}>
                    <ContentToggle
                            showDetails={this.state.toggleStates.jerk}
                            onToggle={this.handleToggle.bind(this, 'jerk')}
                            summary="Jerk Chicken">
                        <p>It was deliicious</p>
                    </ContentToggle>

                    <ContentToggle
                            showDetails={this.state.toggleStates.thai}
                            onToggle={this.handleToggle.bind(this, 'thai')}
                            summary="Thai">
                        <p>It was probably deliicious</p>
                    </ContentToggle>
                </div>
            </div>
		);
	}

});

React.render(<App/>, document.body);

module.exports = App;