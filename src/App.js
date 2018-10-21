import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons : [
      {
        id: 1,
        name: 'Ayush',
        age: 24
      },
      {
        id: 2,
        name: 'Swati',
        age: 25
      }
    ],
    showPerson: false
  }

  togglePersonHandler = () => {
    const togglePerson = this.state.showPerson;
    console.log(togglePerson);
    this.setState({
      showPerson: !togglePerson
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons:persons});
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1);
    this.setState({persons:persons});
  }

  render() {
    
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    let persons = null;
    if(this.state.showPerson) {
      persons = ( 
      <div>
        {this.state.persons.map((person, index) => {
          return <Person 
              click={this.deletePersonHandler.bind(this, index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
        })}
      </div>);
      style.backgroundColor = 'red';
    }

    let classes = ['red', 'bold'].join(' ');

    return (
      <div className="App">
        <h1 className={classes}>Hi, Welcome to React</h1>
        <button 
          style={style}
          onClick={this.togglePersonHandler}> Toggle Persons </button>
        {persons}
      </div>
    );
  }
}

export default App;
