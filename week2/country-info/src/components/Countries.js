import React from 'react';

const Countries = ({ countries, clickHandler }) => {
  const countryEls = countries.map(({ name }) => (
    <li key={name} onClick={() => clickHandler(name)}>{name}</li>
  ));  
  return (
    <ul>
      { countryEls }
    </ul>
  );
};

export default Countries;
