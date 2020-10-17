import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';

const App = () => {

  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNr, setNewNr ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');
  const [ showAll, setShowAll ] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
    }
    else if (persons.map(person => person.nr).includes(newNr)) {
      alert(`${newNr} is already added to the phonebook`);
    }
    else {
      const personObject = {
        name: newName,
        nr: newNr
      }

      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNr('');
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNrChange = (event) => {
    setNewNr(event.target.value);
  }

  const handleFilterChange = (event) => {
    setShowAll(false);
    setNewFilter(event.target.value);
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={newFilter} filterChange={handleFilterChange} />

      <h3>Add a new contact</h3>

      <ContactForm 
        add ={addPerson}
        name={newName}
        nameChange={handleNameChange}
        nr={newNr}
        nrChange={handleNrChange}
      />

      <h3>Numbers</h3>

      <Persons people={personsToShow} />
    </div>
  )
}

export default App;