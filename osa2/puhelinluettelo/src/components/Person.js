import React from 'react';

const Person = (props) => {
    return (
        props.people.map(person => <p key={person.name}>{person.name}</p>)
    );
};

export default Person;