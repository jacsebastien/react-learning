import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {
    render() {
        console.log('[Persons.js] rendering...');

        return this.props.persons.map((person, i) => {
            // "key" property help React to know whitch element need to be updated when state changed and avoid re-rendering the all list
            return <Person
                click={() => this.props.clicked(i)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)} />;
        });
    }
}

export default Persons;
