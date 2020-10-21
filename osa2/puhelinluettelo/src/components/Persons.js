import React from 'react';

const Persons = ({ people, deletePerson }) => {

    const clickHandler = (handledContact) => {
        if (window.confirm(`Delete ${handledContact.name}?`)) {
            deletePerson(handledContact)
        } 
    }

    return (
        people.map(person => 
            <p key={person.id}>
                {person.name} {person.nr}
                <button onClick={() => clickHandler(person)}>Delete</button>
            </p>
        )
    );
};

export default Persons;