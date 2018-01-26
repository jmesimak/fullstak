import React from 'react';

import Sisalto from './Sisalto';


const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <h1>{kurssi.nimi}</h1>
      <Sisalto kurssi={kurssi} />
    </div>
  );
};

export default Kurssi;
