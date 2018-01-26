import React from 'react';

import Contact from './Contact';


const Contacts = ({ persons, filterWith, deletePerson }) => {
  const personEls = persons
    .filter(p => p.name.toLowerCase().includes(filterWith.toLowerCase()))
    .map(p => (
      <li key={p.name}>
        <Contact person={p} deletePerson={deletePerson} />
      </li>
    ));
  return (
    <div>
      <h2>Numerot</h2>
      <ul>
        { personEls }
      </ul>
    </div>
  );
};

export default Contacts;
