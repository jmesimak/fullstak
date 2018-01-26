import React from 'react';

import Kurssi from './Kurssi';


const Kurssitarjonta = ({ kurssit }) => {
  return (
    <div>
      <h1>Kurssitarjonta</h1>
      <ul>
        { kurssit.map(k => <Kurssi key={k.id} kurssi={k} />) }
      </ul>
    </div>
  );
};

export default Kurssitarjonta;
