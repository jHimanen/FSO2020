import React from 'react';

const Filter = (props) => {
    return (
        <div>
            Filter: <input value={props.filter} onChange={props.filterChange}/>
        </div>
    )
};

export default Filter;