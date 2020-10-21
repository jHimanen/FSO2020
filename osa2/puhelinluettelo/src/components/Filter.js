import React from 'react';

const Filter = ({ filter, filterChange }) => {
    return (
        <div>
            Filter: <input value={filter} onChange={filterChange}/>
        </div>
    )
};

export default Filter;