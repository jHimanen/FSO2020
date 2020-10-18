import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Finder from './components/Finder';
import CountryDisplayer from './components/CountryDisplayer';

const App = () => {

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')
      .then(response => {
        setCountries(response.data);
      })
  }, []);
  
  const [ countries, setCountries ] = useState([]);
  const [ searchCountry, setSearchCountry ] = useState('');

  const changeSearch = (event) => {
    setSearchCountry(event.target.value)
  };

  return (
    <div>
      <Finder country={searchCountry} changeCountry={changeSearch} />
      <CountryDisplayer
        countries={countries}
        searchString={searchCountry}
        updateSearchString={setSearchCountry}
        />
    </div>
  );
}

export default App;
