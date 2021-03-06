import React, { Component, Fragment } from 'react';

import styles from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import AuthContext from '../context/auth-context';

class App extends Component {
    constructor(props) {
        super(props);
        console.log('[App.js] constructor');
        // state can be set in constructor based on props or whatever
        // this.state = {
        //     persons: [
        //         { id: 'ezf45', name: 'Nash', age: 30 },
        //         { id: 'qv6ef', name: 'Eowynne', age: 29 },
        //         { id: 'tb6rb', name: 'Ray', age: 26 }
        //     ],
        //     otherState: 'Some other value',
        //     showPersons: false,
        //     appTitle: props.appTitle
        // };
    }

    // if state is set like this, constructore in not needed (added automatically by React)
    state = {
        persons: [
            { id: 'ezf45', name: 'Nash', age: 30 },
            { id: 'qv6ef', name: 'Eowynne', age: 29 },
            { id: 'tb6rb', name: 'Ray', age: 26 }
        ],
        otherState: 'Some other value',
        showPersons: false,
        showCockpit: true,
        changeCounter: 0,
        authenticated: false
    };

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js] getDerivedStateFromProps', props);
        return state;
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[App.js] shouldComponentUpdate', nextProps, nextState);
        return true;
    }

    componentDidUpdate() {
        console.log('[App.js] componentDidUpdate');
    }

    nameChangedHandler = (event, id) => {
        const persons = this.state.persons.map(person => {
            if (person.id === id) {
                person.name = event.target.value;
            }
            return person;
        });

        // BAD WAY to use setState when it depends on previous state /!\
        // this.setState({
        //     persons: persons,
        //     changeCounter: this.state.changeCounter + 1
        // });

        // Correct way (avoid having an unexpected previous state if it takes longer than expected to update)
        this.setState((prevState, props) => {
            return {
                persons: persons,
                changeCounter: prevState.changeCounter + 1
            };
        });
    }

    deletePersonHandler = (personIndex) => {
        // Create a copy to avoid modify the original one outside "setState" method
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];

        persons.splice(personIndex, 1);
        this.setState({ persons: persons });
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({ showPersons: !doesShow });
    }

    loginHandler = () => {
        this.setState({ authenticated: true });
    }

    render() {
        console.log('[App.js] render');
        let personsElements = null;
        if (this.state.showPersons) {
            personsElements = (
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                    isAuth={this.state.authenticated}
                />
            );
        }

        return (
            <Fragment>
                <button onClick={() => { this.setState({ showCockpit: false }); }}>
                    Hide Cockpit
                </button>
                {/* bind state.authenticated and loginHandler to context to allow other components to use it */}
                <AuthContext.Provider value={{
                    authenticated: this.state.authenticated,
                    login: this.loginHandler
                }}>
                    {this.state.showCockpit ?
                        <Cockpit
                            title={this.props.appTitle} // Passed to App.js from index.js
                            showPersons={this.state.showPersons}
                            personsLength={this.state.persons.length}
                            clicked={this.togglePersonsHandler}
                        /> : null}
                    {personsElements}
                </AuthContext.Provider>
            </Fragment>
        );
    }
}

export default withClass(App, styles.app);
