import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    };

    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMessage: error});
    }

    render() {
        if(this.setState.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        } else {
            // By default return content wrapped by ErrorBoundary
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
