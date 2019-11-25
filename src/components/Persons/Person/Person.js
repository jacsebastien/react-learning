import React, { Component } from 'react';

import styles from './Person.module.css';

class Person extends Component {
    render() {
        console.log('[Person.js] rendering...');

        return (
            <div className={styles.person}>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old !</p>
                <p>{this.props.children}</p>
                {/* 2 way binding */}
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </div>
        );
    }
}

export default Person;
