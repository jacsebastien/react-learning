import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import styles from './Person.module.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    // Connect this component to AuthContext and allow to use this.context to get context data/functions
    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log('[Person.js] rendering...');

        // // Can return multiple JSX elements without wrapping them thx to an array
        // return [
        //         <p key="i1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old !</p>,
        //         <p key="i2">{this.props.children}</p>,
        //         <input key="i3" type="text" onChange={this.props.changed} value={this.props.name} />
        // ];

        // // Use empty wrapper to avoid using extra JSX element
        // return (
        //     <Auxiliary>
        //         <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old !</p>
        //         <p>{this.props.children}</p>
        //         <input type="text" onChange={this.props.changed} value={this.props.name} />
        //     </Auxiliary>
        // );

        // Wrap multiple JSX elements into one main element
        // return (
        //     <div className={styles.person}>
        //         <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old !</p>
        //         <p>{this.props.children}</p>
        //         <input type="text" onChange={this.props.changed} value={this.props.name} />
        //     </div>
        // );

        // Use React Fragment as an equivalent of custom Aux wrapper
        return (
            <Fragment>
                {/* Test for context.authenticated which is changed from cockpit button */}
                {this.context.authenticated ? <p>Authenticated !</p> : <p>Please log in.</p>}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old !</p>
                <p>{this.props.children}</p>
                {/* 2 way binding */}
                <input
                    type="text"
                    // ref={(inputEl) => { this.inputEl = inputEl; }}
                    ref={this.inputElementRef}
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Fragment>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
    children: PropTypes.node
};

export default withClass(Person, styles.person);
