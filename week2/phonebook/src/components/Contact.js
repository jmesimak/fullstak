import React from 'react';

const Contact = ({ person, deletePerson }) => {
  return (
    <div>
      <span>{person.name} &nbsp; {person.number}</span>
      <button onClick={() => deletePerson(person.id)}>Delete</button>
    </div>
  );
};

export default Contact;
