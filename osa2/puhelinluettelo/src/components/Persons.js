import React from 'react';
import contactService from '../services/contacts';

const Persons = (props) => {

    const clickHandler = (handledContact) => {
        if (window.confirm(`Delete ${handledContact.name}?`)) {
            contactService
                .nuke(handledContact)
                .then(() => {
                    contactService
                        .getAll()
                        .then(updatedContacts => {
                            props.setPersons(updatedContacts)
                        })
                })
        } 
    }

    return (
        props.people.map(person => 
            <p key={person.id}>
                {person.name} {person.nr}
                <button onClick={() => clickHandler(person)}>Delete</button>
            </p>
        )
    );
};

export default Persons;