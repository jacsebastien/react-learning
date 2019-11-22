import React, { Component } from 'react';

import styles from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
    state = {
        persons: [
            { id: 'ezf45', name: 'Nash', age: 30 },
            { id: 'qv6ef', name: 'Eowynne', age: 29 },
            { id: 'tb6rb', name: 'Ray', age: 26 }
        ],
        otherState: 'Some other value',
        showPersons: false
    }

    nameChangedHandler = (event, id) => {
        const persons = this.state.persons.map(person => {
            if (person.id === id) {
                person.name = event.target.value;
            }
            return person;
        });

        this.setState({ persons: persons });
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

    render() {
        let personsElements = null;
        if (this.state.showPersons) {
            personsElements = (
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler} />
            );
        }

        return (
            <div className={styles.app}>
                <Cockpit
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler} />
                {personsElements}
            </div>
        );
    }
}

export default App;