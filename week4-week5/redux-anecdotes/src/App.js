import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newAnecdote: '',
    }
    this.add = this.add.bind(this)
    this.vote = this.vote.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  vote(id) {
    this.props.store.dispatch({ type: 'VOTE', data: { id } })
  }

  add(event) {
    event.preventDefault()
    this.props.store.dispatch({ type: 'ADD', data: { anecdote: this.state.newAnecdote }})
    this.setState({ newAnecdote: '' })
  }

  handleInput(event) {
    this.setState({ newAnecdote: event.target.value })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input onChange={this.handleInput} value={this.state.newAnecdote} /></div>
          <button onClick={this.add}>create</button> 
        </form>
      </div>
    )
  }
}

export default App