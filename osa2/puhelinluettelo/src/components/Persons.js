import React from 'react';

const Persons = (props) => {
    return (
        props.people.map(person => 
            <p key={person.name}>{person.name} {person.nr}</p>
        )
    );
};

export default Persons;