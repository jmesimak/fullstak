import React from 'react';

import Osa from './Osa';


const Sisalto = ({ kurssi }) => {
  const osat = kurssi => (
    kurssi.osat.map(osa => (
      <Osa key={osa.id} osa={osa} />
    ))
  );

  return (
    <div>
      <ul>
        { osat(kurssi) }
      </ul>
      <p>Yhteensä {kurssi.osat.reduce((tehtavia, osa) => tehtavia + osa.tehtavia, 0)} tehtävää</p>
    </div>
  );
};

export default Sisalto;
