import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({ name }) => (
  <h1>{name}</h1>
);

const Osa = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
);

const Sisalto = ({ content }) => {
  const pieces = content.map(({ name, exercises }) => (
    <Osa key={name} name={name} exercises={exercises} />
  ));

  return (
    <div>{pieces}</div>
  );
};

const Yhteensa = ({ exercisesAmount }) => (
  <p>Yhteensä {exercisesAmount} tehtävää</p>
);

const App = () => {

  const kurssi = {
    name: 'Half Stack -sovelluskehitys',
    content: [
      {
        name: 'Reactin perusteet',
        exercises: 10,
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
      },
      {
        name: 'Komponenttien tila',
        exercises: 14,
      }
    ],
  };

  return (
    <div>
      <Otsikko name={kurssi.name} />
      <Sisalto content={kurssi.content} />
      <Yhteensa exercisesAmount={kurssi.content.reduce((a, e) => a + e.exercises, 0)} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
