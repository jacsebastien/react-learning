import React, { useEffect } from 'react';

import styles from './Cockpit.module.css'

const Cockpit = (props) => {
    // Triggered every time the component is rendered/updated
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // Http request ...
    });

    // triggered only when persons array changed
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // Http request ...
    }, [props.persons]);

    // triggered only the first time the component is rendered
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
    }, []);

    // We can use as many useEffect as we want with different trigger conditions


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
