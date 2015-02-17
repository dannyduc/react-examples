var React = require('react');
var styles = require('./styles');
var data = require('./data');

var Tabs = React.createClass({

    propTypes: {
        data: React.PropTypes.array.isRequired,
        activeTabIndex: React.PropTypes.number.isRequired,
        onTabClick: React.PropTypes.func.isRequired
    },

    handleTabClick(activeTabIndex) {
        this.props.onTabClick(activeTabIndex)
    },

    render() {
        var { activeTabIndex } = this.props;
        var tabs = this.props.data.map((t, i) => {
            var inlineStyles = styles.tab;
            if (i === activeTabIndex) {
                inlineStyles = styles.activeTab;
            }
            return (
                <div
                    onClick={this.handleTabClick.bind(this, i)}
                    style={inlineStyles} >
                    {t.name}
                </div>
            );
        });
        return (
            <div>
                <div>{tabs}</div>
                <div style={styles.tabPanels}>
                    {this.props.data[activeTabIndex].description}
                </div>
            </div>
        );
    }
});

var App = React.createClass({

    propTypes: {
        tabs: React.PropTypes.array.isRequired
    },

    getInitialState() {
        return {
            activeTabIndex: 0
        }
    },

    handleTabClick(activeTabIndex) {
        this.setState({ activeTabIndex });
    },

    render() {
        return (
            <div>
                <Tabs
                    data={this.props.tabs}
                    activeTabIndex={this.state.activeTabIndex}
                    onTabClick={this.handleTabClick}
                />
            </div>
        );
    }
});

React.render(<App tabs={data}/>, document.body);