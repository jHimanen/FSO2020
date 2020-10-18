import React from 'react';

const Finder = (props) => {
    return (
        <div>
            Find countries: <input value={props.country} onChange={props.changeCountry} />
        </div>
    )
};

export default Finder;