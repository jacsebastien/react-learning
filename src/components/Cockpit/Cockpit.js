import React, { useEffect } from 'react';

import styles from './Cockpit.module.css'

const Cockpit = (props) => {
    // Used for every time the component is rendered/updated
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // Http request ...
    });

    const pStyles = [];
    const btnStyles = [styles.button];

    if(props.swowPersons) {
        btnStyles.push(styles.red);
    }

    if(props.persons.length <= 2) {
        pStyles.push(styles.red);
    }
    if(props.persons.length <= 1) {
        pStyles.push(styles.bold);
    }


    return (
        <div>
            <h1>{props.title}</h1>
            <p className={pStyles.join(' ')}>This is a React App.</p>
            <button className={btnStyles.join(' ')} onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

export default Cockpit;
