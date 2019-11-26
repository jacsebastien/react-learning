import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import styles from './Person.module.css';

class Person extends Component {
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
        //         {/* 2 way binding */}
        //         <input type="text" onChange={this.props.changed} value={this.props.name} />
        //     </Auxiliary>
        // );

        // Wrap multiple JSX elements into one main element
        // return (
        //     <div className={styles.person}>
        //         <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old !</p>
        //         <p>{this.props.children}</p>
        //         {/* 2 way binding */}
        //         <input type="text" onChange={this.props.changed} value={this.props.name} />
        //     </div>
        // );

        // Use React Fragment as an equivalent of custom Aux wrapper
        return (
            <Fragment>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old !</p>
                <p>{this.props.children}</p>
                {/* 2 way binding */}
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </Fragment>
        );
    }
}

Person.prototype = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, styles.person);
