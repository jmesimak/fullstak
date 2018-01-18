import React, { Component } from 'react';

const calcReviewAvg = reviews => {
  const amount = reviews.good + reviews.neutral + reviews.bad;
  if (amount === 0) return 0;
  return Math.round((reviews.good + reviews.bad * -1) / amount * 10) / 10;
};

const calcReviewPositivePercentage = reviews => (
  `${Math.round(reviews.good / (reviews.good + reviews.neutral + reviews.bad) * 100 * 10) / 10}%`
);

const ReviewButtons = ({ reviewHandler }) => (
  <div>
    <ReviewButton handler={reviewHandler('good')} title='hyvä' />
    <ReviewButton handler={reviewHandler('neutral')} title='neutraali' />
    <ReviewButton handler={reviewHandler('bad')} title='huono' />
  </div>
);

const ReviewButton = ({ handler, title }) => (
  <button onClick={handler}>{ title }</button>
);

const Statistic = ({ name, amount }) => (
  <tr>
    <td>{name}</td>
    <td>{amount}</td>
  </tr>
);

const Results = ({ reviews }) => (
  <table>
    <tbody>
      <Statistic name='hyvä' amount={reviews.good} />
      <Statistic name='neutraali' amount={reviews.neutral} />
      <Statistic name='huono' amount={reviews.bad} />
      <Statistic name='keskiarvo' amount={calcReviewAvg(reviews)} />
      <Statistic name='positiivisia' amount={calcReviewPositivePercentage(reviews)} />
    </tbody>
  </table>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      reviews: {
        good: 0,
        neutral: 0,
        bad: 0,
      },
    }
  }

  render() {
    const { reviews } = this.state;
    const amount = reviews.good + reviews.neutral + reviews.bad;

    const reviewHandler = review => () => {
      this.setState({
        reviews: {
          ...this.state.reviews,
          [review]: this.state.reviews[review] + 1,
        }
      });
    };

    const statistics = () => (
      amount > 0
        ? <Results reviews={this.state.reviews}/>
        : <p>Ei yhtään palautetta annettu</p>
    );

    return (
      <div>
        <h1>Anna palautetta</h1>
        <ReviewButtons reviewHandler={reviewHandler} />
        <h2>Statistiikkaa</h2>
        { statistics() }
      </div>
    );
  }
}

export default App;
