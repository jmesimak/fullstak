import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const Statistiikka = ({ stats, clear }) => {
  const palautteita = Object.keys(stats).reduce((p, k) => p + stats[k], 0)

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{stats.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{stats.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{stats.bad}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{stats.good / palautteita}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={clear}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.store = createStore(counterReducer)
    this.state = {
      stats: this.store.getState()
    }
    this.clear = this.clear.bind(this)
  }

  componentWillMount() {
    this.store.subscribe(() => {
      this.setState({
        stats: this.store.getState()
      })
    });
  }

  klik = (nappi) => () => {
    this.store.dispatch({type: nappi})
  }

  clear() {
    this.store.dispatch({type: 'CLEAR'})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka stats={this.state.stats} clear={this.clear} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));