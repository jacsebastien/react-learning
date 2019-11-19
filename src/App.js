import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Nash', age: 30 },
      { name: 'Eowynne', age: 29 },
      { name: 'Ray', age: 26 }
    ],
    otherState: 'Some other value',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    // DON'T DO THIS: this.state.persons[0].name = 'Strife'

    // UPDATE only 'persons' state but keep other states unchanged
    this.setState({
      persons: [
        { name: newName, age: 30 },
        { name: 'Eowynne', age: 29 },
        { name: 'Ray', age: 27 }
      ]
    });
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
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age} />
          {/* Pass a reference to this.switchNameHandler to the child component in a "clic" property (name can be what we want) */}
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, 'Eow')}
            changed={this.nameChangedHandler}>My Hobbies: Horsing</Person>
          <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age} />
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hello World !</h1>
        {/* <button onClick={this.switchNameHandler.bind(this, 'Strife')}>Switch Name</button> */}
        {/* Call the function in an anonymous function to pass data */}
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>


      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello World !!!!'));
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