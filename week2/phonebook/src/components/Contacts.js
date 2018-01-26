import React from 'react';


const Contacts = ({ persons, filterWith }) => {
  const personEls = persons
    .filter(p => p.name.toLowerCase().includes(filterWith.toLowerCase()))
    .map(p => (
      <li key={p.name}>{p.name} &nbsp; {p.number}</li>
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
