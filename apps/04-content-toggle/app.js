var React = require('react');

var ContentToggle = React.createClass({

    getInitialState() {
        return {
            showDetails: true
        }
    },

    renderDetails() {
        var { showDetails } = this.state;
        if (showDetails) {
            return this.props.children;
        }
    },

    toggle() {
        this.setState({ showDetails: !this.state.showDetails }, this.maybeFocus);
    },

    maybeFocus() {
        if (this.state.showDetails) {
            this.refs.details.getDOMNode().focus();
        }
    },

    render() {
        var summaryClassName = "ContentToggle__Summary";
        if (this.state.showDetails) {
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
	render: function() {
		return (
			<div>
                <ContentToggle summary="Jerk Chicken">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam autem commodi consequuntur deserunt eaque explicabo fugit iure, magni, minus molestiae quis sapiente voluptatum. Accusamus ad maiores nihil numquam voluptatum.
                    </p>
                </ContentToggle>
            </div>
		);
	}

});

React.render(<App/>, document.body);

module.exports = App;