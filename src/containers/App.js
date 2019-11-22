import React, { Component } from 'react';

import styles from './App.module.css';
import Person from '../components/Persons/Person/Person';

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
        let btnStyles = [styles.button];

        if (this.state.showPersons) {
            personsElements = (
                <div>
                    {this.state.persons.map((person, i) => {
                        // "key" property help React to know whitch element need to be updated when state changed and avoid re-rendering the all list
                        return <Person
                            click={() => this.deletePersonHandler(i)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangedHandler(event, person.id)} />;
                    })}
                </div>
            );

            btnStyles.push(styles.red);
        }

        const classes = [];

        if(this.state.persons.length <= 2) {
            classes.push('red');
        }

        if(this.state.persons.length <= 1) {
            classes.push('bold');
        }

        return (
            <div className={styles.app}>
                <h1>Hello World !</h1>
                <p className={classes.join(' ')}>This is a React App.</p>
                <button className={btnStyles.join(' ')} onClick={this.togglePersonsHandler}>Toggle Persons</button>
                {personsElements}
            </div>
        );
    }
}

export default App;
