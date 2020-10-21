import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import contactService from './services/contacts';

const App = () => {

  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNr, setNewNr ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');
  const [ showAll, setShowAll ] = useState(true);

  useEffect(() => {
    contactService
      .getAll()
        .then(initialContacts => {
          setPersons(initialContacts)
        })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      nr: newNr
    }

    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace with new number?`)) {
        const contact = persons.find(p => p.name === newName);
        const changedContact = { ...contact, nr: newNr}
        contactService
          .update(changedContact)
          .then(updatedContact => {
            setPersons(persons.map(p => p.name !== newName ? p : updatedContact));
            setNewName('');
            setNewNr('');
          })
      }
    }
    else if (persons.map(person => person.nr).includes(newNr)) {
      alert(`${newNr} is already added to the phonebook`);
    }
    else {
      
      contactService
        .create(personObject)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setNewName('');
            setNewNr('');
          })
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

      <Persons people={personsToShow} setPersons={setPersons} />
    </div>
  )
}

export default App;