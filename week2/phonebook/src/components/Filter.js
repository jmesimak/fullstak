import React from 'react';


const Filter = ({ name, filterName }) => {

  return (
    <div>
      <h2>Hae</h2>
      <input value={name} onChange={filterName} />
    </div>
  );
};

export default Filter;
