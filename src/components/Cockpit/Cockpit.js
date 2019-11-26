import React, { useEffect, useRef, useContext } from 'react';

import styles from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
    const toggleButtonRef = useRef(null);
    // Connect this functionnal component to AuthContext trough authContext property
    const authContext = useContext(AuthContext);

    // // Triggered every time the component is rendered/updated
    // useEffect(() => {
    //     console.log('[Cockpit.js] useEffect');
    //     // Http request ...
    // });

    // // triggered only when persons array changed
    // useEffect(() => {
    //     console.log('[Cockpit.js] useEffect');
    //     // Http request ...
    // }, [props.persons]);

    // // triggered only the first time the component is rendered
    // useEffect(() => {
    //     console.log('[Cockpit.js] useEffect');
    // }, []);

    // "return" is optional and runs when component is destroyed
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        toggleButtonRef.current.click();

        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []);

    // without second argument, it will be called each time the component changes
    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        console.log(authContext);
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
    });

    // We can use as many useEffect as we want with different trigger conditions


    const pStyles = [];
    const btnStyles = [styles.button];

    if(props.swowPersons) {
        btnStyles.push(styles.red);
    }

    if(props.personsLength <= 2) {
        pStyles.push(styles.red);
    }
    if(props.personsLength <= 1) {
        pStyles.push(styles.bold);
    }


    return (
        <div>
            <h1>{props.title}</h1>
            <p className={pStyles.join(' ')}>This is a React App.</p>
            <button
                ref={toggleButtonRef}
                className={btnStyles.join(' ')}
                onClick={props.clicked}>
                Toggle Persons
            </button>
            {/* Bind onClick to login method of context wich is binded to loginHandler */}
            {<button className={styles.button} onClick={authContext.login}>Log in</button>}
        </div>
    );
};

// Re render the component only if inputs changes
export default React.memo(Cockpit);
