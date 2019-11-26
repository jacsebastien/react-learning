import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     // Update component only if persons changed
    //     if(nextProps.persons !== this.props.persons) {
    //         return true;
    //     }

    //     return false;
    // }

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
