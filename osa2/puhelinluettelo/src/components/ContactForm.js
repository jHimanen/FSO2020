import React from 'react';

const ContactForm = (props) => {
    return (
        <form onSubmit={props.add}>
            <div>
                Name: <input value={props.name} onChange={props.nameChange}/>
            </div>
            <div>
                Number: <input value={props.nr} onChange={props.nrChange}/>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default ContactForm;