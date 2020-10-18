import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryFormat = (props) => {

    const api_key = process.env.REACT_APP_API_KEY

    const ctry = props.country;

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${ctry.capital}`)
            .then(response => {
                setWeather(response.data.current);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [ weather, setWeather ] = useState({
        "temperature": 0,
        "wind_speed": 0,
        "wind_dir": "N"
    });

    const languageList = () => {
        return (
            ctry.languages.map(lang => <li key={lang.name} >{lang.name}</li>)
        )
    };

    return (
        <div>
            <h1>{ctry.name}</h1>
            <p>Capital: {ctry.capital} </p>
            <p>Population: {ctry.population} </p>
            <h3>Languages</h3>
            <ul>
                {languageList()}
            </ul>
            <img src={ctry.flag} alt='Flag not found' width='150' height='100' />
            <h3>Weather in {ctry.capital}</h3>
            <p>Temperature: {weather.temperature} Celcius</p>
            <p>Wind: {weather.wind_speed} mph, direction {weather.wind_dir}</p>
        </div>
    )
};

export default CountryFormat;