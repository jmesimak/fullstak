import React from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

const AnecdoteButton = ({ handler }) => (
  <button onClick={handler}>next anecdote</button>
);

const VoteAnecdote = ({ handler }) => (
  <button onClick={handler}>vote</button>
);

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>{votes} votes</p>
  </div>
);

const MostVotes = ({ anecdoteEl }) => (
  <div>
    <h2>Most votes go to</h2>
    { anecdoteEl }
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      anecdoteVotes: anecdotes.reduce((votes, current) => ({ ...votes, [current]: 0 }), {}),
    }
    this.anecdoteButtonHandler = this.anecdoteButtonHandler.bind(this);
    this.voteAnecdote = this.voteAnecdote.bind(this);
  }

  anecdoteButtonHandler() {
    this.setState({
      selected: getRandomIntInclusive(0, anecdotes.length - 1)
    });
  }

  voteAnecdote() {
    const current = this.props.anecdotes[this.state.selected];
    this.setState({
      anecdoteVotes: {
        ...this.state.anecdoteVotes,
        [current]: this.state.anecdoteVotes[current] + 1,
      }
    });
  }

  render() {
    const current = this.props.anecdotes[this.state.selected];
    const mostVotes = Object.keys(this.state.anecdoteVotes).reduce((winner, text) => (
      this.state.anecdoteVotes[text] > this.state.anecdoteVotes[winner]
        ? text
        : winner      
    ), anecdotes[0]);
    const mostVotedAnecdoteEl = <Anecdote text={mostVotes} votes={this.state.anecdoteVotes[mostVotes]} />;
    
    return (
      <div>
        <Anecdote text={current} votes={this.state.anecdoteVotes[current]} />
        <br />
        <VoteAnecdote handler={this.voteAnecdote} />
        <AnecdoteButton handler={this.anecdoteButtonHandler} />

        <br />

        <MostVotes anecdoteEl={mostVotedAnecdoteEl} />
      </div>
    )
  }
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)