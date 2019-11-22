import React from 'react';

import Person from './Person/Person';

// Shorten functionnal component
const persons = (props) => {
    console.log('[Persons.js] rendering...');

    return props.persons.map((person, i) => {
        // "key" property help React to know whitch element need to be updated when state changed and avoid re-rendering the all list
        return <Person
            click={() => props.clicked(i)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event) => props.changed(event, person.id)} />;
    });
}

export default persons;
