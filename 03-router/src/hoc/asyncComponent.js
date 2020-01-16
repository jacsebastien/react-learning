import React, { Component } from 'react';

// importCompnent is a reference to a function
const AsyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        };

        componentWillMount() {
            importComponent()
                .then(cmp => {
                    this.setState({ component: cmp.default });
                });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    };
};

export default AsyncComponent;
