import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {

  const [ persons, setPersons] = useState([]);

  const [ newName, setNewName ] = useState('');

  const addName = (event) => {
    event.preventDefault();

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
    }
    else {
      const personObject = {
        name: newName
      }

      setPersons(persons.concat(personObject));
      setNewName('');
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <Person people={persons} />

    </div>
  )
}

export default App;
