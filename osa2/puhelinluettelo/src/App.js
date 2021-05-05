import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import contactService from './services/contacts';

const App = () => {

  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNr, setNewNr ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');
  const [ showAll, setShowAll ] = useState(true);
  const [ notificationObject, setNotificationObject ] = useState({});

  useEffect(() => {
    contactService
      .getAll()
        .then(initialContacts => {
          setPersons(initialContacts)
        })
  }, []);

  const Notification = ({ type, message }) => {

    const successStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (type === 'success') {
      return (
        <div style={successStyle} >
          {message}
        </div>
      )

    } else if (type === 'error') {
      return (
        <div style={errorStyle}>
          {message}
        </div>
      )
    } else return null;
  }

  const changeNotification = (type, message) => {
    setNotificationObject({type, message})
    setTimeout(() => {
      setNotificationObject({})
    }, 5000)
  }

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
            changeNotification('success', `Updated number of ${newName}`);
          })
          .catch(error => {
            changeNotification(
              'error', `Information of ${newName} has already been deleted from the server`
            )
            setPersons(persons.filter(p => p.id !== contact.id))
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
          changeNotification('success', `Added ${newName}`);
        })
        .catch(error => {
          console.log(error.response.data)
          changeNotification('error', `Person validation failed: ${error.response.data}`)
        })

    }
  }

  const deletePerson = (contact) => {
    contactService
      .nuke(contact)
      .then(() => {
        contactService
          .getAll()
          .then(updatedContacts => {
            setPersons(updatedContacts)
          })
      })
    
    changeNotification('success', `Deleted ${contact.name}`);
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

      <Notification type={notificationObject.type} message={notificationObject.message} />

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

      <Persons people={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App;