import React from 'react';
import CountryFormat from './CountryFormat';

const CountryDisplayer = (props) => {

    const matchingCountries = props.countries.filter(country => country.name.toLowerCase().includes(props.searchString.toLowerCase()))

    const showCtry = (ctry) => {
        return (
            <CountryFormat country={ctry} />
        )
    };

    if (matchingCountries.length > 10) {

        return <p>Too many matches, please specify another filter.</p>

    } else if (matchingCountries.length > 1) {

        return (
            matchingCountries.map(country => <p key={country.name}>
                {country.name}
                <button onClick={() => props.updateSearchString(country.name)}>Show</button>
            </p>)
        )

    } else if (matchingCountries.length === 1){

        return showCtry(matchingCountries[0]);

    } else {       
        return <p>No matches, please specify another filter.</p>
    }
};

export default CountryDisplayer;