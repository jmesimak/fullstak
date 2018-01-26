import React from 'react';

const Filter = ({ keyword, updateKeyword }) => {
  return (
    <div>
      <p>Search for a country</p>
      <input value={keyword} onChange={updateKeyword} />
    </div>
  );
};

export default Filter;
