var React = require("react");

var SomeMixin = {
    foo() {
        console.log('bar');
    }
};

var App = React.createClass({
    mixins: [ SomeMixin ],

    render() {
        this.foo();
        return <div>Hello</div>;
    }
});

React.render(<App/>, document.body);
