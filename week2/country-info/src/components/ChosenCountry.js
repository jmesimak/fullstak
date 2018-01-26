import React from 'react';

const ChosenCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <img style={{width: '30%', border: '1px solid grey'}} src={country.flag} />
    </div>
  );
};

export default ChosenCountry;
