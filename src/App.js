import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';

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

    nameChangedHandler = (event) => {
        this.setState({
            persons: [
                { name: 'Nash', age: 30 },
                { name: event.target.value, age: 29 },
                { name: 'Ray', age: 26 }
            ]
        });
    }

    deletePersonHandler = (personIndex) => {
        // Create a copy to avoid modify the original one outside "setState" method
        // const persons = this.state.persons.slice();
        const persons = [ ...this.state.persons ];

        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({ showPersons: !doesShow });
    }

    render() {
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '6px',
            cursor: 'pointer',
            borderRadius: '4px',
            color: 'blue'
        };

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, i) => {
                        // "key" property help React to know whitch element need to be updated when state changed and avoid re-rendering the all list
                        return <Person 
                            click={() => this.deletePersonHandler(i)}
                            name={person.name} 
                            age={person.age}
                            key={person.id} />;
                    })}
                </div>
            );
        }

        return (
            <div className="App">
                <h1>Hello World !</h1>
                <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
                {persons}
            </div>
        );
    }
}

export default App;

// import React, { useState } from 'react';

// const App = props => {
//   // useState returns an object AND a method that allow to change the state
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       { name: 'Nash', age: 30 },
//       { name: 'Eowynne', age: 29 },
//       { name: 'Ray', age: 26 }
//     ]
//   });

//   const [otherState, setOtherState] = useState('Some other value');

//   console.log(personsState, otherState);

//   const switchNameHandler = () => {
//     // REPLACE old state by this one (erase properties, delete missing properties)
//     setPersonsState({
//       persons: [
//         { name: 'Strife', age: 30 },
//         { name: 'Eowynne', age: 29 },
//         { name: 'Ray', age: 27 }
//       ]
//     })
//   }

//   return (
//     <div className="App">
//       <h1>Hello World !</h1>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
//       <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Horsing</Person>
//       <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
//     </div>
//   );
// }

// export default App;